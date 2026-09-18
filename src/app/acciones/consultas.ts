"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { sesionActiva } from "@/lib/auth";
import {
  actualizarConsulta,
  adjuntosDeConsulta,
  borrarAdjunto,
  borrarConsulta,
  crearAdjunto,
  crearConsulta,
  obtenerAdjunto,
  obtenerConsulta,
} from "@/lib/queries";
import {
  borrarArchivo,
  bucketDisponible,
  clasificar,
  generarClave,
  subirArchivo,
  urlLectura,
} from "@/lib/storage";
import { ESTUDIOS } from "@/lib/estudios";
import type { EstadoFormulario } from "./clientes";

async function exigirSesion(): Promise<void> {
  const usuario = await sesionActiva();
  if (!usuario) redirect("/ingresar");
}

const esquemaConsulta = z.object({
  motivo: z.string().trim().max(255, "Máximo 255 caracteres.").default(""),
  observacion: z.string().trim().default(""),
  tratamiento: z.string().trim().default(""),
  fecha: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Elegí la fecha de la consulta."),
});

function leerConsulta(datos: FormData) {
  const base = esquemaConsulta.safeParse({
    motivo: datos.get("motivo") ?? "",
    observacion: datos.get("observacion") ?? "",
    tratamiento: datos.get("tratamiento") ?? "",
    fecha: datos.get("fecha") ?? "",
  });

  if (!base.success) return base;

  const marcados = datos
    .getAll("complementarios")
    .map((v) => String(v))
    .filter((v) => (ESTUDIOS as readonly string[]).includes(v));

  // La columna admite 110 caracteres: con los seis estudios entra justo.
  const complementarios = marcados.length > 0 ? marcados.join(" / ") : "-";

  return {
    success: true as const,
    data: { ...base.data, complementarios: complementarios.slice(0, 110) },
  };
}

function aErrores(error: z.ZodError): Record<string, string> {
  const errores: Record<string, string> = {};
  for (const problema of error.issues) {
    const campo = String(problema.path[0] ?? "");
    if (campo && !errores[campo]) errores[campo] = problema.message;
  }
  return errores;
}

export async function crearConsultaAccion(
  mascotaId: number,
  enModal: boolean,
  _estado: EstadoFormulario,
  datos: FormData,
): Promise<EstadoFormulario> {
  await exigirSesion();

  const resultado = leerConsulta(datos);
  if (!resultado.success) return { errores: aErrores(resultado.error) };

  try {
    await crearConsulta({ ...resultado.data, mascotaId });
  } catch {
    return { error: "No se pudo guardar la consulta. Probá de nuevo." };
  }

  revalidatePath(`/pacientes/${mascotaId}`);

  // A diferencia del alta de cliente o paciente, esta redirige a la ficha
  // donde vive el modal, así que desde ahí no cerraría nada.
  if (enModal) return { ok: true };
  redirect(`/pacientes/${mascotaId}`);
}

export async function actualizarConsultaAccion(
  id: number,
  mascotaId: number,
  enModal: boolean,
  _estado: EstadoFormulario,
  datos: FormData,
): Promise<EstadoFormulario> {
  await exigirSesion();

  const resultado = leerConsulta(datos);
  if (!resultado.success) return { errores: aErrores(resultado.error) };

  try {
    await actualizarConsulta(id, resultado.data);
  } catch {
    return { error: "No se pudieron guardar los cambios. Probá de nuevo." };
  }

  revalidatePath(`/pacientes/${mascotaId}`);

  if (enModal) return { ok: true };
  redirect(`/pacientes/${mascotaId}`);
}

export async function borrarConsultaAccion(id: number): Promise<void> {
  await exigirSesion();

  const consulta = await obtenerConsulta(id);
  if (!consulta) redirect("/");

  // Los archivos del bucket se borran antes que el registro, porque después
  // no quedaría manera de saber cuáles eran.
  for (const adjunto of await adjuntosDeConsulta(id)) {
    await borrarArchivo(adjunto.ruta);
  }

  await borrarConsulta(id);
  revalidatePath(`/pacientes/${consulta.mascotaId}`);
  redirect(`/pacientes/${consulta.mascotaId}`);
}

