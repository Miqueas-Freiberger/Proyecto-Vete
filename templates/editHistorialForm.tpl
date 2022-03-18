{include file="templates/header.tpl"}

<form method="POST" action="{BASE_URL}updateHistorial">
    {foreach from=$dataHistorial item=$infoHistorial}

        <h3 class="mt-2">Motivo de Consulta<h3>
            <div class="form-floating mt-2">
                <textarea class="form-control" id="floatingTextarea2" style="width: 60%; height:130px" name="motivoConsulta">{$infoHistorial->MotivoConsulta}</textarea>
            </div>

                <label for="staticComplement" class="col-sm-2 col-form-label mt-1 mb-1">Complementarios</label>
                <div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1"  name="complementarios[]" value="Analisis-sangre">
                    <label class="form-check-label fs-5" for="inlineCheckbox1">Analisis de Sangre</label>
                </div>
                    <br>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox2"  name="complementarios[]"  value="Radiografia">
                    <label class="form-check-label fs-5" for="inlineCheckbox2">Radiografia</label>
                </div>
                    <br>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="complementarios[]" value="Ecografia">
                    <label class="form-check-label fs-5" for="inlineCheckbox3">Ecografia</label>
                </div>
                    <br>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox4"  name="complementarios[]" value="Raspaje">
                    <label class="form-check-label fs-5" for="inlineCheckbox4">Raspaje</label>
                </div>
                    <br>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox5" name="complementarios[]" value="Citologia">
                    <label class="form-check-label fs-5" for="inlineCheckbox5">Citologia</label>
                </div>
                    <br>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox5" name="complementarios[]" value="-">
                    <label class="form-check-label fs-5" for="inlineCheckbox5">Eliminar Complementarios</label>
                </div>
            </div>

        <h3 class="mt-4">Observaciones</h3>
            <div class="form-floating mt-3">
                <textarea class="form-control" id="floatingTextarea2" style="width: 60%; height:130px" name="observaciones">{$infoHistorial->Observacion}</textarea>
            </div>

        <h3>Tratamiento</h3>
            <div class="form-floating mt-2">
                <textarea class="form-control" id="floatingTextarea2" style="width: 60%; height:130px" name="tratamiento">{$infoHistorial->Tratamiento}</textarea>
            </div>
        
            <div class="mb-3 ">
                <h3>Fecha</h3>
                <input style="width: 60%" class="form-control w-3" type="date" name="fecha" value="{$infoHistorial->Fecha}" required>
            </div>

        <input type="radio" value={$infoHistorial->id}  name="id_historial" style="display:none"checked>
        <input type="radio" value={$infoHistorial->id_mascota_fk}  name="id_mascota_historial" style="display:none"checked>
        
    {/foreach}    

    <button type="submit" class="btn btn-primary mb-3">Agregar</button>
</form>
{include file="templates/footer.tpl"}