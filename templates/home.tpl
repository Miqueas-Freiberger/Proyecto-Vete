{include file="templates/header.tpl"}



        <div class="card mt-3" style="width: 18rem;">
            <div class="card-header">
                <b>Clientes</b>
                <input class="serchvar" class="list-group-item" type="search" placeholder="Buscar cliente" aria-label="Search" style="height:30px; width: 100%;">
            </div>
            <ul class="list-group list-group-flush">
            {foreach from=$dataClientes item=$data}
                <li class="list-group-item"><a class="clientes" href = '{BASE_URL}cliente/{$data->id}'>{$data->NombreApellido} - {$data->Telefono}</a></li>
            {/foreach}
                
            </ul>
        </div>



{include file="templates/footer.tpl"}