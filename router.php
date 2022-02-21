<?php
require_once 'controllers/main.controller.php';
require_once 'controllers/cliente.controller.php';
require_once 'controllers/paciente.controller.php';

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
    case 'nuevoCliente':
        $mainController = new MainController();
        $mainController->showClientsForms();
        break;
    case 'addCliente':
        $mainController = new MainController();
        $mainController->getDataCliente();
        break;
    default:
        echo '404 - Página no encontrada';
        break;
}
