{include file="templates/header.tpl"}

<form method="POST" action="{BASE_URL}addNewHistorial">
    <h3>Motivo de Consulta<h3>
        <div class="form-floating mt-2">
            <textarea class="form-control" id="floatingTextarea2" style="width: 60%; height:130px" name="motivoConsulta"></textarea>
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