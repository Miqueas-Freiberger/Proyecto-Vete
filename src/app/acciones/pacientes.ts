"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { sesionActiva } from "@/lib/auth";
import {
  actualizarMascota,
  borrarMascota,
  crearMascota,
  obtenerMascota,
} from "@/lib/queries";
import type { EstadoFormulario } from "./clientes";

async function exigirSesion(): Promise<void> {
  const usuario = await sesionActiva();
  if (!usuario) redirect("/ingresar");
}

/**
 * El campo de nacimiento acepta texto libre a propósito: en los registros
 * históricos hay de todo, desde "2012" hasta "12/03/2021". Forzar una fecha
 * real obligaría a inventar datos que nadie tiene.
 */
const esquemaMascota = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio.").max(30, "Máximo 30 caracteres."),
  especie: z.string().trim().max(30, "Máximo 30 caracteres.").default(""),
  nacimiento: z.string().trim().max(50, "Máximo 50 caracteres.").default(""),
  sexo: z.string().trim().max(30).default(""),
  raza: z.string().trim().max(50, "Máximo 50 caracteres.").default(""),
  color: z.string().trim().max(50, "Máximo 50 caracteres.").default(""),
  tamano: z.string().trim().max(10).default(""),
  esterilizado: z.string().trim().max(2).default(""),
  ingreso: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Elegí una fecha de ingreso."),
});

function leerMascota(datos: FormData) {
  return esquemaMascota.safeParse({
    nombre: datos.get("nombre") ?? "",
    especie: datos.get("especie") ?? "",
    nacimiento: datos.get("nacimiento") ?? "",
    sexo: datos.get("sexo") ?? "",
    raza: datos.get("raza") ?? "",
    color: datos.get("color") ?? "",
    tamano: datos.get("tamano") ?? "",
    esterilizado: datos.get("esterilizado") ?? "",
    ingreso: datos.get("ingreso") ?? "",
  });
}

function aErrores(error: z.ZodError): Record<string, string> {
  const errores: Record<string, string> = {};
  for (const problema of error.issues) {
    const campo = String(problema.path[0] ?? "");
    if (campo && !errores[campo]) errores[campo] = problema.message;
  }
  return errores;
}

export async function crearMascotaAccion(
  clienteId: number,
  _estado: EstadoFormulario,
  datos: FormData,
): Promise<EstadoFormulario> {
  await exigirSesion();

  const resultado = leerMascota(datos);
  if (!resultado.success) return { errores: aErrores(resultado.error) };

  let id: number;
  try {
    id = await crearMascota({ ...resultado.data, duenoId: clienteId });
  } catch {
    return { error: "No se pudo guardar el paciente. Probá de nuevo." };
  }

  revalidatePath(`/clientes/${clienteId}`);
  redirect(`/pacientes/${id}`);
}

export async function actualizarMascotaAccion(
  id: number,
  _estado: EstadoFormulario,
  datos: FormData,
): Promise<EstadoFormulario> {
  await exigirSesion();

  const resultado = leerMascota(datos);
  if (!resultado.success) return { errores: aErrores(resultado.error) };

  try {
    await actualizarMascota(id, resultado.data);
  } catch {
    return { error: "No se pudieron guardar los cambios. Probá de nuevo." };
  }

  revalidatePath(`/pacientes/${id}`);
  redirect(`/pacientes/${id}`);
}

export async function borrarMascotaAccion(id: number): Promise<void> {
  await exigirSesion();

  // Hay que leer el dueño antes de borrar, porque después ya no se puede.
  const mascota = await obtenerMascota(id);
  const clienteId = mascota?.duenoId;

  await borrarMascota(id);

  if (clienteId) {
    revalidatePath(`/clientes/${clienteId}`);
    redirect(`/clientes/${clienteId}`);
  }
  redirect("/");
}
