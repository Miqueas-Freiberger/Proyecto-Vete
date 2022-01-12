<?php
require_once('./controller/main-controller.php');
require_once('./view/main-view.php');


class MainModel
{
    private $mainView;
    private $mainController;

    public function __construct()
    {
        $this->mainView = new MainView;
        $this->mainController = new MainController;
    }

}
