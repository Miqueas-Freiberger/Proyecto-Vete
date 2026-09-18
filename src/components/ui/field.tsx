import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Etiqueta arriba, control, ayuda o error debajo. Nunca placeholder como
 * etiqueta: en cuanto la veterinaria empieza a escribir, pierde el nombre del
 * campo y no hay forma de recuperarlo.
 */
function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* El asterisco va fuera del label a proposito: adentro pasa a formar
          parte del nombre accesible y los lectores anuncian "Nombre asterisco".
          La obligatoriedad ya la transmite el required del control. */}
      <div className="flex items-center gap-1">
        <label htmlFor={htmlFor} className="text-[13px] font-medium text-foreground">
          {label}
        </label>
        {required && (
          <span className="text-destructive-text" aria-hidden>
            *
          </span>
        )}
      </div>

      {children}

      {hint && !error && <p className="text-[12px] text-muted-foreground">{hint}</p>}
      {error && (
        <p className="text-[12px] font-medium text-destructive-text" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export { Field };
