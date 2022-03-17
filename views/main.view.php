<?php
require_once './libs/smarty-3.1.39/libs/Smarty.class.php';

class MainView
{
    private $smarty;

    public function __construct()
    {
        $this->smarty = new Smarty();
    }

    public function displayHome($dataClientes)
    {
        $this->smarty->assign("dataClientes",$dataClientes);
        $this->smarty->display('templates/home.tpl');
    }
    
    public function displayClientInfo($dataCliente,$mascotasCliente,$id_cliente)
    {
        $this->smarty->assign("dataCliente",$dataCliente);
        $this->smarty->assign("dataMascota",$mascotasCliente);
        $this->smarty->assign("id_cliente",$id_cliente);

        $this->smarty->display('templates/clientsInfo.tpl');
    }

    public function displayHistorialMascota($historialMascota,$id_mascota)
    {
        $this->smarty->assign("historialMascota",$historialMascota);
        $this->smarty->assign("id_mascota",$id_mascota);
        $this->smarty->display("templates/historialMascota.tpl");
    }

    public function displayClientsForms()
    {
        $this->smarty->display('templates/clientsForm.tpl');
    }

    public function displayMascotaForm($id_cliente)
    {
        $this->smarty->assign("id_cliente",$id_cliente);
        $this->smarty->display('templates/mascotaForm.tpl');
    }

    public function displayFilteredClient($cliente)
    {
        $this->smarty->assign("dataClientes",$cliente);
        $this->smarty->display('templates/home.tpl');
    }

    public function showError($mensaje)
    {
        $this->smarty->assign("mensaje",$mensaje);
        $this->smarty->display('templates/errorMsj.tpl');
    }

    public function displayHistorialForms($id_mascota)
    {
        $this->smarty->assign("id_mascota",$id_mascota);
        $this->smarty->display('templates/addHistorialForms.tpl');
    }

    public function displayEditClientForm($dataCliente)
    {
        $this->smarty->assign("dataCliente",$dataCliente);
        $this->smarty->display("templates/editClienteForm.tpl");
    }

    public function displayEditMascotaForm($dataMascota)
    {
        $this->smarty->assign("dataMascota",$dataMascota);
        $this->smarty->display("templates/editMascotaForm.tpl");
        
    }


    public function displayEditHistorialForm($dataHistorial)
    {
        $this->smarty->assign("dataHistorial",$dataHistorial);
        $this->smarty->display("templates/editHistorialForm.tpl");
    }
}
