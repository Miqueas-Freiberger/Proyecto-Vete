# Veterinaria Catriel

Sistema de historias clínicas de la Veterinaria Catriel: clientes, pacientes,
consultas y estudios adjuntos.

Reescritura completa de la aplicación PHP original, que sigue viva en la rama
`main`. Usa la misma base de datos y los mismos datos, sin tocar el esquema.

## Stack

- Next.js 16 con App Router y React 19, todo en Server Components salvo las
  islas que necesitan interacción.
- TypeScript estricto.
- Tailwind v4 con tokens propios en `globals.css`.
- MySQL por `mysql2`, contra el esquema heredado.
- Estudios adjuntos en un bucket compatible con S3.
- Playwright para las pruebas de extremo a extremo.

## Arrancar en local

Hace falta el MySQL con la base `db_veterinaria`. Si viene del XAMPP original,
conviene levantarlo con el `sql_mode` de XAMPP, sin modo estricto.

```bash
cp .env.example .env.local   # y completar los valores
npm install
npm run dev
```

**Un detalle que muerde:** el hash de bcrypt está lleno de `$`, y Next expande
las variables al leer el archivo `.env`. Hay que escapar cada `$` con `\$` o el
hash llega cortado y el ingreso falla sin explicar por qué.

## Pruebas

Corren contra la base real. Todo lo que crean lleva el prefijo `ZZTEST` y se
borra al terminar, incluso si una corrida se interrumpe.

```bash
npm run build
CLAVE_PRUEBAS="la-contraseña" npx playwright test
```

## Sobre el esquema heredado

No se migró nada, a propósito: los cuatro años de registros cargados a mano
valen más que un esquema prolijo.

- `paciente.id_dueño_fk` lleva eñe. Va siempre entre backticks.
- `imagenes.booleanFlag` es un entero, no un booleano. Con `sql_mode` estricto,
  pasarle un booleano de JS hace fallar la inserción.
- `imagenes.ruta` guarda una ruta relativa con un espacio después de la barra
  (`images/historial/ abc.jpg`). Esa misma cadena es la clave dentro del bucket.
- Las especies vienen escritas de seis maneras distintas. Se normalizan al
  mostrar, en `src/lib/format.ts`, nunca en la base.
- `paciente.Nacimiento` es texto libre: hay años sueltos y fechas completas.
- Ninguno de los 220 clientes tiene correo cargado. El teléfono es el dato de
  contacto real.
