{include file="templates/header.tpl"}
<div>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Nombre y Apellido</th>
                <th scope="col">Telefono</th>
                <th scope="col">Email</th>
                <th scope="col">Direccion</th>
                <th scope="col">Localidad</th>
                </tr>
            </thead>
            <tbody>
            {foreach from=$dataCliente item=$infoCliente}
                <tr>
                    <th scope="row">{$infoCliente->NombreApellido}</th>
                        <td>{$infoCliente->Telefono}</td>
                        <td>{$infoCliente->Email}</td>
                        <td>{$infoCliente->Direccion}</td>
                        <td>{$infoCliente->Localidad}</td>
                </tr>
            {/foreach}
                
            </tbody>
        </table>
</div>

<h3>Mascotas</h3>

<div>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Especie</th>
                <th scope="col">Nacimiento</th>
                <th scope="col">Sexo</th>
                <th scope="col">Raza</th>
                <th scope="col">Color</th>
                <th scope="col">Tamaño</th>
                <th scope="col">Esterilizada/o</th>
                <th scope="col">Complementarios</th>
                <th scope="col">Fecha de Ingreso</th>
                </tr>
            </thead>
            <tbody>
            {foreach from=$dataMascota item=$infoMascota}
                <tr>
                    <th scope="row">{$infoMascota->Nombre}</th>
                        <td>{$infoMascota->Especie}</td>
                        <td>{$infoMascota->Nacimiento}</td>
                        <td>{$infoMascota->Sexo}</td>
                        <td>{$infoMascota->Raza}</td>
                        <td>{$infoMascota->Color}</td>
                        <td>{$infoMascota->Tamano}</td>
                        <td>{$infoMascota->Esterilizado}</td>
                        <td>{$infoMascota->Complementarios}</td>
                        <td>{$infoMascota->FechaIngreso}</td>
                </tr>
                    
            {/foreach}
                
            </tbody>
        </table>

            {foreach from=$dataMascota item=$infoMascota}
                <h5>Observaciones {$infoMascota->Nombre} :</h5> 
                <p>{$infoMascota->Observaciones}</p>
            {/foreach}


</div>

<a class="dataLink" href="{BASE_URL}nuevaMascota">Agregar Mascota</a>


{include file="templates/footer.tpl"}