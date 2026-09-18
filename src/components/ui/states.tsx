import * as React from "react";
import { WarningCircle } from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

/**
 * Los tres estados que toda lista, ficha y panel del producto usa, para que
 * una red lenta, un resultado vacio y una falla siempre se vean deliberados
 * en vez de dejar la pantalla en blanco.
 */

function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex animate-fade-in flex-col items-center justify-center gap-2 px-6 py-14 text-center",
        className,
      )}
    >
      {icon && (
        <span className="mb-1 flex size-11 items-center justify-center rounded-lg bg-muted text-muted-foreground [&_svg]:size-5">
          {icon}
        </span>
      )}
      <p className="text-sm font-semibold text-foreground">{title}</p>
      {description && (
        <p className="max-w-[46ch] text-[13px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

function ErrorState({
  title = "Algo salio mal",
  message,
  action,
  className,
}: {
  title?: string;
  message?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex animate-fade-in flex-col items-center justify-center gap-2 rounded-lg border border-destructive-border bg-destructive-soft px-6 py-12 text-center",
        className,
      )}
    >
      <WarningCircle className="size-6 text-destructive-text" aria-hidden />
      <p className="text-sm font-semibold text-destructive-text">{title}</p>
      {message && (
        <p className="max-w-[52ch] text-[13px] leading-relaxed text-destructive-text/85">
          {message}
        </p>
      )}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

/** Filas de la misma altura que las reales, asi nada salta al terminar de cargar. */
function ListSkeleton({
  rows = 8,
  className,
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <ul className={cn("divide-y divide-border", className)}>
      {Array.from({ length: rows }, (_, i) => (
        <li key={i} className="flex items-center gap-3.5 px-4 py-3 sm:gap-4 sm:px-5">
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-3.5 w-44 max-w-[60%]" />
            <Skeleton className="h-3 w-28 max-w-[40%]" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export { EmptyState, ErrorState, ListSkeleton };
