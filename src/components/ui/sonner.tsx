"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

/**
 * Confirmacion de lo que acaba de pasar. Antes, guardar un cliente redirigia
 * sin decir nada y quedaba la duda de si se habia guardado.
 */
function Toaster(props: ToasterProps) {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={(resolvedTheme as ToasterProps["theme"]) ?? "system"}
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "!rounded-md !border !border-border !bg-popover !text-popover-foreground !shadow-e2 !font-sans",
          description: "!text-muted-foreground",
          actionButton: "!bg-primary !text-primary-foreground",
          cancelButton: "!bg-muted !text-muted-foreground",
          error: "!border-destructive-border !bg-destructive-soft !text-destructive-text",
          success: "!border-primary-border !bg-primary-soft !text-primary-strong",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
