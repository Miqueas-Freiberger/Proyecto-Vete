<?php
include_once('models/main.model.php');
include_once('views/main.view.php');
require_once __DIR__ . '/../libs/storage.php';
class MainController
{
    private $mainModel;
    private $mainView;


    public function __construct()
    {
        $this->mainModel = new MainModel();
        $this->mainView = new MainView();
    }
    ///////////////////////////////////LOGIN//////////////////////////////LOGIN////////////////////////////////LOGIN//////////////////////////////////////////////

    public function login()
    {
        if (auth_is_logged_in()) {
            header("Location: " . BASE_URL);
            return;
        }

        if (!app_auth_config()) {
            $this->mainView->displayLoginForm(
                "Falta configurar el acceso. Cargar APP_AUTH_USER y APP_AUTH_PASSWORD_HASH."
            );
            return;
        }

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->mainView->displayLoginForm();
            return;
        }

        $usuario = $_POST['usuario'] ?? '';
        $contrasena = $_POST['contrasena'] ?? '';

        if (auth_login($usuario, $contrasena)) {
            header("Location: " . BASE_URL);
            return;
        }

        $this->mainView->displayLoginForm("Usuario o contraseña incorrectos.");
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
        $nombre_apellido = app_texto($_POST["nombre_apellido"] ?? '', 50);
        $dni = app_entero($_POST["dni"] ?? '');
        $telefono = app_texto($_POST["telefono"] ?? '', 100);
        $email = app_texto($_POST["email"] ?? '', 70);
        $direccion = app_texto($_POST["direccion"] ?? '', 1000);
        $localidad = app_texto($_POST["localidad"] ?? '', 40);
        $nombrePaciente = app_texto($_POST["nombrePaciente"] ?? '', 30);
        $especie = app_texto($_POST["especie"] ?? '', 30);
        $nacimientoPaciente = app_texto($_POST["nacimientoPaciente"] ?? '', 50);
        $sexoPaciente = app_texto($_POST["sexoPaciente"] ?? '', 30);
        $raza = app_texto($_POST["raza"] ?? '', 50);
        $color = app_texto($_POST["color"] ?? '', 50);
        $tamaño = app_texto($_POST["tamaño"] ?? '', 10);
        $esteril = app_texto($_POST["esteril"] ?? '', 2);
        $observaciones = trim($_POST["observaciones"] ?? '');
        $motivoConsulta = app_texto($_POST["motivoConsulta"] ?? '', 255);
        $tratamiento = trim($_POST["tratamiento"] ?? '');
        $fecha_ingreso = app_fecha($_POST["fecha_ingreso"] ?? '');
        if (!empty($_POST['complementarios']) && is_array($_POST['complementarios'])) {
            $complementarios = app_texto(implode(" / ", $_POST['complementarios']), 110);
        } else {
            $complementarios = "-";
        }


