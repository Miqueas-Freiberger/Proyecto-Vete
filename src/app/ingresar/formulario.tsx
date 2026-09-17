"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ingresarAccion, type EstadoIngreso } from "@/app/acciones/sesion";
import { AvisoError, Boton, Campo, Entrada } from "@/components/ui";
import { SpinnerGap } from "@phosphor-icons/react";

const INICIAL: EstadoIngreso = {};

function BotonEnviar() {
  const { pending } = useFormStatus();
  return (
    <Boton type="submit" tono="primario" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <SpinnerGap size={16} className="animate-spin" />
          Entrando
        </>
      ) : (
        "Entrar"
      )}
    </Boton>
  );
}

export function FormularioIngreso() {
  const [estado, accion] = useActionState(ingresarAccion, INICIAL);

  return (
    <form action={accion} className="flex flex-col gap-5">
      {estado.error && <AvisoError>{estado.error}</AvisoError>}

      <Campo etiqueta="Usuario" htmlFor="usuario">
        <Entrada
          id="usuario"
          name="usuario"
          type="text"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          required
          autoFocus
        />
      </Campo>

      <Campo etiqueta="Contraseña" htmlFor="contrasena">
        <Entrada
          id="contrasena"
          name="contrasena"
          type="password"
          autoComplete="current-password"
          required
        />
      </Campo>

      <BotonEnviar />
    </form>
  );
}
