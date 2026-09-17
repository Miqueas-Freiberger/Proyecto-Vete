"use client";

import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Trash, SpinnerGap, Warning } from "@phosphor-icons/react";
import { Boton } from "./ui";

/**
 * Borrado con confirmación.
 *
 * Usa el diálogo nativo, que ya trae foco atrapado, cierre con Escape y capa
 * de fondo sin que haya que sostener nada de eso a mano.
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
  const dialogo = useRef<HTMLDialogElement>(null);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    const elemento = dialogo.current;
    if (!elemento) return;
    if (abierto && !elemento.open) elemento.showModal();
    if (!abierto && elemento.open) elemento.close();
  }, [abierto]);

  return (
    <>
      {soloIcono ? (
        <button
          type="button"
          onClick={() => setAbierto(true)}
          aria-label={etiqueta}
          title={etiqueta}
          className="flex size-8 items-center justify-center rounded-[var(--radius-control)] text-tinta-suave transition-colors hover:bg-alerta-suave hover:text-alerta active:translate-y-[1px]"
        >
          <Trash size={15} />
        </button>
      ) : (
        <Boton tono="peligro" medida="sm" onClick={() => setAbierto(true)}>
          <Trash size={15} />
          {etiqueta}
        </Boton>
      )}

      <dialog
        ref={dialogo}
        onClose={() => setAbierto(false)}
        onClick={(evento) => {
          // Cerrar al tocar fuera del recuadro.
          if (evento.target === dialogo.current) setAbierto(false);
        }}
        className="m-auto w-[calc(100vw-2rem)] max-w-sm rounded-[var(--radius-superficie)] border border-borde bg-superficie p-0 text-tinta backdrop:bg-black/40 backdrop:backdrop-blur-[2px] open:aparece"
      >
        <div className="flex flex-col gap-4 p-5">
          <div className="flex gap-3.5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-alerta-suave text-alerta">
              <Warning size={20} weight="fill" />
            </span>
            <div className="flex flex-col gap-1.5">
              <h2 className="text-[15px] font-semibold text-tinta">{titulo}</h2>
              <p className="text-[13px] leading-relaxed text-tinta-media">{detalle}</p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Boton
              type="button"
              tono="secundario"
              medida="sm"
              onClick={() => setAbierto(false)}
            >
              Cancelar
            </Boton>
            <form action={accion}>
              <BotonConfirmar texto={confirmar} />
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

function BotonConfirmar({ texto }: { texto: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-[var(--radius-control)] border border-transparent bg-alerta px-3 text-[13px] font-medium text-white transition-colors duration-150 hover:opacity-90 active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-60"
    >
      {pending && <SpinnerGap size={14} className="animate-spin" />}
      {texto}
    </button>
  );
}
