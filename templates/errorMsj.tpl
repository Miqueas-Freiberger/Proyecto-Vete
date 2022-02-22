{include file="templates/header.tpl"}
    <form method = "GET" action = "busquedaCliente">
        <input class="serchvar" class="list-group-item" type="search" placeholder="Buscar cliente" aria-label="Search" name="nombreCliente" style="margin-top: 10px; height:30px; width: 16%; position:relative;">
                <button type="submit" class="btn btn-primary" style="height: 35px;">Buscar</button>
    </form>


        <div class="card mt-3" style="width: 18rem;">
            <div class="card-header">
                <b>Clientes</b>
            </div>
            <ul class="list-group list-group-flush">
            <p style="text-align:center;">{$mensaje}</p>
            </ul>
        </div>



{include file="templates/footer.tpl"}