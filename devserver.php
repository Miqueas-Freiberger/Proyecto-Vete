<?php
// Dev router for PHP built-in server. Emulates the project's .htaccess rewrite rules.
$uri  = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$path = __DIR__ . $uri;

// Serve existing static files directly (css, js, images, uploads, fonts, ...).
if ($uri !== '/' && file_exists($path) && !is_dir($path)) {
    if (substr($path, -4) === '.php') { return false; }
    return false;
}

// Everything else goes to the front controller, mirroring:
//   RewriteRule ^(.*)$ router.php?action=$1 [QSA,L]
$action = ltrim($uri, '/');
$_GET['action'] = $action;
$_SERVER['SCRIPT_NAME'] = '/router.php';
$_SERVER['PHP_SELF']    = '/router.php';
require __DIR__ . '/router.php';
