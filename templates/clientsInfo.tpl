{include file="templates/header.tpl"}
{foreach from=$dataCliente item=$infoCliente}
    <button type="button" class="btn btn-danger float-end mb-2 ms-3"><a class="text-decoration-none text-white"
    data-bs-toggle="modal" data-bs-target="#ModalCliente{$infoCliente->id}">Eliminar Cliente</a></button>
    <!-- Modal -->

    <div class=" modal fade" id="ModalCliente{$infoCliente->id}" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title">Confirmar</h5>
                </div>
                <div class="modal-body">
                    <p class="text-center"><strong>¿Estás seguro que deseas eliminar a {$infoCliente ->NombreApellido}</strong>?
                    <br>
                    (Borrar cliente tambien eliminara sus mascotas e historiales correspondientes)
                    </p>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary"><a href="{BASE_URL}eliminarCliente/{$infoCliente->id}"
                            class="text-decoration-none text-white">Borrar Cliente</a></button>
                </div>
            </div>
        </div>
        </div>

        <button type="button" class="btn btn-secondary float-end mb-2"><a class="text-decoration-none text-white"
                href="{BASE_URL}editarCliente/{$infoCliente->id}">Editar Cliente</a></button>
        {/foreach}

        <h4 class="tituloCliente mt-4">Cliente</h4>
        <div>
            <table class="table">
                <thead style="background-color: #E8DAEF">
                    <tr>
                        <th scope="col">Nombre y Apellido</th>
                        <th scope="col">DNI</th>
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
                        <td>{$infoCliente->Dni}</td>
                        <td>{$infoCliente->Telefono}</td>
                        <td>{$infoCliente->Email}</td>
                        <td>{$infoCliente->Direccion}</td>
                        <td>{$infoCliente->Localidad}</td>
                    </tr>
                    {/foreach}
                </tbody>
            </table>
        </div>

        <h4 class="tituloMascota mt-4 mb-4">Mascotas</h4>

        <div>
            <table class="table">
                <thead style="background-color: #E8DAEF">
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
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody>
                    {foreach from=$dataMascota item=$infoMascota}
                    <tr>
                        <th scope="row"><a href="{BASE_URL}historialMascota/{{$infoMascota->id}}"
                                class="linkMascota text-decoration-none text-black">{$infoMascota->Nombre}</a></th>
                        <td>{$infoMascota->Especie}</td>
                        <td>{$infoMascota->Nacimiento}</td>
                        <td>{$infoMascota->Sexo}</td>
                        <td>{$infoMascota->Raza}</td>
                        <td>{$infoMascota->Color}</td>
                        <td>{$infoMascota->Tamano}</td>
                        <td>{$infoMascota->Esterilizado}</td>
                        <td>{$infoMascota->FechaIngreso|date_format:"%d/%m/%Y"}</td>
                        <td><button type="button" class="btn btn-secondary float-end"><a
                                    class="text-decoration-none text-white"
                                    href="{BASE_URL}editarMascota/{$infoMascota->id}">Editar Mascota</a></button></td>
                        <td> <button type="button" class="btn btn-close mt-2" data-bs-toggle="modal"
                                data-bs-target="#Modal{$infoMascota->id}"></button></td>

                        <!-- Modal -->

                        <div class="modal fade" id="Modal{$infoMascota->id}" tabindex="-1"
                            aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h6 class="modal-title">Confirmar</h5>
                                    </div>
                                    <div class="modal-body">
                                        <p class="text-center">¿Estás seguro que deseas eliminar a
                                            <strong>{$infoMascota ->Nombre}</strong>?
                                        </p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">Cerrar</button>
                                        <button type="button" class="btn btn-primary"><a
                                                href="{BASE_URL}eliminarMascota/{$infoMascota->id}"
                                                class="text-decoration-none text-white">Borrar Mascota</a></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </tr>
                    {/foreach}
                </tbody>
            </table>
        </div>
        <button type="button" class="btn btn-primary float-end mt-3 me-3 mb-3"><a class="dataLink"
                href="{BASE_URL}nuevaMascota/{$id_cliente}" style="text-decoration:none;color:white">Agregar
                Mascota</a></button>

        {include file="templates/footer.tpl"}