import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { sesionActiva } from "@/lib/auth";
import { FormularioIngreso } from "./formulario";
import { PawPrint } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = { title: "Ingresar" };

export default async function PaginaIngresar() {
  if (await sesionActiva()) redirect("/");

  return (
    <div className="grid min-h-[100dvh] lg:grid-cols-[1.05fr_1fr]">
      {/* Columna de marca. En teléfono se reduce a una cabecera breve para no
          empujar el formulario fuera de la pantalla. */}
      <aside className="relative flex flex-col justify-between overflow-hidden bg-acento px-6 py-8 text-sobre-acento sm:px-10 lg:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-28 -top-28 size-[26rem] rounded-full opacity-[0.16]"
          style={{ background: "radial-gradient(circle, white 0%, transparent 65%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-24 size-[30rem] rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(circle, white 0%, transparent 65%)" }}
        />

        <div className="relative flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-[10px] bg-sobre-acento/15">
            <PawPrint size={18} weight="fill" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            Veterinaria Catriel
          </span>
        </div>

        <div className="relative hidden max-w-[34ch] flex-col gap-4 lg:flex">
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight">
            La historia clínica de cada paciente, a mano.
          </h1>
          <p className="text-[15px] leading-relaxed opacity-80">
            Fichas, consultas y estudios de los pacientes de la clínica, en un solo lugar.
          </p>
        </div>

        <p className="relative hidden text-[13px] opacity-70 lg:block">
          Acceso exclusivo del personal de la clínica.
        </p>
      </aside>

      <main className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-[24rem]">
          <div className="mb-8 flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-tinta">
              Ingresar
            </h2>
            <p className="text-sm text-tinta-media">
              Escribí tus datos para abrir la sesión.
            </p>
          </div>

          <FormularioIngreso />
        </div>
      </main>
    </div>
  );
}
