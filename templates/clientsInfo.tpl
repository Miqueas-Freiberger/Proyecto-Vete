{include file="templates/header.tpl"}
<h4 style="margin-top:15px">Cliente</h4>
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
                    <th scope="row"><a href="{BASE_URL}historialMascota/{{$infoMascota->id}}" style="text-decoration:none;color:black;">{$infoMascota->Nombre}</a></th>
                        <td>{$infoMascota->Especie}</td>
                        <td>{$infoMascota->Nacimiento}</td>
                        <td>{$infoMascota->Sexo}</td>
                        <td>{$infoMascota->Raza}</td>
                        <td>{$infoMascota->Color}</td>
                        <td>{$infoMascota->Tamano}</td>
                        <td>{$infoMascota->Esterilizado}</td>
                        <td>{$infoMascota->FechaIngreso|date_format:"%d/%m/%Y"}</td>
                        <td> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#Modal{$infoMascota->id}">
                                    X
                            </button>
                        </td>
                            <!-- Modal -->
    
                                <div class="modal fade" id="Modal{$infoMascota->id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                                <div class="modal-header">
                                                    <h6 class="modal-title">CONFIRMAR</h5> 
                                                </div>
                                                <div class="modal-body">
                                                    <p  class="text-center">¿Estás seguro que deseas eliminar a <strong>{$infoMascota ->Nombre}</strong>?</p>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">CERRAR</button>
                                                    <button type="button" class="btn btn-primary"><a href="{BASE_URL}eliminarMascota/{$infoMascota->id}" class="text-decoration-none text-white">BORRAR MASCOTA</a></button>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                </tr>

            {/foreach}
                
            </tbody>
        </table>

<button type="button" class="btn btn-primary mb-3" style="margin-left:85%;margin-top:20px;"><a class="dataLink" href="{BASE_URL}nuevaMascota/{$id_cliente}" style="text-decoration:none;color:white">Agregar Mascota</a></button>



{include file="templates/footer.tpl"}