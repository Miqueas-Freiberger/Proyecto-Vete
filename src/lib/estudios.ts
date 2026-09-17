/**
 * Estudios complementarios que ofrece el formulario de consulta.
 *
 * Vive fuera del módulo de acciones porque un archivo "use server" solo puede
 * exportar funciones asíncronas, y esta lista la necesita el cliente.
 *
 * Los nombres van sin tilde a propósito: así están escritos en los cuatro años
 * de registros ya cargados, y la columna los guarda concatenados.
 */
export const ESTUDIOS = [
  "Analisis de sangre",
  "Radiografia",
  "Ecografia",
  "Raspaje",
  "Citologia",
  "Analisis de orina",
] as const;

export type Estudio = (typeof ESTUDIOS)[number];
