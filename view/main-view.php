<?php
require_once('./controller/main-controller.php');
require_once('./model/main-model.php');
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
