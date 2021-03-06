<?php

class MainModel
{
    private $db;

    public function __construct()
    {
        $this->db = new PDO('mysql:host=localhost;' . 'dbname=db_veterinaria;charset=utf8', 'root', '');
    }

    ///////////////////////////////////GET//////////////////////////////GET////////////////////////////////GET//////////////////////////////////////////////////

    public function getDataClientes()
    {
        $query = $this->db->prepare('SELECT * FROM clientes ORDER BY NombreApellido ASC');
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
        $query = $this->db->prepare("SELECT Complementarios FROM paciente WHERE id = ?");
        $query->execute([$id_mascota]);

        $queryData = $query->fetchAll(PDO::FETCH_OBJ);
        return $queryData;
    }

    public function getDataMascota($id_mascota)
    {
        $query = $this->db->prepare("SELECT * FROM paciente WHERE id = ?");
        $query->execute([$id_mascota]);

        $queryData = $query->fetchAll(PDO::FETCH_OBJ);

        return $queryData;
    }

    public function getIdDueño($id_mascota)
    {
        $query = $this->db->prepare("SELECT id_dueño_fk FROM paciente WHERE id = ?");
        $query->execute([$id_mascota]);

        $queryData = $query->fetchAll(PDO::FETCH_OBJ);

        return $queryData;
    }

    public function getHistorialData($id_historial)
    {
        $query = $this->db->prepare('SELECT * FROM historial WHERE id = ?');
        $query->execute([$id_historial]);

        $queryData = $query->fetchAll(PDO::FETCH_OBJ);
        return $queryData;
    }

    public function buscarCliente($nombreCliente)
    {
        $query = $this->db->prepare("SELECT * FROM clientes WHERE NombreApellido LIKE ?");
        $query->execute(["%$nombreCliente%"]);

        $queryData = $query->fetchAll(PDO::FETCH_OBJ);
        return $queryData;
    }

    public function getIdMascota($id_historial)
    {
        $query = $this->db->prepare('SELECT id_mascota_fk FROM historial WHERE id = ?');
        $query->execute([$id_historial]);

        $queryData = $query->fetchAll(PDO::FETCH_OBJ);
        return $queryData;
    }

    public function getImgHIstorial($id_historial)
    {
        $query = $this->db->prepare('SELECT * FROM imagenes WHERE id_historial_fk = ?');
        $query->execute([$id_historial]);

        $queryData = $query->fetchAll(PDO::FETCH_OBJ);
        return $queryData;
    }

    public function getIdHistorial($id_img)
    {
        $query = $this->db->prepare('SELECT id_historial_fk FROM imagenes WHERE id = ?');
        $query->execute([$id_img]);

        $queryData = $query->fetchAll(PDO::FETCH_OBJ);
        return $queryData;
    }

    public function getFileData($fileId)
    {
        $query = $this->db->prepare('SELECT * FROM imagenes WHERE id = ?');
        $query->execute([$fileId]);

        $queryData = $query->fetchAll(PDO::FETCH_OBJ);
        return $queryData;
    }

    ///////////////////////////////////ADD//////////////////////////////ADD////////////////////////////////ADD//////////////////////////////////////////////////

    public function addCliente($nombre_apellido, $dni, $telefono, $email, $direccion, $localidad)
    {
        $query = $this->db->prepare('INSERT INTO clientes (NombreApellido, Dni,Telefono, Email, Direccion,Localidad) VALUES (?,?,?,?,?,?)');
        $query->execute([$nombre_apellido, $dni, $telefono, $email, $direccion, $localidad]);

        return $this->db->lastInsertId();
    }

    public function addPaciente($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tamaño, $esteril, $fecha_ingreso, $id_dueño)
    {
        $query = $this->db->prepare("INSERT INTO paciente (Nombre,Especie,Nacimiento,Sexo,Raza,Color,Tamano,Esterilizado,FechaIngreso,id_dueño_fk) VALUES(?,?,?,?,?,?,?,?,?,?)");
        $query->execute([$nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tamaño, $esteril, $fecha_ingreso, $id_dueño]);

        return $this->db->lastInsertId();
    }

