"use server";

import { redirect } from "next/navigation";
import {
  abrirSesion,
  cerrarSesion,
  credencialesConfiguradas,
  verificarCredenciales,
} from "@/lib/auth";

export type EstadoIngreso = { error?: string };

export async function ingresarAccion(
  _estado: EstadoIngreso,
  datos: FormData,
): Promise<EstadoIngreso> {
  if (!credencialesConfiguradas()) {
    return {
      error: "Falta configurar el acceso. Cargar APP_AUTH_USER y APP_AUTH_PASSWORD_HASH.",
    };
  }

  const usuario = String(datos.get("usuario") ?? "");
  const contrasena = String(datos.get("contrasena") ?? "");

  if (!usuario || !contrasena) {
    return { error: "Completá usuario y contraseña." };
  }

  const valido = await verificarCredenciales(usuario, contrasena);
  if (!valido) {
    // El mensaje no distingue si falló el usuario o la contraseña.
    return { error: "Usuario o contraseña incorrectos." };
  }

  await abrirSesion(usuario);
  redirect("/");
}

export async function cerrarSesionAccion(): Promise<void> {
  await cerrarSesion();
  redirect("/ingresar");
}
