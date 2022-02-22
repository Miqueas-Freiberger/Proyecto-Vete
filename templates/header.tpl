<!DOCTYPE html>
<html lang="en">
<head>
    <base href="<?php echo BASE_URL ?>">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Veterinaria Catriel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"> 
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>

<header>
    <h1>Veterinaria Catriel</h1>

        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link text-secondary" href="home">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-secondary" aria-current="page" href="nuevoCliente">Agregar Nuevo Cliente</a>
            </li>
            {* <li class="nav-item">
                <a class="nav-link text-secondary" href="nuevaMascota">Agregar Mascota</a>
            </li> *}
            {*Agregar link "nueva mascota" en boton de tabla datos cliente*}
            <li class="nav-item">
                <a class="nav-link text-secondary" href="#">Libreta Sanitaria</a>
            </li>
        </ul>
</header>

<div class = "container">
