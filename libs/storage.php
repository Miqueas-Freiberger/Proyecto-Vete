<?php
/**
 * Almacenamiento de los adjuntos (fotos, radiografias, analisis, PDFs).
 *
 * Cuando hay un bucket S3 configurado los archivos viven ahi. Si no, se usa el
 * disco local, que es lo que sigue pasando en desarrollo.
 *
 * Las claves del bucket son las mismas rutas relativas que ya estaban guardadas
 * en la columna `ruta` de la tabla `imagenes`, asi que los registros existentes
 * no necesitan ninguna migracion.
 *
 * Cliente S3 minimo con firma AWS Signature Version 4, sin dependencias.
 */

require_once __DIR__ . '/../config.php';

/**
 * Configuracion del bucket, o null si no hay ninguno.
 */
function storage_s3_config()
{
    $key = getenv('S3_ACCESS_KEY_ID');
    $secret = getenv('S3_SECRET_ACCESS_KEY');
    $bucket = getenv('S3_BUCKET');
    $endpoint = getenv('S3_ENDPOINT');

    if (!$key || !$secret || !$bucket || !$endpoint) {
        return null;
    }

    return [
        'key' => $key,
        'secret' => $secret,
        'bucket' => $bucket,
        'endpoint' => rtrim($endpoint, '/'),
        'region' => getenv('S3_REGION') ?: 'auto',
    ];
}

function storage_uses_s3()
{
    return storage_s3_config() !== null;
}

/**
 * Codifica una clave para usarla en una URL, dejando las barras intactas.
 */
function storage_encode_key($key)
{
    return implode('/', array_map('rawurlencode', explode('/', ltrim($key, '/'))));
}

/**
 * Host y URL base del bucket. Railway entrega los buckets en estilo
 * virtual-host: https://<bucket>.<endpoint>/<clave>
 */
function storage_s3_host($cfg)
{
    $host = parse_url($cfg['endpoint'], PHP_URL_HOST);
    return $cfg['bucket'] . '.' . $host;
}

function storage_hmac($key, $data)
{
    return hash_hmac('sha256', $data, $key, true);
}

/**
 * Clave de firma derivada, segun el esquema de AWS Signature Version 4.
 */
function storage_signing_key($cfg, $date)
{
    $k = storage_hmac('AWS4' . $cfg['secret'], $date);
    $k = storage_hmac($k, $cfg['region']);
    $k = storage_hmac($k, 's3');
    return storage_hmac($k, 'aws4_request');
}

/**
 * Sube un archivo local al bucket. Devuelve true si el bucket lo acepto.
 */
function storage_s3_put($key, $localPath, $contentType)
{
    $cfg = storage_s3_config();
    if (!$cfg) {
        return false;
    }

    $body = file_get_contents($localPath);
    if ($body === false) {
        return false;
    }

    $host = storage_s3_host($cfg);
    $uri = '/' . storage_encode_key($key);
    $now = gmdate('Ymd\THis\Z');
    $date = substr($now, 0, 8);
    $payloadHash = hash('sha256', $body);

    $canonicalHeaders = "content-type:{$contentType}\n"
        . "host:{$host}\n"
        . "x-amz-content-sha256:{$payloadHash}\n"
        . "x-amz-date:{$now}\n";
    $signedHeaders = 'content-type;host;x-amz-content-sha256;x-amz-date';

    $canonicalRequest = "PUT\n{$uri}\n\n{$canonicalHeaders}\n{$signedHeaders}\n{$payloadHash}";
    $scope = "{$date}/{$cfg['region']}/s3/aws4_request";
    $stringToSign = "AWS4-HMAC-SHA256\n{$now}\n{$scope}\n" . hash('sha256', $canonicalRequest);
    $signature = hash_hmac('sha256', $stringToSign, storage_signing_key($cfg, $date));

    $authorization = "AWS4-HMAC-SHA256 Credential={$cfg['key']}/{$scope}, "
        . "SignedHeaders={$signedHeaders}, Signature={$signature}";

    $ch = curl_init("https://{$host}{$uri}");
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => 'PUT',
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 60,
        CURLOPT_HTTPHEADER => [
            "Content-Type: {$contentType}",
            "x-amz-content-sha256: {$payloadHash}",
            "x-amz-date: {$now}",
            "Authorization: {$authorization}",
        ],
    ]);
    $response = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($status < 200 || $status >= 300) {
        error_log("[storage] PUT {$key} fallo con HTTP {$status} {$error} {$response}");
        return false;
    }

    return true;
}

