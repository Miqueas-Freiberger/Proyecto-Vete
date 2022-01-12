<?php
require_once('./model/main-controller.php');
require_once('./view/main-model.php');
class MainView
{
    private $mainModel;
    private $mainController;

    public function __construct()
    {
        $this->mainModel = new MainModel;
        $this->mainController = new MainController;
    }

}
