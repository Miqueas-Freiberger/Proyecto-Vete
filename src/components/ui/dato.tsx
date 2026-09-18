import * as React from "react";

import { cn } from "@/lib/utils";

/** Par etiqueta/valor de las fichas. Siempre dentro de un <dl>. */
function Dato({
  etiqueta,
  children,
  className,
}: {
  etiqueta: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1", className)}>
      <dt className="text-[12px] font-medium text-muted-foreground">{etiqueta}</dt>
      <dd className="text-sm text-foreground">{children}</dd>
    </div>
  );
}

/** Un dato ausente se dice, no se deja en blanco: en blanco parece un error. */
function SinDato() {
  return <span className="text-muted-foreground">Sin datos</span>;
}

/** Cabecera de sección con su acción al costado. */
function TituloSeccion({
  children,
  accion,
  className,
}: {
  children: React.ReactNode;
  accion?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-3", className)}>
      <h2 className="text-[15px] font-semibold tracking-tight text-foreground">{children}</h2>
      {accion}
    </div>
  );
}

export { Dato, SinDato, TituloSeccion };
