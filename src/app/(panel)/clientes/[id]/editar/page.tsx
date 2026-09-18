import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { obtenerCliente } from "@/lib/queries";
import { titulo } from "@/lib/format";
import { actualizarClienteAccion } from "@/app/acciones/clientes";
import { FormularioCliente } from "@/components/formulario-cliente";
import { Migas } from "@/components/migas";

export const metadata: Metadata = { title: "Editar cliente" };

export default async function PaginaEditarCliente({
  params,
}: PageProps<"/clientes/[id]/editar">) {
  const { id } = await params;
  const clienteId = Number(id);
  if (!Number.isInteger(clienteId) || clienteId <= 0) notFound();

  const cliente = await obtenerCliente(clienteId);
  if (!cliente) notFound();

  const nombre = titulo(cliente.nombre) || "Sin nombre";

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Migas
        rutas={[
          { texto: "Clientes", href: "/" },
          { texto: nombre, href: `/clientes/${clienteId}` },
        ]}
        actual="Editar"
      />

      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Editar cliente
        </h1>
        <p className="text-sm text-muted-foreground">
          Los cambios se aplican a la ficha de {nombre}.
        </p>
      </header>

      <FormularioCliente
        accion={actualizarClienteAccion.bind(null, clienteId, false)}
        valores={{
          nombre: cliente.nombre?.trim() ?? "",
          dni: cliente.dni > 0 ? String(cliente.dni) : "",
          telefono: cliente.telefono?.trim() ?? "",
          email: cliente.email?.trim() ?? "",
          direccion: cliente.direccion?.trim() ?? "",
          localidad: cliente.localidad?.trim() ?? "",
        }}
        volverA={`/clientes/${clienteId}`}
        textoEnviar="Guardar cambios"
      />
    </div>
  );
}
