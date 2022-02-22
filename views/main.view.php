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

}
