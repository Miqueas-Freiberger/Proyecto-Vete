"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { actualizarClienteAccion, crearClienteAccion } from "@/app/acciones/clientes";
import { actualizarMascotaAccion, crearMascotaAccion } from "@/app/acciones/pacientes";
import { hoyInput } from "@/lib/format";
import { FormularioCliente, type ValoresCliente } from "./formulario-cliente";
import { FormularioPaciente, type ValoresPaciente } from "./formulario-paciente";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * Cargar o corregir un cliente o un paciente no justifica cambiar de pantalla:
 * se abre sobre lo que estabas mirando y al cerrar seguís donde estabas.
 *
 * Las rutas /clientes/nuevo, /pacientes/nuevo y las de editar siguen
 * existiendo, así que un enlace guardado o compartido sigue funcionando.
 */
function useCerrarAlNavegar(setAbierto: (v: boolean) => void) {
  const pathname = usePathname();
  const parametros = useSearchParams();

  // Se compara la dirección como texto y no el objeto de useSearchParams: ese
  // cambia de identidad entre renders, y comparar identidades haría que
  // cualquier render cierre el modal.
  const direccion = `${pathname}?${parametros.toString()}`;
  const anterior = useRef(direccion);

  // El alta redirige a la ficha nueva. La cabecera vive en el layout y no se
  // desmonta con esa navegación, así que sin esto el modal quedaría abierto
  // encima. Un error de validación no navega, y ahí tiene que quedarse abierto
  // mostrando el error.
  useEffect(() => {
    if (anterior.current === direccion) return;
    anterior.current = direccion;
    setAbierto(false);
  }, [direccion, setAbierto]);
}

function Contenedor({
  titulo,
  descripcion,
  abierto,
  setAbierto,
  disparador,
  children,
}: {
  titulo: string;
  descripcion: string;
  abierto: boolean;
  setAbierto: (v: boolean) => void;
  disparador: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={abierto} onOpenChange={setAbierto}>
      <DialogTrigger asChild>{disparador}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{titulo}</DialogTitle>
          <DialogDescription>{descripcion}</DialogDescription>
        </DialogHeader>
        <div className="max-h-[68dvh] overflow-y-auto px-5 pt-4 pb-5">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Alta
// ---------------------------------------------------------------------------

export function DialogoNuevoCliente({ children }: { children: React.ReactNode }) {
  const [abierto, setAbierto] = useState(false);
  useCerrarAlNavegar(setAbierto);

  return (
    <Contenedor
      titulo="Nuevo cliente"
      descripcion="Solo el nombre es obligatorio. El resto se puede completar después."
      abierto={abierto}
      setAbierto={setAbierto}
      disparador={children}
    >
      <FormularioCliente
        accion={crearClienteAccion}
        volverA="/"
        textoEnviar="Crear cliente"
        enModal
      />
    </Contenedor>
  );
}

export function DialogoNuevoPaciente({
  clienteId,
  dueno,
  children,
}: {
  clienteId: number;
  dueno: string;
  children: React.ReactNode;
}) {
  const [abierto, setAbierto] = useState(false);
  useCerrarAlNavegar(setAbierto);

  return (
    <Contenedor
      titulo="Nuevo paciente"
      descripcion={`Se registra a nombre de ${dueno}.`}
      abierto={abierto}
      setAbierto={setAbierto}
      disparador={children}
    >
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
        enModal
      />
    </Contenedor>
  );
}

// ---------------------------------------------------------------------------
// Edición
// ---------------------------------------------------------------------------

/**
 * Al guardar, la acción no redirige: ya estamos en la ficha. Devuelve ok, el
 * modal se cierra y la pantalla de atrás se refresca sola por revalidatePath.
 * Sin el aviso, guardar sería un modal que desaparece sin decir nada.
 */
function useCerrarConAviso(setAbierto: (v: boolean) => void) {
  return useCallback(() => {
    setAbierto(false);
    toast.success("Cambios guardados");
  }, [setAbierto]);
}

export function DialogoEditarCliente({
  clienteId,
  nombre,
  valores,
  children,
}: {
  clienteId: number;
  nombre: string;
  valores: ValoresCliente;
  children: React.ReactNode;
}) {
  const [abierto, setAbierto] = useState(false);
  useCerrarAlNavegar(setAbierto);
  const alGuardar = useCerrarConAviso(setAbierto);

  return (
    <Contenedor
      titulo="Editar cliente"
      descripcion={`Los cambios se aplican a la ficha de ${nombre}.`}
      abierto={abierto}
      setAbierto={setAbierto}
      disparador={children}
    >
      <FormularioCliente
        accion={actualizarClienteAccion.bind(null, clienteId, true)}
        valores={valores}
        volverA={`/clientes/${clienteId}`}
        textoEnviar="Guardar cambios"
        enModal
        onExito={alGuardar}
      />
    </Contenedor>
  );
}

export function DialogoEditarPaciente({
  mascotaId,
  nombre,
  valores,
  children,
}: {
  mascotaId: number;
  nombre: string;
  valores: ValoresPaciente;
  children: React.ReactNode;
}) {
  const [abierto, setAbierto] = useState(false);
  useCerrarAlNavegar(setAbierto);
  const alGuardar = useCerrarConAviso(setAbierto);

  return (
    <Contenedor
      titulo="Editar paciente"
      descripcion={`Los cambios se aplican a la ficha de ${nombre}.`}
      abierto={abierto}
      setAbierto={setAbierto}
      disparador={children}
    >
      <FormularioPaciente
        accion={actualizarMascotaAccion.bind(null, mascotaId, true)}
        valores={valores}
        volverA={`/pacientes/${mascotaId}`}
        textoEnviar="Guardar cambios"
        enModal
        onExito={alGuardar}
      />
    </Contenedor>
  );
}
