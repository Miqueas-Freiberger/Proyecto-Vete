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
        $this->mainView->displayHome();
    }

    public function showClientsForms()
    {
        $this->mainView->displayClientsForms();
    }

    public function getDataCliente()
    {
        
    }
}
