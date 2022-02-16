<?php
require_once './libs/smarty-3.1.39/libs/Smarty.class.php';

class MainView
{
    private $smarty;

    public function __construct()
    {
        $this->smarty = new Smarty();
    }

    public function displayHome()
    {
        $this->smarty->display('templates/home.tpl');
    }

    public function displayClientsForms()
    {
        $this->smarty->display('templates/clientsForm.tpl');
    }
}
