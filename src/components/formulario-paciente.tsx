"use client";

import { useActionState, useEffect } from "react";

import type { EstadoFormulario } from "@/app/acciones/clientes";
import { Alert } from "@/components/ui/alert";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Acciones, Envoltura } from "./formulario-cliente";

export type ValoresPaciente = {
  nombre: string;
  especie: string;
  nacimiento: string;
  sexo: string;
  raza: string;
  color: string;
  tamano: string;
  esterilizado: string;
  ingreso: string;
};

const INICIAL: EstadoFormulario = {};

/**
 * Las opciones fijas son las que ya usaba la aplicación anterior, para que los
 * registros nuevos sean consistentes con los cuatro años de datos cargados.
 */
const SEXOS = ["Hembra", "Macho"];
const TAMANOS = ["Chico", "Mediano", "Grande"];

export function FormularioPaciente({
  accion,
  valores,
  volverA,
  textoEnviar,
  enModal = false,
  onExito,
}: {
  accion: (estado: EstadoFormulario, datos: FormData) => Promise<EstadoFormulario>;
  valores: ValoresPaciente;
  volverA: string;
  textoEnviar: string;
  enModal?: boolean;
  onExito?: () => void;
}) {
  const [estado, enviar] = useActionState(accion, INICIAL);

  useEffect(() => {
    if (estado.ok) onExito?.();
  }, [estado.ok, onExito]);

  return (
    <form action={enviar} className="flex flex-col gap-5">
      {estado.error && <Alert>{estado.error}</Alert>}

      <Envoltura enModal={enModal}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nombre" htmlFor="nombre" required error={estado.errores?.nombre}>
              <Input
                id="nombre"
                name="nombre"
                defaultValue={valores.nombre}
                maxLength={30}
                aria-invalid={Boolean(estado.errores?.nombre)}
                required
                autoFocus
              />
            </Field>

            <Field label="Especie" htmlFor="especie" error={estado.errores?.especie}>
              <Input
                id="especie"
                name="especie"
                defaultValue={valores.especie}
                maxLength={30}
                list="especies-sugeridas"
                placeholder="Canino, felino..."
                aria-invalid={Boolean(estado.errores?.especie)}
              />
              <datalist id="especies-sugeridas">
                <option value="Canino" />
                <option value="Felino" />
              </datalist>
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Raza" htmlFor="raza" error={estado.errores?.raza}>
              <Input
                id="raza"
                name="raza"
                defaultValue={valores.raza}
                maxLength={50}
                aria-invalid={Boolean(estado.errores?.raza)}
              />
            </Field>

            <Field label="Color" htmlFor="color" error={estado.errores?.color}>
              <Input
                id="color"
                name="color"
                defaultValue={valores.color}
                maxLength={50}
                aria-invalid={Boolean(estado.errores?.color)}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Sexo" htmlFor="sexo">
              <Select id="sexo" name="sexo" defaultValue={valores.sexo}>
                <option value="">Sin especificar</option>
                {SEXOS.map((sexo) => (
                  <option key={sexo} value={sexo}>
                    {sexo}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Tamaño" htmlFor="tamano">
              <Select id="tamano" name="tamano" defaultValue={valores.tamano}>
                <option value="">Sin especificar</option>
                {TAMANOS.map((tamano) => (
                  <option key={tamano} value={tamano}>
                    {tamano}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Esterilizado" htmlFor="esterilizado">
              <Select id="esterilizado" name="esterilizado" defaultValue={valores.esterilizado}>
                <option value="">Sin especificar</option>
                <option value="Si">Sí</option>
                <option value="No">No</option>
              </Select>
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Nacimiento"
              htmlFor="nacimiento"
              hint="Texto libre: sirve un año suelto o una fecha."
              error={estado.errores?.nacimiento}
            >
              <Input
                id="nacimiento"
                name="nacimiento"
                defaultValue={valores.nacimiento}
                maxLength={50}
                placeholder="2020"
                aria-invalid={Boolean(estado.errores?.nacimiento)}
              />
            </Field>

            <Field
              label="Fecha de ingreso"
              htmlFor="ingreso"
              required
              error={estado.errores?.ingreso}
            >
              <Input
                id="ingreso"
                name="ingreso"
                type="date"
                defaultValue={valores.ingreso}
                aria-invalid={Boolean(estado.errores?.ingreso)}
                required
              />
            </Field>
          </div>
      </Envoltura>

      <Acciones volverA={volverA} textoEnviar={textoEnviar} enModal={enModal} />
    </form>
  );
}
