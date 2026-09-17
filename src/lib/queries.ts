import "server-only";
import { execute, query, queryOne } from "./db";

/**
 * Acceso a datos.
 *
 * Los nombres de columna vienen del esquema heredado y se mapean aca a algo
 * manejable. La columna `id_dueño_fk` lleva eñe: va siempre entre backticks.
 */

export type Cliente = {
  id: number;
  nombre: string;
  dni: number;
  telefono: string;
  email: string;
  direccion: string;
  localidad: string;
};

export type ClienteConMascotas = Cliente & {
  mascotas: number;
};

export type Mascota = {
  id: number;
  nombre: string;
  especie: string;
  nacimiento: string;
  sexo: string;
  raza: string;
  color: string;
  tamano: string;
  esterilizado: string;
  ingreso: string;
  duenoId: number;
};

export type MascotaConDueno = Mascota & {
  duenoNombre: string;
  consultas: number;
  ultimaConsulta: string | null;
};

export type Consulta = {
  id: number;
  observacion: string;
  motivo: string;
  tratamiento: string;
  complementarios: string;
  fecha: string;
  mascotaId: number;
};

export type Adjunto = {
  id: number;
  nombre: string;
  ruta: string;
  extension: string;
  nuevoNombre: string;
  esDocumento: boolean;
  consultaId: number;
};

const CAMPOS_CLIENTE = `
  id,
  NombreApellido AS nombre,
  Dni            AS dni,
  Telefono       AS telefono,
  Email          AS email,
  Direccion      AS direccion,
  Localidad      AS localidad
`;

const CAMPOS_MASCOTA = `
  p.id,
  p.Nombre        AS nombre,
  p.Especie       AS especie,
  p.Nacimiento    AS nacimiento,
  p.Sexo          AS sexo,
  p.Raza          AS raza,
  p.Color         AS color,
  p.Tamano        AS tamano,
  p.Esterilizado  AS esterilizado,
  p.FechaIngreso  AS ingreso,
  p.\`id_dueño_fk\` AS duenoId
`;

const CAMPOS_CONSULTA = `
  id,
  Observacion     AS observacion,
  MotivoConsulta  AS motivo,
  Tratamiento     AS tratamiento,
  Complementarios AS complementarios,
  Fecha           AS fecha,
  id_mascota_fk   AS mascotaId
`;

// ---------------------------------------------------------------------------
// Clientes
// ---------------------------------------------------------------------------

export type PaginaClientes = {
  clientes: ClienteConMascotas[];
  total: number;
  pagina: number;
  paginas: number;
  porPagina: number;
};

export async function listarClientes(opciones: {
  busqueda?: string;
  pagina?: number;
  porPagina?: number;
}): Promise<PaginaClientes> {
  const porPagina = Math.min(Math.max(opciones.porPagina ?? 24, 6), 96);
  const pagina = Math.max(opciones.pagina ?? 1, 1);
  const busqueda = opciones.busqueda?.trim() ?? "";

  // La busqueda cubre nombre, telefono, localidad y documento, porque en el
  // mostrador se busca por lo que el cliente diga primero.
  const filtro = busqueda
    ? `WHERE c.NombreApellido LIKE ?
         OR c.Telefono LIKE ?
         OR c.Localidad LIKE ?
         OR CAST(c.Dni AS CHAR) LIKE ?`
    : "";
  const comodin = `%${busqueda}%`;
  const parametros = busqueda ? [comodin, comodin, comodin, comodin] : [];

  const totalFila = await queryOne<{ total: number }>(
    `SELECT COUNT(*) AS total FROM clientes c ${filtro}`,
    parametros,
  );
  const total = Number(totalFila?.total ?? 0);
  const paginas = Math.max(Math.ceil(total / porPagina), 1);
  const paginaSegura = Math.min(pagina, paginas);
  const desde = (paginaSegura - 1) * porPagina;

  // LIMIT y OFFSET se interpolan porque mysql2 los manda como cadena en
  // sentencias preparadas y MySQL rechaza eso.
  const clientes = await query<ClienteConMascotas>(
    `SELECT
       c.id,
       c.NombreApellido AS nombre,
       c.Dni            AS dni,
       c.Telefono       AS telefono,
       c.Email          AS email,
       c.Direccion      AS direccion,
       c.Localidad      AS localidad,
       COUNT(p.id)      AS mascotas
     FROM clientes c
     LEFT JOIN paciente p ON p.\`id_dueño_fk\` = c.id
     ${filtro}
     GROUP BY c.id
     ORDER BY c.NombreApellido ASC
     LIMIT ${porPagina} OFFSET ${desde}`,
    parametros,
  );

  return {
    clientes: clientes.map((c) => ({ ...c, mascotas: Number(c.mascotas) })),
    total,
    pagina: paginaSegura,
    paginas,
    porPagina,
  };
}

