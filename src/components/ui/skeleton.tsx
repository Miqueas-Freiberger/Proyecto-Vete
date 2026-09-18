import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Reflejo en movimiento en vez de un latido plano: un esqueleto que pulsa se
 * confunde con contenido deshabilitado, uno que barre se lee como "cargando".
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn("relative overflow-hidden rounded-sm bg-muted", className)}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-foreground/8 to-transparent" />
    </div>
  );
}

export { Skeleton };
