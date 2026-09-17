/**
 * Normalizacion de datos.
 *
 * Los registros vienen de una carga manual de varios años: especies escritas
 * como " canino", " FELINO", "felina" o "GATO", telefonos con guiones y notas
 * entre parentesis, campos vacios que a veces son cadena vacia y a veces un
 * guion. Se limpia al mostrar, nunca en la base.
 */

/** Espacios sobrantes fuera, y los vacios disfrazados pasan a null. */
export function limpiar(valor: string | null | undefined): string | null {
  if (valor == null) return null;
  const v = valor.trim();
  if (v === "" || v === "-" || v === "--" || v === "0") return null;
  return v;
}

export type Especie = "canino" | "felino" | "otro";

const ESPECIES: Array<[RegExp, Especie]> = [
  [/^(can|perr)/i, "canino"],
  [/^(fel|gat)/i, "felino"],
];

/** " FELINO", "felina" y "GATO" son todos lo mismo. */
export function normalizarEspecie(valor: string | null | undefined): Especie {
  const v = limpiar(valor);
  if (!v) return "otro";
  for (const [patron, especie] of ESPECIES) {
    if (patron.test(v)) return especie;
  }
  return "otro";
}

export function etiquetaEspecie(especie: Especie): string {
  return especie === "canino" ? "Perro" : especie === "felino" ? "Gato" : "Otro";
}

/** Capitaliza respetando lo que ya venia escrito en mayusculas a proposito. */
export function titulo(valor: string | null | undefined): string {
  const v = limpiar(valor);
  if (!v) return "";
  return v
    .toLocaleLowerCase("es-AR")
    .split(/\s+/)
    .map((palabra) =>
      palabra.length > 2 || /^[a-záéíóúñ]/i.test(palabra)
        ? palabra.charAt(0).toLocaleUpperCase("es-AR") + palabra.slice(1)
        : palabra,
    )
    .join(" ");
}

/**
 * Los telefonos vienen como "2281978128 / 1281248124(2do cto)" o
 * "2291/23123". Se devuelven separados, con la nota aparte.
 */
export function telefonos(valor: string | null | undefined): string[] {
  const v = limpiar(valor);
  if (!v) return [];
  return v
    .split(/\s*[/|]\s*|\s{2,}/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0 && /\d/.test(t));
}

/** Deja solo digitos, para armar el enlace de llamada. */
export function telefonoLink(telefono: string): string {
  return telefono.replace(/[^\d+]/g, "");
}

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** Recibe "2026-07-21" tal cual sale de la base, sin pasar por Date. */
export function fechaLarga(iso: string | null | undefined): string {
  const partes = partesFecha(iso);
  if (!partes) return "";
  const [anio, mes, dia] = partes;
  return `${dia} de ${MESES[mes - 1]} de ${anio}`;
}

export function fechaCorta(iso: string | null | undefined): string {
  const partes = partesFecha(iso);
  if (!partes) return "";
  const [anio, mes, dia] = partes;
  return `${String(dia).padStart(2, "0")}/${String(mes).padStart(2, "0")}/${anio}`;
}

function partesFecha(iso: string | null | undefined): [number, number, number] | null {
  const v = limpiar(iso);
  if (!v) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

/** Para el input date, que espera exactamente aaaa-mm-dd. */
export function fechaInput(iso: string | null | undefined): string {
  const partes = partesFecha(iso);
  if (!partes) return "";
  const [anio, mes, dia] = partes;
  return `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
}

export function hoyInput(): string {
  const ahora = new Date();
  return `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, "0")}-${String(
    ahora.getDate(),
  ).padStart(2, "0")}`;
}

/**
 * Los estudios complementarios se guardan en una sola columna separados por
 * " / ", y a veces con un guion solo cuando no hay ninguno.
 */
export function listaComplementarios(valor: string | null | undefined): string[] {
  const v = limpiar(valor);
  if (!v) return [];
  return v
    .split("/")
    .map((parte) => parte.trim())
    .filter((parte) => parte.length > 0 && parte !== "-");
}

export function iniciales(nombre: string): string {
  const partes = limpiar(nombre)?.split(/\s+/) ?? [];
  if (partes.length === 0) return "?";
  if (partes.length === 1) return partes[0].slice(0, 2).toLocaleUpperCase("es-AR");
  return (partes[0][0] + partes[partes.length - 1][0]).toLocaleUpperCase("es-AR");
}

export function pesoArchivo(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
