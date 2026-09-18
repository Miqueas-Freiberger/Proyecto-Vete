import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProveedorTema } from "@/components/tema";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Veterinaria Catriel",
    template: "%s · Veterinaria Catriel",
  },
  description: "Historias clínicas, pacientes y estudios de la Veterinaria Catriel.",
  // Es una herramienta interna con datos de pacientes: fuera de los buscadores.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9fb" },
    { media: "(prefers-color-scheme: dark)", color: "#14161b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: next-themes escribe la clase del tema sobre
    // <html> antes de que React hidrate, asi que el servidor y el cliente
    // difieren en ese atributo a proposito.
    <html
      lang="es-AR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <ProveedorTema>
          {children}
          <Toaster />
        </ProveedorTema>
      </body>
    </html>
  );
}
