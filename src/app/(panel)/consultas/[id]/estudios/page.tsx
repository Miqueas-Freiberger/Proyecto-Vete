import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Paperclip } from "@phosphor-icons/react/dist/ssr";

import { adjuntosDeConsulta, obtenerConsulta, obtenerMascota } from "@/lib/queries";
import { fechaCorta, fechaLarga, limpiar, titulo } from "@/lib/format";
import { bucketDisponible, urlLectura } from "@/lib/storage";
import { Migas } from "@/components/migas";
import { GaleriaEstudios } from "@/components/galeria-estudios";
import { SubirEstudio } from "@/components/subir-estudio";
import { Alert } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/states";

export const metadata: Metadata = { title: "Estudios" };

export default async function PaginaEstudios({
  params,
}: PageProps<"/consultas/[id]/estudios">) {
  const { id } = await params;
  const consultaId = Number(id);
  if (!Number.isInteger(consultaId) || consultaId <= 0) notFound();

  const consulta = await obtenerConsulta(consultaId);
  if (!consulta) notFound();

  const mascota = await obtenerMascota(consulta.mascotaId);
  if (!mascota) notFound();

  const adjuntos = await adjuntosDeConsulta(consultaId);
  const hayBucket = bucketDisponible();

  // Las direcciones se firman en el servidor y vencen. Un archivo que ya no
  // está en el bucket se marca como faltante en vez de romper la galería.
  const items = await Promise.all(
    adjuntos.map(async (adjunto) => ({
      id: adjunto.id,
      nombre: limpiar(adjunto.nombre) ?? adjunto.nuevoNombre,
      esDocumento: adjunto.esDocumento,
      tipo: adjunto.extension,
      url: hayBucket
        ? await urlLectura(adjunto.ruta, {
            descarga: adjunto.esDocumento,
            nombre: limpiar(adjunto.nombre) ?? adjunto.nuevoNombre,
            tipoMime: adjunto.extension || undefined,
          })
        : null,
    })),
  );

  const nombre = titulo(mascota.nombre) || "Sin nombre";

  return (
    <div className="flex flex-col gap-6">
      <Migas
        rutas={[
          { texto: "Clientes", href: "/" },
          { texto: nombre, href: `/pacientes/${mascota.id}` },
        ]}
        actual="Estudios"
      />

      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Estudios</h1>
        <p className="text-sm text-muted-foreground">
          Consulta del <span className="cifra">{fechaCorta(consulta.fecha)}</span>
          <span className="hidden sm:inline">, {fechaLarga(consulta.fecha)}</span>, de{" "}
          {nombre}.
        </p>
      </header>

      {!hayBucket && (
        <Alert variant="warning">
          Faltan las credenciales del bucket, así que no se pueden ver ni subir archivos.
        </Alert>
      )}

      {hayBucket && <SubirEstudio consultaId={consultaId} />}

      {items.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Paperclip />}
            title="Sin estudios adjuntos"
            description="Subí radiografías, ecografías, análisis o cualquier archivo que acompañe a esta consulta."
          />
        </Card>
      ) : (
        <GaleriaEstudios items={items} />
      )}
    </div>
  );
}
