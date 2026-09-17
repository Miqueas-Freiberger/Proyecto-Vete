import type { Metadata } from "next";
import { crearClienteAccion } from "@/app/acciones/clientes";
import { FormularioCliente } from "@/components/formulario-cliente";
import { Migas } from "@/components/migas";

export const metadata: Metadata = { title: "Nuevo cliente" };

export default function PaginaNuevoCliente() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Migas rutas={[{ texto: "Clientes", href: "/" }]} actual="Nuevo cliente" />

      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tight text-tinta">
          Nuevo cliente
        </h1>
        <p className="text-sm text-tinta-media">
          Solo el nombre es obligatorio. El resto se puede completar después.
        </p>
      </header>

      <FormularioCliente
        accion={crearClienteAccion}
        volverA="/"
        textoEnviar="Crear cliente"
      />
    </div>
  );
}
