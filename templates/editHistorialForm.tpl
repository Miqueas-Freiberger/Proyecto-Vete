{include file="templates/header.tpl"}

<form method="POST" action="{BASE_URL}updateHistorial">
    {foreach from=$dataHistorial item=$infoHistorial}

        <h3 class="mt-2">Motivo de Consulta<h3>
                <div class="form-floating mt-2">
                    <textarea class="form-control" id="floatingTextarea2" style="width: 60%; height:130px"
                        name="motivoConsulta">{$infoHistorial->MotivoConsulta}</textarea>
                </div>
            {/foreach}

            <label for="staticComplement" class="mt-2">Complementarios</label>
            <div>
                {if $analisisBoolean !=false}
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="complementarios[]"
                            value="Analisis de sangre" checked>
                        <label class="form-check-label fs-5" for="inlineCheckbox1">Analisis de Sangre</label>
                    </div>
                {else}
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="complementarios[]"
                            value="Analisis de sangre">
                        <label class="form-check-label fs-5" for="inlineCheckbox1">Analisis de Sangre</label>
                    </div>
                {/if}
                <br>
                {if $radiografiaBoolean !=false}
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="complementarios[]"
                            value="Radiografia" checked>
                        <label class="form-check-label fs-5" for="inlineCheckbox2">Radiografia</label>
                    </div>
                {else}
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="complementarios[]"
                            value="Radiografia">
                        <label class="form-check-label fs-5" for="inlineCheckbox2">Radiografia</label>
                    </div>
                {/if}
                <br>
                {if $ecografiaBoolean !=false}
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="complementarios[]"
                            value="Ecografia" checked>
                        <label class="form-check-label fs-5" for="inlineCheckbox3">Ecografia</label>
                    </div>
                {else}
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="complementarios[]"
                            value="Ecografia">
                        <label class="form-check-label fs-5" for="inlineCheckbox3">Ecografia</label>
                    </div>
                {/if}
                <br>
                {if $raspajeBoolean !=false}
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox4" name="complementarios[]"
                            value="Raspaje" checked>
                        <label class="form-check-label fs-5" for="inlineCheckbox4">Raspaje</label>
                    </div>
                {else}
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox4" name="complementarios[]"
                            value="Raspaje">
                        <label class="form-check-label fs-5" for="inlineCheckbox4">Raspaje</label>
                    </div>
                {/if}
                <br>
                {if $citologiaBoolean !=false}
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox5" name="complementarios[]"
                            value="Citologia" checked>
                        <label class="form-check-label fs-5" for="inlineCheckbox5">Citologia</label>
                    </div>
                {else}
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox5" name="complementarios[]"
                            value="Citologia">
                        <label class="form-check-label fs-5" for="inlineCheckbox5">Citologia</label>
                    </div>
                {/if}
                <br>
                {if $analisisOrinaBoolean !=false}
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox6" name="complementarios[]"
                            value="Analisis de orina" checked>
                        <label class="form-check-label fs-5" for="inlineCheckbox6">Analisis de Orina</label>
                    </div>
                {else}
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox6" name="complementarios[]"
                            value="Analisis de orina">
                        <label class="form-check-label fs-5" for="inlineCheckbox6">Analisis de Orina</label>
                    </div>
                {/if}
            </div>

            {foreach from=$dataHistorial item=$infoHistorial}
                <h3 class="mt-4">Observaciones</h3>
                <div class="form-floating mt-3">
                    <textarea class="form-control" id="floatingTextarea2" style="width: 60%; height:130px"
                        name="observaciones">{$infoHistorial->Observacion}</textarea>
                </div>

                <h3>Tratamiento</h3>
                <div class="form-floating mt-2">
                    <textarea class="form-control" id="floatingTextarea2" style="width: 60%; height:130px"
                        name="tratamiento">{$infoHistorial->Tratamiento}</textarea>
                </div>

                <div class="mb-3 ">
                    <h3>Fecha</h3>
                    <input style="width: 60%" class="form-control w-3" type="date" name="fecha"
                        value="{$infoHistorial->Fecha}" required>
                </div>

                <input type="radio" value={$infoHistorial->id} name="id_historial" style="display:none" checked>
                <input type="radio" value={$infoHistorial->id_mascota_fk} name="id_mascota_historial" style="display:none"
                    checked>

            {/foreach}

            <button type="submit" class="btn btn-primary mb-3">Agregar</button>
</form>
{include file="templates/footer.tpl"}