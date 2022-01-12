<?php
require_once('./model/main-model.php');
require_once('./view/main-view.php');

class MainController
{
    private $mainView;
    private $mainModel;

    public function __construct()
    {
        $this->mainView = new MainView;
        $this->mainModel = new MainModel;
    }
}
