"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle, UploadSimple } from "@phosphor-icons/react";
import { toast } from "sonner";

import { subirEstudioAccion, type EstadoSubida } from "@/app/acciones/consultas";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const INICIAL: EstadoSubida = {};
const LIMITE_MB = 25;

/**
 * Subida de un estudio.
 *
 * Acepta arrastrar y soltar además del selector, porque en el consultorio la
 * radiografía suele llegar como archivo desde otra ventana.
 *
 * Al terminar bien, la acción devuelve un sello nuevo y eso remonta el campo,
 * que vuelve vacío solo. Es más limpio que resetear el formulario a mano.
 */
export function SubirEstudio({
  consultaId,
  onCambio,
}: {
  consultaId: number;
  /** Dentro del modal la grilla no se rearma sola: hay que pedirla de nuevo. */
  onCambio?: () => void;
}) {
  const [estado, enviar] = useActionState(
    subirEstudioAccion.bind(null, consultaId),
    INICIAL,
  );

  // La subida no navega a ningún lado, así que sin este aviso la única señal
  // de que salió bien es que la grilla creció.
  useEffect(() => {
    if (!estado.ok) return;
    toast.success("Estudio subido");
    onCambio?.();
  }, [estado.ok, estado.sello, onCambio]);

  return (
    <form action={enviar} className="flex flex-col gap-3">
      {estado.error && <Alert>{estado.error}</Alert>}
      <ZonaArchivo key={estado.sello ?? 0} recienSubido={Boolean(estado.ok)} />
    </form>
  );
}

function ZonaArchivo({ recienSubido }: { recienSubido: boolean }) {
  const campo = useRef<HTMLInputElement>(null);
  const [nombre, setNombre] = useState<string | null>(null);
  const [encima, setEncima] = useState(false);

  function tomarArchivo(archivos: FileList | null) {
    const archivo = archivos?.[0];
    if (!archivo || !campo.current) return;
    const contenedor = new DataTransfer();
    contenedor.items.add(archivo);
    campo.current.files = contenedor.files;
    setNombre(archivo.name);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setEncima(true);
      }}
      onDragLeave={() => setEncima(false)}
      onDrop={(e) => {
        e.preventDefault();
        setEncima(false);
        tomarArchivo(e.dataTransfer.files);
      }}
      className={`flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-5 py-8 text-center transition-colors ${
        encima ? "border-primary bg-primary-soft" : "border-border-strong bg-card"
      }`}
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary-strong dark:text-primary">
        {recienSubido && !nombre ? (
          <CheckCircle size={22} weight="fill" aria-hidden />
        ) : (
          <UploadSimple size={20} aria-hidden />
        )}
      </span>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-foreground">
          {nombre ?? (recienSubido ? "Estudio subido" : "Arrastrá un archivo o elegilo")}
        </p>
        <p className="text-[12px] text-muted-foreground">
          Imágenes, PDF o Word. Hasta {LIMITE_MB} MB.
        </p>
      </div>

      <input
        ref={campo}
        type="file"
        name="archivo"
        accept="image/jpeg,image/png,image/webp,image/heic,application/pdf,.doc,.docx"
        onChange={(e) => setNombre(e.target.files?.[0]?.name ?? null)}
        className="sr-only"
        id="archivo-estudio"
      />

      <div className="flex items-center gap-2">
        <Button asChild variant="outline" size="sm">
          <label htmlFor="archivo-estudio" className="cursor-pointer">
            Elegir archivo
          </label>
        </Button>
        {nombre && <BotonSubir />}
      </div>
    </div>
  );
}

function BotonSubir() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" loading={pending}>
      {pending ? "Subiendo" : "Subir"}
    </Button>
  );
}
