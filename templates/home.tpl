{include file="templates/header.tpl"}
    <form method = "GET" action = "busquedaCliente">
        <input style="width: 60%; margin-top: 15px; margin-left: 280px;" class="form-control" type="text" aria-label="default input example" name="nombreCliente" placeholder="Buscar cliente...">                
    </form>
        <div class="card mt-3" style="width: 70rem; display: block; margin-left: auto; margin-right: auto; text-align:center;">
            <div class="card-header">
                <b>Clientes</b>
            </div>
            <ul class="list-group list-group-flush">
            {foreach from=$dataClientes item=$data}
                <li class="list-group-item"><a class="clientes" href = '{BASE_URL}cliente/{$data->id}'>{$data->NombreApellido} - ({$data->Telefono}) - {$data->Direccion}</a></li>
            {/foreach}                
            </ul>
        </div>



{include file="templates/footer.tpl"}