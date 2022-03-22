{include file="templates/header.tpl"}
<div class="w-50 mt-2">
    {foreach from=$imgData item=$img}
        <a href="#!" data-bs-toggle="modal" data-bs-target="#modalImage{$img->id}">
            <img src="../{$img->ruta}" class="img-thumbnail w-25">
        </a>

        <div tabindex="-1" aria-labelledby="modalImage{$img->id}" aria-hidden="true" class="modal fade" id="modalImage{$img->id}">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content" style="margin:auto;">
                    <img src="../{$img->ruta}">
                </div>
            </div>


        </div>

    {/foreach}
</div>

<form method="POST" action="{BASE_URL}newImg" enctype="multipart/form-data">
    <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"><strong>Agregar Imagen</strong></label>
        <input type="file" class="form-control w-75" name="input_name" id="imageToUpload">
    </div>

    <button type="submit" name="submit" class="btn btn-primary mt-2">Cargar Archivo</button>
    <input type="radio" value="{$idHistorial}" name="id_historial" style="display:none" checked>
</form>

{include file="templates/footer.tpl"}