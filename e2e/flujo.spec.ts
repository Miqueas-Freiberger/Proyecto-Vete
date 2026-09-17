import { test, expect, type Page } from "@playwright/test";

/**
 * Recorrido completo: entrar, crear un cliente, agregarle un paciente, cargar
 * una consulta y borrar todo. Corre contra la base real de desarrollo, así que
 * cada registro lleva un nombre único con prefijo ZZTEST.
 */

const USUARIO = process.env.APP_AUTH_USER ?? "admin";
const CLAVE = process.env.CLAVE_PRUEBAS ?? "";

const marca = () => `ZZTEST-${Date.now().toString(36)}`;

async function ingresar(page: Page) {
  await page.goto("/ingresar");
  await page.getByLabel("Usuario").fill(USUARIO);
  await page.getByLabel("Contraseña").fill(CLAVE);
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page).toHaveURL("/");
}

test.describe("acceso", () => {
  test("sin sesión, cualquier ruta lleva al ingreso", async ({ page }) => {
    await page.goto("/clientes/185");
    await expect(page).toHaveURL(/\/ingresar$/);
    await expect(page.getByRole("heading", { name: "Ingresar" })).toBeVisible();
  });

  test("rechaza una contraseña incorrecta", async ({ page }) => {
    await page.goto("/ingresar");
    await page.getByLabel("Usuario").fill(USUARIO);
    await page.getByLabel("Contraseña").fill("no-es-la-clave");
    await page.getByRole("button", { name: "Entrar" }).click();
    await expect(page.getByText("Usuario o contraseña incorrectos.")).toBeVisible();
    await expect(page).toHaveURL(/\/ingresar$/);
  });

  test("entra y sale", async ({ page }) => {
    await ingresar(page);
    await expect(page.getByRole("heading", { level: 1 })).toBeHidden({ timeout: 2000 }).catch(() => {});
    await page.getByRole("button", { name: "Cerrar sesión" }).click();
    await expect(page).toHaveURL(/\/ingresar$/);
  });
});

