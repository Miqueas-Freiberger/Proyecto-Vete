import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { obtenerConsulta, obtenerMascota } from "@/lib/queries";
import { fechaCorta, fechaInput, listaComplementarios, titulo } from "@/lib/format";
import { actualizarConsultaAccion, borrarConsultaAccion } from "@/app/acciones/consultas";
import { FormularioConsulta } from "@/components/formulario-consulta";
import { ConfirmarBorrado } from "@/components/confirmar-borrado";
import { Migas } from "@/components/migas";

export const metadata: Metadata = { title: "Editar consulta" };

export default async function PaginaEditarConsulta({
  params,
}: PageProps<"/consultas/[id]/editar">) {
  const { id } = await params;
  const consultaId = Number(id);
  if (!Number.isInteger(consultaId) || consultaId <= 0) notFound();

  const consulta = await obtenerConsulta(consultaId);
  if (!consulta) notFound();

  const mascota = await obtenerMascota(consulta.mascotaId);
  if (!mascota) notFound();

  const nombre = titulo(mascota.nombre) || "Sin nombre";

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Migas
        rutas={[
          { texto: "Clientes", href: "/" },
          { texto: nombre, href: `/pacientes/${mascota.id}` },
        ]}
        actual={`Consulta del ${fechaCorta(consulta.fecha)}`}
      />

      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-semibold tracking-tight text-tinta">
            Editar consulta
          </h1>
          <p className="text-sm text-tinta-media">
            Del {fechaCorta(consulta.fecha)}, en la historia de {nombre}.
          </p>
        </div>

        <ConfirmarBorrado
          accion={borrarConsultaAccion.bind(null, consultaId)}
          titulo="¿Borrar esta consulta?"
          detalle="Se borran también los estudios adjuntos. No se puede deshacer."
          confirmar="Borrar consulta"
        />
      </header>

      <FormularioConsulta
        accion={actualizarConsultaAccion.bind(null, consultaId, mascota.id)}
        valores={{
          fecha: fechaInput(consulta.fecha),
          motivo: consulta.motivo?.trim() ?? "",
          observacion: consulta.observacion?.trim() ?? "",
          tratamiento: consulta.tratamiento?.trim() ?? "",
          complementarios: listaComplementarios(consulta.complementarios),
        }}
        volverA={`/pacientes/${mascota.id}`}
        textoEnviar="Guardar cambios"
      />
    </div>
  );
}
