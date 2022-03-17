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


    public function getHistorialMascota($id_mascota)
    {
        $query = $this->db->prepare('SELECT * FROM historial WHERE id_mascota_fk = ?');
        $query->execute([$id_mascota]);

        $queryData = $query->fetchAll(PDO::FETCH_OBJ);
        return $queryData;
    }
    public function getInfoConsulta($id_mascota)
    {
        $query=$this->db->prepare("SELECT Complementarios FROM paciente WHERE id = ?");
        $query->execute([$id_mascota]);

        $queryData = $query->fetchAll(PDO::FETCH_OBJ);
        return $queryData;
    }


    public function addCliente($nombre_apellido, $telefono, $email,$direccion,$localidad)
    {
        $query = $this->db->prepare('INSERT INTO clientes (NombreApellido, Telefono, Email, Direccion,Localidad) VALUES (?,?,?,?,?)');
        $query->execute([$nombre_apellido, $telefono, $email,$direccion,$localidad]);
       
        return $this->db->lastInsertId();
    }

    public function addPaciente($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tamaño, $esteril,$fecha_ingreso,$id_dueño)
    {
        $query = $this->db->prepare("INSERT INTO paciente (Nombre,Especie,Nacimiento,Sexo,Raza,Color,Tamano,Esterilizado,FechaIngreso,id_dueño_fk) VALUES(?,?,?,?,?,?,?,?,?,?)");
        $query->execute([$nombrePaciente,$especie,$nacimientoPaciente,$sexoPaciente,$raza,$color,$tamaño,$esteril,$fecha_ingreso,$id_dueño]);
        
        return $this->db->lastInsertId();
    }

    public function addHistorial($id_mascota,$observaciones,$motivoConsulta,$tratamiento,$complementarios,$fecha)
    {
        $query = $this->db->prepare("INSERT INTO historial (Observacion,MotivoConsulta,Tratamiento,Complementarios,Fecha,id_mascota_fk) VALUES (?,?,?,?,?,?)");
        $query->execute([$observaciones,$motivoConsulta,$tratamiento,$complementarios,$fecha,$id_mascota]);
    }

    public function buscarCliente($nombreCliente)
    {
        $query=$this->db->prepare("SELECT * FROM clientes WHERE NombreApellido LIKE ?");
        $query->execute(["%$nombreCliente%"]);

        $queryData = $query->fetchAll(PDO::FETCH_OBJ);
        return $queryData;
    }

    public function eliminarMascota($id_mascota)
    {
        $query=$this->db->prepare("DELETE FROM paciente WHERE id = ?");
        $query->execute([$id_mascota]);
    }

    public function updateClientData($nombre_apellido,$telefono,$email,$direccion,$localidad,$id_cliente)
    {
        $query=$this->db->prepare("UPDATE clientes SET `NombreApellido` = ?, `Telefono` = ?, `Email`=?,`Direccion`=?,`Localidad`=? WHERE `id` = ?");
        $query->execute([$nombre_apellido,$telefono,$email,$direccion,$localidad,$id_cliente]);
    }

    public function getDataMascota($id_mascota)
    {
        $query=$this->db->prepare("SELECT * FROM paciente WHERE id = ?");
        $query->execute([$id_mascota]);

        $queryData = $query->fetchAll(PDO::FETCH_OBJ);

        return $queryData;
    }

}
