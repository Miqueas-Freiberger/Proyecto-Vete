<?php

class MainModel
{
    private $db;

    public function __construct()
    {
        $this->db = new PDO('mysql:host=localhost;' . 'dbname=db_veterinaria;charset=utf8', 'root', '');
    }

    public function addCliente($nombre_apellido, $telefono, $email,$direccion,$localidad)
    {
        $query = $this->db->prepare('INSERT INTO clientes (NombreApellido, Telefono, Email, Direccion,Localidad) VALUES (?,?,?,?,?)');
        $query->execute([$nombre_apellido, $telefono, $email,$direccion,$localidad]);
       
        return $this->db->lastInsertId();;
    }

    public function addPaciente($nombrePaciente,$especie,$nacimientoPaciente,$sexoPaciente,$raza,$color,$tamaño,$esteril,$observaciones,$fecha_ingreso,$complementarios,$id_cliente)
    {
        $query = $this->db->prepare("INSERT INTO paciente (Nombre,Especie,Nacimiento,Sexo,Raza,Color,Tamaño,Esterilizado,Complementarios,Observaciones,FechaIngreso,id_dueño_fk) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)");
        $query->execute([$nombrePaciente,$especie,$nacimientoPaciente,$sexoPaciente,$raza,$color,$tamaño,$esteril,$complementarios,$observaciones,$fecha_ingreso,$id_cliente]);
    }
}
