"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ArrowClockwise, Paperclip } from "@phosphor-icons/react";
import { toast } from "sonner";

import { actualizarClienteAccion, crearClienteAccion } from "@/app/acciones/clientes";
import { actualizarMascotaAccion, crearMascotaAccion } from "@/app/acciones/pacientes";
import {
  actualizarConsultaAccion,
  cargarEstudiosAccion,
  crearConsultaAccion,
  type EstudiosCargados,
} from "@/app/acciones/consultas";
import { hoyInput } from "@/lib/format";
import { FormularioCliente, type ValoresCliente } from "./formulario-cliente";
import { FormularioPaciente, type ValoresPaciente } from "./formulario-paciente";
import { FormularioConsulta, type ValoresConsulta } from "./formulario-consulta";
import { GaleriaEstudios } from "./galeria-estudios";
import { SubirEstudio } from "./subir-estudio";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState, ErrorState } from "@/components/ui/states";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * Ninguna alta, edición ni consulta de estudios cambia de pantalla: todo se
 * abre sobre lo que estabas mirando y al cerrar seguís donde estabas.
 *
 * Las rutas siguen existiendo (/clientes/nuevo, /consultas/nueva, las de
 * editar y la de estudios), así que un enlace guardado no se rompe.
 */
function useCerrarAlNavegar(setAbierto: (v: boolean) => void) {
  const pathname = usePathname();
  const parametros = useSearchParams();

  // Se compara la dirección como texto y no el objeto de useSearchParams: ese
  // cambia de identidad entre renders, y comparar identidades haría que
  // cualquier render cierre el modal.
  const direccion = `${pathname}?${parametros.toString()}`;
  const anterior = useRef(direccion);

  useEffect(() => {
    if (anterior.current === direccion) return;
    anterior.current = direccion;
    setAbierto(false);
  }, [direccion, setAbierto]);
}

/**
 * Al guardar, las acciones en modo modal no redirigen: ya estamos donde
 * redirigirían. Devuelven ok, el modal cierra y la pantalla de atrás se
 * refresca sola por revalidatePath. Sin el aviso, guardar sería un modal que
 * desaparece sin decir nada.
 */
