import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { obtenerMascota } from "@/lib/queries";
import { hoyInput, titulo } from "@/lib/format";
import { crearConsultaAccion } from "@/app/acciones/consultas";
import { FormularioConsulta } from "@/components/formulario-consulta";
import { Migas } from "@/components/migas";

export const metadata: Metadata = { title: "Nueva consulta" };

export default async function PaginaNuevaConsulta({
  searchParams,
}: PageProps<"/consultas/nueva">) {
  const parametros = await searchParams;
  const mascotaId = Number(
    typeof parametros.paciente === "string" ? parametros.paciente : 0,
  );
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
        actual="Nueva consulta"
      />

      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Nueva consulta
        </h1>
        <p className="text-sm text-muted-foreground">
          Se suma a la historia clínica de {nombre}.
        </p>
      </header>

      <FormularioConsulta
        accion={crearConsultaAccion.bind(null, mascotaId)}
        valores={{
          fecha: hoyInput(),
          motivo: "",
          observacion: "",
          tratamiento: "",
          complementarios: [],
        }}
        volverA={`/pacientes/${mascotaId}`}
        textoEnviar="Guardar consulta"
      />
    </div>
  );
}
