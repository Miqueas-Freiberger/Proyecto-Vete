import * as React from "react";
import { CaretUpDown } from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/utils";
import { controlBase } from "./input";

/**
 * Select nativo, no uno de Radix, a proposito: en el telefono abre la rueda
 * del sistema, que es la que la veterinaria ya sabe usar, y el formulario
 * entero se queda sin JavaScript de cliente.
 */
function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        data-slot="select"
        className={cn(
          controlBase,
          "h-10 cursor-pointer appearance-none py-0 pr-9 pl-3 text-sm",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <CaretUpDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}

export { Select };
