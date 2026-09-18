import { Suspense } from "react";
import Link from "next/link";
import {
  CaretRight,
  MagnifyingGlass,
  PawPrint,
  Phone,
  Plus,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";

import { listarClientes, obtenerResumen } from "@/lib/queries";
import { iniciales, limpiar, telefonos, titulo } from "@/lib/format";
import { Paginacion } from "@/components/paginacion";
import { DialogoNuevoCliente } from "@/components/dialogos";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState, ListSkeleton } from "@/components/ui/states";

export default async function PaginaClientes({ searchParams }: PageProps<"/">) {
  const parametros = await searchParams;
  const busqueda = typeof parametros.q === "string" ? parametros.q : "";
  const pagina = Number(typeof parametros.pagina === "string" ? parametros.pagina : 1);

  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<ResumenCargando />}>
        <Resumen />
      </Suspense>

      <Suspense key={`${busqueda}-${pagina}`} fallback={<ListadoCargando />}>
        <Listado
          busqueda={busqueda}
          pagina={Number.isFinite(pagina) && pagina > 0 ? pagina : 1}
        />
      </Suspense>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Resumen
// ---------------------------------------------------------------------------

async function Resumen() {
  const datos = await obtenerResumen();

  const tiras = [
    { etiqueta: "Clientes", valor: datos.clientes },
    { etiqueta: "Pacientes", valor: datos.mascotas },
    { etiqueta: "Consultas", valor: datos.consultas },
    { etiqueta: "Últimos 30 días", valor: datos.consultasUltimoMes, destacado: true },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {tiras.map((tira) => (
        <Card key={tira.etiqueta} className="px-4 py-3.5">
          <p className="text-[12px] font-medium text-muted-foreground">{tira.etiqueta}</p>
          <p
            className={`cifra mt-1 text-2xl font-semibold tracking-tight ${
              tira.destacado ? "text-primary dark:text-primary-strong" : "text-foreground"
            }`}
          >
            {tira.valor}
          </p>
        </Card>
      ))}
    </section>
  );
}

function ResumenCargando() {
  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[0, 1, 2, 3].map((i) => (
        <Card key={i} className="px-4 py-3.5">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="mt-2.5 h-7 w-12" />
        </Card>
      ))}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Listado
// ---------------------------------------------------------------------------

async function Listado({ busqueda, pagina }: { busqueda: string; pagina: number }) {
  const resultado = await listarClientes({ busqueda, pagina });

  if (resultado.total === 0) {
    return (
      <Card>
        {busqueda ? (
          <EmptyState
            icon={<MagnifyingGlass />}
            title={`No hay resultados para "${busqueda}"`}
            description="Probá con el apellido, parte del teléfono, la localidad o el documento. La búsqueda mira los cuatro campos."
            action={
              <Button asChild variant="outline" size="sm">
                <Link href="/">Ver todos los clientes</Link>
              </Button>
            }
          />
        ) : (
          <EmptyState
            icon={<UsersThree />}
            title="Todavía no hay clientes"
            description="Cargá el primero para empezar a registrar pacientes y consultas."
            action={
              <DialogoNuevoCliente>
                <Button size="sm">
                  <Plus size={15} weight="bold" />
                  Nuevo cliente
                </Button>
              </DialogoNuevoCliente>
            }
          />
        )}
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {busqueda && (
        <p className="px-1 text-[13px] text-muted-foreground">
          <span className="cifra font-semibold text-foreground">{resultado.total}</span>{" "}
          {resultado.total === 1 ? "resultado" : "resultados"} para{" "}
          <span className="font-medium text-foreground">{busqueda}</span>
        </p>
      )}

      <Card className="animate-fade-in overflow-hidden">
        <ul className="divide-y divide-border">
          {resultado.clientes.map((cliente) => {
            const nombre = titulo(cliente.nombre) || "Sin nombre";
            const lineas = telefonos(cliente.telefono);
            const localidad = limpiar(cliente.localidad);

            return (
              <li key={cliente.id}>
                <Link
                  href={`/clientes/${cliente.id}`}
                  className="group flex items-center gap-3.5 px-4 py-3 transition-colors hover:bg-accent sm:gap-4 sm:px-5"
                >
                  <span
                    aria-hidden
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[13px] font-semibold text-primary-strong dark:text-primary"
                  >
                    {iniciales(cliente.nombre)}
                  </span>

                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate text-sm font-medium text-foreground">
                      {nombre}
                    </span>
                    <span className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[12.5px] text-muted-foreground">
                      {lineas[0] && (
                        <span className="inline-flex items-center gap-1">
                          <Phone size={12} weight="fill" />
                          <span className="cifra">{lineas[0]}</span>
                        </span>
                      )}
                      {localidad && <span className="truncate">{titulo(localidad)}</span>}
                      {!lineas[0] && !localidad && <span>Sin datos de contacto</span>}
                    </span>
                  </span>

                  {cliente.mascotas > 0 && (
                    <span className="hidden shrink-0 items-center gap-1.5 text-[12.5px] text-muted-foreground sm:inline-flex">
                      <PawPrint size={13} weight="fill" className="text-primary" />
                      <span className="cifra">{cliente.mascotas}</span>
                    </span>
                  )}

                  <CaretRight
                    size={15}
                    className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </Card>

      <Paginacion
        pagina={resultado.pagina}
        paginas={resultado.paginas}
        total={resultado.total}
        porPagina={resultado.porPagina}
        busqueda={busqueda || undefined}
      />
    </div>
  );
}

function ListadoCargando() {
  return (
    <Card className="overflow-hidden">
      <ListSkeleton rows={8} />
    </Card>
  );
}
