"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlass, SpinnerGap, X } from "@phosphor-icons/react";

/**
 * Buscador de clientes.
 *
 * Escribe el término en la URL con un retardo corto, así el resultado se puede
 * compartir y el botón atrás funciona. El indicador de carga usa la transición
 * de React, no un estado propio, para no parpadear en cada tecla.
 */
export function BusquedaGlobal() {
  const router = useRouter();
  const pathname = usePathname();
  const parametros = useSearchParams();
  const [pendiente, iniciar] = useTransition();

  const termino = parametros.get("q") ?? "";
  const [valor, setValor] = useState(termino);
  const [terminoPrevio, setTerminoPrevio] = useState(termino);
  const campo = useRef<HTMLInputElement>(null);

  // Si la navegación cambia el término (el botón atrás, o un enlace), el campo
  // lo refleja. Se ajusta durante el render, que es lo que React recomienda
  // para estado derivado, en vez de encadenar un efecto.
  if (termino !== terminoPrevio) {
    setTerminoPrevio(termino);
    setValor(termino);
  }

  useEffect(() => {
    if (valor === termino) return;

    const id = setTimeout(() => {
      const siguientes = new URLSearchParams(parametros);
      if (valor.trim()) {
        siguientes.set("q", valor.trim());
      } else {
        siguientes.delete("q");
      }
      // Una búsqueda nueva siempre arranca en la primera página.
      siguientes.delete("pagina");

      const destino = pathname === "/" ? "/" : "/";
      iniciar(() => {
        router.replace(`${destino}?${siguientes.toString()}`, { scroll: false });
      });
    }, 260);

    return () => clearTimeout(id);
  }, [valor, termino, parametros, pathname, router]);

  // La barra se enfoca con la barra inclinada, como en las herramientas que ya
  // usa a diario quien atiende el mostrador.
  useEffect(() => {
    function alTeclear(evento: KeyboardEvent) {
      if (evento.key !== "/" || evento.metaKey || evento.ctrlKey) return;
      const activo = document.activeElement;
      const escribiendo =
        activo instanceof HTMLInputElement ||
        activo instanceof HTMLTextAreaElement ||
        activo instanceof HTMLSelectElement;
      if (escribiendo) return;
      evento.preventDefault();
      campo.current?.focus();
    }
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, []);

  return (
    <div className="relative min-w-0 flex-1 sm:max-w-xs">
      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
        {pendiente ? (
          <SpinnerGap size={16} className="animate-spin" />
        ) : (
          <MagnifyingGlass size={16} />
        )}
      </span>

      <input
        ref={campo}
        type="search"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="Buscar cliente"
        aria-label="Buscar cliente"
        title="Busca por nombre, teléfono, localidad o documento"
        className="h-9 w-full rounded-md border border-input bg-card pr-8 pl-9 text-sm text-foreground transition-[border-color,box-shadow] duration-150 outline-none placeholder:text-muted-foreground/70 hover:border-border-strong focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 [&::-webkit-search-cancel-button]:hidden"
      />

      {valor && (
        <button
          type="button"
          onClick={() => {
            setValor("");
            campo.current?.focus();
          }}
          aria-label="Limpiar búsqueda"
          className="absolute top-1/2 right-2 flex size-5 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <X size={12} weight="bold" />
        </button>
      )}
    </div>
  );
}