function useCerrarConAviso(setAbierto: (v: boolean) => void, mensaje: string) {
  return useCallback(() => {
    setAbierto(false);
    toast.success(mensaje);
  }, [setAbierto, mensaje]);
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
      <DialogContent hoja>
        <DialogHeader className="shrink-0 border-b border-border pb-4">
          <DialogTitle>{titulo}</DialogTitle>
          <DialogDescription>{descripcion}</DialogDescription>
        </DialogHeader>
        {/* min-h-0 para que el hijo pueda encogerse dentro del flex y scrollee
            de verdad en vez de desbordar el diálogo. */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-5 pb-5 sm:max-h-[70dvh]">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Clientes
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
  const alGuardar = useCerrarConAviso(setAbierto, "Cambios guardados");

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

// ---------------------------------------------------------------------------
// Pacientes
// ---------------------------------------------------------------------------

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
  const alGuardar = useCerrarConAviso(setAbierto, "Cambios guardados");

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

// ---------------------------------------------------------------------------
// Consultas
// ---------------------------------------------------------------------------

export function DialogoNuevaConsulta({
  mascotaId,
  paciente,
  children,
}: {
  mascotaId: number;
  paciente: string;
  children: React.ReactNode;
}) {
  const [abierto, setAbierto] = useState(false);
  useCerrarAlNavegar(setAbierto);
  const alGuardar = useCerrarConAviso(setAbierto, "Consulta registrada");

  return (
    <Contenedor
      titulo="Nueva consulta"
      descripcion={`Se agrega a la historia clínica de ${paciente}.`}
      abierto={abierto}
      setAbierto={setAbierto}
      disparador={children}
    >
      <FormularioConsulta
        accion={crearConsultaAccion.bind(null, mascotaId, true)}
        valores={{
          fecha: hoyInput(),
          motivo: "",
          observacion: "",
          tratamiento: "",
          complementarios: [],
        }}
        volverA={`/pacientes/${mascotaId}`}
        textoEnviar="Guardar consulta"
        enModal
        onExito={alGuardar}
      />
    </Contenedor>
  );
}

export function DialogoEditarConsulta({
  consultaId,
  mascotaId,
  fecha,
  valores,
  children,
}: {
  consultaId: number;
  mascotaId: number;
  fecha: string;
  valores: ValoresConsulta;
  children: React.ReactNode;
}) {
  const [abierto, setAbierto] = useState(false);
  useCerrarAlNavegar(setAbierto);
  const alGuardar = useCerrarConAviso(setAbierto, "Cambios guardados");

  return (
    <Contenedor
      titulo="Editar consulta"
      descripcion={`Consulta del ${fecha}.`}
      abierto={abierto}
      setAbierto={setAbierto}
      disparador={children}
    >
      <FormularioConsulta
        accion={actualizarConsultaAccion.bind(null, consultaId, mascotaId, true)}
        valores={valores}
        volverA={`/pacientes/${mascotaId}`}
        textoEnviar="Guardar cambios"
        enModal
        onExito={alGuardar}
      />
    </Contenedor>
  );
}

// ---------------------------------------------------------------------------
// Estudios
// ---------------------------------------------------------------------------

export function DialogoEstudios({
  consultaId,
  fecha,
  paciente,
  children,
}: {
  consultaId: number;
  fecha: string;
  paciente: string;
  children: React.ReactNode;
}) {
  const [abierto, setAbierto] = useState(false);
  const [datos, setDatos] = useState<EstudiosCargados | null>(null);
  const [fallo, setFallo] = useState(false);
  const [cargando, iniciarCarga] = useTransition();
  useCerrarAlNavegar(setAbierto);

  // Sin el try, una acción que falla se relanza durante el render y la atrapa
  // el límite de error de la ruta: la ficha entera se cae por no haber podido
  // leer los adjuntos de una consulta.
  const recargar = useCallback(() => {
    iniciarCarga(async () => {
      try {
        setDatos(await cargarEstudiosAccion(consultaId));
        setFallo(false);
      } catch {
        setFallo(true);
      }
    });
  }, [consultaId]);

  // Se piden al abrir y no antes: la ficha de un paciente con doce consultas
  // firmaría las direcciones de todos sus adjuntos para no mostrar ninguno.
  useEffect(() => {
    if (abierto) recargar();
  }, [abierto, recargar]);

  return (
    <Contenedor
      titulo="Estudios"
      descripcion={`Consulta del ${fecha}, de ${paciente}.`}
      abierto={abierto}
      setAbierto={setAbierto}
      disparador={children}
    >
      <div className="flex flex-col gap-5">
        {fallo && (
          <ErrorState
            title="No se pudieron cargar los estudios"
            message="Puede ser un problema de conexión con el almacenamiento o con la base."
            action={
              <Button variant="outline" size="sm" onClick={recargar} loading={cargando}>
                <ArrowClockwise size={15} weight="bold" />
                Reintentar
              </Button>
            }
          />
        )}

        {!fallo && datos === null && cargando && (
          <>
            <Skeleton className="h-36 rounded-lg" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Skeleton className="aspect-4/3 rounded-lg" />
              <Skeleton className="aspect-4/3 rounded-lg" />
              <Skeleton className="aspect-4/3 rounded-lg" />
            </div>
          </>
        )}

        {!fallo && datos && !datos.hayBucket && (
          <Alert variant="warning">
            Faltan las credenciales del bucket, así que no se pueden ver ni subir
            archivos.
          </Alert>
        )}

        {!fallo && datos?.hayBucket && <SubirEstudio consultaId={consultaId} onCambio={recargar} />}

        {!fallo && datos && datos.items.length === 0 && (
          <EmptyState
            icon={<Paperclip />}
            title="Sin estudios adjuntos"
            description="Subí radiografías, ecografías, análisis o cualquier archivo que acompañe a esta consulta."
          />
        )}

        {!fallo && datos && datos.items.length > 0 && (
          <GaleriaEstudios items={datos.items} onCambio={recargar} />
        )}
      </div>
    </Contenedor>
  );
}
