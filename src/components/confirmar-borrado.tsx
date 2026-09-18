"use client";

import { useState, useTransition } from "react";
import { Trash, Warning } from "@phosphor-icons/react";
import { toast } from "sonner";

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
  onHecho,
}: {
  accion: () => Promise<void>;
  titulo: string;
  detalle: string;
  confirmar: string;
  etiqueta?: string;
  soloIcono?: boolean;
  /** Lo usa la galería dentro del modal, que tiene que recargarse sola. */
  onHecho?: () => void;
}) {
  const [abierto, setAbierto] = useState(false);
  const [pendiente, iniciar] = useTransition();

  // Se invoca en una transición en vez de por action de formulario, para poder
  // hacer algo después. Las acciones que redirigen desmontan esto antes de
  // llegar a la línea siguiente, y está bien.
  //
  // El try no es decorativo: sin él, un borrado que falla se relanza durante el
  // render y se lleva puesta la pantalla entera en vez de avisar.
  function ejecutar() {
    iniciar(async () => {
      try {
        await accion();
        setAbierto(false);
        onHecho?.();
      } catch {
        setAbierto(false);
        toast.error("No se pudo borrar. Probá de nuevo.");
      }
    });
  }

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
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={pendiente}
            onClick={() => setAbierto(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            loading={pendiente}
            onClick={ejecutar}
            className="w-full sm:w-auto"
          >
            {confirmar}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
