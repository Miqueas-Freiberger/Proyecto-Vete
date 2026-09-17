import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { obtenerMascota } from "@/lib/queries";
import { fechaInput, titulo } from "@/lib/format";
import { actualizarMascotaAccion } from "@/app/acciones/pacientes";
import { FormularioPaciente } from "@/components/formulario-paciente";
import { Migas } from "@/components/migas";

export const metadata: Metadata = { title: "Editar paciente" };

export default async function PaginaEditarPaciente({
  params,
}: PageProps<"/pacientes/[id]/editar">) {
  const { id } = await params;
  const mascotaId = Number(id);
  if (!Number.isInteger(mascotaId) || mascotaId <= 0) notFound();

  const mascota = await obtenerMascota(mascotaId);
  if (!mascota) notFound();

  const nombre = titulo(mascota.nombre) || "Sin nombre";

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Migas
        rutas={[
          { texto: "Clientes", href: "/" },
          { texto: titulo(mascota.duenoNombre) || "Cliente", href: `/clientes/${mascota.duenoId}` },
          { texto: nombre, href: `/pacientes/${mascotaId}` },
        ]}
        actual="Editar"
      />

      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tight text-tinta">
          Editar paciente
        </h1>
        <p className="text-sm text-tinta-media">Los cambios se aplican a la ficha de {nombre}.</p>
      </header>

      <FormularioPaciente
        accion={actualizarMascotaAccion.bind(null, mascotaId)}
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
        volverA={`/pacientes/${mascotaId}`}
        textoEnviar="Guardar cambios"
      />
    </div>
  );
}
