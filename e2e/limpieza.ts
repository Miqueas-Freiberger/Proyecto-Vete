import mysql from "mysql2/promise";

/**
 * Borra lo que hayan dejado las pruebas si alguna se cortó por la mitad.
 * Todo lo que crean lleva el prefijo ZZTEST, y las claves foráneas arrastran
 * pacientes, consultas y adjuntos.
 */
export default async function limpiar(): Promise<void> {
  const conexion = await mysql.createConnection({
    host: process.env.MYSQLHOST ?? "127.0.0.1",
    port: Number(process.env.MYSQLPORT ?? 3306),
    user: process.env.MYSQLUSER ?? "root",
    password: process.env.MYSQLPASSWORD ?? "",
    database: process.env.MYSQLDATABASE ?? "db_veterinaria",
  });

  const [resultado] = await conexion.execute(
    "DELETE FROM clientes WHERE NombreApellido LIKE 'ZZTEST%'",
  );
  const borrados = (resultado as mysql.ResultSetHeader).affectedRows;
  if (borrados > 0) {
    console.log(`[limpieza] se borraron ${borrados} registros de prueba`);
  }

  await conexion.end();
}
