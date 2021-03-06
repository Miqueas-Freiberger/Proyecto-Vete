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
    ///////////////////////////////////SHOW//////////////////////////////SHOW////////////////////////////////SHOW//////////////////////////////////////////////
    public function showHome()
    {
        $dataClientes = $this->mainModel->getDataClientes();
        $this->mainView->displayHome($dataClientes);
    }
    public function showDataCliente($id_cliente)
    {
        $dataCliente = $this->mainModel->getDataCliente($id_cliente);
        $mascotasCliente = $this->mainModel->getDataMascotasCliente($id_cliente);
        $this->mainView->displayClientInfo($dataCliente, $mascotasCliente, $id_cliente);
    }

    public function showClientsForms()
    {
        $this->mainView->displayClientsForms();
    }

    public function showMascotaForm($id_cliente)
    {
        $this->mainView->displayMascotaForm($id_cliente);
    }
    ///////////////////////////////////GET//////////////////////////////GET////////////////////////////////GET//////////////////////////////////////////////////
    public function getHistorialMascota($id_mascota)
    {
        $historialMascota = $this->mainModel->getHistorialMascota($id_mascota);
        $this->mainView->displayHistorialMascota($historialMascota, $id_mascota);
    }

    public function getDataCliente()
    {
        $nombre_apellido = $_POST["nombre_apellido"];
        $dni = $_POST["dni"];
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
        $tama??o = $_POST["tama??o"];
        $esteril = $_POST["esteril"];
        $observaciones = $_POST["observaciones"];
        $motivoConsulta = $_POST["motivoConsulta"];
        $tratamiento = $_POST["tratamiento"];
        $fecha_ingreso = $_POST["fecha_ingreso"];
        if (isset($_POST['complementarios'])) {
            $complementarios = implode(" / ", $_POST['complementarios']);
        } else {
            $complementarios = "-";
        }


        $id_due??o = $this->addDataCliente($nombre_apellido, $dni, $telefono, $email, $direccion, $localidad);
        $id_mascota = $this->addDataPaciente($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tama??o, $esteril, $fecha_ingreso, $id_due??o);
        $this->addHistorial($id_mascota, $observaciones, $motivoConsulta, $tratamiento, $complementarios, $fecha_ingreso, $id_due??o);
    }

    public function getDataMascota()
    {
        if (!empty($_POST["tama??o"]) && !empty($_POST["esteril"])) {
            $nombrePaciente = $_POST["nombrePaciente"];
            $especie = $_POST["especie"];
            $nacimientoPaciente = $_POST["nacimientoPaciente"];
            $sexoPaciente = $_POST["sexoPaciente"];
            $raza = $_POST["raza"];
            $color = $_POST["color"];
            $tama??o = $_POST["tama??o"];
            $esteril = $_POST["esteril"];
            $motivoConsulta = $_POST["motivoConsulta"];
            $tratamiento = $_POST["tratamiento"];
            $observaciones = $_POST["observaciones"];
            $fecha_ingreso = $_POST["fecha_ingreso"];
            if (isset($_POST['complementarios'])) {
                $complementarios = implode(" / ", $_POST['complementarios']);
            } else {
                $complementarios = "-";
            }

            $id_cliente = $_POST['id_cliente'];

            $id_mascota  = $this->addDataPaciente($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tama??o, $esteril, $fecha_ingreso, $id_cliente);
            $this->addHistorial($id_mascota, $observaciones, $motivoConsulta, $tratamiento, $complementarios, $fecha_ingreso, $id_cliente);
        }
    }

    public function getNombreCliente()
    {
        $nombreCliente = $_GET["nombreCliente"];
        $cliente = $this->mainModel->buscarCliente($nombreCliente);

        if ($cliente) {
            $this->mainView->displayFilteredClient($cliente);
        } else {
            $this->mainView->showError("No se encontraron clientes que coincidan con la busqueda", $nombreCliente);
        }
    }

    public function getNewHistorialData($id_historial = null)
    {
        if ($id_historial == null) {
            $observaciones = $_POST["observaciones"];
            $tratamiento = $_POST["tratamiento"];
            $motivoConsulta = $_POST["motivoConsulta"];
            $fecha = $_POST["fecha"];
            $id_mascota = $_POST["id_mascota"];
            if (isset($_POST['complementarios'])) {
                $complementarios = implode(" / ", $_POST['complementarios']);
            } else {
                $complementarios = "-";
            }
            $this->addHistorial($id_mascota, $observaciones, $motivoConsulta, $tratamiento, $complementarios, $fecha);
        } else {
            $observaciones = $_POST["observaciones"];
            $tratamiento = $_POST["tratamiento"];
            $motivoConsulta = $_POST["motivoConsulta"];
            $fecha = $_POST["fecha"];
            if (isset($_POST['complementarios'])) {
                $complementarios = implode(" / ", $_POST['complementarios']);
            } else {
                $complementarios = "-";
            }


            $this->mainModel->updateHistorialData($observaciones, $tratamiento, $motivoConsulta, $fecha, $complementarios, $id_historial);
        }
    }

    public function getImgData()
    {
        $id_historial = intval($_POST["id_historial"]);
        $fileName = $_FILES['input_name']['name'];
        if ($_FILES['input_name']['type'] == "application/pdf") {
            $isDoc = false;
            $isPdf = true;
            $extension = $_FILES['input_name']['type'];
        } elseif ($_FILES['input_name']['type'] == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            $isPdf = false;
            $isDoc = true;
            $extension = $_FILES['input_name']['type'];
        } else {
            $isDoc = false;
            $isPdf = false;
            $extension = $_FILES['input_name']['type'];
        }
        $this->mainModel->addNewImg($_FILES['input_name']['tmp_name'], $id_historial, $isPdf, $isDoc, $fileName, $extension);
        header("Location: " . BASE_URL . "archivosHistorial" . "/$id_historial");
    }
    ///////////////////////////////////ADD//////////////////////////////ADD////////////////////////////////ADD//////////////////////////////////////////////////

    public function addDataCliente($nombre_apellido, $dni, $telefono, $email, $direccion, $localidad)
    {
        $id_cliente = $this->mainModel->addCliente($nombre_apellido, $dni, $telefono, $email, $direccion, $localidad);
        return $id_cliente;
    }
    public function addDataPaciente($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tama??o, $esteril, $fecha_ingreso, $id_due??o)
    {
        $id_mascota = $this->mainModel->addPaciente($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tama??o, $esteril, $fecha_ingreso, $id_due??o);
        return $id_mascota;
    }

    public function addHistorial($id_mascota, $observaciones, $motivoConsulta, $tratamiento, $complementarios, $fecha, $id_due??o = null)
    {
        $this->mainModel->addHistorial($id_mascota, $observaciones, $motivoConsulta, $tratamiento, $complementarios, $fecha);
        if ($id_due??o) {
            header("Location: " . BASE_URL . "cliente" . "/$id_due??o");
        } else {
            header("Location: " . BASE_URL . "historialMascota" . "/$id_mascota");
        }
    }

    ///////////////////////////////////DELETE//////////////////////////////DELETE////////////////////////////////DELETE/////////////////////////////////////////////

    public function eliminarMascota($id)
    {
        $id_mascota = intval($id);
        $due??oQuery = $this->mainModel->getIdDue??o($id_mascota);
        foreach ($due??oQuery as $due??oData) {
            $id_due??o = $due??oData->id_due??o_fk;
        }
        $this->mainModel->eliminarMascota($id_mascota);
        header("Location: " . BASE_URL . "cliente" . "/$id_due??o");
    }

    public function eliminarComplementarios($id_historial)
    {
        $this->mainModel->updateComplementarios($id_historial);
        $mascotaQuery = $this->mainModel->getIdMascota($id_historial);
        foreach ($mascotaQuery as $mascotaData) {
            $id_mascota = $mascotaData->id_mascota_fk;
        }
        header("Location: " . BASE_URL . "historialMascota" . "/$id_mascota");
    }

    public function eliminarHistorial($id)
    {
        $id_historial = intval($id);
        $mascotaQuery = $this->mainModel->getIdMascota($id_historial);
        foreach ($mascotaQuery as $mascotaData) {
            $id_mascota = $mascotaData->id_mascota_fk;
        }
        $this->mainModel->eliminarHistorial($id_historial);
        header("Location: " . BASE_URL . "historialMascota" . "/$id_mascota");
    }

    public function eliminarCliente($id)
    {
        $id_cliente = intval($id);
        $this->mainModel->eliminarCliente($id_cliente);
        header("Location: " . BASE_URL);
    }

    public function eliminarImagen($id)
    {
        $id_img = intval($id);
        $imgQuery = $this->mainModel->getIdHistorial($id_img);
        foreach ($imgQuery as $data) {
            $id_historial = $data->id_historial_fk;
        }
        $this->mainModel->eliminarImagen($id_img);
        header("Location: " . BASE_URL . "archivosHistorial" . "/$id_historial");
    }
    ///////////////////////////////////DISPLAY//////////////////////////////DISPLAY////////////////////////////////DISPLAY/////////////////////////////////////////////

    public function displayFormsAddHistorial($id_mascota)
    {
        $this->mainView->displayHistorialForms($id_mascota);
    }

    public function displayEditClienteForm($id_cliente)
    {
        $dataCliente = $this->mainModel->getDataCliente($id_cliente);
        $this->mainView->displayEditClientForm($dataCliente);
    }

    public function displayEditMascotaForm($id_mascota)
    {
        $dataMascota = $this->mainModel->getDataMascota($id_mascota);
        $this->mainView->displayEditMascotaForm($dataMascota);
    }

    public function displayEditHistorialForm($id_historial)
    {
        $dataHistorial = $this->mainModel->getHistorialData($id_historial);
        foreach ($dataHistorial as $data) {
            $arrayComplementarios = explode(" / ", ($data->Complementarios));
        }
        $lenght = count($arrayComplementarios);
        for ($i = 0; $i < $lenght; $i++) {
            $analisisBoolean = in_array("Analisis de sangre", $arrayComplementarios);
            $radiografiaBoolean = in_array("Radiografia", $arrayComplementarios);
            $ecografiaBoolean = in_array("Ecografia", $arrayComplementarios);
            $raspajeBoolean = in_array("Raspaje", $arrayComplementarios);
            $citologiaBoolean = in_array("Citologia", $arrayComplementarios);
            $analisisOrinaBoolean = in_array("Analisis de orina", $arrayComplementarios);
        }
        $this->mainView->displayEditHistorialForm($dataHistorial, $analisisBoolean, $radiografiaBoolean, $ecografiaBoolean, $raspajeBoolean, $citologiaBoolean, $analisisOrinaBoolean);
    }

    public function displayImgHistorial($id)
    {
        $id_historial = intval($id);
        $img_historial = $this->mainModel->getImgHistorial($id_historial);
        $this->mainView->displayImgHistorial($img_historial, $id_historial);
    }

    public function displayFile($file_id)
    {
        $fileQuery = $this->mainModel->getFileData($file_id);
        foreach ($fileQuery as $data) {
            if ($data->extension == "application/pdf") {
                $filePath = $data->ruta;
                header("content-type: application/pdf");
                readfile($filePath);
            } elseif ($data->extension == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                $fileName = $data->nuevoNombre;
                $filePath = $data->ruta;
                header("Content-type: application/msword");
                header("Content-Disposition: inline; filename=$fileName");
                readfile($filePath);
            }
        };
    }

    ///////////////////////////////////UPDATE//////////////////////////////UPDATE////////////////////////////////UPDATE/////////////////////////////////////////////

    public function updateClientData()
    {
        $nombre_apellido = $_POST["nombre_apellido"];
        $dni = $_POST["dni"];
        $telefono = $_POST["telefono"];
        $email = $_POST["email"];
        $direccion = $_POST["direccion"];
        $localidad = $_POST["localidad"];
        $id_cliente = $_POST['id_cliente'];

        $this->mainModel->updateClientData($nombre_apellido, $dni, $telefono, $email, $direccion, $localidad, $id_cliente);
        header("Location: " . BASE_URL . "cliente" . "/$id_cliente");
    }

    public function updateDataMascota()
    {
        $nombrePaciente = $_POST["nombrePaciente"];
        $especie = $_POST["especie"];
        $nacimientoPaciente = $_POST["nacimientoPaciente"];
        $sexoPaciente = $_POST["sexoPaciente"];
        $raza = $_POST["raza"];
        $color = $_POST["color"];
        $tama??o = $_POST["tama??o"];
        $esteril = $_POST["esteril"];
        $fecha_ingreso = $_POST["fecha_ingreso"];
        $id_mascota = $_POST["id_mascota"];
        $dataDue??o = $this->mainModel->getIdDue??o($id_mascota);

        foreach ($dataDue??o as $data) {
            $id_due??o = $data->id_due??o_fk;
        }
        $this->mainModel->updateMascotaData($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tama??o, $esteril, $fecha_ingreso, $id_mascota);
        header("Location: " . BASE_URL . "cliente" . "/$id_due??o");
    }

    public function updateDataHistorial()
    {
        $id_historial = $_POST["id_historial"];
        $this->getNewHistorialData($id_historial);

        $id_mascota = $_POST["id_mascota_historial"];
        header("Location: " . BASE_URL . "historialMascota" . "/$id_mascota");
    }
}
