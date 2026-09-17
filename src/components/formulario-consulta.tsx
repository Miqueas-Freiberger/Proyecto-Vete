"use client";

import { useActionState } from "react";
import type { EstadoFormulario } from "@/app/acciones/clientes";
import { ESTUDIOS } from "@/lib/estudios";
import { AreaTexto, AvisoError, Campo, Entrada, Panel } from "@/components/ui";
import { Acciones } from "./formulario-cliente";

export type ValoresConsulta = {
  fecha: string;
  motivo: string;
  observacion: string;
  tratamiento: string;
  complementarios: string[];
};

const INICIAL: EstadoFormulario = {};

export function FormularioConsulta({
  accion,
  valores,
  volverA,
  textoEnviar,
}: {
  accion: (estado: EstadoFormulario, datos: FormData) => Promise<EstadoFormulario>;
  valores: ValoresConsulta;
  volverA: string;
  textoEnviar: string;
}) {
  const [estado, enviar] = useActionState(accion, INICIAL);
  const marcados = new Set(valores.complementarios);

  return (
    <form action={enviar} className="flex flex-col gap-5">
      {estado.error && <AvisoError>{estado.error}</AvisoError>}

      <Panel className="flex flex-col gap-5 p-5">
        <div className="grid gap-5 sm:grid-cols-[minmax(0,12rem)_1fr]">
          <Campo
            etiqueta="Fecha"
            htmlFor="fecha"
            obligatorio
            error={estado.errores?.fecha}
          >
            <Entrada
              id="fecha"
              name="fecha"
              type="date"
              defaultValue={valores.fecha}
              required
            />
          </Campo>

          <Campo etiqueta="Motivo" htmlFor="motivo" error={estado.errores?.motivo}>
            <Entrada
              id="motivo"
              name="motivo"
              defaultValue={valores.motivo}
              maxLength={255}
              placeholder="Control, vacunación, herida..."
              autoFocus
            />
          </Campo>
        </div>

        <Campo etiqueta="Observaciones" htmlFor="observacion">
          <AreaTexto
            id="observacion"
            name="observacion"
            defaultValue={valores.observacion}
            rows={5}
          />
        </Campo>

        <Campo etiqueta="Tratamiento" htmlFor="tratamiento">
          <AreaTexto
            id="tratamiento"
            name="tratamiento"
            defaultValue={valores.tratamiento}
            rows={4}
          />
        </Campo>
      </Panel>

      <Panel className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-1">
          <p className="text-[13px] font-medium text-tinta-media">
            Estudios complementarios
          </p>
          <p className="text-[12px] text-tinta-suave">
            Marcá los que se pidieron en esta consulta.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {ESTUDIOS.map((estudio) => (
            <label
              key={estudio}
              className="flex cursor-pointer items-center gap-2.5 rounded-[var(--radius-control)] border border-borde px-3 py-2.5 text-sm text-tinta transition-colors hover:border-acento-borde hover:bg-superficie-alta has-[:checked]:border-acento-borde has-[:checked]:bg-acento-suave"
            >
              <input
                type="checkbox"
                name="complementarios"
                value={estudio}
                defaultChecked={marcados.has(estudio)}
                className="size-4 shrink-0 accent-[var(--acento)]"
              />
              {estudio}
            </label>
          ))}
        </div>
      </Panel>

      <Acciones volverA={volverA} textoEnviar={textoEnviar} />
    </form>
  );
}
