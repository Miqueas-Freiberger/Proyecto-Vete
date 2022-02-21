<?php
include_once('models/main.model.php');
include_once('views/main.view.php');

class MainController
{
    private $mainModel;
    private $mainView;


    public function __construct()
    {
        $this->mainModel = new MainModel();
        $this->mainView = new MainView();
    }

    public function showHome()
    {
        $dataClientes = $this->mainModel->getDataClientes();
        $this->mainView->displayHome($dataClientes);
    }

    public function showClientsForms()
    {
        $this->mainView->displayClientsForms();
    }

    public function getDataCliente()
    {
        if (!empty($_POST["tamaño"]) && !empty($_POST["esteril"])) {
            $nombre_apellido = $_POST["nombre_apellido"];
            $telefono = $_POST["telefono"];
            $email = $_POST["email"];
            $direccion = $_POST["direccion"];
            $localidad = $_POST["localidad"];
            $nombrePaciente = $_POST["nombrePaciente"];
            $especie = $_POST["especie"];
            $nacimientoPaciente = $_POST["nacimientoPaciente"];
            $sexoPaciente = $_POST["sexoPaciente"];
            $raza = $_POST["raza"];
            $color = $_POST["color"];
            $tamaño = $_POST["tamaño"];
            $esteril = $_POST["esteril"];
            $observaciones = $_POST["observaciones"];
            $fecha_ingreso = $_POST["fecha_ingreso"];
            $complementarios = implode(" / ", $_POST['complementarios']);

            $id_dueño = $this->addDataCliente($nombre_apellido, $telefono, $email, $direccion, $localidad);
            $this->addDataPaciente($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tamaño, $esteril, $observaciones, $fecha_ingreso, $complementarios, $id_dueño);
        }
    }

    public function addDataCliente($nombre_apellido, $telefono, $email, $direccion, $localidad)
    {
        $id_cliente = $this->mainModel->addCliente($nombre_apellido, $telefono, $email, $direccion, $localidad);
        return $id_cliente;
    }
    public function addDataPaciente($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tamaño, $esteril, $observaciones, $fecha_ingreso, $complementarios, $id_dueño)
    {
        $this->mainModel->addPaciente($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tamaño, $esteril, $observaciones, $fecha_ingreso, $complementarios, $id_dueño);
        header("Location: " . "nuevoCliente");
    }


}
