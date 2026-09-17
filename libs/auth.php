<?php
/**
 * Login de la aplicacion.
 *
 * Un solo usuario. El nombre y el hash de la contraseña salen del entorno o de
 * auth.local.php, nunca del repositorio, que es publico.
 */

require_once __DIR__ . '/../config.php';

/**
 * Arranca la sesion con cookies razonables. Solo la primera vez.
 */
function auth_start_session()
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $https = (!empty($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) !== 'off')
        || (!empty($_SERVER['HTTP_X_FORWARDED_PROTO'])
            && strtolower(trim(explode(',', $_SERVER['HTTP_X_FORWARDED_PROTO'])[0])) === 'https');

    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'httponly' => true,
        'secure' => $https,
        'samesite' => 'Lax',
    ]);
    session_name('vetesession');
    session_start();
}

function auth_is_logged_in()
{
    auth_start_session();
    return !empty($_SESSION['auth_user']);
}

function auth_user()
{
    auth_start_session();
    return $_SESSION['auth_user'] ?? null;
}

/**
 * Verifica las credenciales y abre la sesion. Devuelve true si entro.
 */
function auth_login($usuario, $contrasena)
{
    $cfg = app_auth_config();
    if (!$cfg) {
        return false;
    }

    // Una espera corta encarece probar contraseñas a lo bruto sin molestar a
    // quien escribe bien.
    usleep(300000);

    $usuarioOk = hash_equals($cfg['user'], (string) $usuario);
    $claveOk = password_verify((string) $contrasena, $cfg['hash']);

    if (!$usuarioOk || !$claveOk) {
        return false;
    }

    auth_start_session();
    session_regenerate_id(true);
    $_SESSION['auth_user'] = $cfg['user'];
    return true;
}

function auth_logout()
{
    auth_start_session();
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
    }
    session_destroy();
}

/**
 * Corta la ejecucion y manda al login si no hay sesion abierta.
 */
function auth_require_login()
{
    if (auth_is_logged_in()) {
        return;
    }

    header('Location: ' . (defined('BASE_URL') ? BASE_URL : '/') . 'login');
    exit;
}
