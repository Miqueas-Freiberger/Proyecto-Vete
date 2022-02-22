<?php

class MainModel
{
    private $db;

    public function __construct()
    {
        $this->db = new PDO('mysql:host=localhost;' . 'dbname=db_veterinaria;charset=utf8', 'root', '');
    }

    public function getDataClientes()
    {
        $query = $this->db->prepare('SELECT * FROM clientes');
        $query->execute();

        $queryData = $query->fetchAll(PDO::FETCH_OBJ);
        return $queryData;
    }

    public function getDataCliente($id_cliente)
    {
        $query = $this->db->prepare('SELECT * FROM clientes WHERE id = ?');
        $query->execute([$id_cliente]);

        $queryData = $query->fetchAll(PDO::FETCH_OBJ);
        return $queryData;
    }


    public function getDataMascotasCliente($id_cliente)
    {
        $query = $this->db->prepare('SELECT * FROM paciente WHERE id_dueño_fk = ?');
        $query->execute([$id_cliente]);

        $queryData = $query->fetchAll(PDO::FETCH_OBJ);
        return $queryData;
    }


    public function addCliente($nombre_apellido, $telefono, $email,$direccion,$localidad)
    {
        $query = $this->db->prepare('INSERT INTO clientes (NombreApellido, Telefono, Email, Direccion,Localidad) VALUES (?,?,?,?,?)');
        $query->execute([$nombre_apellido, $telefono, $email,$direccion,$localidad]);
       
        return $this->db->lastInsertId();;
    }

    public function addPaciente($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tamaño, $esteril, $observaciones, $fecha_ingreso, $complementarios, $motivoConsulta, $tratamiento, $id_dueño)
    {
        $query = $this->db->prepare("INSERT INTO paciente (Nombre,Especie,Nacimiento,Sexo,Raza,Color,Tamano,Esterilizado,Complementarios,Observaciones,FechaIngreso,MotivoConsulta,Tratamiento,id_dueño_fk) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        $query->execute([$nombrePaciente,$especie,$nacimientoPaciente,$sexoPaciente,$raza,$color,$tamaño,$esteril,$complementarios,$observaciones,$fecha_ingreso,$motivoConsulta,$tratamiento,$id_dueño ]);
    }

    public function buscarCliente($nombreCliente)
    {
        $query=$this->db->prepare("SELECT * FROM clientes WHERE NombreApellido LIKE ?");
        $query->execute(["%$nombreCliente%"]);

        $queryData = $query->fetchAll(PDO::FETCH_OBJ);
        return $queryData;
    }
}
