{include file="templates/header.tpl"}

    <form method="POST" action="agregarDatos" >
        <div class="card mt-3 mb-3">
            <div style="margin-left:300px">
                <h1>Datos Cliente</h1>
                
                    <div class="mb-3">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Nombre y Apellido</label>
                            <input style="width: 60%" class="form-control" type="text" aria-label="default input example" name="nombre_apellido" required>
                    </div>
                    <div class="mb-3">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Numero de Telefono</label>
                            <input style="width: 60%" class="form-control" type="text" aria-label="default input example" name="telefono" required>
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                            <input style="width: 60%" class="form-control" type="text"  aria-label="default input example" name="email" required>
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Direccion</label>
                            <input style="width: 60%" class="form-control" type="text"  aria-label="default input example" name="direccion" required>      
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Localidad</label>
                            <input style="width: 60%" class="form-control" type="text"  aria-label="default input example" name="localidad" required>      
                    </div>
                    <h1>Datos Paciente</h1>

                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Nombre</label>
                            <input style="width: 60%" class="form-control" type="text"  aria-label="default input example" name="nombrePaciente" required>      
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Especie</label>
                            <input style="width: 60%" class="form-control" type="text"  aria-label="default input example" name="especie" required>      
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Nacimiento</label>
                            <input style="width: 60%" class="form-control" type="text"  aria-label="default input example" name="nacimientoPaciente" required>      
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Sexo</label>
                            <input style="width: 60%" class="form-control" type="text"  aria-label="default input example" name="sexoPaciente" required>      
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Raza</label>
                            <input style="width: 60%" class="form-control" type="text"  aria-label="default input example" name="raza" required>      
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Color</label>
                            <input style="width: 60%" class="form-control" type="text"  aria-label="default input example" name="color" required>      
                    </div>

                     <label for="staticEmail" class="col-sm-2 col-form-label">Tamaño</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="tamaño" id="tamañoMascota" value ="Chico">
                                <label class="form-check-label" for="tamañoMascota">
                                    Chico
                                </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="tamaño" id="tamañoMascota" value ="Mediano">
                                <label class="form-check-label" for="tamañoMascota">
                                    Mediano
                                </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="tamaño" id="tamañoMascota" value ="Grande">
                                <label class="form-check-label" for="tamañoMascota">
                                    Grande
                                </label>
                        </div>
                    
                    <label for="staticEmail" class="col-sm-2 col-form-label">Esterilizada/o</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="esteril" id="esteril" value ="Si">
                                    <label class="form-check-label" for="esteril" >
                                        Si
                                    </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="esteril" id="esteril" value = "No">
                                    <label class="form-check-label" for="esteril">
                                        No
                                    </label>
                            </div>
                    <label for="staticEmail" class="col-sm-2 col-form-label">Complementarios</label>
                        <div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox1"  name="complementarios[]" value="Analisis-sangre">
                                    <label class="form-check-label" for="inlineCheckbox1">Analisis de Sangre</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox2"  name="complementarios[]"  value="Radiografia">
                                    <label class="form-check-label" for="inlineCheckbox2">Radiografia</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="complementarios[]" value="Ecografia">
                                    <label class="form-check-label" for="inlineCheckbox2">Ecografia</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox2"  name="complementarios[]" value="Raspaje">
                                    <label class="form-check-label" for="inlineCheckbox2">Raspaje</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="complementarios[]" value="Citologia">
                                    <label class="form-check-label" for="inlineCheckbox2">Citologia</label>
                            </div>                        
                        </div>

                        <div class="form-floating mt-2">
                            <textarea class="form-control" id="floatingTextarea2" style="width: 60%; height:100px" name="observaciones"></textarea>
                            <label for="floatingTextarea2">Observaciones</label>
                        </div>

                        <div class="mb-3 ">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Fecha de Ingreso</label>
                                <input style="width: 60%" class="form-control" type="date" name="fecha_ingreso" required>
                        </div>

                        <div style="margin-left:350px">
                            <button type="submit" class="btn btn-primary mb-4" >Agregar</button>
                        </div>
            </div>
        </div>
    </form>

{include file="templates/footer.tpl"}
