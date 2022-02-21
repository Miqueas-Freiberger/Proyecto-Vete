<?php

class MainModel
{
    private $db;

    public function __construct()
    {
        $this->db = new PDO('mysql:host=localhost;' . 'dbname=db_veterinaria;charset=utf8', 'root', '');
    }
}
