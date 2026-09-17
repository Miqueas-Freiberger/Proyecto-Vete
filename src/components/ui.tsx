import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";

/**
 * Piezas base de interfaz.
 *
 * Todas respetan la misma regla de radios: superficies 14px, controles 10px,
 * píldoras completas. Ningún componente inventa la suya.
 */

export function cn(...clases: Array<string | false | null | undefined>): string {
  return clases.filter(Boolean).join(" ");
}

// ---------------------------------------------------------------------------
// Botones
// ---------------------------------------------------------------------------

type Tono = "primario" | "secundario" | "fantasma" | "peligro";
type Medida = "sm" | "md";

const TONOS: Record<Tono, string> = {
  primario:
    "bg-acento text-sobre-acento hover:bg-acento-fuerte border border-transparent",
  secundario:
    "bg-superficie text-tinta border border-borde-fuerte hover:bg-superficie-alta",
  fantasma:
    "bg-transparent text-tinta-media border border-transparent hover:bg-superficie-alta hover:text-tinta",
  peligro:
    "bg-transparent text-alerta border border-alerta-borde hover:bg-alerta-suave",
};

const MEDIDAS: Record<Medida, string> = {
  sm: "h-9 px-3 text-[13px] gap-1.5",
  md: "h-11 px-4 text-sm gap-2",
};

const BASE_BOTON =
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-control)] " +
  "font-medium transition-[background-color,border-color,color,transform] duration-150 " +
  "active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-50";

export function Boton({
  tono = "secundario",
  medida = "md",
  className,
  ...props
}: ComponentPropsWithoutRef<"button"> & { tono?: Tono; medida?: Medida }) {
  return (
    <button
      className={cn(BASE_BOTON, TONOS[tono], MEDIDAS[medida], className)}
      {...props}
    />
  );
}

export function BotonEnlace({
  tono = "secundario",
  medida = "md",
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Link> & { tono?: Tono; medida?: Medida }) {
  return (
    <Link
      className={cn(BASE_BOTON, TONOS[tono], MEDIDAS[medida], className)}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Superficies
// ---------------------------------------------------------------------------

export function Panel({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"section">) {
  return (
    <section
      className={cn(
        "rounded-[var(--radius-superficie)] border border-borde bg-superficie",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function TituloSeccion({
  children,
  accion,
}: {
  children: ReactNode;
  accion?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-[15px] font-semibold tracking-tight text-tinta">{children}</h2>
      {accion}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Píldoras
// ---------------------------------------------------------------------------

type TonoPastilla = "neutro" | "acento" | "alerta" | "aviso";

const PASTILLAS: Record<TonoPastilla, string> = {
  neutro: "bg-superficie-alta text-tinta-media border-borde",
  acento: "bg-acento-suave text-acento-fuerte border-acento-borde",
  alerta: "bg-alerta-suave text-alerta border-alerta-borde",
  aviso: "bg-aviso-suave text-aviso border-transparent",
};

export function Pastilla({
  tono = "neutro",
  children,
  className,
}: {
  tono?: TonoPastilla;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[12px] font-medium",
        PASTILLAS[tono],
        className,
      )}
    >
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Formularios
// ---------------------------------------------------------------------------

const BASE_CONTROL =
  "w-full rounded-[var(--radius-control)] border border-borde-fuerte bg-superficie " +
  "px-3 py-2.5 text-sm text-tinta placeholder:text-tinta-suave " +
  "transition-colors duration-150 hover:border-acento-borde " +
  "disabled:opacity-60 disabled:hover:border-borde-fuerte";

export function Campo({
  etiqueta,
  ayuda,
  error,
  obligatorio,
  children,
  htmlFor,
}: {
  etiqueta: string;
  ayuda?: string;
  error?: string;
  obligatorio?: boolean;
  children: ReactNode;
  htmlFor: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* El asterisco queda fuera de la etiqueta a propósito: si va adentro,
          pasa a formar parte del nombre accesible del campo y los lectores de
          pantalla anuncian "Nombre asterisco". La obligatoriedad ya la
          transmite el atributo required del control. */}
      <div className="flex items-center gap-1">
        <label
          htmlFor={htmlFor}
          className="text-[13px] font-medium text-tinta-media"
        >
          {etiqueta}
        </label>
        {obligatorio && (
          <span className="text-alerta" aria-hidden>
            *
          </span>
        )}
      </div>
      {children}
      {ayuda && !error && (
        <p className="text-[12px] text-tinta-suave">{ayuda}</p>
      )}
      {error && (
        <p className="text-[12px] font-medium text-alerta" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Entrada({
  className,
  ...props
}: ComponentPropsWithoutRef<"input">) {
  return <input className={cn(BASE_CONTROL, className)} {...props} />;
}

export function AreaTexto({
  className,
  ...props
}: ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      className={cn(BASE_CONTROL, "min-h-28 resize-y leading-relaxed", className)}
      {...props}
    />
  );
}

export function Selector({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"select">) {
  return (
    <select className={cn(BASE_CONTROL, "cursor-pointer", className)} {...props}>
      {children}
    </select>
  );
}

// ---------------------------------------------------------------------------
// Estados
// ---------------------------------------------------------------------------

export function Vacio({
  titulo,
  detalle,
  accion,
  icono,
}: {
  titulo: string;
  detalle: string;
  accion?: ReactNode;
  icono?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      {icono && (
        <div className="flex size-12 items-center justify-center rounded-full bg-superficie-alta text-tinta-suave">
          {icono}
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <p className="text-[15px] font-semibold text-tinta">{titulo}</p>
        <p className="mx-auto max-w-[42ch] text-sm leading-relaxed text-tinta-media">
          {detalle}
        </p>
      </div>
      {accion}
    </div>
  );
}

export function Esqueleto({ className }: { className?: string }) {
  return (
    <div
      className={cn("pulso-carga rounded-[var(--radius-control)] bg-superficie-alta", className)}
      aria-hidden
    />
  );
}

export function AvisoError({ children }: { children: ReactNode }) {
  return (
    <p
      role="alert"
      className="rounded-[var(--radius-control)] border border-alerta-borde bg-alerta-suave px-3 py-2.5 text-[13px] font-medium text-alerta"
    >
      {children}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Datos
// ---------------------------------------------------------------------------

export function Dato({
  etiqueta,
  children,
}: {
  etiqueta: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-[12px] font-medium text-tinta-suave">{etiqueta}</dt>
      <dd className="text-sm text-tinta">{children}</dd>
    </div>
  );
}

export function SinDato() {
  return <span className="text-tinta-suave">Sin datos</span>;
}