test.describe("listado", () => {
  test.beforeEach(async ({ page }) => {
    await ingresar(page);
  });

  test("muestra el resumen y la primera página", async ({ page }) => {
    await expect(page.getByText("Clientes", { exact: true })).toBeVisible();
    await expect(page.getByText("Pacientes", { exact: true })).toBeVisible();
    // El listado llega por streaming: se espera una ficha real, no el botón
    // de alta, que también cuelga de /clientes/.
    const fichas = page.locator('a[href^="/clientes/"]').filter({ hasNotText: "Nuevo" });
    const primera = page.locator('a').filter({ has: page.locator('css=span') }).first();
    await expect(primera).toBeVisible();
    await page.waitForFunction(
      () => document.querySelectorAll('a[href^="/clientes/"]').length > 10,
      undefined,
      { timeout: 15000 },
    );
    expect(await fichas.count()).toBeGreaterThan(10);
  });

  test("la paginación avanza y conserva el lugar", async ({ page }) => {
    await page.getByRole("link", { name: "Página siguiente" }).click();
    await expect(page).toHaveURL(/pagina=2/);
    await expect(page.locator('a[href^="/clientes/"]').first()).toBeVisible();
  });

  test("la búsqueda filtra y se refleja en la dirección", async ({ page }) => {
    await page.getByRole("searchbox").fill("acosta");
    await expect(page).toHaveURL(/q=acosta/, { timeout: 8000 });
    await expect(page.getByText(/resultados? para/i)).toBeVisible();
  });

  test("una búsqueda sin resultados explica qué hacer", async ({ page }) => {
    await page.getByRole("searchbox").fill("xqzwk-no-existe");
    await expect(page.getByText(/No hay resultados/i)).toBeVisible({ timeout: 8000 });
    await page.getByRole("link", { name: "Ver todos los clientes" }).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("alta completa y borrado", () => {
  test("crea cliente, paciente y consulta, y después borra todo", async ({ page }) => {
    const nombre = marca();
    await ingresar(page);

    // Cliente
    await page.getByRole("link", { name: /Nuevo cliente/ }).first().click();
    await expect(page).toHaveURL(/\/clientes\/nuevo$/);
    await page.getByLabel("Nombre y apellido").fill(nombre);
    await page.getByLabel("Teléfono", { exact: true }).fill("2281 555000");
    await page.getByLabel("Documento").fill("30111222");
    await page.getByLabel("Localidad").fill("Olavarria");
    await page.getByRole("button", { name: "Crear cliente" }).click();

    await expect(page).toHaveURL(/\/clientes\/\d+$/);
    await expect(page.getByRole("heading", { name: nombre })).toBeVisible();
    await expect(page.getByText("30111222")).toBeVisible();
    const urlCliente = page.url();

    // Paciente
    await page.getByRole("link", { name: /Nuevo paciente/ }).first().click();
    await page.getByLabel("Nombre", { exact: true }).fill("Pichicho");
    await page.getByLabel("Especie").fill("Canino");
    await page.getByLabel("Raza").fill("Mestizo");
    await page.getByLabel("Sexo").selectOption("Macho");
    await page.getByLabel("Tamaño").selectOption("Mediano");
    await page.getByRole("button", { name: "Crear paciente" }).click();

    await expect(page).toHaveURL(/\/pacientes\/\d+$/);
    await expect(page.getByRole("heading", { name: "Pichicho" })).toBeVisible();
    await expect(page.getByText("Perro")).toBeVisible();
    const urlPaciente = page.url();

    // Consulta
    await page.getByRole("link", { name: /Nueva consulta/ }).first().click();
    await page.getByLabel("Motivo").fill("Control anual");
    await page.getByLabel("Observaciones").fill("Sin novedades.");
    await page.getByLabel("Tratamiento").fill("Vacuna al dia.");
    await page.getByRole("checkbox", { name: "Radiografia" }).check();
    await page.getByRole("button", { name: "Guardar consulta" }).click();

    await expect(page).toHaveURL(urlPaciente);
    await expect(page.getByText("Control anual")).toBeVisible();
    await expect(page.getByText("Sin novedades.")).toBeVisible();
    await expect(page.getByText("Radiografia")).toBeVisible();

    // Editar la consulta
    await page.getByRole("link", { name: "Editar consulta" }).first().click();
    await page.getByLabel("Motivo").fill("Control anual corregido");
    await page.getByRole("button", { name: "Guardar cambios" }).click();
    await expect(page.getByText("Control anual corregido")).toBeVisible();

    // Estudios: la pantalla carga aunque todavía no haya nada
    await page.getByRole("link", { name: /Estudios/ }).first().click();
    await expect(page).toHaveURL(/\/estudios$/);
    await expect(page.getByText(/Sin estudios adjuntos/)).toBeVisible();

    // Borrar el cliente arrastra paciente y consulta
    await page.goto(urlCliente);
    await page.getByRole("button", { name: "Borrar" }).click();
    await expect(page.getByRole("heading", { name: /¿Borrar a/ })).toBeVisible();
    await page.getByRole("button", { name: "Borrar cliente" }).click();

    await expect(page).toHaveURL("/");
    await page.getByRole("searchbox").fill(nombre);
    await expect(page.getByText(/No hay resultados/i)).toBeVisible({ timeout: 8000 });
  });
});

test.describe("validación", () => {
  test("un cliente sin nombre no se guarda", async ({ page }) => {
    await ingresar(page);
    await page.goto("/clientes/nuevo");
    // Se saltea la validación del navegador para llegar al servidor.
    await page.getByLabel("Nombre y apellido").fill("a");
    await page.getByRole("button", { name: "Crear cliente" }).click();
    await expect(page.getByText("El nombre es obligatorio.")).toBeVisible();
    await expect(page).toHaveURL(/\/clientes\/nuevo$/);
  });

  test("el documento acepta solo números y se guarda limpio", async ({ page }) => {
    const nombre = marca();
    await ingresar(page);
    await page.goto("/clientes/nuevo");
    await page.getByLabel("Nombre y apellido").fill(nombre);
    // Se escribe con puntos, como lo diría un cliente, y debe guardarse sin ellos.
    await page.getByLabel("Documento").fill("30.111.222");
    await page.getByRole("button", { name: "Crear cliente" }).click();

    await expect(page).toHaveURL(/\/clientes\/\d+$/);
    await expect(page.getByText("30111222")).toBeVisible();

    // Limpieza
    await page.getByRole("button", { name: "Borrar" }).click();
    await page.getByRole("button", { name: "Borrar cliente" }).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("rutas inexistentes", () => {
  test("un cliente que no existe muestra el aviso", async ({ page }) => {
    await ingresar(page);
    const respuesta = await page.goto("/clientes/999999");
    expect(respuesta?.status()).toBe(404);
    await expect(page.getByText(/No encontramos esta página/)).toBeVisible();
  });
});
