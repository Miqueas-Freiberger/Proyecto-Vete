import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";

export default function NoEncontrado() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-5 px-6 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <MagnifyingGlass size={22} aria-hidden />
      </span>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          No encontramos esta página
        </h1>
        <p className="max-w-[44ch] text-sm leading-relaxed text-muted-foreground">
          Puede que el registro se haya borrado o que la dirección esté mal escrita.
        </p>
      </div>
      <Button asChild size="lg">
        <Link href="/">Volver al listado</Link>
      </Button>
    </div>
  );
}
