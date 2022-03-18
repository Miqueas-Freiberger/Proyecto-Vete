{include file="templates/header.tpl"}
    <form method = "GET" action = "busquedaCliente">
        <input class="form-control mt-3" type="text" aria-label="default input example" name="nombreCliente" value="{$busqueda}" placeholder="Buscar cliente...">
    </form>


        <div class="card mt-3 w-2 text-center">
            <div class="card-header" style="background-color: #F4ECF7">
                <b>Clientes</b>
            </div>
            <ul class="list-group list-group-flush">
            <p style="text-align:center;">{$mensaje}</p>
            </ul>
        </div>


{include file="templates/footer.tpl"}