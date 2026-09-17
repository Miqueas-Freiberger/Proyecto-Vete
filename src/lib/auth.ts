import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

/**
 * Sesion de usuario unico.
 *
 * La sesion vive en una cookie firmada, no en disco: asi sobrevive a los
 * despliegues y no depende de que todas las peticiones caigan en la misma
 * instancia, que era la limitacion de la version anterior.
 */

const COOKIE = "vete_sesion";
const DURACION_HORAS = 12;

function claveFirma(): Uint8Array {
  const secreto = process.env.AUTH_SECRET;
  if (!secreto || secreto.length < 32) {
    throw new Error(
      "Falta AUTH_SECRET, o es demasiado corto. Generar uno de 32 caracteres o mas.",
    );
  }
  return new TextEncoder().encode(secreto);
}

export function credencialesConfiguradas(): boolean {
  return Boolean(process.env.APP_AUTH_USER && process.env.APP_AUTH_PASSWORD_HASH);
}

/**
 * Verifica usuario y contraseña.
 *
 * El hash guardado lo genero PHP, que usa el prefijo $2y$. Es el mismo bcrypt
 * que $2a$, pero bcryptjs solo reconoce el segundo, asi que se traduce.
 */
export async function verificarCredenciales(
  usuario: string,
  contrasena: string,
): Promise<boolean> {
  const usuarioEsperado = process.env.APP_AUTH_USER;
  const hash = process.env.APP_AUTH_PASSWORD_HASH;
  if (!usuarioEsperado || !hash) return false;

  const hashCompatible = hash.startsWith("$2y$") ? `$2a$${hash.slice(4)}` : hash;

  // Se comparan las dos cosas siempre, para no filtrar por tiempo de respuesta
  // si el usuario existe o no.
  const usuarioOk = usuario === usuarioEsperado;
  const claveOk = await bcrypt.compare(contrasena, hashCompatible);
  return usuarioOk && claveOk;
}

export async function abrirSesion(usuario: string): Promise<void> {
  const token = await new SignJWT({ usuario })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${DURACION_HORAS}h`)
    .sign(claveFirma());

  const almacen = await cookies();
  almacen.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DURACION_HORAS * 60 * 60,
  });
}

export async function cerrarSesion(): Promise<void> {
  const almacen = await cookies();
  almacen.delete(COOKIE);
}

export async function sesionActiva(): Promise<string | null> {
  const almacen = await cookies();
  const token = almacen.get(COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, claveFirma());
    return typeof payload.usuario === "string" ? payload.usuario : null;
  } catch {
    // Token vencido, alterado o firmado con otro secreto.
    return null;
  }
}
