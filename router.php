<?php
require_once 'controllers/main.controller.php';

// defino la base url para la construccion de links con urls semánticas
define('BASE_URL', '//' . $_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'] . dirname($_SERVER['PHP_SELF']) . '/');


if (!empty($_GET['action'])) {
    $action = $_GET['action'];
} else {
    $action = 'home';
}

$params = explode('/', $action);

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
    default:
        echo '404 - Página no encontrada';
        break;
}