        $id_dueño = $this->addDataCliente($nombre_apellido, $dni, $telefono, $email, $direccion, $localidad);
        $id_mascota = $this->addDataPaciente($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tamaño, $esteril, $fecha_ingreso, $id_dueño);
        $this->addHistorial($id_mascota, $observaciones, $motivoConsulta, $tratamiento, $complementarios, $fecha_ingreso, $id_dueño);
    }

    public function getDataMascota()
    {
        if (!empty($_POST["tamaño"]) && !empty($_POST["esteril"])) {
            $nombrePaciente = app_texto($_POST["nombrePaciente"] ?? '', 30);
            $especie = app_texto($_POST["especie"] ?? '', 30);
            $nacimientoPaciente = app_texto($_POST["nacimientoPaciente"] ?? '', 50);
            $sexoPaciente = app_texto($_POST["sexoPaciente"] ?? '', 30);
            $raza = app_texto($_POST["raza"] ?? '', 50);
            $color = app_texto($_POST["color"] ?? '', 50);
            $tamaño = app_texto($_POST["tamaño"] ?? '', 10);
            $esteril = app_texto($_POST["esteril"] ?? '', 2);
            $motivoConsulta = app_texto($_POST["motivoConsulta"] ?? '', 255);
            $tratamiento = trim($_POST["tratamiento"] ?? '');
            $observaciones = trim($_POST["observaciones"] ?? '');
            $fecha_ingreso = app_fecha($_POST["fecha_ingreso"] ?? '');
            if (!empty($_POST['complementarios']) && is_array($_POST['complementarios'])) {
                $complementarios = app_texto(implode(" / ", $_POST['complementarios']), 110);
            } else {
                $complementarios = "-";
            }

            $id_cliente = app_entero($_POST['id_cliente'] ?? '');

            $id_mascota  = $this->addDataPaciente($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tamaño, $esteril, $fecha_ingreso, $id_cliente);
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
        $observaciones = trim($_POST["observaciones"] ?? '');
        $tratamiento = trim($_POST["tratamiento"] ?? '');
        $motivoConsulta = app_texto($_POST["motivoConsulta"] ?? '', 255);
        $fecha = app_fecha($_POST["fecha"] ?? '');

        // La columna Complementarios admite 110 caracteres y con los seis
        // estudios marcados entran justos.
        if (!empty($_POST['complementarios']) && is_array($_POST['complementarios'])) {
            $complementarios = app_texto(implode(" / ", $_POST['complementarios']), 110);
        } else {
            $complementarios = "-";
        }

        if ($id_historial == null) {
            $id_mascota = app_entero($_POST["id_mascota"] ?? '');
            $this->addHistorial($id_mascota, $observaciones, $motivoConsulta, $tratamiento, $complementarios, $fecha);
        } else {
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
    public function addDataPaciente($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tamaño, $esteril, $fecha_ingreso, $id_dueño)
    {
        $id_mascota = $this->mainModel->addPaciente($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tamaño, $esteril, $fecha_ingreso, $id_dueño);
        return $id_mascota;
    }

    public function addHistorial($id_mascota, $observaciones, $motivoConsulta, $tratamiento, $complementarios, $fecha, $id_dueño = null)
    {
        $this->mainModel->addHistorial($id_mascota, $observaciones, $motivoConsulta, $tratamiento, $complementarios, $fecha);
        if ($id_dueño) {
            header("Location: " . BASE_URL . "cliente" . "/$id_dueño");
        } else {
            header("Location: " . BASE_URL . "historialMascota" . "/$id_mascota");
        }
    }

    ///////////////////////////////////DELETE//////////////////////////////DELETE////////////////////////////////DELETE/////////////////////////////////////////////

    public function eliminarMascota($id)
    {
        $id_mascota = intval($id);
        $dueñoQuery = $this->mainModel->getIdDueño($id_mascota);
        foreach ($dueñoQuery as $dueñoData) {
            $id_dueño = $dueñoData->id_dueño_fk;
        }
        $this->mainModel->eliminarMascota($id_mascota);
        header("Location: " . BASE_URL . "cliente" . "/$id_dueño");
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

        // Borrar tambien el archivo, para no dejarlo huerfano ocupando lugar.
        foreach ($this->mainModel->getFileData($id_img) as $file) {
            storage_delete($file->ruta);
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

        // Cada adjunto viaja al template con su propia URL de lectura, que con
        // bucket es temporal y firmada.
        foreach ($img_historial as $file) {
            $file->url = storage_url($file->ruta);
        }

        $this->mainView->displayImgHistorial($img_historial, $id_historial);
    }

    public function displayFile($file_id)
    {
        $fileQuery = $this->mainModel->getFileData($file_id);
        foreach ($fileQuery as $data) {
            if ($data->extension == "application/pdf") {
                $tipo = "application/pdf";
            } elseif ($data->extension == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                $tipo = "application/msword";
            } else {
                $tipo = null;
            }

            if (storage_uses_s3()) {
                // El navegador lo pide directo al bucket, sin que el archivo
                // pase por la app.
                $extra = $tipo ? ['response-content-type' => $tipo] : [];
                header("Location: " . storage_url($data->ruta, 300, $extra));
                return;
            }

            $filePath = app_uploads_dir() . '/' . $data->ruta;
            if (!is_file($filePath)) {
                http_response_code(404);
                echo "El archivo ya no esta disponible.";
                return;
            }
            if ($tipo === "application/pdf") {
                header("content-type: application/pdf");
                readfile($filePath);
            } elseif ($tipo === "application/msword") {
                $fileName = $data->nuevoNombre;
                header("Content-type: application/msword");
                header("Content-Disposition: inline; filename=$fileName");
                readfile($filePath);
            }
        };
    }

    ///////////////////////////////////UPDATE//////////////////////////////UPDATE////////////////////////////////UPDATE/////////////////////////////////////////////

    public function updateClientData()
    {
        $nombre_apellido = app_texto($_POST["nombre_apellido"] ?? '', 50);
        $dni = app_entero($_POST["dni"] ?? '');
        $telefono = app_texto($_POST["telefono"] ?? '', 100);
        $email = app_texto($_POST["email"] ?? '', 70);
        $direccion = app_texto($_POST["direccion"] ?? '', 1000);
        $localidad = app_texto($_POST["localidad"] ?? '', 40);
        $id_cliente = app_entero($_POST['id_cliente'] ?? '');

        $this->mainModel->updateClientData($nombre_apellido, $dni, $telefono, $email, $direccion, $localidad, $id_cliente);
        header("Location: " . BASE_URL . "cliente" . "/$id_cliente");
    }

    public function updateDataMascota()
    {
        $nombrePaciente = app_texto($_POST["nombrePaciente"] ?? '', 30);
        $especie = app_texto($_POST["especie"] ?? '', 30);
        $nacimientoPaciente = app_texto($_POST["nacimientoPaciente"] ?? '', 50);
        $sexoPaciente = app_texto($_POST["sexoPaciente"] ?? '', 30);
        $raza = app_texto($_POST["raza"] ?? '', 50);
        $color = app_texto($_POST["color"] ?? '', 50);
        $tamaño = app_texto($_POST["tamaño"] ?? '', 10);
        $esteril = app_texto($_POST["esteril"] ?? '', 2);
        $fecha_ingreso = app_fecha($_POST["fecha_ingreso"] ?? '');
        $id_mascota = app_entero($_POST["id_mascota"] ?? '');
        $dataDueño = $this->mainModel->getIdDueño($id_mascota);

        foreach ($dataDueño as $data) {
            $id_dueño = $data->id_dueño_fk;
        }
        $this->mainModel->updateMascotaData($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tamaño, $esteril, $fecha_ingreso, $id_mascota);
        header("Location: " . BASE_URL . "cliente" . "/$id_dueño");
    }

    public function updateDataHistorial()
    {
        $id_historial = app_entero($_POST["id_historial"] ?? '');
        $this->getNewHistorialData($id_historial);

        $id_mascota = app_entero($_POST["id_mascota_historial"] ?? '');
        header("Location: " . BASE_URL . "historialMascota" . "/$id_mascota");
    }
}