// ---------------------------------------------------------------------------
// Estudios adjuntos
// ---------------------------------------------------------------------------

const LIMITE_BYTES = 25 * 1024 * 1024;

const TIPOS_ACEPTADOS = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

/** El sello cambia en cada subida exitosa y remonta el campo del formulario. */
export type EstadoSubida = { error?: string; ok?: boolean; sello?: number };

export async function subirEstudioAccion(
  consultaId: number,
  _estado: EstadoSubida,
  datos: FormData,
): Promise<EstadoSubida> {
  await exigirSesion();

  if (!bucketDisponible()) {
    return { error: "No hay almacenamiento configurado para los estudios." };
  }

  const archivo = datos.get("archivo");
  if (!(archivo instanceof File) || archivo.size === 0) {
    return { error: "Elegí un archivo." };
  }

  if (archivo.size > LIMITE_BYTES) {
    return { error: "El archivo supera los 25 MB." };
  }

  if (!TIPOS_ACEPTADOS.has(archivo.type)) {
    return { error: "Formato no admitido. Se aceptan imágenes, PDF y Word." };
  }

  const tipo = clasificar(archivo.type, archivo.name);
  const { clave, nombreArchivo } = generarClave(tipo);

  try {
    const contenido = Buffer.from(await archivo.arrayBuffer());
    await subirArchivo(clave, contenido, archivo.type);
  } catch {
    return { error: "No se pudo subir el archivo. Probá de nuevo." };
  }

  try {
    await crearAdjunto({
      nombre: archivo.name.slice(0, 300),
      ruta: clave,
      extension: archivo.type.slice(0, 300),
      nuevoNombre: nombreArchivo,
      esDocumento: tipo !== "imagen",
      consultaId,
    });
  } catch {
    // Si falla el registro, el objeto quedaría huérfano ocupando lugar.
    await borrarArchivo(clave);
    return { error: "El archivo se subió pero no se pudo registrar." };
  }

  revalidatePath(`/consultas/${consultaId}/estudios`);
  return { ok: true, sello: Date.now() };
}

export async function borrarEstudioAccion(id: number): Promise<void> {
  await exigirSesion();

  const adjunto = await obtenerAdjunto(id);
  if (!adjunto) return;

  await borrarArchivo(adjunto.ruta);
  await borrarAdjunto(id);
  revalidatePath(`/consultas/${adjunto.consultaId}/estudios`);
}

export type EstudiosCargados = {
  hayBucket: boolean;
  items: Array<{
    id: number;
    nombre: string;
    esDocumento: boolean;
    tipo: string;
    url: string | null;
  }>;
};

/**
 * Los estudios se piden al abrir el modal y no vienen precargados con la ficha:
 * firmar las direcciones de todos los adjuntos de todas las consultas de un
 * paciente sería una ronda al bucket por archivo para mostrar ninguno.
 */
export async function cargarEstudiosAccion(
  consultaId: number,
): Promise<EstudiosCargados> {
  await exigirSesion();

  const hayBucket = bucketDisponible();
  const adjuntos = await adjuntosDeConsulta(consultaId);

  // Las direcciones se firman en el servidor y vencen. Un archivo que ya no
  // está en el bucket se marca como faltante en vez de romper la galería.
  const items = await Promise.all(
    adjuntos.map(async (adjunto) => {
      const nombre = adjunto.nombre?.trim() || adjunto.nuevoNombre;
      return {
        id: adjunto.id,
        nombre,
        esDocumento: adjunto.esDocumento,
        tipo: adjunto.extension,
        url: hayBucket
          ? await urlLectura(adjunto.ruta, {
              descarga: adjunto.esDocumento,
              nombre,
              tipoMime: adjunto.extension || undefined,
            })
          : null,
      };
    }),
  );

  return { hayBucket, items };
}
