{include file="templates/header.tpl"}

<form method="POST" action="{BASE_URL}addNewHistorial">
    <h3 class="mt-3">Motivo de Consulta<h3>
        <div class="form-floating mt-2">
            <textarea class="form-control w-50 h-75" id="floatingTextarea2" name="motivoConsulta"></textarea>
        </div>

            <label for="staticComplement" class="col-sm-2 col-form-label mt-2 mb-2 ">Complementarios</label>
        <div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="complementarios[]" value="Analisis-sangre">
                <label class="form-check-label fs-5" for="inlineCheckbox1">Analisis de Sangre</label>
            </div>
            <br>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="complementarios[]"  value="Radiografia">
                <label class="form-check-label fs-5" for="inlineCheckbox2">Radiografia</label>
            </div>
            <br>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="complementarios[]" value="Ecografia">
                <label class="form-check-label fs-5" for="inlineCheckbox3">Ecografia</label>
            </div>
            <br>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox4" name="complementarios[]" value="Raspaje">
                <label class="form-check-label fs-5" for="inlineCheckbox4">Raspaje</label>
            </div>
            <br>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox6" name="complementarios[]" value="Citologia">
                <label class="form-check-label fs-5" for="inlineCheckbox5">Citologia</label>
            </div>
            <br>
            <div class="form-check form-check-inline mb-3">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox6" name="complementarios[]" value="Citologia">
                <label class="form-check-label fs-5" for="inlineCheckbox5">Analisis de Orina</label>
            </div>
        </div>

    <h3>Observaciones</h3>
        <div class="form-floating mt-2">
            <textarea class="form-control w-50 h-75" id="floatingTextarea2" name="observaciones"></textarea>
        </div>

    <h3>Tratamiento</h3>
        <div class="form-floating mt-2">
            <textarea class="form-control w-50 h-75" id="floatingTextarea2" name="tratamiento"></textarea>
        </div>
        
        <div class="mb-3 ">
        <h3>Fecha</h3>
            <input class="form-control w-50 h-75" type="date" name="fecha" required>
        </div>

            <input type="radio" value={$id_mascota} name="id_mascota" style="display:none" checked>
            <button type="submit" class="btn btn-primary mb-3">Agregar</button>
</form>
{include file="templates/footer.tpl"}