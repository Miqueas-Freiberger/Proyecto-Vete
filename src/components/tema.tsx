"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { Desktop, Moon, Sun } from "@phosphor-icons/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * El tema vive en una clase sobre <html> y lo escribe next-themes antes de
 * pintar, asi no hay un destello blanco al entrar de noche.
 */
export function ProveedorTema({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

const OPCIONES = [
  { valor: "light", etiqueta: "Claro", Icono: Sun },
  { valor: "dark", etiqueta: "Oscuro", Icono: Moon },
  { valor: "system", etiqueta: "El del sistema", Icono: Desktop },
] as const;

export function BotonTema() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Cambiar tema"
        className="flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        {/* Las dos conviven y se alternan por CSS: el tema real recien se
            conoce despues de hidratar, y cambiar el icono en JavaScript haria
            parpadear el boton en cada carga. */}
        <Sun className="size-[17px] dark:hidden" aria-hidden />
        <Moon className="hidden size-[17px] dark:block" aria-hidden />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {OPCIONES.map(({ valor, etiqueta, Icono }) => (
          <DropdownMenuItem
            key={valor}
            onSelect={() => setTheme(valor)}
            className={theme === valor ? "text-foreground" : undefined}
          >
            <Icono aria-hidden />
            {etiqueta}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
