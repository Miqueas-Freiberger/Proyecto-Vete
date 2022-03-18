{include file="templates/header.tpl"}


<form method="POST" action="{BASE_URL}agregarMascota">
        <div class="mt-3 mb-3">
            <div class="newPacient mt-3 ms-3">
    <h1 style="text-shadow: 2px 2px 3px grey">Nuevo Paciente</h1>

                    <div class="mb-3">
                        <label for="staticName" class="col-sm-2 col-form-label ms-2">Nombre</label>
                            <input class="form-control w-50 ms-2" type="text"  aria-label="default input example" name="nombrePaciente" required>      
                    </div>
                    <div class="mb-3">
                        <label for="staticEspecie" class="col-sm-2 col-form-label ms-2">Especie</label>
                            <input class="form-control w-50 ms-2" type="text"  aria-label="default input example" name="especie" required>      
                    </div>
                    <div class="mb-3">
                        <label for="staticBorn" class="col-sm-2 col-form-label ms-2">Nacimiento</label>
                            <input class="form-control w-50 ms-2" type="text"  aria-label="default input example" name="nacimientoPaciente" required>      
                    </div>
                    <div class="mb-3">
                        <label for="staticSexo" class="col-sm-2 col-form-label ms-2">Sexo</label>
                            <input class="form-control w-50 ms-2" type="text"  aria-label="default input example" name="sexoPaciente" required>      
                    </div>
                    <div class="mb-3">
                        <label for="staticRaza" class="col-sm-2 col-form-label ms-2">Raza</label>
                            <input class="form-control w-50 ms-2" type="text"  aria-label="default input example" name="raza" required>      
                    </div>
                    <div class="mb-3">
                        <label for="staticColor" class="col-sm-2 col-form-label ms-2">Color</label>
                            <input class="form-control w-50 ms-2" type="text"  aria-label="default input example" name="color" required>      
                    </div>

                     <label for="staticTamaño" class="col-sm-2 col-form-label">Tamaño</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="tamaño" id="tamañoMascota1" value ="Chico" checked>
                                <label class="form-check-label" for="tamañoMascota1">
                                    Chico
                                </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="tamaño" id="tamañoMascota2" value ="Mediano">
                                <label class="form-check-label" for="tamañoMascota2">
                                    Mediano
                                </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="tamaño" id="tamañoMascota3" value ="Grande">
                                <label class="form-check-label" for="tamañoMascota3">
                                    Grande
                                </label>
                        </div>
                    
                    <label for="staticEsteril" class="col-sm-2 col-form-label">Esterilizada/o</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="esteril" id="esteril1" value ="Si">
                                    <label class="form-check-label" for="esteril1" >
                                        Si
                                    </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="esteril" id="esteril2" value = "No" checked>
                                    <label class="form-check-label" for="esteril2">
                                        No
                                    </label>
                            </div>

                    <label for="staticMotivoConsulta" class="col-sm-2 col-form-label">Motivo de Consulta</label>
                        <div class="form-floating mt-2">
                            <textarea class="form-control w-50 h-100 ms-1" id="floatingTextarea2" name="motivoConsulta"></textarea>
                        </div>

                    <label for="staticComplement" class="col-sm-2 col-form-label mt-2 mb-3">Complementarios</label>
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
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="complementarios[]" value="Ecografia">
                                    <label class="form-check-label" for="inlineCheckbox3">Ecografia</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox4"  name="complementarios[]" value="Raspaje">
                                    <label class="form-check-label" for="inlineCheckbox4">Raspaje</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox5" name="complementarios[]" value="Citologia">
                                    <label class="form-check-label" for="inlineCheckbox5">Citologia</label>
                            </div>                        
                        </div>

                    
                    <label for="staticObserv" class="col-sm-2 col-form-label">Observaciones</label>
                            <div class="form-floating mt-2">
                                <textarea class="form-control w-50 h-100 ms-1" id="floatingTextarea2" name="observaciones"></textarea>
                            </div>
                    <label for="staticTratamiento" class="col-sm-2 col-form-label">Tratamiento</label>
                            <div class="form-floating mt-2">
                                <textarea class="form-control w-50 h-100 ms-1" id="floatingTextarea2" name="tratamiento"></textarea>
                            </div>

                        <div class="mt-2 mb-3 ">
                            <label for="staticFecha" class="col-sm-2 col-form-label">Fecha de Ingreso</label>
                                <input class="form-control w-50 h-100" type="date" name="fecha_ingreso" required>
                        </div>

                    <input type="radio" value={$id_cliente} name="id_cliente" style="display:none" checked>

                        <div>
                            <button type="submit" class="btn btn-primary mt-2 mb-4 ms-3 shadow" >Agregar</button>
                        </div>
            </div>
        </div>
    </form>
{include file="templates/footer.tpl"}