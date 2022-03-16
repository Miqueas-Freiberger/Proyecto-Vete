{include file="templates/header.tpl"}

<form method="POST" action="{BASE_URL}updateClientData" class="w-75">
<div class="card mt-3 mb-3">
            <div>
                <h1 class="tittle-Cliente ms-3" style="text-shadow: 2px 2px 3px grey">Datos Cliente</h1>
                
                {foreach from=$dataCliente item=$infoCliente}

                    <div class="mb-3">
                        <label for="staticName" class="col-sm-2 col-form-label ms-3">Nombre y Apellido</label>
                            <input class="form-control w-50 ms-3" type="text" aria-label="default input example" name="nombre_apellido" value="{$infoCliente->NombreApellido}">
                    </div>
                    <div class="mb-3">
                        <label for="staticPhone" class="col-sm-2 col-form-label ms-3">Numero de Telefono</label>
                            <input class="form-control  w-50 ms-3" type="number" aria-label="default input example" name="telefono" value="{$infoCliente->Telefono}">
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Email</label>
                            <input class="form-control  w-50 ms-3" type="email"  aria-label="default input example" name="email" value="{$infoCliente->Email}">
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Direccion</label>
                            <input class="form-control  w-50 ms-3" type="text"  aria-label="default input example" name="direccion" value="{$infoCliente->Direccion}">      
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label ms-3">Localidad</label>
                            <input class="form-control  w-50 ms-3" type="text"  aria-label="default input example" name="localidad" value="{$infoCliente->Localidad}">      
                    </div>

                     <input type="radio" value={$infoCliente->id} name="id_cliente" style="display:none"checked>
                {/foreach}
                    
                        
<button type="submit" class="btn btn-primary float-end me-5 mb-3">Guardar</button>
</form>

{include file="templates/footer.tpl"}