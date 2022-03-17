{include file="templates/header.tpl"}

<form method="POST" action="{BASE_URL}updateMascota">
        <div class="mt-3 mb-3">
            <div class="newPacient mt-3 ms-3">
    <h1 style="text-shadow: 2px 2px 3px grey">Paciente</h1>

{foreach from=$dataMascota item=$infoMascota}
    <div class="mb-3">
            <label for="staticName" class="col-sm-2 col-form-label ms-2">Nombre</label>
                    <input class="form-control w-50 ms-2" type="text"  aria-label="default input example" name="nombrePaciente" value="{$infoMascota->Nombre}">      
        </div>
        <div class="mb-3">
            <label for="staticEspecie" class="col-sm-2 col-form-label ms-2">Especie</label>
                <input class="form-control w-50 ms-2" type="text"  aria-label="default input example" name="especie" value="{$infoMascota->Especie}">      
        </div>
        <div class="mb-3">
            <label for="staticBorn" class="col-sm-2 col-form-label ms-2">Nacimiento</label>
                <input class="form-control w-50 ms-2" type="text"  aria-label="default input example" name="nacimientoPaciente" value="{$infoMascota->Nacimiento}">      
        </div>
        <div class="mb-3">
            <label for="staticSexo" class="col-sm-2 col-form-label ms-2">Sexo</label>
                <input class="form-control w-50 ms-2" type="text"  aria-label="default input example" name="sexoPaciente" value="{$infoMascota->Sexo}">      
        </div>
        <div class="mb-3">
            <label for="staticRaza" class="col-sm-2 col-form-label ms-2">Raza</label>
                <input class="form-control w-50 ms-2" type="text"  aria-label="default input example" name="raza" value="{$infoMascota->Raza}">      
        </div>
        <div class="mb-3">
            <label for="staticColor" class="col-sm-2 col-form-label ms-2">Color</label>
                <input class="form-control w-50 ms-2" type="text"  aria-label="default input example" name="color" value="{$infoMascota->Color}">      
        </div>

        <label for="staticTamaño" class="col-sm-2 col-form-label">Tamaño</label>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="tamaño" id="tamañoMascota1" value ="Chico">
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
                <input class="form-check-input" type="radio" name="esteril" id="esteril2" value = "No">
                    <label class="form-check-label" for="esteril2">
                            No
                    </label>
                </div>

                <input type="radio" value={$infoMascota->id} name="id_mascota" style="display:none"checked>
{/foreach}

    <button type="submit" class="btn btn-primary mt-4 me-5">Guardar</button>
        </form>

{include file="templates/footer.tpl"}