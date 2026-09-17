import { Suspense } from "react";
import Link from "next/link";
import { listarClientes, obtenerResumen } from "@/lib/queries";
import { iniciales, limpiar, telefonos, titulo } from "@/lib/format";
import { Paginacion } from "@/components/paginacion";
import { BotonEnlace, Esqueleto, Panel, Vacio } from "@/components/ui";
import {
  CaretRight,
  MagnifyingGlass,
  PawPrint,
  Phone,
  Plus,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";

export default async function PaginaClientes({
  searchParams,
}: PageProps<"/">) {
  const parametros = await searchParams;
  const busqueda = typeof parametros.q === "string" ? parametros.q : "";
  const pagina = Number(
    typeof parametros.pagina === "string" ? parametros.pagina : 1,
  );

  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<TirasCargando />}>
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

async function Resumen() {
  const datos = await obtenerResumen();

  const tiras = [
    { etiqueta: "Clientes", valor: datos.clientes },
    { etiqueta: "Pacientes", valor: datos.mascotas },
    { etiqueta: "Consultas", valor: datos.consultas },
    { etiqueta: "Últimos 30 días", valor: datos.consultasUltimoMes },
  ];

  return (
    <section className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-superficie)] border border-borde bg-borde sm:grid-cols-4">
      {tiras.map((tira) => (
        <div key={tira.etiqueta} className="bg-superficie px-4 py-3.5">
          <p className="text-[12px] font-medium text-tinta-suave">{tira.etiqueta}</p>
          <p className="cifra mt-0.5 text-2xl font-semibold text-tinta">{tira.valor}</p>
        </div>
      ))}
    </section>
  );
}

async function Listado({ busqueda, pagina }: { busqueda: string; pagina: number }) {
  const resultado = await listarClientes({ busqueda, pagina });

  if (resultado.total === 0) {
    return (
      <Panel>
        {busqueda ? (
          <Vacio
            icono={<MagnifyingGlass size={22} />}
            titulo={`No hay resultados para "${busqueda}"`}
            detalle="Probá con el apellido, parte del teléfono o la localidad. La búsqueda mira los cuatro campos."
            accion={
              <BotonEnlace href="/" tono="secundario" medida="sm">
                Ver todos los clientes
              </BotonEnlace>
            }
          />
        ) : (
          <Vacio
            icono={<UsersThree size={22} />}
            titulo="Todavía no hay clientes"
            detalle="Cargá el primero para empezar a registrar pacientes y consultas."
            accion={
              <BotonEnlace href="/clientes/nuevo" tono="primario" medida="sm">
                <Plus size={15} weight="bold" />
                Nuevo cliente
              </BotonEnlace>
            }
          />
        )}
      </Panel>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {busqueda && (
        <p className="px-1 text-[13px] text-tinta-media">
          <span className="cifra font-medium text-tinta">{resultado.total}</span>{" "}
          {resultado.total === 1 ? "resultado" : "resultados"} para{" "}
          <span className="font-medium text-tinta">{busqueda}</span>
        </p>
      )}

      <Panel className="overflow-hidden">
        <ul className="divide-y divide-borde">
          {resultado.clientes.map((cliente) => {
            const nombre = titulo(cliente.nombre) || "Sin nombre";
            const lineas = telefonos(cliente.telefono);
            const localidad = limpiar(cliente.localidad);

            return (
              <li key={cliente.id}>
                <Link
                  href={`/clientes/${cliente.id}`}
                  className="group flex items-center gap-3.5 px-4 py-3 transition-colors hover:bg-superficie-alta sm:gap-4 sm:px-5"
                >
                  <span
                    aria-hidden
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-acento-suave text-[13px] font-semibold text-acento-fuerte"
                  >
                    {iniciales(cliente.nombre)}
                  </span>

                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate text-sm font-medium text-tinta">
                      {nombre}
                    </span>
                    <span className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[12.5px] text-tinta-suave">
                      {lineas[0] && (
                        <span className="inline-flex items-center gap-1">
                          <Phone size={12} />
                          <span className="cifra">{lineas[0]}</span>
                        </span>
                      )}
                      {localidad && <span className="truncate">{titulo(localidad)}</span>}
                      {!lineas[0] && !localidad && <span>Sin datos de contacto</span>}
                    </span>
                  </span>

                  {cliente.mascotas > 0 && (
                    <span className="hidden shrink-0 items-center gap-1.5 text-[12.5px] text-tinta-media sm:inline-flex">
                      <PawPrint size={13} weight="fill" className="text-acento" />
                      <span className="cifra">{cliente.mascotas}</span>
                    </span>
                  )}

                  <CaretRight
                    size={15}
                    className="shrink-0 text-tinta-suave transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </Panel>

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

function TirasCargando() {
  return (
    <section className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-superficie)] border border-borde bg-borde sm:grid-cols-4">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="bg-superficie px-4 py-3.5">
          <Esqueleto className="h-3 w-16" />
          <Esqueleto className="mt-2 h-7 w-12" />
        </div>
      ))}
    </section>
  );
}

function ListadoCargando() {
  return (
    <Panel className="overflow-hidden">
      <ul className="divide-y divide-borde">
        {Array.from({ length: 8 }, (_, i) => (
          <li key={i} className="flex items-center gap-4 px-4 py-3 sm:px-5">
            <Esqueleto className="size-10 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <Esqueleto className="h-3.5 w-44 max-w-[60%]" />
              <Esqueleto className="h-3 w-28 max-w-[40%]" />
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
