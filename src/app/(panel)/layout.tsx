import { redirect } from "next/navigation";
import Link from "next/link";
import { sesionActiva } from "@/lib/auth";
import { cerrarSesionAccion } from "@/app/acciones/sesion";
import { BusquedaGlobal } from "@/components/busqueda-global";
import { PawPrint, Plus, SignOut } from "@phosphor-icons/react/dist/ssr";
import { BotonEnlace } from "@/components/ui";

export default async function PanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Puerta única de todo el panel. Cada acción del servidor vuelve a verificar
  // por su cuenta, porque una acción se puede invocar sin pasar por esta ruta.
  const usuario = await sesionActiva();
  if (!usuario) redirect("/ingresar");

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="sticky top-0 z-30 border-b border-borde bg-lienzo/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center gap-3 px-4 sm:px-6">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 rounded-[var(--radius-control)] py-1 pr-2 text-tinta transition-opacity hover:opacity-70"
          >
            <span className="flex size-8 items-center justify-center rounded-[10px] bg-acento text-sobre-acento">
              <PawPrint size={18} weight="fill" />
            </span>
            <span className="hidden text-[15px] font-semibold tracking-tight sm:block">
              Veterinaria Catriel
            </span>
          </Link>

          <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-2">
            <BusquedaGlobal />

            {/* En pantallas chicas queda solo el icono, así que el nombre
                accesible tiene que venir del aria-label. */}
            <BotonEnlace
              href="/clientes/nuevo"
              tono="primario"
              medida="sm"
              aria-label="Nuevo cliente"
              className="shrink-0"
            >
              <Plus size={15} weight="bold" />
              <span className="hidden sm:inline">Nuevo cliente</span>
            </BotonEnlace>

            <form action={cerrarSesionAccion} className="shrink-0">
              <button
                type="submit"
                title="Cerrar sesión"
                aria-label="Cerrar sesión"
                className="flex size-9 items-center justify-center rounded-[var(--radius-control)] text-tinta-suave transition-colors hover:bg-superficie-alta hover:text-tinta active:translate-y-[1px]"
              >
                <SignOut size={17} />
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1180px] flex-1 px-4 pb-20 pt-6 sm:px-6 sm:pt-8">
        {children}
      </main>
    </div>
  );
}
