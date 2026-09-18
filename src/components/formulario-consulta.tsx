"use client";

import { useActionState, useEffect } from "react";

import type { EstadoFormulario } from "@/app/acciones/clientes";
import { ESTUDIOS } from "@/lib/estudios";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Acciones, Envoltura } from "./formulario-cliente";

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
  enModal = false,
  onExito,
}: {
  accion: (estado: EstadoFormulario, datos: FormData) => Promise<EstadoFormulario>;
  valores: ValoresConsulta;
  volverA: string;
  textoEnviar: string;
  enModal?: boolean;
  onExito?: () => void;
}) {
  const [estado, enviar] = useActionState(accion, INICIAL);
  const marcados = new Set(valores.complementarios);

  useEffect(() => {
    if (estado.ok) onExito?.();
  }, [estado.ok, onExito]);

  return (
    <form action={enviar} className="flex flex-col gap-5">
      {estado.error && <Alert>{estado.error}</Alert>}

      <Envoltura enModal={enModal}>
        <div className="grid gap-5 sm:grid-cols-[minmax(0,12rem)_1fr]">
          <Field label="Fecha" htmlFor="fecha" required error={estado.errores?.fecha}>
            <Input
              id="fecha"
              name="fecha"
              type="date"
              defaultValue={valores.fecha}
              aria-invalid={Boolean(estado.errores?.fecha)}
              required
            />
          </Field>

          <Field label="Motivo" htmlFor="motivo" error={estado.errores?.motivo}>
            <Input
              id="motivo"
              name="motivo"
              defaultValue={valores.motivo}
              maxLength={255}
              placeholder="Control, vacunación, herida..."
              aria-invalid={Boolean(estado.errores?.motivo)}
              autoFocus
            />
          </Field>
        </div>

        <Field label="Observaciones" htmlFor="observacion">
          <Textarea
            id="observacion"
            name="observacion"
            defaultValue={valores.observacion}
            rows={5}
          />
        </Field>

        <Field label="Tratamiento" htmlFor="tratamiento">
          <Textarea
            id="tratamiento"
            name="tratamiento"
            defaultValue={valores.tratamiento}
            rows={4}
          />
        </Field>
      </Envoltura>

      {enModal ? (
        <div className="flex flex-col gap-3 border-t border-border pt-5">
          <div className="flex flex-col gap-0.5">
            <p className="text-[13px] font-medium text-foreground">
              Estudios complementarios
            </p>
            <p className="text-[12px] text-muted-foreground">
              Marcá los que se pidieron en esta consulta.
            </p>
          </div>
          <Complementarios marcados={marcados} />
        </div>
      ) : (
        <Card>
          <CardHeader className="border-b border-border">
            <div className="flex flex-col gap-0.5">
              <CardTitle>Estudios complementarios</CardTitle>
              <CardDescription>Marcá los que se pidieron en esta consulta.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Complementarios marcados={marcados} />
          </CardContent>
        </Card>
      )}

      <Acciones volverA={volverA} textoEnviar={textoEnviar} enModal={enModal} />
    </form>
  );
}

function Complementarios({ marcados }: { marcados: Set<string> }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {ESTUDIOS.map((estudio) => (
        <label
          key={estudio}
          className="flex cursor-pointer items-center gap-2.5 rounded-md border border-border px-3 py-2.5 text-sm text-foreground transition-colors hover:border-border-strong hover:bg-accent has-[:checked]:border-primary-border has-[:checked]:bg-primary-soft has-[:checked]:text-primary-strong dark:has-[:checked]:text-primary"
        >
          <input
            type="checkbox"
            name="complementarios"
            value={estudio}
            defaultChecked={marcados.has(estudio)}
            className="size-4 shrink-0 accent-primary"
          />
          {estudio}
        </label>
      ))}
    </div>
  );
}
