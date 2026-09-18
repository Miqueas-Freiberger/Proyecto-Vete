import type { NextConfig } from "next";

/**
 * Las imágenes de los estudios llegan desde el bucket con una URL firmada que
 * vence, así que el host se autoriza por variable de entorno en vez de estar
 * escrito acá.
 */
function hostDelBucket(): string | null {
  const bucket = process.env.S3_BUCKET;
  const endpoint = process.env.S3_ENDPOINT;
  if (!bucket || !endpoint) return null;
  try {
    return `${bucket}.${new URL(endpoint).host}`;
  } catch {
    return null;
  }
}

const host = hostDelBucket();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: host
      ? [{ protocol: "https", hostname: host, pathname: "/**" }]
      : [],
    formats: ["image/webp"],
  },
  // El paquete de iconos exporta miles de componentes desde un solo indice.
  // Sin esto, una pantalla que usa cuatro iconos arrastra el barril entero.
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
    // El cliente de MySQL y el SDK de S3 no deben entrar en el bundle del cliente.
    serverActions: { bodySizeLimit: "26mb" },
  },
};

export default nextConfig;
