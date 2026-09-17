import { defineConfig, devices } from "@playwright/test";

/**
 * Pruebas de extremo a extremo contra la base real de desarrollo.
 *
 * Todo lo que crean queda marcado con el prefijo ZZTEST y se borra al final,
 * así los 220 clientes de verdad no se tocan.
 */
export default defineConfig({
  testDir: "./e2e",
  // Barre los registros que deje una corrida interrumpida.
  globalTeardown: "./e2e/limpieza.ts",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 45_000,
  expect: { timeout: 10_000 },
  reporter: [["list"]],
  use: {
    baseURL: process.env.URL_PRUEBAS ?? "http://localhost:3100",
    trace: "retain-on-failure",
    locale: "es-AR",
  },
  projects: [
    { name: "escritorio", use: { ...devices["Desktop Chrome"] } },
    { name: "telefono", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "npm run start -- --port 3100",
    url: "http://localhost:3100/ingresar",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
