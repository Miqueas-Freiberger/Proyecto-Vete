{include file="templates/header.tpl"}

<form method="POST" action="{BASE_URL}addNewHistorial">
    <h3>Motivo de Consulta<h3>
        <div class="form-floating mt-2">
            <textarea class="form-control" id="floatingTextarea2" style="width: 60%; height:130px" name="motivoConsulta"></textarea>
        </div>

    <label for="staticComplement" class="col-sm-2 col-form-label mt-2 mb-3 ">Complementarios</label>
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

    <h3>Observaciones</h3>
        <div class="form-floating mt-2">
            <textarea class="form-control" id="floatingTextarea2" style="width: 60%; height:130px" name="observaciones"></textarea>
        </div>

    <h3>Tratamiento</h3>
        <div class="form-floating mt-2">
            <textarea class="form-control" id="floatingTextarea2" style="width: 60%; height:130px" name="tratamiento"></textarea>
        </div>
        
    <div class="mb-3 ">
        <h3>Fecha</h3>
            <input style="width: 60%" class="form-control" type="date" name="fecha" required>
    </div>

    <input type="radio" value={$id_mascota} name="id_mascota" style="display:none" checked>

    <button type="submit" class="btn btn-primary mb-3">Agregar</button>
</form>
{include file="templates/footer.tpl"}