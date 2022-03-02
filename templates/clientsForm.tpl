{include file="templates/header.tpl"}

    <form method="POST" action="agregarDatos">
        <div class="card mt-3 mb-3">
            <div>
                <h1 class="tittle-Cliente ms-3">Datos Cliente</h1>
                
                    <div class="mb-3">
                        <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Nombre y Apellido</label>
                            <input class="form-control w-50 ms-3" type="text" aria-label="default input example" name="nombre_apellido" required>
                    </div>
                    <div class="mb-3">
                        <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Numero de Telefono</label>
                            <input class="form-control  w-50 ms-3" type="text" aria-label="default input example" name="telefono" required>
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Email</label>
                            <input class="form-control  w-50 ms-3" type="text"  aria-label="default input example" name="email" required>
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Direccion</label>
                            <input class="form-control  w-50 ms-3" type="text"  aria-label="default input example" name="direccion" required>      
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Localidad</label>
                            <input class="form-control  w-50 ms-3" type="text"  aria-label="default input example" name="localidad" required>      
                    </div>
                    <h1 class="tittle-Paciente ms-3">Datos Paciente</h1>

                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Nombre</label>
                            <input class="form-control  w-50 ms-3" type="text"  aria-label="default input example" name="nombrePaciente" required>      
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Especie</label>
                            <input class="form-control  w-50 ms-3" type="text"  aria-label="default input example" name="especie" required>      
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Nacimiento</label>
                            <input class="form-control  w-50 ms-3" type="text"  aria-label="default input example" name="nacimientoPaciente" required>      
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Sexo</label>
                            <input class="form-control  w-50 ms-3" type="text"  aria-label="default input example" name="sexoPaciente" required>      
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Raza</label>
                            <input class="form-control  w-50 ms-3" type="text"  aria-label="default input example" name="raza" required>      
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Color</label>
                            <input class="form-control  w-50 ms-3" type="text"  aria-label="default input example" name="color" required>      
                    </div>

                     <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Tamaño</label>
                        <div class="form-check">
                            <input class="form-check-input ms-3" type="radio" name="tamaño" id="tamañoMascota" value ="Chico">
                                <label class="form-check-label ms-2" for="tamañoMascota">
                                    Chico
                                </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input ms-3" type="radio" name="tamaño" id="tamañoMascota" value ="Mediano">
                                <label class="form-check-label ms-2" for="tamañoMascota">
                                    Mediano
                                </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input ms-3" type="radio" name="tamaño" id="tamañoMascota" value ="Grande">
                                <label class="form-check-label ms-2" for="tamañoMascota">
                                    Grande
                                </label>
                        </div>
                    
                    <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Esterilizada/o</label>
                            <div class="form-check">
                                <input class="form-check-input ms-3" type="radio" name="esteril" id="esteril" value ="Si">
                                    <label class="form-check-label ms-2" for="esteril" >
                                        Si
                                    </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input ms-3" type="radio" name="esteril" id="esteril" value = "No">
                                    <label class="form-check-label ms-2" for="esteril">
                                        No
                                    </label>
                            </div>

                    <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Motivo de Consulta</label>
                        <div class="form-floating mt-2">
                            <textarea class="form-control w-50 h-100 ms-3" id="floatingTextarea2" name="motivoConsulta"></textarea>
                        </div>

                    <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Complementarios</label>
                        <div>
                            <div class="form-check form-check-inline ms-3">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox1"  name="complementarios[]" value="Analisis-sangre">
                                    <label class="form-check-label" for="inlineCheckbox1">Analisis de Sangre</label>
                            </div>
                            <div class="form-check form-check-inline ms-3">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox2"  name="complementarios[]"  value="Radiografia">
                                    <label class="form-check-label" for="inlineCheckbox2">Radiografia</label>
                            </div>
                            <div class="form-check form-check-inline ms-3">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="complementarios[]" value="Ecografia">
                                    <label class="form-check-label" for="inlineCheckbox2">Ecografia</label>
                            </div>
                            <div class="form-check form-check-inline ms-3">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox2"  name="complementarios[]" value="Raspaje">
                                    <label class="form-check-label" for="inlineCheckbox2">Raspaje</label>
                            </div>
                            <div class="form-check form-check-inline ms-3">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="complementarios[]" value="Citologia">
                                    <label class="form-check-label" for="inlineCheckbox2">Citologia</label>
                            </div>                        
                        </div>

                        

                    <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Observaciones</label>
                        <div class="form-floating mt-2">
                            <textarea class="form-control w-50 h-100 ms-3" id="floatingTextarea2" style="width: 60%; height:100px" name="observaciones"></textarea>
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
                            <button type="submit" class="btn btn-primary float-end me-3 mb-3">Agregar</button>
                        </div>
            </div>
        </div>
    </form>

{include file="templates/footer.tpl"}
