"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { borrarEstudioAccion } from "@/app/acciones/consultas";
import { ConfirmarBorrado } from "./confirmar-borrado";
import { Panel } from "./ui";
import {
  ArrowSquareOut,
  CaretLeft,
  CaretRight,
  FilePdf,
  FileDoc,
  ImageBroken,
  X,
} from "@phosphor-icons/react";

export type ItemEstudio = {
  id: number;
  nombre: string;
  esDocumento: boolean;
  tipo: string;
  url: string | null;
};

/**
 * Galería de estudios.
 *
 * Las imágenes se ven ampliadas sin salir de la página y se puede pasar de una
 * a otra con las flechas, porque comparar dos radiografías es el uso real.
 * Los documentos abren en una pestaña nueva.
 */
export function GaleriaEstudios({ items }: { items: ItemEstudio[] }) {
  const [rotas, setRotas] = useState<Set<number>>(new Set());
  const [abierta, setAbierta] = useState<number | null>(null);
  const dialogo = useRef<HTMLDialogElement>(null);

  // 29 de los adjuntos heredados tienen registro pero ya no tienen archivo. La
  // dirección se firma igual, así que el faltante solo se nota al cargarla.
  const imagenes = items.filter(
    (item) => !item.esDocumento && item.url && !rotas.has(item.id),
  );

  function marcarRota(id: number) {
    setRotas((previas) => new Set(previas).add(id));
  }

  useEffect(() => {
    const elemento = dialogo.current;
    if (!elemento) return;
    if (abierta !== null && !elemento.open) elemento.showModal();
    if (abierta === null && elemento.open) elemento.close();
  }, [abierta]);

  const mover = useCallback(
    (paso: number) => {
      setAbierta((actual) => {
        if (actual === null || imagenes.length === 0) return actual;
        const indice = imagenes.findIndex((i) => i.id === actual);
        if (indice < 0) return actual;
        const siguiente = (indice + paso + imagenes.length) % imagenes.length;
        return imagenes[siguiente].id;
      });
    },
    [imagenes],
  );

  // Pasar de una radiografía a la siguiente con el teclado.
  useEffect(() => {
    if (abierta === null) return;
    function alTeclear(evento: KeyboardEvent) {
      if (evento.key === "ArrowRight") mover(1);
      if (evento.key === "ArrowLeft") mover(-1);
    }
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [abierta, mover]);

  const activa = imagenes.find((i) => i.id === abierta) ?? null;

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.id}>
            <Panel className="group relative flex h-full flex-col overflow-hidden">
              {item.esDocumento ? (
                <DocumentoLink item={item} />
              ) : item.url && !rotas.has(item.id) ? (
                <button
                  type="button"
                  onClick={() => setAbierta(item.id)}
                  className="relative aspect-4/3 w-full overflow-hidden bg-superficie-alta"
                  aria-label={`Ampliar ${item.nombre}`}
                >
                  <Image
                    src={item.url}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    onError={() => marcarRota(item.id)}
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </button>
              ) : (
                <Faltante />
              )}

              <div className="flex items-center gap-2 border-t border-borde px-3 py-2.5">
                <p className="min-w-0 flex-1 truncate text-[12.5px] text-tinta-media">
                  {item.nombre}
                </p>
                <ConfirmarBorrado
                  accion={borrarEstudioAccion.bind(null, item.id)}
                  titulo="¿Borrar este estudio?"
                  detalle="Se elimina el archivo y su registro. No se puede deshacer."
                  confirmar="Borrar estudio"
                  etiqueta="Borrar estudio"
                  soloIcono
                />
              </div>
            </Panel>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogo}
        onClose={() => setAbierta(null)}
        onClick={(evento) => {
          if (evento.target === dialogo.current) setAbierta(null);
        }}
        className="m-auto max-h-[92dvh] w-[calc(100vw-1.5rem)] max-w-4xl rounded-[var(--radius-superficie)] border border-borde bg-superficie p-0 backdrop:bg-black/70 backdrop:backdrop-blur-[2px] open:aparece"
      >
        {activa && (
          <div className="flex flex-col">
            <div className="flex items-center gap-2 border-b border-borde px-4 py-2.5">
              <p className="min-w-0 flex-1 truncate text-[13px] font-medium text-tinta">
                {activa.nombre}
              </p>
              {imagenes.length > 1 && (
                <span className="cifra shrink-0 text-[12px] text-tinta-suave">
                  {imagenes.findIndex((i) => i.id === activa.id) + 1}/{imagenes.length}
                </span>
              )}
              <button
                type="button"
                onClick={() => setAbierta(null)}
                aria-label="Cerrar"
                className="flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-control)] text-tinta-suave transition-colors hover:bg-superficie-alta hover:text-tinta"
              >
                <X size={16} />
              </button>
            </div>

            <div className="relative flex items-center justify-center bg-superficie-alta">
              {activa.url && (
                <Image
                  src={activa.url}
                  alt={activa.nombre}
                  width={1600}
                  height={1200}
                  className="max-h-[74dvh] w-auto object-contain"
                  priority
                />
              )}

              {imagenes.length > 1 && (
                <>
                  <Flecha lado="izquierda" alPulsar={() => mover(-1)} />
                  <Flecha lado="derecha" alPulsar={() => mover(1)} />
                </>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

function Flecha({
  lado,
  alPulsar,
}: {
  lado: "izquierda" | "derecha";
  alPulsar: () => void;
}) {
  return (
    <button
      type="button"
      onClick={alPulsar}
      aria-label={lado === "izquierda" ? "Anterior" : "Siguiente"}
      className={`absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-borde bg-superficie/90 text-tinta backdrop-blur transition-colors hover:bg-superficie ${
        lado === "izquierda" ? "left-3" : "right-3"
      }`}
    >
      {lado === "izquierda" ? (
        <CaretLeft size={17} weight="bold" />
      ) : (
        <CaretRight size={17} weight="bold" />
      )}
    </button>
  );
}

function DocumentoLink({ item }: { item: ItemEstudio }) {
  const esPdf = item.tipo === "application/pdf" || item.nombre.toLowerCase().endsWith(".pdf");

  if (!item.url) return <Faltante />;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex aspect-4/3 w-full flex-col items-center justify-center gap-2 bg-superficie-alta text-tinta-media transition-colors hover:text-acento"
    >
      {esPdf ? <FilePdf size={34} /> : <FileDoc size={34} />}
      <span className="inline-flex items-center gap-1 text-[12px] font-medium">
        Abrir
        <ArrowSquareOut size={12} />
      </span>
    </a>
  );
}

function Faltante() {
  return (
    <div className="flex aspect-4/3 w-full flex-col items-center justify-center gap-2 bg-superficie-alta px-3 text-center text-tinta-suave">
      <ImageBroken size={30} />
      <span className="text-[12px]">El archivo ya no está disponible</span>
    </div>
  );
}
