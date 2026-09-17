<?php
/**
 * Runtime configuration.
 *
 * Every value is read from the environment when available and falls back to the
 * local XAMPP/Laragon defaults, so the same code runs locally and on Railway
 * without changes.
 */

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
