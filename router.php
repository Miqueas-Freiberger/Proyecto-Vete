<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/libs/auth.php';
require_once 'controllers/main.controller.php';

// defino la base url para la construccion de links con urls semánticas
define('BASE_URL', app_base_url());


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
