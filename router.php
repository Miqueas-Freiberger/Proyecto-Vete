<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/libs/auth.php';
require_once 'controllers/main.controller.php';

// defino la base url para la construccion de links con urls semánticas
define('BASE_URL', app_base_url());

/**
 * Si algo revienta, el detalle va al log y la persona ve una pagina con
 * sentido. Antes quedaba la pantalla en blanco del navegador con un 500 seco,
 * sin saber si el dato se habia guardado o no.
 */
set_exception_handler(function (Throwable $error) {
    error_log('[vete] ' . $error->getMessage() . ' en ' . $error->getFile() . ':' . $error->getLine());
    http_response_code(500);
    $volver = defined('BASE_URL') ? BASE_URL : '/';
    echo '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">'
        . '<meta name="viewport" content="width=device-width, initial-scale=1">'
        . '<title>Veterinaria Catriel</title>'
        . '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">'
        . '</head><body style="background-color:#F4ECF7">'
        . '<div class="container" style="max-width:34rem;margin-top:12vh">'
        . '<div class="card shadow-sm"><div class="card-body text-center p-4">'
        . '<h1 class="h5 mb-3">No se pudo completar la operacion</h1>'
        . '<p class="text-muted mb-4">Los datos no se guardaron. Revisa que la fecha y el documento esten bien cargados, y proba de nuevo.</p>'
        . '<a href="' . htmlspecialchars($volver, ENT_QUOTES) . '" class="btn text-white" style="background-color:#76448A">Volver al inicio</a>'
        . '</div></div></div></body></html>';
    exit;
});


if (!empty($_GET['action'])) {
    $action = $_GET['action'];
} else {
    $action = 'home';
}

$params = explode('/', $action);

// El login es lo unico que se puede ver sin haber entrado. Todo lo demas
// muestra datos de clientes, asi que pide sesion.
if ($params[0] === 'login') {
    $mainController = new MainController();
    $mainController->login();
    return;
}

if ($params[0] === 'logout') {
    auth_logout();
    header('Location: ' . BASE_URL . 'login');
    return;
}

auth_require_login();

switch ($params[0]) {
    case 'home':
        $mainController = new MainController();
        $mainController->showHome();
        break;
    case 'cliente':
        $mainController = new MainController();
        $mainController->showDataCliente($params[1]);
        break;
    case 'nuevoCliente':
        $mainController = new MainController();
        $mainController->showClientsForms();
        break;
    case 'agregarDatos':
        $mainController = new MainController();
        $mainController->getDataCliente();
        break;
    case 'nuevaMascota':
        $mainController = new MainController();
        $mainController->showMascotaForm($params[1]);
        break;
    case 'agregarMascota':
        $mainController = new MainController();
        $mainController->getDataMascota();
        break;
    case 'eliminarMascota':
        $mainController = new MainController();
        $mainController->eliminarMascota($params[1]);
        break;
    case 'busquedaCliente':
        $mainController = new MainController();
        $mainController->getNombreCliente();
        break;
    case 'historialMascota':
        $mainController = new MainController();
        $mainController->getHistorialMascota($params[1]);
        break;
    case 'nuevoHistorial':
        $mainController = new MainController();
        $mainController->displayFormsAddHistorial($params[1]);
        break;
    case 'addNewHistorial':
        $mainController = new MainController();
        $mainController->getNewHistorialData();
        break;
    case 'editarCliente':
        $mainController = new MainController();
        $mainController->displayEditClienteForm($params[1]);
        break;
    case 'updateClientData':
        $mainController = new MainController();
        $mainController->updateClientData();
        break;
    case 'editarMascota':
        $mainController = new MainController();
        $mainController->displayEditMascotaForm($params[1]);
        break;
    case 'updateMascota':
        $mainController = new MainController();
        $mainController->updateDataMascota();
        break;
    case 'editarHistorial':
        $mainController = new MainController();
        $mainController->displayEditHistorialForm($params[1]);
        break;
    case 'updateHistorial':
        $mainController = new MainController();
        $mainController->updateDataHistorial();
        break;
    case 'eliminarComplementarios':
        $mainController = new MainController();
        $mainController->eliminarComplementarios($params[1]);
        break;
    case 'eliminarHistorial':
        $mainController = new MainController();
        $mainController->eliminarHistorial($params[1]);
        break;
    case 'archivosHistorial':
        $mainController = new MainController();
        $mainController->displayImgHistorial($params[1]);
        break;
    case 'newImg':
        $mainController = new MainController();
        $mainController->getImgData();
        break;
    case 'eliminarCliente':
        $mainController = new MainController();
        $mainController->eliminarCliente($params[1]);
        break;
    case 'eliminarImagen':
        $mainController = new MainController();
        $mainController->eliminarImagen($params[1]);
        break;
    case 'verArchivo':
        $mainController = new MainController();
        $mainController->displayFile($params[1]);
        break;
    default:
        echo '404 - Página no encontrada';
        break;
}
