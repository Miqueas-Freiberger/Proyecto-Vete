{include file="templates/header.tpl"}

    <form method = "GET" action = "busquedaCliente">
        <input class="form-control mt-3" type="text" aria-label="default input example" name="nombreCliente" placeholder="Buscar cliente...">
    </form>

    <div class="card mt-3 w-100 text-center">

        <div class="card-header" style="background-color: #F4ECF7">
            <b>Clientes</b>
        </div>
        <ul class="list-group list-group-flush">
            {foreach from=$dataClientes item=$data}
                <li class="list-group-item"><a class="clientes" href = '{BASE_URL}cliente/{$data->id}'>{$data->NombreApellido} - ({$data->Telefono}) - {$data->Direccion}</a></li>
            {/foreach}                
        </ul>

    </div>
    
{include file="templates/footer.tpl"}