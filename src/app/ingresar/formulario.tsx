"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { ingresarAccion, type EstadoIngreso } from "@/app/acciones/sesion";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const INICIAL: EstadoIngreso = {};

function BotonEnviar() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" loading={pending}>
      {pending ? "Entrando" : "Entrar"}
    </Button>
  );
}

export function FormularioIngreso() {
  const [estado, accion] = useActionState(ingresarAccion, INICIAL);

  return (
    <form action={accion} className="flex flex-col gap-5">
      {estado.error && <Alert>{estado.error}</Alert>}

      <Field label="Usuario" htmlFor="usuario">
        <Input
          id="usuario"
          name="usuario"
          type="text"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          required
          autoFocus
        />
      </Field>

      <Field label="Contraseña" htmlFor="contrasena">
        <Input
          id="contrasena"
          name="contrasena"
          type="password"
          autoComplete="current-password"
          required
        />
      </Field>

      <BotonEnviar />
    </form>
  );
}
