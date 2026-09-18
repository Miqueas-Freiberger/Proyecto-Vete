import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Une clases y resuelve los conflictos de Tailwind, quedandose con la ultima.
 *
 * Sin esto, `cn("px-4", props.className)` con un `px-6` que viene de afuera
 * deja las dos y gana la que el CSS haya ordenado primero, no la que pidio
 * quien llama al componente.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
