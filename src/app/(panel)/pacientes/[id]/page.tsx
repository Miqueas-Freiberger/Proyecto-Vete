import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  conteoAdjuntosPorConsulta,
  consultasDeMascota,
  obtenerMascota,
} from "@/lib/queries";
import {
  etiquetaEspecie,
  fechaCorta,
  fechaLarga,
  limpiar,
  listaComplementarios,
  normalizarEspecie,
  titulo,
} from "@/lib/format";
import { borrarMascotaAccion } from "@/app/acciones/pacientes";
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
  Images,
  Notepad,
  Paperclip,
  PawPrint,
  PencilSimple,
  Plus,
} from "@phosphor-icons/react/dist/ssr";

export async function generateMetadata({
  params,
}: PageProps<"/pacientes/[id]">): Promise<Metadata> {
  const { id } = await params;
  const mascota = await obtenerMascota(Number(id));
  return { title: mascota ? titulo(mascota.nombre) || "Paciente" : "Paciente" };
}

export default async function PaginaPaciente({
  params,
}: PageProps<"/pacientes/[id]">) {
  const { id } = await params;
  const mascotaId = Number(id);
  if (!Number.isInteger(mascotaId) || mascotaId <= 0) notFound();

  const mascota = await obtenerMascota(mascotaId);
  if (!mascota) notFound();

  const [consultas, adjuntos] = await Promise.all([
    consultasDeMascota(mascotaId),
    conteoAdjuntosPorConsulta(mascotaId),
  ]);

  const nombre = titulo(mascota.nombre) || "Sin nombre";
  const especie = normalizarEspecie(mascota.especie);
  const dueno = titulo(mascota.duenoNombre) || "Sin nombre";

  return (
    <div className="flex flex-col gap-6">
      <Migas
        rutas={[
          { texto: "Clientes", href: "/" },
          { texto: dueno, href: `/clientes/${mascota.duenoId}` },
        ]}
        actual={nombre}
      />

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <span
            aria-hidden
            className="flex size-14 shrink-0 items-center justify-center rounded-full bg-acento-suave text-acento"
          >
            <PawPrint size={26} weight="fill" />
          </span>
          <div className="flex min-w-0 flex-col gap-1.5">
            <h1 className="truncate text-2xl font-semibold tracking-tight text-tinta sm:text-3xl">
              {nombre}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <Pastilla tono="acento">{etiquetaEspecie(especie)}</Pastilla>
              {limpiar(mascota.sexo) && (
                <Pastilla>{titulo(mascota.sexo)}</Pastilla>
              )}
              {limpiar(mascota.tamano) && (
                <Pastilla>{titulo(mascota.tamano)}</Pastilla>
              )}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <BotonEnlace
            href={`/pacientes/${mascotaId}/editar`}
            tono="secundario"
            medida="sm"
          >
            <PencilSimple size={15} />
            Editar
          </BotonEnlace>
          <ConfirmarBorrado
            accion={borrarMascotaAccion.bind(null, mascotaId)}
            titulo={`¿Borrar a ${nombre}?`}
            detalle={
              consultas.length > 0
                ? `Se borran también sus ${consultas.length === 1 ? "1 consulta" : `${consultas.length} consultas`} y los estudios adjuntos. No se puede deshacer.`
                : "Se borra la ficha del paciente. No se puede deshacer."
            }
            confirmar="Borrar paciente"
          />
        </div>
      </header>

      <Panel className="p-5">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
          <Dato etiqueta="Dueño">
            <Link
              href={`/clientes/${mascota.duenoId}`}
              className="transition-colors hover:text-acento"
            >
              {dueno}
            </Link>
          </Dato>
          <Dato etiqueta="Raza">
            {limpiar(mascota.raza) ? titulo(mascota.raza) : <SinDato />}
          </Dato>
          <Dato etiqueta="Color">
            {limpiar(mascota.color) ? titulo(mascota.color) : <SinDato />}
          </Dato>
          <Dato etiqueta="Nacimiento">
            {limpiar(mascota.nacimiento) ? (
              <span className="cifra">{limpiar(mascota.nacimiento)}</span>
            ) : (
              <SinDato />
            )}
          </Dato>
          <Dato etiqueta="Esterilizado">
            {limpiar(mascota.esterilizado) === "Si"
              ? "Sí"
              : limpiar(mascota.esterilizado) === "No"
                ? "No"
                : <SinDato />}
          </Dato>
        </dl>
      </Panel>

      <section className="flex flex-col gap-3">
        <TituloSeccion
          accion={
            <BotonEnlace
              href={`/consultas/nueva?paciente=${mascotaId}`}
              tono="primario"
              medida="sm"
            >
              <Plus size={15} weight="bold" />
              Nueva consulta
            </BotonEnlace>
          }
        >
          Historia clínica
        </TituloSeccion>

        {consultas.length === 0 ? (
          <Panel>
            <Vacio
              icono={<Notepad size={22} />}
              titulo="Todavía no hay consultas"
              detalle="Registrá la primera para empezar la historia clínica de este paciente."
              accion={
                <BotonEnlace
                  href={`/consultas/nueva?paciente=${mascotaId}`}
                  tono="primario"
                  medida="sm"
                >
                  <Plus size={15} weight="bold" />
                  Nueva consulta
                </BotonEnlace>
              }
            />
          </Panel>
        ) : (
          <ol className="flex flex-col gap-3">
            {consultas.map((consulta) => {
              const estudios = listaComplementarios(consulta.complementarios);
              const motivo = limpiar(consulta.motivo);
              const observacion = limpiar(consulta.observacion);
              const tratamiento = limpiar(consulta.tratamiento);
              const cantidadAdjuntos = adjuntos.get(consulta.id) ?? 0;

              return (
                <li key={consulta.id}>
                  <Panel className="p-4 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-baseline gap-2.5">
                        <time
                          dateTime={consulta.fecha}
                          className="cifra text-[15px] font-semibold text-tinta"
                        >
                          {fechaCorta(consulta.fecha)}
                        </time>
                        <span className="text-[12.5px] text-tinta-suave">
                          {fechaLarga(consulta.fecha)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <BotonEnlace
                          href={`/consultas/${consulta.id}/estudios`}
                          tono="fantasma"
                          medida="sm"
                        >
                          <Paperclip size={14} />
                          Estudios
                          {cantidadAdjuntos > 0 && (
                            <span className="cifra ml-0.5 rounded-full bg-acento-suave px-1.5 text-[11px] font-semibold text-acento-fuerte">
                              {cantidadAdjuntos}
                            </span>
                          )}
                        </BotonEnlace>
                        <BotonEnlace
                          href={`/consultas/${consulta.id}/editar`}
                          tono="fantasma"
                          medida="sm"
                          aria-label="Editar consulta"
                        >
                          <PencilSimple size={14} />
                        </BotonEnlace>
                      </div>
                    </div>

                    {(motivo || observacion || tratamiento) && (
                      <dl className="mt-4 flex flex-col gap-3.5 border-t border-borde pt-4">
                        {motivo && (
                          <div className="flex flex-col gap-1">
                            <dt className="text-[12px] font-medium text-tinta-suave">
                              Motivo
                            </dt>
                            <dd className="text-sm leading-relaxed text-tinta">
                              {motivo}
                            </dd>
                          </div>
                        )}
                        {observacion && (
                          <div className="flex flex-col gap-1">
                            <dt className="text-[12px] font-medium text-tinta-suave">
                              Observaciones
                            </dt>
                            <dd className="whitespace-pre-line text-sm leading-relaxed text-tinta">
                              {observacion}
                            </dd>
                          </div>
                        )}
                        {tratamiento && (
                          <div className="flex flex-col gap-1">
                            <dt className="text-[12px] font-medium text-tinta-suave">
                              Tratamiento
                            </dt>
                            <dd className="whitespace-pre-line text-sm leading-relaxed text-tinta">
                              {tratamiento}
                            </dd>
                          </div>
                        )}
                      </dl>
                    )}

                    {estudios.length > 0 && (
                      <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-borde pt-4">
                        {estudios.map((estudio) => (
                          <Pastilla key={estudio}>{estudio}</Pastilla>
                        ))}
                      </div>
                    )}

                    {!motivo && !observacion && !tratamiento && estudios.length === 0 && (
                      <p className="mt-3 text-[13px] text-tinta-suave">
                        La consulta quedó registrada sin detalle.
                      </p>
                    )}
                  </Panel>
                </li>
              );
            })}
          </ol>
        )}
      </section>

      {consultas.length > 0 && (
        <p className="flex items-center justify-center gap-1.5 text-[12.5px] text-tinta-suave">
          <Images size={14} />
          <span className="cifra">{consultas.length}</span>
          {consultas.length === 1 ? " consulta registrada" : " consultas registradas"}
        </p>
      )}
    </div>
  );
}