/**
 * URL temporal de lectura, firmada para que el navegador pueda pedirla directo
 * sin pasar por la app.
 */
function storage_s3_presigned_url($key, $expires = 3600, $extraQuery = [])
{
    $cfg = storage_s3_config();
    if (!$cfg) {
        return null;
    }

    $host = storage_s3_host($cfg);
    $uri = '/' . storage_encode_key($key);
    $now = gmdate('Ymd\THis\Z');
    $date = substr($now, 0, 8);
    $scope = "{$date}/{$cfg['region']}/s3/aws4_request";

    $query = array_merge([
        'X-Amz-Algorithm' => 'AWS4-HMAC-SHA256',
        'X-Amz-Credential' => "{$cfg['key']}/{$scope}",
        'X-Amz-Date' => $now,
        'X-Amz-Expires' => (string) $expires,
        'X-Amz-SignedHeaders' => 'host',
    ], $extraQuery);
    ksort($query);

    $canonicalQuery = [];
    foreach ($query as $k => $v) {
        $canonicalQuery[] = rawurlencode($k) . '=' . rawurlencode($v);
    }
    $canonicalQuery = implode('&', $canonicalQuery);

    $canonicalRequest = "GET\n{$uri}\n{$canonicalQuery}\nhost:{$host}\n\nhost\nUNSIGNED-PAYLOAD";
    $stringToSign = "AWS4-HMAC-SHA256\n{$now}\n{$scope}\n" . hash('sha256', $canonicalRequest);
    $signature = hash_hmac('sha256', $stringToSign, storage_signing_key($cfg, $date));

    return "https://{$host}{$uri}?{$canonicalQuery}&X-Amz-Signature={$signature}";
}

function storage_s3_delete($key)
{
    $cfg = storage_s3_config();
    if (!$cfg) {
        return false;
    }

    $host = storage_s3_host($cfg);
    $uri = '/' . storage_encode_key($key);
    $now = gmdate('Ymd\THis\Z');
    $date = substr($now, 0, 8);
    $payloadHash = hash('sha256', '');

    $canonicalHeaders = "host:{$host}\n"
        . "x-amz-content-sha256:{$payloadHash}\n"
        . "x-amz-date:{$now}\n";
    $signedHeaders = 'host;x-amz-content-sha256;x-amz-date';

    $canonicalRequest = "DELETE\n{$uri}\n\n{$canonicalHeaders}\n{$signedHeaders}\n{$payloadHash}";
    $scope = "{$date}/{$cfg['region']}/s3/aws4_request";
    $stringToSign = "AWS4-HMAC-SHA256\n{$now}\n{$scope}\n" . hash('sha256', $canonicalRequest);
    $signature = hash_hmac('sha256', $stringToSign, storage_signing_key($cfg, $date));

    $authorization = "AWS4-HMAC-SHA256 Credential={$cfg['key']}/{$scope}, "
        . "SignedHeaders={$signedHeaders}, Signature={$signature}";

    $ch = curl_init("https://{$host}{$uri}");
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => 'DELETE',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTPHEADER => [
            "x-amz-content-sha256: {$payloadHash}",
            "x-amz-date: {$now}",
            "Authorization: {$authorization}",
        ],
    ]);
    curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return $status >= 200 && $status < 300;
}

// ---------------------------------------------------------------------------
// Capa comun: el resto de la app llama solo a estas tres funciones.
// ---------------------------------------------------------------------------

/**
 * Guarda un archivo recien subido bajo la clave indicada.
 */
function storage_store_upload($tmpPath, $key, $contentType)
{
    if (storage_uses_s3()) {
        return storage_s3_put($key, $tmpPath, $contentType);
    }

    $destino = app_uploads_dir() . '/' . $key;
    if (!is_dir(dirname($destino))) {
        mkdir(dirname($destino), 0775, true);
    }
    return move_uploaded_file($tmpPath, $destino);
}

/**
 * URL con la que el navegador puede pedir el archivo.
 *
 * Con bucket es una URL firmada que vence; sin bucket, la ruta relativa de
 * siempre, servida por Apache.
 */
function storage_url($key, $expires = 3600, $extraQuery = [])
{
    if (storage_uses_s3()) {
        return storage_s3_presigned_url($key, $expires, $extraQuery);
    }

    return (defined('BASE_URL') ? BASE_URL : '') . storage_encode_key($key);
}

function storage_delete($key)
{
    if (storage_uses_s3()) {
        return storage_s3_delete($key);
    }

    $path = app_uploads_dir() . '/' . $key;
    return is_file($path) ? unlink($path) : false;
}
