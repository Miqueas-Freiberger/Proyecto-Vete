"use client";

import { useEffect } from "react";
import { ArrowClockwise, WarningCircle } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

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
      <span className="flex size-12 items-center justify-center rounded-full bg-destructive-soft text-destructive-text">
        <WarningCircle size={22} weight="fill" aria-hidden />
      </span>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Algo salió mal
        </h1>
        <p className="max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
          No pudimos cargar esta pantalla. Si vuelve a pasar, revisá que la base de
          datos esté disponible.
        </p>
      </div>
      <Button type="button" onClick={reset} size="lg">
        <ArrowClockwise size={16} weight="bold" />
        Reintentar
      </Button>
    </div>
  );
}
