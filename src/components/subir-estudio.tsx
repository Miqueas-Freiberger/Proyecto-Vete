"use client";

import { useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { subirEstudioAccion, type EstadoSubida } from "@/app/acciones/consultas";
import { AvisoError, Boton } from "./ui";
import { CheckCircle, SpinnerGap, UploadSimple } from "@phosphor-icons/react";

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
export function SubirEstudio({ consultaId }: { consultaId: number }) {
  const [estado, enviar] = useActionState(
    subirEstudioAccion.bind(null, consultaId),
    INICIAL,
  );

  return (
    <form action={enviar} className="flex flex-col gap-3">
      {estado.error && <AvisoError>{estado.error}</AvisoError>}
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
      className={`flex flex-col items-center justify-center gap-3 rounded-[var(--radius-superficie)] border border-dashed px-5 py-8 text-center transition-colors ${
        encima ? "border-acento bg-acento-suave" : "border-borde-fuerte bg-superficie"
      }`}
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-acento-suave text-acento">
        {recienSubido && !nombre ? (
          <CheckCircle size={22} weight="fill" />
        ) : (
          <UploadSimple size={20} />
        )}
      </span>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-tinta">
          {nombre ?? (recienSubido ? "Estudio subido" : "Arrastrá un archivo o elegilo")}
        </p>
        <p className="text-[12px] text-tinta-suave">
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
        <label
          htmlFor="archivo-estudio"
          className="inline-flex h-9 cursor-pointer items-center justify-center rounded-[var(--radius-control)] border border-borde-fuerte bg-superficie px-3 text-[13px] font-medium text-tinta transition-colors hover:bg-superficie-alta active:translate-y-[1px]"
        >
          Elegir archivo
        </label>
        {nombre && <BotonSubir />}
      </div>
    </div>
  );
}

function BotonSubir() {
  const { pending } = useFormStatus();
  return (
    <Boton type="submit" tono="primario" medida="sm" disabled={pending}>
      {pending && <SpinnerGap size={14} className="animate-spin" />}
      {pending ? "Subiendo" : "Subir"}
    </Boton>
  );
}
