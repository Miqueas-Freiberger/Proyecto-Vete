import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Estado por tinte: cada familia trae su tinte, su hairline y su color de
 * texto, todos medidos para AA sobre la superficie de tarjeta.
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[12px] font-medium whitespace-nowrap [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        neutral: "border-border bg-muted text-muted-foreground",
        primary: "border-primary-border bg-primary-soft text-primary-strong dark:text-primary",
        destructive: "border-destructive-border bg-destructive-soft text-destructive-text",
        warning: "border-warning-border bg-warning-soft text-warning-text",
        info: "border-info-border bg-info-soft text-info-text",
        outline: "border-border-strong bg-transparent text-foreground",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
