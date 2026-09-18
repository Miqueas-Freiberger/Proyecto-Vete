"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Trash, Warning } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * Borrado con confirmación.
 *
 * El diálogo es el mismo que usa el resto del producto, así que el foco
 * atrapado, el cierre con Escape y la capa de fondo se resuelven una sola vez.
 */
export function ConfirmarBorrado({
  accion,
  titulo,
  detalle,
  confirmar,
  etiqueta = "Borrar",
  soloIcono = false,
}: {
  accion: () => Promise<void>;
  titulo: string;
  detalle: string;
  confirmar: string;
  etiqueta?: string;
  soloIcono?: boolean;
}) {
  const [abierto, setAbierto] = useState(false);

  return (
    <Dialog open={abierto} onOpenChange={setAbierto}>
      <DialogTrigger asChild>
        {soloIcono ? (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={etiqueta}
            title={etiqueta}
            className="hover:bg-destructive-soft hover:text-destructive-text"
          >
            <Trash size={15} />
          </Button>
        ) : (
          <Button variant="danger" size="sm">
            <Trash size={15} />
            {etiqueta}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent showClose={false} className="max-w-sm">
        <div className="flex gap-3.5 px-5 pt-5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-destructive-soft text-destructive-text">
            <Warning size={20} weight="fill" aria-hidden />
          </span>
          <div className="flex flex-col gap-1.5">
            <DialogTitle className="pr-0">{titulo}</DialogTitle>
            <DialogDescription>{detalle}</DialogDescription>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" size="sm" onClick={() => setAbierto(false)}>
            Cancelar
          </Button>
          <form action={accion}>
            <BotonConfirmar texto={confirmar} />
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function BotonConfirmar({ texto }: { texto: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="destructive" size="sm" loading={pending} className="w-full sm:w-auto">
      {texto}
    </Button>
  );
}
