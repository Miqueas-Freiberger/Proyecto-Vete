{include file="templates/header.tpl"}
<h4>Cliente</h4>
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

<h4>Mascotas</h4>

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
                        <td>{$infoMascota->FechaIngreso}</td>
                </tr>

            {/foreach}
                
            </tbody>
        </table>
            {foreach from=$dataMascota item=$infoMascota}
                    <div class="card mt-3">
                            <div class="card-header">
                                    <h3><b>{$infoMascota->Nombre}</b></h3>
                                </div>
                                <div style="margin-left:15px;margin-top:10px">

                                    <h5>Motivo de la Consulta</h5> 
                                    <p>{$infoMascota->MotivoConsulta}</p>
                                    <h5>Complementarios</h5>
                                    <p><b>{$infoMascota->Complementarios}</b></p>
                                    <h5>Observaciones:</h5> 
                                    <p>{$infoMascota->Observaciones}</p>
                                    <h5>Tratamiento:</h5> 
                                    <p>{$infoMascota->Tratamiento}</p>
                                </div>
                    </div>
            {/foreach}
</div>

<button type="button" class="btn btn-primary mb-3" style="margin-left:85%;margin-top:20px;"><a class="dataLink" href="{BASE_URL}nuevaMascota/{$id_cliente}" style="text-decoration:none;color:white">Agregar Mascota</a></button>



{include file="templates/footer.tpl"}