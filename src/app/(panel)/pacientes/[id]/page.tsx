import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Notepad,
  Paperclip,
  PawPrint,
  PencilSimple,
  Plus,
} from "@phosphor-icons/react/dist/ssr";

import {
  conteoAdjuntosPorConsulta,
  consultasDeMascota,
  obtenerMascota,
} from "@/lib/queries";
import {
  etiquetaEspecie,
  fechaCorta,
  fechaInput,
  fechaLarga,
  limpiar,
  listaComplementarios,
  normalizarEspecie,
  titulo,
} from "@/lib/format";
import { borrarMascotaAccion } from "@/app/acciones/pacientes";
import { ConfirmarBorrado } from "@/components/confirmar-borrado";
import {
  DialogoEditarConsulta,
  DialogoEditarPaciente,
  DialogoEstudios,
  DialogoNuevaConsulta,
} from "@/components/dialogos";
import { Migas } from "@/components/migas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dato, SinDato } from "@/components/ui/dato";
import { EmptyState } from "@/components/ui/states";

export async function generateMetadata({
  params,
}: PageProps<"/pacientes/[id]">): Promise<Metadata> {
  const { id } = await params;
  const mascota = await obtenerMascota(Number(id));
  return { title: mascota ? titulo(mascota.nombre) || "Paciente" : "Paciente" };
}

export default async function PaginaPaciente({ params }: PageProps<"/pacientes/[id]">) {
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
  const esterilizado = limpiar(mascota.esterilizado);

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
            className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-strong dark:text-primary"
          >
            <PawPrint size={26} weight="fill" />
          </span>
          <div className="flex min-w-0 flex-col gap-1.5">
            <h1 className="truncate text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {nombre}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary">{etiquetaEspecie(especie)}</Badge>
              {limpiar(mascota.sexo) && <Badge>{titulo(mascota.sexo)}</Badge>}
              {limpiar(mascota.tamano) && <Badge>{titulo(mascota.tamano)}</Badge>}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <DialogoEditarPaciente
            mascotaId={mascotaId}
            nombre={nombre}
            valores={{
              nombre: mascota.nombre?.trim() ?? "",
              especie: mascota.especie?.trim() ?? "",
              nacimiento: mascota.nacimiento?.trim() ?? "",
              sexo: mascota.sexo?.trim() ?? "",
              raza: mascota.raza?.trim() ?? "",
              color: mascota.color?.trim() ?? "",
              tamano: mascota.tamano?.trim() ?? "",
              esterilizado: mascota.esterilizado?.trim() ?? "",
              ingreso: fechaInput(mascota.ingreso),
            }}
          >
            <Button variant="outline" size="sm">
              <PencilSimple size={15} />
              Editar
            </Button>
          </DialogoEditarPaciente>
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

      <Card>
        <CardContent className="py-5">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
            <Dato etiqueta="Dueño">
              <Link
                href={`/clientes/${mascota.duenoId}`}
                className="transition-colors hover:text-primary"
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
              {esterilizado === "Si" ? "Sí" : esterilizado === "No" ? "No" : <SinDato />}
            </Dato>
          </dl>
        </CardContent>
      </Card>

      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-2.5">
            <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
              Historia clínica
            </h2>
            {consultas.length > 0 && (
              <span className="text-[13px] text-muted-foreground">
                <span className="cifra">{consultas.length}</span>{" "}
                {consultas.length === 1 ? "consulta" : "consultas"}
              </span>
            )}
          </div>
          <DialogoNuevaConsulta mascotaId={mascotaId} paciente={nombre}>
            <Button size="sm">
              <Plus size={15} weight="bold" />
              Nueva consulta
            </Button>
          </DialogoNuevaConsulta>
        </div>

        {consultas.length === 0 ? (
          <Card>
            <EmptyState
              icon={<Notepad />}
              title="Todavía no hay consultas"
              description="Registrá la primera para empezar la historia clínica de este paciente."
              action={
                <DialogoNuevaConsulta mascotaId={mascotaId} paciente={nombre}>
                  <Button size="sm">
                    <Plus size={15} weight="bold" />
                    Nueva consulta
                  </Button>
                </DialogoNuevaConsulta>
              }
            />
          </Card>
        ) : (
          <ol className="flex flex-col gap-3">
            {consultas.map((consulta) => {
              const estudios = listaComplementarios(consulta.complementarios);
              const motivo = limpiar(consulta.motivo);
              const observacion = limpiar(consulta.observacion);
              const tratamiento = limpiar(consulta.tratamiento);
              const cantidadAdjuntos = adjuntos.get(consulta.id) ?? 0;
              const vacia = !motivo && !observacion && !tratamiento && estudios.length === 0;

              return (
                <li key={consulta.id}>
                  <Card className="p-4 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-baseline gap-2.5">
                        <time
                          dateTime={consulta.fecha}
                          className="cifra text-[15px] font-semibold text-foreground"
                        >
                          {fechaCorta(consulta.fecha)}
                        </time>
                        <span className="text-[12.5px] text-muted-foreground">
                          {fechaLarga(consulta.fecha)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <DialogoEstudios
                          consultaId={consulta.id}
                          fecha={fechaCorta(consulta.fecha)}
                          paciente={nombre}
                        >
                          <Button variant="ghost" size="sm">
                            <Paperclip size={14} />
                            Estudios
                            {cantidadAdjuntos > 0 && (
                              <span className="cifra ml-0.5 rounded-full bg-primary-soft px-1.5 text-[11px] font-semibold text-primary-strong dark:text-primary">
                                {cantidadAdjuntos}
                              </span>
                            )}
                          </Button>
                        </DialogoEstudios>

                        <DialogoEditarConsulta
                          consultaId={consulta.id}
                          mascotaId={mascotaId}
                          fecha={fechaCorta(consulta.fecha)}
                          valores={{
                            fecha: fechaInput(consulta.fecha),
                            motivo: consulta.motivo?.trim() ?? "",
                            observacion: consulta.observacion?.trim() ?? "",
                            tratamiento: consulta.tratamiento?.trim() ?? "",
                            complementarios: estudios,
                          }}
                        >
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label="Editar consulta"
                          >
                            <PencilSimple size={14} />
                          </Button>
                        </DialogoEditarConsulta>
                      </div>
                    </div>

                    {(motivo || observacion || tratamiento) && (
                      <dl className="mt-4 flex flex-col gap-3.5 border-t border-border pt-4">
                        {motivo && <Bloque etiqueta="Motivo">{motivo}</Bloque>}
                        {observacion && (
                          <Bloque etiqueta="Observaciones" multilinea>
                            {observacion}
                          </Bloque>
                        )}
                        {tratamiento && (
                          <Bloque etiqueta="Tratamiento" multilinea>
                            {tratamiento}
                          </Bloque>
                        )}
                      </dl>
                    )}

                    {estudios.length > 0 && (
                      <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-border pt-4">
                        {estudios.map((estudio) => (
                          <Badge key={estudio}>{estudio}</Badge>
                        ))}
                      </div>
                    )}

                    {vacia && (
                      <p className="mt-3 text-[13px] text-muted-foreground">
                        La consulta quedó registrada sin detalle.
                      </p>
                    )}
                  </Card>
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </div>
  );
}

function Bloque({
  etiqueta,
  children,
  multilinea = false,
}: {
  etiqueta: string;
  children: React.ReactNode;
  multilinea?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-[12px] font-medium text-muted-foreground">{etiqueta}</dt>
      <dd
        className={`text-sm leading-relaxed text-foreground ${multilinea ? "whitespace-pre-line" : ""}`}
      >
        {children}
      </dd>
    </div>
  );
}
