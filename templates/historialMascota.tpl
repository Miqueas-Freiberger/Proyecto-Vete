{include file="templates/header.tpl"}

{foreach from=$historialMascota item=$dataHistorial}
    <div class="card w-100 mt-3">
      <div class="card-header">
         <button type="button" class="btn btn-secondary float-end mb-2"><a class="text-decoration-none text-white" href="{BASE_URL}editarHistorial/{$dataHistorial->id}">Editar Historial</a></button>
          <h2>Historial Clinico</h2>
            <p>Fecha de Consulta: {$dataHistorial->Fecha|date_format:"%d/%m/%Y"}</p>          
      </div>
      <div class="historialTotal m-3">
        <h3>Motivos de Consulta</h3>
          <p>{$dataHistorial->MotivoConsulta}</p>            
        <h3>Complementarios: {$dataHistorial->Complementarios}</h3>
        <h5>Observaciones</h5>
          <p>{$dataHistorial->Observacion}</p>
        <h3>Tratamiento</h3>
          <p>{$dataHistorial->Tratamiento}</p>
      </div>
    </div>        
{/foreach}

<button type="button" class="btn btn-primary  mt-3 me-3 mb-3 float-end"><a class="dataLink" href="{BASE_URL}nuevoHistorial/{$id_mascota}" style="text-decoration:none;color:white">Agregar Nuevo</a></button>

{include file="templates/footer.tpl"}