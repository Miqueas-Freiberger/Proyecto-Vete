{include file="templates/header.tpl"}

<form method="POST" action="agregarDatos">
    <div class="card mt-3 mb-3">
        <div>
            <h1 class="tittle-Cliente ms-3" style="text-shadow: 2px 2px 3px grey">Datos Cliente</h1>

            <div class="mb-3">
                <label for="staticName" class="col-sm-2 col-form-label ms-3">Nombre y Apellido</label>
                <input class="form-control w-50 ms-3" type="text" aria-label="default input example"
                    name="nombre_apellido" value=" ">
            </div>
            <div class="mb-3">
                <label for="staticName" class="col-sm-2 col-form-label ms-3">DNI</label>
                <input class="form-control w-50 ms-3" type="text" aria-label="default input example"
                    name="dni" value=" ">
            </div>
            <div class="mb-3">
                <label for="staticPhone" class="col-sm-2 col-form-label ms-3">Numero de Telefono</label>
                <input class="form-control  w-50 ms-3" type="text" aria-label="default input example" name="telefono"
                    value=" ">
            </div>
            <div class="mb-3 ">
                <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Email</label>
                <input class="form-control  w-50 ms-3" type="text" aria-label="default input example" name="email"
                    value=" ">
            </div>
            <div class="mb-3 ">
                <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Direccion</label>
                <input class="form-control  w-50 ms-3" type="text" aria-label="default input example" name="direccion"
                    value=" ">
            </div>
            <div class="mb-3 ">
                <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Localidad</label>
                <input class="form-control  w-50 ms-3" type="text" aria-label="default input example" name="localidad"
                    value=" ">
            </div>

            <h1 class="tittle-Paciente ms-3" style="text-shadow: 2px 2px 3px grey">Datos Paciente</h1>

            <div class="mb-3 ">
                <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Nombre</label>
                <input class="form-control  w-50 ms-3" type="text" aria-label="default input example"
                    name="nombrePaciente">
            </div>
            <div class="mb-3 ">
                <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Especie</label>
                <input class="form-control  w-50 ms-3" type="text" aria-label="default input example" name="especie"
                    value=" ">
            </div>
            <div class="mb-3 ">
                <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Nacimiento</label>
                <input class="form-control  w-50 ms-3" type="text" aria-label="default input example"
                    name="nacimientoPaciente" value=" ">
            </div>
            <label for="staticEsteril" class="col-sm-2 col-form-label ms-3">Sexo</label>
            <div class="form-check">
                <input class="form-check-input ms-3" type="radio" name="sexoPaciente" id="hembra" value="Hembra"
                    checked>
                <label class="form-check-label ms-3" for="hembra">Hembra</label>
            </div>
            <div class="form-check">
                <input class="form-check-input ms-3" type="radio" name="sexoPaciente" id="macho" value="Macho">
                <label class="form-check-label ms-3" for="macho">Macho</label>
            </div>
            <div class="mb-3 ">
                <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Raza</label>
                <input class="form-control  w-50 ms-3" type="text" aria-label="default input example" name="raza"
                    value=" ">
            </div>
            <div class="mb-3 ">
                <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Color</label>
                <input class="form-control  w-50 ms-3" type="text" aria-label="default input example" name="color"
                    value=" ">
            </div>

            <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Tamaño</label>
            <div class="form-check">
                <input class="form-check-input ms-3" type="radio" name="tamaño" id="tamañoMascota1" value="Chico"
                    checked>
                <label class="form-check-label ms-2" for="tamañoMascota1">
                    Chico
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input ms-3" type="radio" name="tamaño" id="tamañoMascota2" value="Mediano">
                <label class="form-check-label ms-2" for="tamañoMascota2">
                    Mediano
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input ms-3" type="radio" name="tamaño" id="tamañoMascota3" value="Grande">
                <label class="form-check-label ms-2" for="tamañoMascota3">
                    Grande
                </label>
            </div>

            <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Esterilizada/o</label>
            <div class="form-check">
                <input class="form-check-input ms-3" type="radio" name="esteril" id="esteril1" value="Si">
                <label class="form-check-label ms-2" for="esteril1">Si</label>
            </div>
            <div class="form-check">
                <input class="form-check-input ms-3" type="radio" name="esteril" id="esteril2" value="No" checked>
                <label class="form-check-label ms-2" for="esteril2">No</label>
            </div>

            <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Motivo de Consulta</label>
            <div class="form-floating mt-2">
                <textarea class="form-control w-50 h-100 ms-3" id="floatingTextarea" name="motivoConsulta"></textarea>
            </div>

            <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Complementarios</label>
            <div>
                <div class="form-check form-check-inline ms-3">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="complementarios[]"
                        value="Analisis de sangre">
                    <label class="form-check-label" for="inlineCheckbox1">Analisis de Sangre</label>
                </div>
                <div class="form-check form-check-inline ms-3">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="complementarios[]"
                        value="Radiografia">
                    <label class="form-check-label" for="inlineCheckbox2">Radiografia</label>
                </div>
                <div class="form-check form-check-inline ms-3">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="complementarios[]"
                        value="Ecografia">
                    <label class="form-check-label" for="inlineCheckbox3">Ecografia</label>
                </div>
                <div class="form-check form-check-inline ms-3">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox4" name="complementarios[]"
                        value="Raspaje">
                    <label class="form-check-label" for="inlineCheckbox4">Raspaje</label>
                </div>
                <div class="form-check form-check-inline ms-3">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox5" name="complementarios[]"
                        value="Citologia">
                    <label class="form-check-label" for="inlineCheckbox5">Citologia</label>
                </div>
                <div class="form-check form-check-inline ms-3">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox6" name="complementarios[]"
                        value="Analisis de orina">
                    <label class="form-check-label" for="inlineCheckbox6">Analisis de Orina</label>
                </div>
            </div>

            <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Observaciones</label>
            <div class="form-floating mt-2">
                <textarea class="form-control w-50 h-100 ms-3" id="floatingTextarea1" name="observaciones"></textarea>
            </div>
            <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Tratamiento</label>
            <div class="form-floating mt-2">
                <textarea class="form-control w-50 h-100 ms-3" id="floatingTextarea2" name="tratamiento"></textarea>
            </div>


            <div class="mb-3">
                <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Fecha de Ingreso</label>
                <input class="form-control w-50 ms-3" type="date" name="fecha_ingreso" required>
            </div>
            <div>
                <button type="submit" class="btn btn-primary float-end me-3 mb-3 shadow">Agregar</button>
            </div>
        </div>
    </div>
</form>
{include file="templates/footer.tpl"}