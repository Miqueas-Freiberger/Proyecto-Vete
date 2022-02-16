{include file="templates/header.tpl"}

    <form method="POST" action="agregarDatos" >
        <div class="card mt-3 mb-3">
            <div style="margin-left:300px">
                <h1>Datos Cliente</h1>
                
                    <div class="mb-3">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Nombre y Apellido</label>
                        <input style="width: 60%" class="form-control" type="text" aria-label="default input example" required>
                    </div>
                    <div class="mb-3">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Numero de Telefono</label>
                        <input style="width: 60%" class="form-control" type="text" aria-label="default input example" required>
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Documento</label>
                        <input style="width: 60%" class="form-control" type="text"  aria-label="default input example" required>
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Ciudad</label>
                        <input style="width: 60%" class="form-control" type="text"  aria-label="default input example" required>      
                    </div>
                    <h1>Datos Mascota</h1>

                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Nombre</label>
                        <input style="width: 60%" class="form-control" type="text"  aria-label="default input example" required>      
                    </div>
                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Especie</label>
                        <input style="width: 60%" class="form-control" type="text"  aria-label="default input example" required>      
                    </div>

                    <div class="mb-3 ">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Fecha de Ingreso</label>
                        <input style="width: 60%" class="form-control" type="date" required>
                    </div>

                    <div style="margin-left:350px">
                        <button type="submit" class="btn btn-primary mb-4" >Agregar</button>
                    </div>
            </div>
        </div>
    </form>

{include file="templates/footer.tpl"}