export async function obtenerCliente(id: number): Promise<Cliente | null> {
  return queryOne<Cliente>(`SELECT ${CAMPOS_CLIENTE} FROM clientes WHERE id = ?`, [id]);
}

export async function crearCliente(datos: {
  nombre: string;
  dni: number;
  telefono: string;
  email: string;
  direccion: string;
  localidad: string;
}): Promise<number> {
  const r = await execute(
    `INSERT INTO clientes (NombreApellido, Dni, Telefono, Email, Direccion, Localidad)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [datos.nombre, datos.dni, datos.telefono, datos.email, datos.direccion, datos.localidad],
  );
  return r.insertId;
}

export async function actualizarCliente(
  id: number,
  datos: {
    nombre: string;
    dni: number;
    telefono: string;
    email: string;
    direccion: string;
    localidad: string;
  },
): Promise<void> {
  await execute(
    `UPDATE clientes
     SET NombreApellido = ?, Dni = ?, Telefono = ?, Email = ?, Direccion = ?, Localidad = ?
     WHERE id = ?`,
    [datos.nombre, datos.dni, datos.telefono, datos.email, datos.direccion, datos.localidad, id],
  );
}

/** Las claves foraneas borran en cascada mascotas, consultas y adjuntos. */
export async function borrarCliente(id: number): Promise<void> {
  await execute("DELETE FROM clientes WHERE id = ?", [id]);
}

// ---------------------------------------------------------------------------
// Mascotas
// ---------------------------------------------------------------------------

export async function mascotasDeCliente(clienteId: number): Promise<MascotaConDueno[]> {
  return query<MascotaConDueno>(
    `SELECT
       ${CAMPOS_MASCOTA},
       c.NombreApellido AS duenoNombre,
       COUNT(h.id)      AS consultas,
       MAX(h.Fecha)     AS ultimaConsulta
     FROM paciente p
     JOIN clientes c ON c.id = p.\`id_dueño_fk\`
     LEFT JOIN historial h ON h.id_mascota_fk = p.id
     WHERE p.\`id_dueño_fk\` = ?
     GROUP BY p.id
     ORDER BY p.Nombre ASC`,
    [clienteId],
  ).then((filas) => filas.map((f) => ({ ...f, consultas: Number(f.consultas) })));
}

export async function obtenerMascota(id: number): Promise<MascotaConDueno | null> {
  const fila = await queryOne<MascotaConDueno>(
    `SELECT
       ${CAMPOS_MASCOTA},
       c.NombreApellido AS duenoNombre,
       COUNT(h.id)      AS consultas,
       MAX(h.Fecha)     AS ultimaConsulta
     FROM paciente p
     JOIN clientes c ON c.id = p.\`id_dueño_fk\`
     LEFT JOIN historial h ON h.id_mascota_fk = p.id
     WHERE p.id = ?
     GROUP BY p.id`,
    [id],
  );
  return fila ? { ...fila, consultas: Number(fila.consultas) } : null;
}

export async function crearMascota(datos: {
  nombre: string;
  especie: string;
  nacimiento: string;
  sexo: string;
  raza: string;
  color: string;
  tamano: string;
  esterilizado: string;
  ingreso: string;
  duenoId: number;
}): Promise<number> {
  const r = await execute(
    `INSERT INTO paciente
       (Nombre, Especie, Nacimiento, Sexo, Raza, Color, Tamano, Esterilizado, FechaIngreso, \`id_dueño_fk\`)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      datos.nombre, datos.especie, datos.nacimiento, datos.sexo, datos.raza,
      datos.color, datos.tamano, datos.esterilizado, datos.ingreso, datos.duenoId,
    ],
  );
  return r.insertId;
}

export async function actualizarMascota(
  id: number,
  datos: {
    nombre: string;
    especie: string;
    nacimiento: string;
    sexo: string;
    raza: string;
    color: string;
    tamano: string;
    esterilizado: string;
    ingreso: string;
  },
): Promise<void> {
  await execute(
    `UPDATE paciente
     SET Nombre = ?, Especie = ?, Nacimiento = ?, Sexo = ?, Raza = ?,
         Color = ?, Tamano = ?, Esterilizado = ?, FechaIngreso = ?
     WHERE id = ?`,
    [
      datos.nombre, datos.especie, datos.nacimiento, datos.sexo, datos.raza,
      datos.color, datos.tamano, datos.esterilizado, datos.ingreso, id,
    ],
  );
}

export async function borrarMascota(id: number): Promise<void> {
  await execute("DELETE FROM paciente WHERE id = ?", [id]);
}

// ---------------------------------------------------------------------------
// Consultas
// ---------------------------------------------------------------------------

export async function consultasDeMascota(mascotaId: number): Promise<Consulta[]> {
  return query<Consulta>(
    `SELECT ${CAMPOS_CONSULTA} FROM historial
     WHERE id_mascota_fk = ?
     ORDER BY Fecha DESC, id DESC`,
    [mascotaId],
  );
}

/** Cuántos estudios tiene cada consulta, para no pedirlos uno por uno. */
export async function conteoAdjuntosPorConsulta(
  mascotaId: number,
): Promise<Map<number, number>> {
  const filas = await query<{ consultaId: number; total: number }>(
    `SELECT i.id_historial_fk AS consultaId, COUNT(*) AS total
     FROM imagenes i
     JOIN historial h ON h.id = i.id_historial_fk
     WHERE h.id_mascota_fk = ?
     GROUP BY i.id_historial_fk`,
    [mascotaId],
  );
  return new Map(filas.map((f) => [Number(f.consultaId), Number(f.total)]));
}

export async function obtenerConsulta(id: number): Promise<Consulta | null> {
  return queryOne<Consulta>(`SELECT ${CAMPOS_CONSULTA} FROM historial WHERE id = ?`, [id]);
}

export async function crearConsulta(datos: {
  mascotaId: number;
  observacion: string;
  motivo: string;
  tratamiento: string;
  complementarios: string;
  fecha: string;
}): Promise<number> {
  const r = await execute(
    `INSERT INTO historial
       (Observacion, MotivoConsulta, Tratamiento, Complementarios, Fecha, id_mascota_fk)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      datos.observacion, datos.motivo, datos.tratamiento,
      datos.complementarios, datos.fecha, datos.mascotaId,
    ],
  );
  return r.insertId;
}

