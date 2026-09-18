"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { sesionActiva } from "@/lib/auth";
import {
  actualizarCliente,
  borrarCliente,
  crearCliente,
} from "@/lib/queries";

/**
 * Una acción se puede invocar sin pasar por el layout del panel, así que cada
 * una verifica la sesión por su cuenta.
 */
async function exigirSesion(): Promise<void> {
  const usuario = await sesionActiva();
  if (!usuario) redirect("/ingresar");
}

export type EstadoFormulario = {
  error?: string;
  errores?: Record<string, string>;
  /**
   * Solo lo usa la edición dentro de un modal. Desde una pantalla propia la
   * acción redirige y nunca vuelve, pero el modal vive en la misma dirección a
   * la que redirigiría, así que necesita que le avisen que terminó bien.
   */
  ok?: true;
};

const esquemaCliente = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre es obligatorio.")
    .max(50, "El nombre no puede pasar de 50 caracteres."),
  // La columna es int, así que el documento va sin puntos. Vacío se guarda
  // como cero, que es lo que hacía la aplicación anterior para los 27
  // clientes que no lo tienen cargado.
  dni: z
    .string()
    .trim()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => v === "" || (Number(v) > 0 && Number(v) < 2147483647), {
      message: "El documento tiene que ser un número válido.",
    }),
  telefono: z.string().trim().max(100, "El teléfono es demasiado largo.").default(""),
  email: z
    .string()
    .trim()
    .max(70, "El correo es demasiado largo.")
    .refine((v) => v === "" || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v), {
      message: "Ese correo no parece válido.",
    })
    .default(""),
  direccion: z.string().trim().max(1000, "La dirección es demasiado larga.").default(""),
  localidad: z.string().trim().max(40, "La localidad es demasiado larga.").default(""),
});

function leerCliente(datos: FormData) {
  return esquemaCliente.safeParse({
    nombre: datos.get("nombre") ?? "",
    dni: datos.get("dni") ?? "",
    telefono: datos.get("telefono") ?? "",
    email: datos.get("email") ?? "",
    direccion: datos.get("direccion") ?? "",
    localidad: datos.get("localidad") ?? "",
  });
}

function aErrores(resultado: z.ZodError): Record<string, string> {
  const errores: Record<string, string> = {};
  for (const problema of resultado.issues) {
    const campo = String(problema.path[0] ?? "");
    if (campo && !errores[campo]) errores[campo] = problema.message;
  }
  return errores;
}

export async function crearClienteAccion(
  _estado: EstadoFormulario,
  datos: FormData,
): Promise<EstadoFormulario> {
  await exigirSesion();

  const resultado = leerCliente(datos);
  if (!resultado.success) {
    return { errores: aErrores(resultado.error) };
  }

  let id: number;
  try {
    id = await crearCliente({
      ...resultado.data,
      dni: resultado.data.dni === "" ? 0 : Number(resultado.data.dni),
    });
  } catch {
    return { error: "No se pudo guardar el cliente. Probá de nuevo." };
  }

  revalidatePath("/");
  redirect(`/clientes/${id}`);
}

export async function actualizarClienteAccion(
  id: number,
  enModal: boolean,
  _estado: EstadoFormulario,
  datos: FormData,
): Promise<EstadoFormulario> {
  await exigirSesion();

  const resultado = leerCliente(datos);
  if (!resultado.success) {
    return { errores: aErrores(resultado.error) };
  }

  try {
    await actualizarCliente(id, {
      ...resultado.data,
      dni: resultado.data.dni === "" ? 0 : Number(resultado.data.dni),
    });
  } catch {
    return { error: "No se pudieron guardar los cambios. Probá de nuevo." };
  }

  revalidatePath("/");
  revalidatePath(`/clientes/${id}`);

  // Desde el modal ya estamos en la ficha: revalidar la refresca por detrás y
  // alcanza con cerrar. Redirigir acá no navegaría a ningún lado.
  if (enModal) return { ok: true };
  redirect(`/clientes/${id}`);
}

export async function borrarClienteAccion(id: number): Promise<void> {
  await exigirSesion();
  // Las claves foráneas arrastran mascotas, consultas y adjuntos.
  await borrarCliente(id);
  revalidatePath("/");
  redirect("/");
}
