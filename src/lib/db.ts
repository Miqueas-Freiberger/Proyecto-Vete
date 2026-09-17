import "server-only";
import mysql from "mysql2/promise";

/**
 * Pool de conexiones a MySQL.
 *
 * El esquema viene de la aplicacion PHP anterior y no se toca: columnas en
 * castellano, una con eñe, y tipos flojos. La normalizacion ocurre al mapear,
 * no en la base.
 */

declare global {
  var __vetePool: mysql.Pool | undefined;
}

function buildConfig(): mysql.PoolOptions {
  const url =
    process.env.MYSQL_URL ??
    process.env.DATABASE_URL ??
    process.env.MYSQL_PUBLIC_URL;

  const base: mysql.PoolOptions = {
    waitForConnections: true,
    connectionLimit: 8,
    maxIdle: 4,
    idleTimeout: 60_000,
    enableKeepAlive: true,
    charset: "utf8mb4",
    // Las fechas se manejan como texto: la columna Fecha es DATE y convertirla
    // a Date de JS le aplicaria la zona horaria del servidor y correria el dia.
    dateStrings: true,
    timezone: "Z",
  };

  if (url) {
    const parsed = new URL(url);
    return {
      ...base,
      host: parsed.hostname,
      port: parsed.port ? Number(parsed.port) : 3306,
      user: decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      database: parsed.pathname.replace(/^\//, ""),
    };
  }

  return {
    ...base,
    host: process.env.MYSQLHOST ?? "127.0.0.1",
    port: Number(process.env.MYSQLPORT ?? 3306),
    user: process.env.MYSQLUSER ?? "root",
    password: process.env.MYSQLPASSWORD ?? "",
    database: process.env.MYSQLDATABASE ?? "db_veterinaria",
  };
}

export function getPool(): mysql.Pool {
  if (!globalThis.__vetePool) {
    globalThis.__vetePool = mysql.createPool(buildConfig());
  }
  return globalThis.__vetePool;
}

/** Los valores que acepta una sentencia preparada de mysql2. */
export type Parametro = string | number | boolean | null | Date;

export async function query<T>(sql: string, params: Parametro[] = []): Promise<T[]> {
  const [rows] = await getPool().execute(sql, params);
  return rows as T[];
}

export async function queryOne<T>(
  sql: string,
  params: Parametro[] = [],
): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}

export async function execute(
  sql: string,
  params: Parametro[] = [],
): Promise<mysql.ResultSetHeader> {
  const [result] = await getPool().execute(sql, params);
  return result as mysql.ResultSetHeader;
}
