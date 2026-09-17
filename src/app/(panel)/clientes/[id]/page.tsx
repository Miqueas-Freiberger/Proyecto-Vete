import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mascotasDeCliente, obtenerCliente } from "@/lib/queries";
import {
  etiquetaEspecie,
  fechaCorta,
  limpiar,
  normalizarEspecie,
  telefonoLink,
  telefonos,
  titulo,
} from "@/lib/format";
import { borrarClienteAccion } from "@/app/acciones/clientes";
import {
  BotonEnlace,
  Dato,
  Panel,
  Pastilla,
  SinDato,
  TituloSeccion,
  Vacio,
} from "@/components/ui";
import { ConfirmarBorrado } from "@/components/confirmar-borrado";
import { Migas } from "@/components/migas";
import {
  CaretRight,
  MapPin,
  PawPrint,
  PencilSimple,
  Phone,
  Plus,
} from "@phosphor-icons/react/dist/ssr";

export async function generateMetadata({
  params,
}: PageProps<"/clientes/[id]">): Promise<Metadata> {
  const { id } = await params;
  const cliente = await obtenerCliente(Number(id));
  return { title: cliente ? titulo(cliente.nombre) || "Cliente" : "Cliente" };
}

export default async function PaginaCliente({ params }: PageProps<"/clientes/[id]">) {
  const { id } = await params;
  const clienteId = Number(id);
  if (!Number.isInteger(clienteId) || clienteId <= 0) notFound();

  const cliente = await obtenerCliente(clienteId);
  if (!cliente) notFound();

  const mascotas = await mascotasDeCliente(clienteId);
  const nombre = titulo(cliente.nombre) || "Sin nombre";
  const lineas = telefonos(cliente.telefono);
  const direccion = limpiar(cliente.direccion);
  const localidad = limpiar(cliente.localidad);
  const correo = limpiar(cliente.email);
  const documento = cliente.dni > 0 ? cliente.dni : null;

  return (
    <div className="flex flex-col gap-6">
      <Migas rutas={[{ texto: "Clientes", href: "/" }]} actual={nombre} />

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-tinta sm:text-3xl">
            {nombre}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-tinta-media">
            {lineas.map((linea) => (
              <a
                key={linea}
                href={`tel:${telefonoLink(linea)}`}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-acento"
              >
                <Phone size={13} />
                <span className="cifra">{linea}</span>
              </a>
            ))}
            {localidad && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} />
                {titulo(localidad)}
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <BotonEnlace
            href={`/clientes/${clienteId}/editar`}
            tono="secundario"
            medida="sm"
          >
            <PencilSimple size={15} />
            Editar
          </BotonEnlace>
          <ConfirmarBorrado
            accion={borrarClienteAccion.bind(null, clienteId)}
            titulo={`¿Borrar a ${nombre}?`}
            detalle={
              mascotas.length > 0
                ? `Se borran también sus ${mascotas.length === 1 ? "1 paciente" : `${mascotas.length} pacientes`}, con todas las consultas y los estudios. No se puede deshacer.`
                : "Se borra la ficha completa. No se puede deshacer."
            }
            confirmar="Borrar cliente"
          />
        </div>
      </header>

      <Panel className="p-5">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
          <Dato etiqueta="Documento">
            {documento ? <span className="cifra">{documento}</span> : <SinDato />}
          </Dato>
          <Dato etiqueta="Dirección">{direccion ? titulo(direccion) : <SinDato />}</Dato>
          <Dato etiqueta="Localidad">{localidad ? titulo(localidad) : <SinDato />}</Dato>
          <Dato etiqueta="Correo">
            {correo ? (
              <a href={`mailto:${correo}`} className="break-all hover:text-acento">
                {correo}
              </a>
            ) : (
              <SinDato />
            )}
          </Dato>
        </dl>
      </Panel>

      <section className="flex flex-col gap-3">
        <TituloSeccion
          accion={
            <BotonEnlace
              href={`/pacientes/nuevo?cliente=${clienteId}`}
              tono="secundario"
              medida="sm"
            >
              <Plus size={15} weight="bold" />
              Nuevo paciente
            </BotonEnlace>
          }
        >
          Pacientes
        </TituloSeccion>

        {mascotas.length === 0 ? (
          <Panel>
            <Vacio
              icono={<PawPrint size={22} />}
              titulo="Sin pacientes cargados"
              detalle="Agregá la primera mascota para poder registrar consultas y estudios."
              accion={
                <BotonEnlace
                  href={`/pacientes/nuevo?cliente=${clienteId}`}
                  tono="primario"
                  medida="sm"
                >
                  <Plus size={15} weight="bold" />
                  Nuevo paciente
                </BotonEnlace>
              }
            />
          </Panel>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {mascotas.map((mascota) => {
              const especie = normalizarEspecie(mascota.especie);
              const raza = limpiar(mascota.raza);

              return (
                <li key={mascota.id}>
                  <Link
                    href={`/pacientes/${mascota.id}`}
                    className="group flex h-full items-center gap-4 rounded-[var(--radius-superficie)] border border-borde bg-superficie p-4 transition-colors hover:border-acento-borde hover:bg-superficie-alta"
                  >
                    <span
                      aria-hidden
                      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-acento-suave text-acento"
                    >
                      <PawPrint size={20} weight="fill" />
                    </span>

                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="truncate text-[15px] font-medium text-tinta">
                        {titulo(mascota.nombre) || "Sin nombre"}
                      </span>
                      <span className="flex flex-wrap items-center gap-2 text-[12.5px] text-tinta-suave">
                        <Pastilla tono="acento">{etiquetaEspecie(especie)}</Pastilla>
                        {raza && <span className="truncate">{titulo(raza)}</span>}
                      </span>
                      <span className="text-[12.5px] text-tinta-suave">
                        {mascota.consultas === 0 ? (
                          "Sin consultas"
                        ) : (
                          <>
                            <span className="cifra">{mascota.consultas}</span>{" "}
                            {mascota.consultas === 1 ? "consulta" : "consultas"}
                            {mascota.ultimaConsulta && (
                              <>
                                {" · última "}
                                <span className="cifra">
                                  {fechaCorta(mascota.ultimaConsulta)}
                                </span>
                              </>
                            )}
                          </>
                        )}
                      </span>
                    </span>

                    <CaretRight
                      size={15}
                      className="shrink-0 text-tinta-suave transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
