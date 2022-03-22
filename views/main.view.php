<?php
require_once './libs/smarty-3.1.39/libs/Smarty.class.php';

class MainView
{
    private $smarty;

    public function __construct()
    {
        $this->smarty = new Smarty();
    }
    ///////////////////////////////////HOME//////////////////////////////HOME////////////////////////////////HOME//////////////////////////////////////////////////

    public function displayHome($dataClientes)
    {
        $this->smarty->assign("dataClientes", $dataClientes);
        $this->smarty->display('templates/home.tpl');
    }

    ///////////////////////////////////CLIENT//////////////////////////////CLIENT////////////////////////////////CLIENT//////////////////////////////////////////////////


    public function displayClientInfo($dataCliente, $mascotasCliente, $id_cliente)
    {
        $this->smarty->assign("dataCliente", $dataCliente);
        $this->smarty->assign("dataMascota", $mascotasCliente);
        $this->smarty->assign("id_cliente", $id_cliente);

        $this->smarty->display('templates/clientsInfo.tpl');
    }

    public function displayClientsForms()
    {
        $this->smarty->display('templates/clientsForm.tpl');
    }

    public function displayFilteredClient($cliente)
    {
        $this->smarty->assign("dataClientes", $cliente);
        $this->smarty->display('templates/home.tpl');
    }

    public function displayEditClientForm($dataCliente)
    {
        $this->smarty->assign("dataCliente", $dataCliente);
        $this->smarty->display("templates/editClienteForm.tpl");
    }

    ///////////////////////////////////MASCOTA//////////////////////////////MASCOTA////////////////////////////////MASCOTA//////////////////////////////////////////////////


    public function displayHistorialMascota($historialMascota, $id_mascota)
    {
        $this->smarty->assign("historialMascota", $historialMascota);
        $this->smarty->assign("id_mascota", $id_mascota);
        $this->smarty->display("templates/historialMascota.tpl");
    }

    public function displayMascotaForm($id_cliente)
    {
        $this->smarty->assign("id_cliente", $id_cliente);
        $this->smarty->display('templates/mascotaForm.tpl');
    }

    public function displayEditMascotaForm($dataMascota)
    {
        $this->smarty->assign("dataMascota", $dataMascota);
        $this->smarty->display("templates/editMascotaForm.tpl");
    }

    ///////////////////////////////////HISTORIAL//////////////////////////////HISTORIAL////////////////////////////////HISTORIAL//////////////////////////////////////////////////

    public function displayHistorialForms($id_mascota)
    {
        $this->smarty->assign("id_mascota", $id_mascota);
        $this->smarty->display('templates/addHistorialForms.tpl');
    }

    public function displayEditHistorialForm($dataHistorial)
    {
        $this->smarty->assign("dataHistorial", $dataHistorial);
        $this->smarty->display("templates/editHistorialForm.tpl");
    }

    public function displayImgHistorial($imgData,$id_historial)
    {
        $this->smarty->assign("imgData",$imgData);
        $this->smarty->assign("idHistorial",$id_historial);
        $this->smarty->display("templates/imgHistorial.tpl");
    }

    public function showError($mensaje, $busqueda=null)
    {
        if ($busqueda) {
            $this->smarty->assign("busqueda", $busqueda);
        }
        $this->smarty->assign("mensaje", $mensaje);
        $this->smarty->display('templates/errorMsj.tpl');
    }
}
