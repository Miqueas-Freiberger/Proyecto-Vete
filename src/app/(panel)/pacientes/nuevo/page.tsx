import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { obtenerCliente } from "@/lib/queries";
import { hoyInput, titulo } from "@/lib/format";
import { crearMascotaAccion } from "@/app/acciones/pacientes";
import { FormularioPaciente } from "@/components/formulario-paciente";
import { Migas } from "@/components/migas";

export const metadata: Metadata = { title: "Nuevo paciente" };

export default async function PaginaNuevoPaciente({
  searchParams,
}: PageProps<"/pacientes/nuevo">) {
  const parametros = await searchParams;
  const clienteId = Number(
    typeof parametros.cliente === "string" ? parametros.cliente : 0,
  );
  if (!Number.isInteger(clienteId) || clienteId <= 0) notFound();

  const cliente = await obtenerCliente(clienteId);
  if (!cliente) notFound();

  const dueno = titulo(cliente.nombre) || "Sin nombre";

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Migas
        rutas={[
          { texto: "Clientes", href: "/" },
          { texto: dueno, href: `/clientes/${clienteId}` },
        ]}
        actual="Nuevo paciente"
      />

      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Nuevo paciente
        </h1>
        <p className="text-sm text-muted-foreground">Se registra a nombre de {dueno}.</p>
      </header>

      <FormularioPaciente
        accion={crearMascotaAccion.bind(null, clienteId)}
        valores={{
          nombre: "",
          especie: "",
          nacimiento: "",
          sexo: "",
          raza: "",
          color: "",
          tamano: "",
          esterilizado: "",
          ingreso: hoyInput(),
        }}
        volverA={`/clientes/${clienteId}`}
        textoEnviar="Crear paciente"
      />
    </div>
  );
}
