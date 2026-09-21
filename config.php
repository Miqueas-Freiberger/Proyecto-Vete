<?php
/**
 * Runtime configuration.
 *
 * Every value is read from the environment when available and falls back to the
 * local XAMPP/Laragon defaults, so the same code runs locally and on Railway
 * without changes.
 */

/* ---------------------------------------------------------------------------
 * Saneo de lo que llega de los formularios.
 *
 * El MySQL de Railway corre en modo estricto y el MariaDB de XAMPP no. Lo que
 * antes se convertia solo ahora es un error fatal: un espacio en una columna
 * entera, una fecha vacia, o un texto mas largo que la columna. Todo lo que
 * entra pasa por estas tres funciones antes de tocar la base.
 * ------------------------------------------------------------------------ */

/** Recorta espacios y corta al largo de la columna. */
function app_texto($valor, $maximo)
{
    $texto = trim((string) ($valor ?? ''));
    return mb_substr($texto, 0, $maximo);
}

/**
 * Deja solo digitos. Un campo vacio vale cero, que es como quedaron los 27
 * clientes historicos que nunca cargaron el documento.
 */
function app_entero($valor)
{
    $digitos = preg_replace('/\D/', '', (string) ($valor ?? ''));
    if ($digitos === '') {
        return 0;
    }
    // La columna es int con signo: por encima de eso MySQL estricto rechaza.
    $numero = (int) $digitos;
    return ($numero > 0 && $numero <= 2147483647) ? $numero : 0;
}

/** Devuelve aaaa-mm-dd, o la fecha de hoy si lo que llego no sirve. */
function app_fecha($valor)
{
    $texto = trim((string) ($valor ?? ''));
    if (preg_match('/^(\d{4})-(\d{2})-(\d{2})$/', $texto, $partes)) {
        if (checkdate((int) $partes[2], (int) $partes[3], (int) $partes[1])) {
            return $texto;
        }
    }
    return date('Y-m-d');
}

/**
 * Database connection settings.
 *
 * Railway exposes a linked MySQL service either as a single connection string
 * or as discrete MYSQLHOST/MYSQLUSER/... vars. Both shapes are accepted.
 * MYSQL_URL is already the private one, which keeps traffic inside the project
 * network and off the billed public proxy.
 */
function app_db_config()
{
    $url = getenv('MYSQL_URL') ?: getenv('DATABASE_URL');

    if ($url) {
        $parts = parse_url($url);
        if ($parts !== false && isset($parts['host'])) {
            return [
                'host' => $parts['host'],
                'port' => isset($parts['port']) ? (int) $parts['port'] : 3306,
                'name' => isset($parts['path']) ? ltrim($parts['path'], '/') : 'db_veterinaria',
                'user' => isset($parts['user']) ? urldecode($parts['user']) : 'root',
                'pass' => isset($parts['pass']) ? urldecode($parts['pass']) : '',
            ];
        }
    }

    return [
        'host' => getenv('MYSQLHOST') ?: getenv('DB_HOST') ?: 'localhost',
        'port' => (int) (getenv('MYSQLPORT') ?: getenv('DB_PORT') ?: 3306),
        'name' => getenv('MYSQLDATABASE') ?: getenv('DB_NAME') ?: 'db_veterinaria',
        'user' => getenv('MYSQLUSER') ?: getenv('DB_USER') ?: 'root',
        'pass' => getenv('MYSQLPASSWORD') ?: getenv('DB_PASSWORD') ?: '',
    ];
}

/**
 * Absolute path that uploaded files are stored under.
 *
 * The database stores relative paths such as "images/historial/ abc123.jpg", so
 * this is the prefix they resolve against. On Railway it points at a mounted
 * volume; locally it is the project directory itself.
 */
function app_uploads_dir()
{
    $dir = getenv('UPLOADS_DIR');
    return $dir ? rtrim($dir, "/\\") : __DIR__;
}

/**
 * Credenciales del unico usuario, o null si no hay ninguna configurada.
 *
 * El repositorio es publico, asi que ni la contraseña ni su hash viven en el
 * codigo. Salen del entorno, y en desarrollo de auth.local.php, que esta
 * ignorado por git.
 */
function app_auth_config()
{
    $user = getenv('APP_AUTH_USER');
    $hash = getenv('APP_AUTH_PASSWORD_HASH');

    if ((!$user || !$hash) && is_file(__DIR__ . '/auth.local.php')) {
        $local = require __DIR__ . '/auth.local.php';
        $user = $user ?: ($local['user'] ?? null);
        $hash = $hash ?: ($local['hash'] ?? null);
    }

    if (!$user || !$hash) {
        return null;
    }

    return ['user' => $user, 'hash' => $hash];
}

/**
 * Public base URL of the application, with a trailing slash.
 *
 * Built from the forwarded headers so it stays correct behind Railway's HTTPS
 * proxy, and from SCRIPT_NAME so the app still works when served from a
 * subdirectory, as it is under XAMPP.
 */
function app_base_url()
{
    $scheme = 'http';
    if (!empty($_SERVER['HTTP_X_FORWARDED_PROTO'])) {
        $scheme = trim(explode(',', $_SERVER['HTTP_X_FORWARDED_PROTO'])[0]);
    } elseif (!empty($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) !== 'off') {
        $scheme = 'https';
    }

    // HTTP_HOST already carries a non-default port, so SERVER_PORT is not added.
    $host = $_SERVER['HTTP_HOST'] ?? ($_SERVER['SERVER_NAME'] ?? 'localhost');

    // dirname() returns a backslash on Windows when the script sits at the root.
    $dir = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/'));
    $dir = rtrim($dir, '/');

    return $scheme . '://' . $host . $dir . '/';
}
