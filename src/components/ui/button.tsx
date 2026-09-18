import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { SpinnerGap } from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/utils";

/**
 * Regla de forma del producto: superficies 14px (rounded-lg), controles 10px
 * (rounded-md), pastillas completas. Ningun componente inventa la suya.
 */
const buttonVariants = cva(
  [
    "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-e1 hover:bg-primary-strong",
        destructive:
          "bg-destructive text-destructive-foreground shadow-e1 hover:brightness-95",
        outline:
          "border border-input bg-card text-foreground hover:border-border-strong hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
        subtle: "bg-primary-soft text-primary-strong hover:brightness-95 dark:text-primary",
        ghost: "text-muted-foreground hover:bg-accent hover:text-foreground",
        danger:
          "border border-destructive-border bg-transparent text-destructive-text hover:bg-destructive-soft",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-8 px-2.5 text-xs [&_svg]:size-3.5",
        sm: "h-9 px-3 text-[13px] [&_svg]:size-4",
        default: "h-10 px-4 text-[13px] [&_svg]:size-4",
        lg: "h-11 px-5 text-sm [&_svg]:size-[18px]",
        /* Pantallas de mostrador: la accion principal es un blanco para el pulgar. */
        touch: "h-[52px] w-full px-5 text-[15px] [&_svg]:size-[18px]",
        icon: "size-10 [&_svg]:size-[18px]",
        "icon-sm": "size-9 [&_svg]:size-4",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  if (asChild) {
    return (
      <Slot className={cn(buttonVariants({ variant, size }), className)} {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <SpinnerGap className="animate-spin" aria-hidden />}
      {children}
    </button>
  );
}

export { Button, buttonVariants };
