import { redirect } from "next/navigation";
import Link from "next/link";
import { PawPrint, Plus, SignOut } from "@phosphor-icons/react/dist/ssr";

import { sesionActiva } from "@/lib/auth";
import { cerrarSesionAccion } from "@/app/acciones/sesion";
import { BusquedaGlobal } from "@/components/busqueda-global";
import { DialogoNuevoCliente } from "@/components/dialogos";
import { BotonTema } from "@/components/tema";
import { Button } from "@/components/ui/button";

export default async function PanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Puerta única de todo el panel. Cada acción del servidor vuelve a verificar
  // por su cuenta, porque una acción se puede invocar sin pasar por esta ruta.
  const usuario = await sesionActiva();
  if (!usuario) redirect("/ingresar");

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="barra-vidrio sticky top-0 z-30 border-b border-border">
        <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center gap-2 px-4 sm:gap-3 sm:px-6">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 rounded-md py-1 pr-1 text-foreground transition-opacity hover:opacity-70"
          >
            <span className="flex size-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <PawPrint size={18} weight="fill" />
            </span>
            <span className="hidden text-[15px] font-semibold tracking-tight sm:block">
              Veterinaria Catriel
            </span>
          </Link>

          <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-1.5 sm:gap-2">
            <BusquedaGlobal />

            {/* En pantallas chicas queda solo el ícono, así que el nombre
                accesible tiene que venir del aria-label. */}
            <DialogoNuevoCliente>
              <Button size="sm" className="shrink-0" aria-label="Nuevo cliente">
                <Plus size={15} weight="bold" />
                <span className="hidden sm:inline">Nuevo cliente</span>
              </Button>
            </DialogoNuevoCliente>

            <div className="mx-0.5 hidden h-5 w-px bg-border sm:block" />

            <BotonTema />

            <form action={cerrarSesionAccion} className="shrink-0">
              <Button
                type="submit"
                variant="ghost"
                size="icon-sm"
                title="Cerrar sesión"
                aria-label="Cerrar sesión"
              >
                <SignOut size={17} />
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1180px] flex-1 px-4 pt-6 pb-20 sm:px-6 sm:pt-8">
        {children}
      </main>
    </div>
  );
}