    public function addHistorial($id_mascota, $observaciones, $motivoConsulta, $tratamiento, $complementarios, $fecha)
    {
        $query = $this->db->prepare("INSERT INTO historial (Observacion,MotivoConsulta,Tratamiento,Complementarios,Fecha,id_mascota_fk) VALUES (?,?,?,?,?,?)");
        $query->execute([$observaciones, $motivoConsulta, $tratamiento, $complementarios, $fecha, $id_mascota]);
    }

    public function addNewImg($imgContent, $id_historial, $isPdf, $isDoc, $fileName, $fileExtension)
    {
        
        if ($isPdf == false && $isDoc == false) {
            $fileNewName = uniqid() . ".jpg";
            $filePath = 'images/historial/ ' . $fileNewName;
            $fileBooleanControl = false;
        } elseif ($isDoc == true) {
            $fileNewName = uniqid() . ".doc";
            $filePath = 'archivos/historial/ ' . $fileNewName;
            $fileBooleanControl = true;
        } else {
            $fileNewName = uniqid() . ".pdf";
            $filePath = 'archivos/historial/ ' . $fileNewName;
            $fileBooleanControl = true;
        }

        move_uploaded_file($imgContent, $filePath);
        $query = $this->db->prepare("INSERT INTO imagenes (nombre,ruta,extension,nuevoNombre,booleanFlag,id_historial_fk) VALUES (?,?,?,?,?,?)");
        $query->execute([$fileName, $filePath, $fileExtension,$fileNewName,$fileBooleanControl, $id_historial]);
    }

    ///////////////////////////////////DELETE//////////////////////////////DELETE////////////////////////////////DELETE//////////////////////////////////////////////////

    public function eliminarMascota($id_mascota)
    {
        $query = $this->db->prepare("DELETE FROM paciente WHERE id = ?");
        $query->execute([$id_mascota]);
    }

    public function eliminarHistorial($id_historial)
    {
        $query = $this->db->prepare("DELETE FROM HISTORIAL WHERE id = ?");
        $query->execute([$id_historial]);
    }

    public function eliminarCliente($id_cliente)
    {
        $query = $this->db->prepare("DELETE FROM clientes WHERE id=?");
        $query->execute([$id_cliente]);
    }

    public function eliminarImagen($id_img)
    {
        $query = $this->db->prepare("DELETE FROM imagenes WHERE id=?");
        $query->execute([$id_img]);
    }

    ///////////////////////////////////UPDATE//////////////////////////////UPDATE////////////////////////////////UPDATE//////////////////////////////////////////////////

    public function updateClientData($nombre_apellido, $dni, $telefono, $email, $direccion, $localidad, $id_cliente)
    {
        $query = $this->db->prepare("UPDATE clientes SET `NombreApellido` = ?,`Dni` = ? ,`Telefono` = ?, `Email`=?,`Direccion`=?,`Localidad`=? WHERE `id` = ?");
        $query->execute([$nombre_apellido, $dni, $telefono, $email, $direccion, $localidad, $id_cliente]);
    }

    public function updateMascotaData($nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tamaño, $esteril, $fecha_ingreso, $id_mascota)
    {
        $query = $this->db->prepare("UPDATE paciente SET `Nombre`= ?, `Especie`= ?,`Nacimiento`=?, `Sexo`=?,`Raza`=?, `Color`=?,`Tamano`=?,`Esterilizado`=?,`FechaIngreso`=? WHERE `id` = ?");
        $query->execute([$nombrePaciente, $especie, $nacimientoPaciente, $sexoPaciente, $raza, $color, $tamaño, $esteril, $fecha_ingreso, $id_mascota]);
    }


    public function updateHistorialData($observaciones, $tratamiento, $motivoConsulta, $fecha, $complementarios, $id_historial)
    {
        $query = $this->db->prepare("UPDATE historial SET `Observacion`=?,`MotivoConsulta`=?,`Tratamiento`=?,`Complementarios`=?,`Fecha`=? WHERE id = ?");
        $query->execute([$observaciones, $motivoConsulta, $tratamiento, $complementarios, $fecha, $id_historial]);
    }

    public function updateComplementarios($id_historial)
    {
        $variable = "-";
        $query = $this->db->prepare("UPDATE historial SET `Complementarios` =? WHERE id = ? ");
        $query->execute([$variable, $id_historial]);
    }
}
