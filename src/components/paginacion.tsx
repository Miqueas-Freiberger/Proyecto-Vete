import Link from "next/link";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

/**
 * Paginación por enlaces, para que funcione sin JavaScript y se pueda abrir
 * una página en una pestaña nueva.
 */
export function Paginacion({
  pagina,
  paginas,
  total,
  porPagina,
  busqueda,
}: {
  pagina: number;
  paginas: number;
  total: number;
  porPagina: number;
  busqueda?: string;
}) {
  if (paginas <= 1) {
    return (
      <p className="px-1 text-[13px] text-muted-foreground">
        <span className="cifra">{total}</span>{" "}
        {total === 1 ? "cliente" : "clientes"}
      </p>
    );
  }

  const desde = (pagina - 1) * porPagina + 1;
  const hasta = Math.min(pagina * porPagina, total);

  function enlace(destino: number): string {
    const parametros = new URLSearchParams();
    if (busqueda) parametros.set("q", busqueda);
    if (destino > 1) parametros.set("pagina", String(destino));
    const cadena = parametros.toString();
    return cadena ? `/?${cadena}` : "/";
  }

  return (
    <nav
      aria-label="Paginación de clientes"
      className="flex flex-wrap items-center justify-between gap-3 px-1"
    >
      <p className="text-[13px] text-muted-foreground">
        <span className="cifra">
          {desde}-{hasta}
        </span>{" "}
        de <span className="cifra">{total}</span>
      </p>

      <div className="flex items-center gap-1">
        <Salto
          href={enlace(pagina - 1)}
          deshabilitado={pagina <= 1}
          etiqueta="Página anterior"
        >
          <CaretLeft size={15} weight="bold" />
        </Salto>

        {numerosVisibles(pagina, paginas).map((numero, indice) =>
          numero === null ? (
            <span
              key={`salto-${indice}`}
              className="px-1 text-[13px] text-muted-foreground"
              aria-hidden
            >
              ...
            </span>
          ) : (
            <Link
              key={numero}
              href={enlace(numero)}
              aria-current={numero === pagina ? "page" : undefined}
              className={cn(
                "cifra presion flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-[13px] font-medium transition-colors",
                numero === pagina
                  ? "bg-primary text-primary-foreground shadow-e1"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              {numero}
            </Link>
          ),
        )}

        <Salto
          href={enlace(pagina + 1)}
          deshabilitado={pagina >= paginas}
          etiqueta="Página siguiente"
        >
          <CaretRight size={15} weight="bold" />
        </Salto>
      </div>
    </nav>
  );
}

function Salto({
  href,
  deshabilitado,
  etiqueta,
  children,
}: {
  href: string;
  deshabilitado: boolean;
  etiqueta: string;
  children: React.ReactNode;
}) {
  const clases =
    "flex size-9 items-center justify-center rounded-md transition-colors";

  if (deshabilitado) {
    return (
      <span
        aria-disabled
        className={cn(clases, "cursor-not-allowed text-muted-foreground opacity-40")}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={etiqueta}
      className={cn(clases, "presion text-muted-foreground hover:bg-accent hover:text-foreground")}
    >
      {children}
    </Link>
  );
}

/**
 * Primera, última, la actual y una vecina de cada lado. El resto se resume,
 * para que en teléfono la fila no se parta.
 */
function numerosVisibles(actual: number, total: number): Array<number | null> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const paginas = new Set<number>([1, total, actual]);
  if (actual - 1 > 1) paginas.add(actual - 1);
  if (actual + 1 < total) paginas.add(actual + 1);

  const ordenadas = [...paginas].sort((a, b) => a - b);
  const salida: Array<number | null> = [];

  ordenadas.forEach((numero, indice) => {
    if (indice > 0 && numero - ordenadas[indice - 1] > 1) salida.push(null);
    salida.push(numero);
  });

  return salida;
}
