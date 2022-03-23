{include file="templates/header.tpl"}
<div class="w-75 mt-2">
    <h4>Imagenes</h4>
    {foreach from=$imgData item=$file}
        {if $file->booleanFlag == false}


            <a href="#!" data-bs-toggle="modal" data-bs-target="#modalImage{$file->id}">
                <img src="../{$file->ruta}" class="img-thumbnail w-25">
            </a>
            <div tabindex="-1" aria-labelledby="modalImage{$file->id}" aria-hidden="true" class="modal fade"
                id="modalImage{$file->id}">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content" style="margin:auto;">
                        <img src="../{$file->ruta}">
                        <a href="{BASE_URL}eliminarImagen/{$file->id}"><button type="button" class="btn btn-danger w-100">Borrar
                                Imagen</button></a>
                    </div>
                </div>
            </div>
        {/if}


    {/foreach}

    <h4 class="mt-3">Documentos</h4>
    {foreach from=$imgData item=$file}
        <div>
            {if $file->booleanFlag == true}
                <button type="button" class="btn btn-close btn-sm ms-2" data-bs-toggle="modal"
                    data-bs-target="#fileModal{$file->id}"></button>
                <!-- Modal -->

                <div class="modal fade" id="fileModal{$file->id}" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h6 class="modal-title">Confirmar</h5>
                            </div>
                            <div class="modal-body">
                                <p class="text-center">¿Estás seguro que deseas eliminar este Archivo?
                                </p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-primary"><a href="{BASE_URL}eliminarImagen/{$file->id}"
                                        class="text-decoration-none text-white">Borrar Archivo</a></button>
                            </div>
                        </div>
                    </div>
                </div>


                <a href="{BASE_URL}verArchivo/{$file->id}" target="blank">{$file->nombre}</a>

            {/if}
        </div>
    {/foreach}

    <form method="POST" action="{BASE_URL}newImg" enctype="multipart/form-data" class="mt-3">
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"><strong>Subir Archivo</strong></label>
            <input type="file" class="form-control w-50" name="input_name" id="imageToUpload">
        </div>

        <button type="submit" name="submit" class="btn btn-primary mt-2">Aceptar</button>
        <input type="radio" value="{$idHistorial}" name="id_historial" style="display:none" checked>
    </form>
</div>

{include file="templates/footer.tpl"}