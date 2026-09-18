import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";

/**
 * Rastro de navegación. En pantallas chicas se muestra solo el salto anterior,
 * que es el único que se usa en la práctica.
 */
export function Migas({
  rutas,
  actual,
}: {
  rutas: Array<{ texto: string; href: string }>;
  actual: string;
}) {
  const anterior = rutas[rutas.length - 1];

  return (
    <nav aria-label="Ubicación" className="min-w-0">
      <ol className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
        {rutas.map((ruta, indice) => (
          <li
            key={ruta.href}
            className={
              indice < rutas.length - 1
                ? "hidden items-center gap-1.5 sm:flex"
                : "flex items-center gap-1.5"
            }
          >
            <Link
              href={ruta.href}
              className="shrink-0 transition-colors hover:text-foreground"
            >
              {ruta.texto}
            </Link>
            <CaretRight size={12} className="shrink-0" aria-hidden />
          </li>
        ))}
        <li className="min-w-0">
          <span className="block truncate font-medium text-foreground" aria-current="page">
            {actual}
          </span>
        </li>
      </ol>
      {/* Lectores de pantalla ya tienen la lista completa; esto es solo para
          que el salto atrás quede accesible con teclado en teléfono. */}
      <span className="sr-only">Volver a {anterior?.texto}</span>
    </nav>
  );
}
