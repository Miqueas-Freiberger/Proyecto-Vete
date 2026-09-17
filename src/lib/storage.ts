import "server-only";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomBytes } from "node:crypto";

/**
 * Adjuntos de las consultas: fotos, radiografias, analisis y PDFs.
 *
 * Viven en un bucket compatible con S3. La clave del objeto es la misma ruta
 * relativa que ya guardaba la base ("images/historial/ abc123.jpg"), asi que
 * los registros heredados siguen resolviendo sin migrar nada.
 */

const MINUTOS_IMAGEN = 60;
const MINUTOS_DESCARGA = 5;

export type ConfigBucket = {
  bucket: string;
  endpoint: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
};

export function configBucket(): ConfigBucket | null {
  const bucket = process.env.S3_BUCKET;
  const endpoint = process.env.S3_ENDPOINT;
  const accessKeyId = process.env.S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

  if (!bucket || !endpoint || !accessKeyId || !secretAccessKey) return null;

  return {
    bucket,
    endpoint,
    region: process.env.S3_REGION || "auto",
    accessKeyId,
    secretAccessKey,
  };
}

export function bucketDisponible(): boolean {
  return configBucket() !== null;
}

let clienteCache: S3Client | null = null;

function cliente(cfg: ConfigBucket): S3Client {
  if (!clienteCache) {
    clienteCache = new S3Client({
      region: cfg.region,
      endpoint: cfg.endpoint,
      credentials: {
        accessKeyId: cfg.accessKeyId,
        secretAccessKey: cfg.secretAccessKey,
      },
      // El bucket se sirve como subdominio del endpoint.
      forcePathStyle: false,
    });
  }
  return clienteCache;
}

export type TipoAdjunto = "imagen" | "pdf" | "documento";

export function clasificar(tipoMime: string, nombre: string): TipoAdjunto {
  if (tipoMime === "application/pdf" || nombre.toLowerCase().endsWith(".pdf")) {
    return "pdf";
  }
  if (tipoMime.startsWith("image/")) return "imagen";
  return "documento";
}

/**
 * Genera la clave del objeto conservando el formato heredado, incluido el
 * espacio despues de la barra. No es lindo, pero cambiarlo partiria en dos el
 * criterio de busqueda de los 93 adjuntos que ya existen.
 */
export function generarClave(tipo: TipoAdjunto): { clave: string; nombreArchivo: string } {
  const unico = `${Date.now().toString(16)}${randomBytes(3).toString("hex")}`;
  if (tipo === "imagen") {
    const nombreArchivo = `${unico}.jpg`;
    return { clave: `images/historial/ ${nombreArchivo}`, nombreArchivo };
  }
  const extension = tipo === "pdf" ? "pdf" : "doc";
  const nombreArchivo = `${unico}.${extension}`;
  return { clave: `archivos/historial/ ${nombreArchivo}`, nombreArchivo };
}

export async function subirArchivo(
  clave: string,
  contenido: Buffer,
  tipoMime: string,
): Promise<void> {
  const cfg = configBucket();
  if (!cfg) throw new Error("No hay bucket configurado para guardar adjuntos.");

  await cliente(cfg).send(
    new PutObjectCommand({
      Bucket: cfg.bucket,
      Key: clave,
      Body: contenido,
      ContentType: tipoMime,
    }),
  );
}

/**
 * URL temporal de lectura. El navegador la pide directo al bucket, sin que el
 * archivo pase por el servidor de la aplicacion.
 */
export async function urlLectura(
  clave: string,
  opciones: { descarga?: boolean; nombre?: string; tipoMime?: string } = {},
): Promise<string | null> {
  const cfg = configBucket();
  if (!cfg) return null;

  const minutos = opciones.descarga ? MINUTOS_DESCARGA : MINUTOS_IMAGEN;

  try {
    return await getSignedUrl(
      cliente(cfg),
      new GetObjectCommand({
        Bucket: cfg.bucket,
        Key: clave,
        ResponseContentType: opciones.tipoMime,
        ResponseContentDisposition: opciones.nombre
          ? `${opciones.descarga ? "attachment" : "inline"}; filename="${sanearNombre(opciones.nombre)}"`
          : undefined,
      }),
      { expiresIn: minutos * 60 },
    );
  } catch {
    return null;
  }
}

export async function borrarArchivo(clave: string): Promise<void> {
  const cfg = configBucket();
  if (!cfg) return;
  try {
    await cliente(cfg).send(new DeleteObjectCommand({ Bucket: cfg.bucket, Key: clave }));
  } catch {
    // Que falte el objeto no debe impedir borrar el registro.
  }
}

/** Las comillas y los saltos de linea romperian la cabecera. */
function sanearNombre(nombre: string): string {
  return nombre.replace(/["\r\n]/g, "").slice(0, 120) || "archivo";
}

/** El host del bucket, para autorizarlo en la configuracion de imagenes. */
export function hostBucket(): string | null {
  const cfg = configBucket();
  if (!cfg) return null;
  try {
    return `${cfg.bucket}.${new URL(cfg.endpoint).host}`;
  } catch {
    return null;
  }
}
