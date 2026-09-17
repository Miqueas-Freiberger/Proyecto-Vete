<?php
/**
 * Sube al bucket los adjuntos que estaban en disco.
 *
 * Recorre la tabla `imagenes` y, por cada registro, sube el archivo local cuya
 * ruta coincide con la clave. Los que ya estan en el bucket se saltean, asi que
 * se puede correr varias veces sin duplicar nada.
 *
 * Uso:
 *   php tools/migrar-a-bucket.php [--dry-run] [--source <dir>]
 *
 * Las credenciales del bucket y de la base salen del entorno, igual que la app.
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../libs/storage.php';

$options = getopt('', ['dry-run', 'source:']);
$dryRun = isset($options['dry-run']);
$source = $options['source'] ?? app_uploads_dir();

if (!storage_uses_s3()) {
    fwrite(STDERR, "No hay bucket configurado. Faltan S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET o S3_ENDPOINT.\n");
    exit(1);
}

$cfg = app_db_config();
$dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8', $cfg['host'], $cfg['port'], $cfg['name']);
$db = new PDO($dsn, $cfg['user'], $cfg['pass'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

$rows = $db->query('SELECT id, ruta, extension FROM imagenes ORDER BY id')->fetchAll(PDO::FETCH_OBJ);
printf("%d adjuntos registrados. Origen: %s%s\n", count($rows), $source, $dryRun ? ' (simulacion)' : '');

$subidos = $saltados = $faltantes = $fallidos = 0;

foreach ($rows as $row) {
    $local = $source . '/' . $row->ruta;

    if (!is_file($local)) {
        $faltantes++;
        printf("  [falta]   #%-4d %s\n", $row->id, $row->ruta);
        continue;
    }

    // Pedir el primer byte dice si el objeto ya esta arriba. Tiene que ser un
    // GET: la URL esta firmada para GET y un HEAD daria 403.
    $url = storage_s3_presigned_url($row->ruta, 60);
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RANGE => '0-0',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 20,
    ]);
    curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($status === 200 || $status === 206) {
        $saltados++;
        continue;
    }

    if ($dryRun) {
        $subidos++;
        printf("  [subiria] #%-4d %s (%d bytes)\n", $row->id, $row->ruta, filesize($local));
        continue;
    }

    $tipo = $row->extension ?: (mime_content_type($local) ?: 'application/octet-stream');
    if (storage_s3_put($row->ruta, $local, $tipo)) {
        $subidos++;
        printf("  [ok]      #%-4d %s\n", $row->id, $row->ruta);
    } else {
        $fallidos++;
        printf("  [ERROR]   #%-4d %s\n", $row->id, $row->ruta);
    }
}

printf(
    "\nSubidos: %d | ya estaban: %d | sin archivo en disco: %d | fallidos: %d\n",
    $subidos,
    $saltados,
    $faltantes,
    $fallidos
);

exit($fallidos > 0 ? 1 : 0);
