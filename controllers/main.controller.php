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
    public function showDataCliente($id_cliente)
    {
        $dataCliente = $this->mainModel->getDataCliente($id_cliente);
        $mascotasCliente = $this->mainModel->getDataMascotasCliente($id_cliente);

        /* foreach ($mascotasCliente as $data) {
            $id_mascotas = $data->id;
            $historialMascota = $this->mainModel->getHistorialMascota($id_mascotas);
            
        } */
        $this->mainView->displayClientInfo($dataCliente,$mascotasCliente,$id_cliente);
    }

    public function getHistorialMascota($id_mascota)
    {
        $historialMascota = $this->mainModel->getHistorialMascota($id_mascota);
        $complementarios = $this->mainModel->getComplementarios($id_mascota);
        $this->mainView->displayHistorialMascota($historialMascota,$complementarios);
    }

    public function showClientsForms()
    {
        $this->mainView->displayClientsForms();
    }

    public function showMascotaForm($id_cliente)
    {
        $this->mainView->displayMascotaForm($id_cliente);   
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
            $motivoConsulta = $_POST["motivoConsulta"];
            $tratamiento = $_POST["tratamiento"];


            $fecha_ingreso = $_POST["fecha_ingreso"];
            $complementarios = implode(" / ", $_POST['complementarios']);

            $id_dueño = $this->addDataCliente($nombre_apellido, $telefono, $email, $direccion, $localidad);
            $id_mascota= $this->addDataPaciente($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tamaño, $esteril, $fecha_ingreso, $complementarios, $id_dueño);
            $this->addHistorial($id_mascota,$id_dueño,$observaciones,$motivoConsulta,$tratamiento);
        }
    }

    public function addDataCliente($nombre_apellido, $telefono, $email, $direccion, $localidad)
    {
        $id_cliente = $this->mainModel->addCliente($nombre_apellido, $telefono, $email, $direccion, $localidad);
        return $id_cliente;
    }
    public function addDataPaciente($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tamaño, $esteril, $fecha_ingreso, $complementarios, $id_dueño)
    {
        $id_mascota = $this->mainModel->addPaciente($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tamaño, $esteril, $fecha_ingreso, $complementarios, $id_dueño);
        return $id_mascota;
        
    }

    public function addHistorial($id_mascota,$id_dueño,$observaciones,$motivoConsulta,$tratamiento)
    {
        $this->mainModel->addHistorial($id_mascota,$observaciones,$motivoConsulta,$tratamiento);
        header("Location: " . "cliente" . "/$id_dueño");
    }

    public function eliminarMascota($id_mascota)
    {
        $this->mainModel->eliminarMascota($id_mascota);
        header("Location: " . BASE_URL);
    }

    public function getDataMascota()
    {
        if (!empty($_POST["tamaño"]) && !empty($_POST["esteril"])) {
            $nombrePaciente = $_POST["nombrePaciente"];
            $especie = $_POST["especie"];
            $nacimientoPaciente = $_POST["nacimientoPaciente"];
            $sexoPaciente = $_POST["sexoPaciente"];
            $raza = $_POST["raza"];
            $color = $_POST["color"];
            $tamaño = $_POST["tamaño"];
            $esteril = $_POST["esteril"];
            $motivoConsulta = $_POST["motivoConsulta"];
            $tratamiento = $_POST["tratamiento"];
            $observaciones = $_POST["observaciones"];
            $fecha_ingreso = $_POST["fecha_ingreso"];
            $complementarios = implode(" / ", $_POST['complementarios']);
            $id_cliente = $_POST['id_cliente'];
            
            $id_mascota  = $this->addDataPaciente($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tamaño, $esteril,$fecha_ingreso, $complementarios, $id_cliente);
            $this->addHistorial($id_mascota,$id_cliente,$observaciones,$motivoConsulta,$tratamiento);
        }
        
        
    }

    public function getNombreCliente()
    {
        $nombreCliente=$_GET["nombreCliente"];
        $cliente = $this->mainModel->buscarCliente($nombreCliente);

        if ($cliente) {
            $this->mainView->displayFilteredClient($cliente);
        }else {
            $this->mainView->showError("El cliente buscado no se encuentra registrado");
        }
    }

}