export async function actualizarConsulta(
  id: number,
  datos: {
    observacion: string;
    motivo: string;
    tratamiento: string;
    complementarios: string;
    fecha: string;
  },
): Promise<void> {
  await execute(
    `UPDATE historial
     SET Observacion = ?, MotivoConsulta = ?, Tratamiento = ?, Complementarios = ?, Fecha = ?
     WHERE id = ?`,
    [datos.observacion, datos.motivo, datos.tratamiento, datos.complementarios, datos.fecha, id],
  );
}

export async function borrarConsulta(id: number): Promise<void> {
  await execute("DELETE FROM historial WHERE id = ?", [id]);
}

// ---------------------------------------------------------------------------
// Adjuntos
// ---------------------------------------------------------------------------

export async function adjuntosDeConsulta(consultaId: number): Promise<Adjunto[]> {
  const filas = await query<Adjunto & { booleanFlag: number }>(
    `SELECT
       id,
       nombre,
       ruta,
       extension,
       nuevoNombre,
       booleanFlag,
       id_historial_fk AS consultaId
     FROM imagenes
     WHERE id_historial_fk = ?
     ORDER BY id ASC`,
    [consultaId],
  );
  return filas.map(({ booleanFlag, ...resto }) => ({
    ...resto,
    esDocumento: Number(booleanFlag) === 1,
  }));
}

export async function obtenerAdjunto(id: number): Promise<Adjunto | null> {
  const fila = await queryOne<Adjunto & { booleanFlag: number }>(
    `SELECT id, nombre, ruta, extension, nuevoNombre, booleanFlag, id_historial_fk AS consultaId
     FROM imagenes WHERE id = ?`,
    [id],
  );
  if (!fila) return null;
  const { booleanFlag, ...resto } = fila;
  return { ...resto, esDocumento: Number(booleanFlag) === 1 };
}

export async function crearAdjunto(datos: {
  nombre: string;
  ruta: string;
  extension: string;
  nuevoNombre: string;
  esDocumento: boolean;
  consultaId: number;
}): Promise<number> {
  const r = await execute(
    `INSERT INTO imagenes (nombre, ruta, extension, nuevoNombre, booleanFlag, id_historial_fk)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      datos.nombre, datos.ruta, datos.extension, datos.nuevoNombre,
      // booleanFlag es int: con sql_mode estricto un booleano de JS no entra.
      datos.esDocumento ? 1 : 0,
      datos.consultaId,
    ],
  );
  return r.insertId;
}

export async function borrarAdjunto(id: number): Promise<void> {
  await execute("DELETE FROM imagenes WHERE id = ?", [id]);
}

// ---------------------------------------------------------------------------
// Resumen
// ---------------------------------------------------------------------------

export type Resumen = {
  clientes: number;
  mascotas: number;
  consultas: number;
  consultasUltimoMes: number;
};

export async function obtenerResumen(): Promise<Resumen> {
  const fila = await queryOne<Resumen>(
    `SELECT
       (SELECT COUNT(*) FROM clientes)  AS clientes,
       (SELECT COUNT(*) FROM paciente)  AS mascotas,
       (SELECT COUNT(*) FROM historial) AS consultas,
       (SELECT COUNT(*) FROM historial
         WHERE Fecha >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) AS consultasUltimoMes`,
  );
  return {
    clientes: Number(fila?.clientes ?? 0),
    mascotas: Number(fila?.mascotas ?? 0),
    consultas: Number(fila?.consultas ?? 0),
    consultasUltimoMes: Number(fila?.consultasUltimoMes ?? 0),
  };
}
