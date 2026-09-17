import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export default function NoEncontrado() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-5 px-6 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-superficie-alta text-tinta-suave">
        <MagnifyingGlass size={22} />
      </span>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-xl font-semibold tracking-tight text-tinta">
          No encontramos esta página
        </h1>
        <p className="max-w-[44ch] text-sm leading-relaxed text-tinta-media">
          Puede que el registro se haya borrado o que la dirección esté mal escrita.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex h-11 items-center justify-center rounded-[var(--radius-control)] bg-acento px-4 text-sm font-medium text-sobre-acento transition-opacity hover:opacity-90 active:translate-y-[1px]"
      >
        Volver al listado
      </Link>
    </div>
  );
}
