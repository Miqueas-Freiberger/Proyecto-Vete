{include file="templates/header.tpl"}
    <form method = "GET" action = "busquedaCliente">
        <input class="form-control mt-3" type="text" aria-label="default input example" name="nombreCliente" placeholder="Buscar cliente...">
    </form>
        <div class="card mt-3 w-100 text-center" style="display: block;">
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