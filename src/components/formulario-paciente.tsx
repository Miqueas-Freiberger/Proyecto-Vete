"use client";

import { useActionState } from "react";
import type { EstadoFormulario } from "@/app/acciones/clientes";
import {
  AvisoError,
  Campo,
  Entrada,
  Panel,
  Selector,
} from "@/components/ui";
import { Acciones } from "./formulario-cliente";

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
}: {
  accion: (estado: EstadoFormulario, datos: FormData) => Promise<EstadoFormulario>;
  valores: ValoresPaciente;
  volverA: string;
  textoEnviar: string;
}) {
  const [estado, enviar] = useActionState(accion, INICIAL);

  return (
    <form action={enviar} className="flex flex-col gap-5">
      {estado.error && <AvisoError>{estado.error}</AvisoError>}

      <Panel className="flex flex-col gap-5 p-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Campo
            etiqueta="Nombre"
            htmlFor="nombre"
            obligatorio
            error={estado.errores?.nombre}
          >
            <Entrada
              id="nombre"
              name="nombre"
              defaultValue={valores.nombre}
              maxLength={30}
              required
              autoFocus
            />
          </Campo>

          <Campo etiqueta="Especie" htmlFor="especie" error={estado.errores?.especie}>
            <Entrada
              id="especie"
              name="especie"
              defaultValue={valores.especie}
              maxLength={30}
              list="especies-sugeridas"
              placeholder="Canino, felino..."
            />
            <datalist id="especies-sugeridas">
              <option value="Canino" />
              <option value="Felino" />
            </datalist>
          </Campo>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Campo etiqueta="Raza" htmlFor="raza" error={estado.errores?.raza}>
            <Entrada
              id="raza"
              name="raza"
              defaultValue={valores.raza}
              maxLength={50}
            />
          </Campo>

          <Campo etiqueta="Color" htmlFor="color" error={estado.errores?.color}>
            <Entrada
              id="color"
              name="color"
              defaultValue={valores.color}
              maxLength={50}
            />
          </Campo>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <Campo etiqueta="Sexo" htmlFor="sexo">
            <Selector id="sexo" name="sexo" defaultValue={valores.sexo}>
              <option value="">Sin especificar</option>
              {SEXOS.map((sexo) => (
                <option key={sexo} value={sexo}>
                  {sexo}
                </option>
              ))}
            </Selector>
          </Campo>

          <Campo etiqueta="Tamaño" htmlFor="tamano">
            <Selector id="tamano" name="tamano" defaultValue={valores.tamano}>
              <option value="">Sin especificar</option>
              {TAMANOS.map((tamano) => (
                <option key={tamano} value={tamano}>
                  {tamano}
                </option>
              ))}
            </Selector>
          </Campo>

          <Campo etiqueta="Esterilizado" htmlFor="esterilizado">
            <Selector
              id="esterilizado"
              name="esterilizado"
              defaultValue={valores.esterilizado}
            >
              <option value="">Sin especificar</option>
              <option value="Si">Sí</option>
              <option value="No">No</option>
            </Selector>
          </Campo>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Campo
            etiqueta="Nacimiento"
            htmlFor="nacimiento"
            ayuda="Texto libre: sirve un año suelto o una fecha."
            error={estado.errores?.nacimiento}
          >
            <Entrada
              id="nacimiento"
              name="nacimiento"
              defaultValue={valores.nacimiento}
              maxLength={50}
              placeholder="2020"
            />
          </Campo>

          <Campo
            etiqueta="Fecha de ingreso"
            htmlFor="ingreso"
            obligatorio
            error={estado.errores?.ingreso}
          >
            <Entrada
              id="ingreso"
              name="ingreso"
              type="date"
              defaultValue={valores.ingreso}
              required
            />
          </Campo>
        </div>
      </Panel>

      <Acciones volverA={volverA} textoEnviar={textoEnviar} />
    </form>
  );
}
