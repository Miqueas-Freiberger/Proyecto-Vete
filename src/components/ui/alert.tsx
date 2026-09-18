import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Info, WarningCircle, Warning } from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "flex items-start gap-2.5 rounded-md border px-3.5 py-3 text-[13px] leading-relaxed [&_svg]:mt-px [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        destructive: "border-destructive-border bg-destructive-soft text-destructive-text",
        warning: "border-warning-border bg-warning-soft text-warning-text",
        info: "border-info-border bg-info-soft text-info-text",
      },
    },
    defaultVariants: { variant: "destructive" },
  },
);

const ICONOS = {
  destructive: WarningCircle,
  warning: Warning,
  info: Info,
} as const;

function Alert({
  className,
  variant = "destructive",
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  const Icono = ICONOS[variant ?? "destructive"];

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icono aria-hidden />
      <div className="font-medium">{children}</div>
    </div>
  );
}

export { Alert };
