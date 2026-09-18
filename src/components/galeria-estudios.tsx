"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowSquareOut,
  CaretLeft,
  CaretRight,
  FileDoc,
  FilePdf,
  ImageBroken,
  X,
} from "@phosphor-icons/react";

import { borrarEstudioAccion } from "@/app/acciones/consultas";
import { ConfirmarBorrado } from "./confirmar-borrado";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

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
export function GaleriaEstudios({
  items,
  onCambio,
}: {
  items: ItemEstudio[];
  onCambio?: () => void;
}) {
  const [rotas, setRotas] = useState<Set<number>>(new Set());
  const [abierta, setAbierta] = useState<number | null>(null);

  // 29 de los adjuntos heredados tienen registro pero ya no tienen archivo. La
  // dirección se firma igual, así que el faltante solo se nota al cargarla.
  const imagenes = items.filter(
    (item) => !item.esDocumento && item.url && !rotas.has(item.id),
  );

  function marcarRota(id: number) {
    setRotas((previas) => new Set(previas).add(id));
  }

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
            <Card className="group relative flex h-full flex-col overflow-hidden transition-shadow hover:shadow-e2">
              {item.esDocumento ? (
                <DocumentoLink item={item} />
              ) : item.url && !rotas.has(item.id) ? (
                <button
                  type="button"
                  onClick={() => setAbierta(item.id)}
                  className="relative aspect-4/3 w-full overflow-hidden bg-muted"
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

              <div className="flex items-center gap-2 border-t border-border px-3 py-2">
                <p className="min-w-0 flex-1 truncate text-[12.5px] text-muted-foreground">
                  {item.nombre}
                </p>
                <ConfirmarBorrado
                  accion={borrarEstudioAccion.bind(null, item.id)}
                  titulo="¿Borrar este estudio?"
                  detalle="Se elimina el archivo y su registro. No se puede deshacer."
                  confirmar="Borrar estudio"
                  etiqueta="Borrar estudio"
                  soloIcono
                  onHecho={onCambio}
                />
              </div>
            </Card>
          </li>
        ))}
      </ul>

      {/* Atado a la imagen y no al id: si el archivo se marcó como faltante
          mientras estaba abierta, el diálogo se quedaría sin título y Radix
          pierde el nombre accesible. */}
      <Dialog open={activa !== null} onOpenChange={(v) => !v && setAbierta(null)}>
        <DialogContent
          showClose={false}
          className="max-h-[92dvh] w-[calc(100vw-1.5rem)] max-w-4xl overflow-hidden p-0"
        >
          {activa && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                <DialogTitle className="min-w-0 flex-1 truncate pr-0 text-[13px] font-medium">
                  {activa.nombre}
                </DialogTitle>
                {imagenes.length > 1 && (
                  <span className="cifra shrink-0 text-[12px] text-muted-foreground">
                    {imagenes.findIndex((i) => i.id === activa.id) + 1}/{imagenes.length}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setAbierta(null)}
                  aria-label="Cerrar"
                  className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <X size={16} aria-hidden />
                </button>
              </div>

              <div className="relative flex items-center justify-center bg-muted">
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
        </DialogContent>
      </Dialog>
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
      className={`absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground backdrop-blur transition-colors hover:bg-card ${
        lado === "izquierda" ? "left-3" : "right-3"
      }`}
    >
      {lado === "izquierda" ? (
        <CaretLeft size={17} weight="bold" aria-hidden />
      ) : (
        <CaretRight size={17} weight="bold" aria-hidden />
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
      className="flex aspect-4/3 w-full flex-col items-center justify-center gap-2 bg-muted text-muted-foreground transition-colors hover:text-primary"
    >
      {esPdf ? <FilePdf size={34} aria-hidden /> : <FileDoc size={34} aria-hidden />}
      <span className="inline-flex items-center gap-1 text-[12px] font-medium">
        Abrir
        <ArrowSquareOut size={12} aria-hidden />
      </span>
    </a>
  );
}

function Faltante() {
  return (
    <div className="flex aspect-4/3 w-full flex-col items-center justify-center gap-2 bg-muted px-3 text-center text-muted-foreground">
      <ImageBroken size={30} aria-hidden />
      <span className="text-[12px]">El archivo ya no está disponible</span>
    </div>
  );
}
