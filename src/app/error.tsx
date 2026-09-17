"use client";

import { useEffect } from "react";
import { WarningCircle } from "@phosphor-icons/react";

export default function ErrorGlobal({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // El detalle queda en el servidor; al usuario no le sirve el stack.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-5 px-6 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-alerta-suave text-alerta">
        <WarningCircle size={22} weight="fill" />
      </span>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-xl font-semibold tracking-tight text-tinta">
          Algo salió mal
        </h1>
        <p className="max-w-[46ch] text-sm leading-relaxed text-tinta-media">
          No pudimos cargar esta pantalla. Si vuelve a pasar, revisá que la base de
          datos esté disponible.
        </p>
      </div>
      <button
        type="button"
        onClick={reset}
        className="inline-flex h-11 items-center justify-center rounded-[var(--radius-control)] bg-acento px-4 text-sm font-medium text-sobre-acento transition-opacity hover:opacity-90 active:translate-y-[1px]"
      >
        Reintentar
      </button>
    </div>
  );
}
