"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import type { EstadoFormulario } from "@/app/acciones/clientes";
import {
  AvisoError,
  Boton,
  Campo,
  Entrada,
  Panel,
} from "@/components/ui";
import { SpinnerGap } from "@phosphor-icons/react";

export type ValoresCliente = {
  nombre: string;
  dni: string;
  telefono: string;
  email: string;
  direccion: string;
  localidad: string;
};

const VACIO: ValoresCliente = {
  nombre: "",
  dni: "",
  telefono: "",
  email: "",
  direccion: "",
  localidad: "",
};

const INICIAL: EstadoFormulario = {};

export function FormularioCliente({
  accion,
  valores = VACIO,
  volverA,
  textoEnviar,
}: {
  accion: (estado: EstadoFormulario, datos: FormData) => Promise<EstadoFormulario>;
  valores?: ValoresCliente;
  volverA: string;
  textoEnviar: string;
}) {
  const [estado, enviar] = useActionState(accion, INICIAL);

  return (
    <form action={enviar} className="flex flex-col gap-5">
      {estado.error && <AvisoError>{estado.error}</AvisoError>}

      <Panel className="flex flex-col gap-5 p-5">
        <Campo
          etiqueta="Nombre y apellido"
          htmlFor="nombre"
          obligatorio
          error={estado.errores?.nombre}
        >
          <Entrada
            id="nombre"
            name="nombre"
            defaultValue={valores.nombre}
            maxLength={50}
            autoComplete="name"
            required
            autoFocus
          />
        </Campo>

        <div className="grid gap-5 sm:grid-cols-2">
          <Campo
            etiqueta="Teléfono"
            htmlFor="telefono"
            ayuda="Si hay más de uno, separalos con una barra."
            error={estado.errores?.telefono}
          >
            <Entrada
              id="telefono"
              name="telefono"
              defaultValue={valores.telefono}
              maxLength={100}
              inputMode="tel"
              autoComplete="tel"
            />
          </Campo>

          <Campo
            etiqueta="Documento"
            htmlFor="dni"
            ayuda="Solo números, sin puntos."
            error={estado.errores?.dni}
          >
            <Entrada
              id="dni"
              name="dni"
              defaultValue={valores.dni}
              inputMode="numeric"
              maxLength={11}
            />
          </Campo>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Campo
            etiqueta="Dirección"
            htmlFor="direccion"
            error={estado.errores?.direccion}
          >
            <Entrada
              id="direccion"
              name="direccion"
              defaultValue={valores.direccion}
              maxLength={200}
              autoComplete="street-address"
            />
          </Campo>

          <Campo
            etiqueta="Localidad"
            htmlFor="localidad"
            error={estado.errores?.localidad}
          >
            <Entrada
              id="localidad"
              name="localidad"
              defaultValue={valores.localidad}
              maxLength={40}
              autoComplete="address-level2"
            />
          </Campo>
        </div>

        <Campo
          etiqueta="Correo"
          htmlFor="email"
          ayuda="Opcional."
          error={estado.errores?.email}
        >
          <Entrada
            id="email"
            name="email"
            type="email"
            defaultValue={valores.email}
            maxLength={70}
            autoComplete="email"
          />
        </Campo>
      </Panel>

      <Acciones volverA={volverA} textoEnviar={textoEnviar} />
    </form>
  );
}

export function Acciones({
  volverA,
  textoEnviar,
}: {
  volverA: string;
  textoEnviar: string;
}) {
  const { pending } = useFormStatus();

  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={volverA}
        className="inline-flex h-11 items-center justify-center rounded-[var(--radius-control)] px-4 text-sm font-medium text-tinta-media transition-colors hover:bg-superficie-alta hover:text-tinta"
      >
        Cancelar
      </Link>
      <Boton type="submit" tono="primario" disabled={pending}>
        {pending && <SpinnerGap size={16} className="animate-spin" />}
        {pending ? "Guardando" : textoEnviar}
      </Boton>
    </div>
  );
}
