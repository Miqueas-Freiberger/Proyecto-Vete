"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";

import type { EstadoFormulario } from "@/app/acciones/clientes";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DialogClose } from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

/**
 * Los mismos campos sirven en una pantalla propia y dentro de un modal. En el
 * modal no va la tarjeta: el diálogo ya es la superficie, y anidar una dentro
 * de otra deja un recuadro adentro de otro recuadro.
 */
export function Envoltura({
  enModal,
  children,
}: {
  enModal: boolean;
  children: React.ReactNode;
}) {
  if (enModal) return <div className="flex flex-col gap-5">{children}</div>;
  return (
    <Card>
      <CardContent className="flex flex-col gap-5 py-5">{children}</CardContent>
    </Card>
  );
}

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
  enModal = false,
  onExito,
}: {
  accion: (estado: EstadoFormulario, datos: FormData) => Promise<EstadoFormulario>;
  valores?: ValoresCliente;
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
          <Field
            label="Nombre y apellido"
            htmlFor="nombre"
            required
            error={estado.errores?.nombre}
          >
            <Input
              id="nombre"
              name="nombre"
              defaultValue={valores.nombre}
              maxLength={50}
              autoComplete="name"
              aria-invalid={Boolean(estado.errores?.nombre)}
              required
              autoFocus
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Teléfono"
              htmlFor="telefono"
              hint="Si hay más de uno, separalos con una barra."
              error={estado.errores?.telefono}
            >
              <Input
                id="telefono"
                name="telefono"
                defaultValue={valores.telefono}
                maxLength={100}
                inputMode="tel"
                autoComplete="tel"
                aria-invalid={Boolean(estado.errores?.telefono)}
              />
            </Field>

            <Field
              label="Documento"
              htmlFor="dni"
              hint="Solo números, sin puntos."
              error={estado.errores?.dni}
            >
              <Input
                id="dni"
                name="dni"
                defaultValue={valores.dni}
                inputMode="numeric"
                maxLength={11}
                aria-invalid={Boolean(estado.errores?.dni)}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Dirección" htmlFor="direccion" error={estado.errores?.direccion}>
              <Input
                id="direccion"
                name="direccion"
                defaultValue={valores.direccion}
                maxLength={200}
                autoComplete="street-address"
                aria-invalid={Boolean(estado.errores?.direccion)}
              />
            </Field>

            <Field label="Localidad" htmlFor="localidad" error={estado.errores?.localidad}>
              <Input
                id="localidad"
                name="localidad"
                defaultValue={valores.localidad}
                maxLength={40}
                autoComplete="address-level2"
                aria-invalid={Boolean(estado.errores?.localidad)}
              />
            </Field>
          </div>

          <Field label="Correo" htmlFor="email" hint="Opcional." error={estado.errores?.email}>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={valores.email}
              maxLength={70}
              autoComplete="email"
              aria-invalid={Boolean(estado.errores?.email)}
            />
          </Field>
      </Envoltura>

      <Acciones volverA={volverA} textoEnviar={textoEnviar} enModal={enModal} />
    </form>
  );
}

/**
 * Barra de envío. En teléfono queda fija abajo: los formularios de paciente y
 * consulta son largos y, sin esto, hay que scrollear hasta el final para
 * guardar cada corrección.
 */
export function Acciones({
  volverA,
  textoEnviar,
  enModal = false,
}: {
  volverA: string;
  textoEnviar: string;
  enModal?: boolean;
}) {
  const { pending } = useFormStatus();

  // Dentro del modal, cancelar cierra el diálogo. Mandarlo a una dirección
  // seria lo contrario de lo que pidió: volveria a sacarlo de la pantalla.
  if (enModal) {
    return (
      <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
        <DialogClose asChild>
          <Button type="button" variant="ghost" size="lg">
            Cancelar
          </Button>
        </DialogClose>
        <Button type="submit" size="lg" loading={pending}>
          {pending ? "Guardando" : textoEnviar}
        </Button>
      </div>
    );
  }

  return (
    <div className="barra-vidrio pb-segura sticky bottom-0 z-20 -mx-4 flex items-center justify-end gap-2 border-t border-border px-4 py-3 sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
      <Button asChild variant="ghost" size="lg">
        <Link href={volverA}>Cancelar</Link>
      </Button>
      <Button type="submit" size="lg" loading={pending}>
        {pending ? "Guardando" : textoEnviar}
      </Button>
    </div>
  );
}
