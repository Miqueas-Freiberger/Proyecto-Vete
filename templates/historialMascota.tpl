{include file="templates/header.tpl"}

{foreach from=$historialMascota item=$dataHistorial}
    <div class="card w-100 mt-3">
        <div class="card-header">
        <button type="button" class="btn btn-close float-end mt-2 ms-3 " data-bs-toggle="modal" data-bs-target="#Modal{$dataHistorial->id}"></button>
        
          <!-- Modal -->
        
            <div class="modal fade" id="Modal{$dataHistorial->id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                      <h6 class="modal-title">Confirmar</h5> 
                    </div>
                    <div class="modal-body">
                      <p  class="text-center">¿Estás seguro que deseas eliminar el Historial y toda su Informacion?</p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      <button type="button" class="btn btn-primary"><a href="{BASE_URL}eliminarHistorial/{$dataHistorial->id}" class="text-decoration-none text-white">Borrar Historial</a></button>
                    </div>
                  </div>
                </div>
            </div>
          
          <button type="button" class="btn btn-secondary float-end mb-2"><a class="text-decoration-none text-white" href="{BASE_URL}editarHistorial/{$dataHistorial->id}">Editar Historial</a></button>
            <h3>Historial Clinico</h3>
              <p>Fecha de Consulta: {$dataHistorial->Fecha|date_format:"%d/%m/%Y"}</p>          
        </div>
      <div class="historialTotal m-3">
        <h5>Motivos de Consulta</h5>
          <p>{$dataHistorial->MotivoConsulta}</p>            
            {if $dataHistorial->Complementarios != "-"}
              <h4>Complementarios: {$dataHistorial->Complementarios}
                (<a  class="fs-5 text-danger text-decoration-none"  data-bs-toggle="modal" data-bs-target="#Modal{$dataHistorial->id}" href="#">Eliminar Complementarios</a>)</h4>
                <!-- Modal -->
                <div class="modal fade" id="Modal{$dataHistorial->id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                          <div class="modal-header">
                              <h6 class="modal-title">Confirmar</h5> 
                          </div>
                          <div class="modal-body">
                            <p  class="text-center">¿Estás seguro que deseas eliminar los <strong>Complementarios</strong>?</p>
                          </div>
                          <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                              <button type="button" class="btn btn-primary"><a href="{BASE_URL}eliminarComplementarios/{$dataHistorial->id}" class="text-decoration-none text-white">Eliminar Complementarios</a></button>
                          </div>
                      </div>
                  </div>
              </div>
            {/if}
          
        <h5>Observaciones</h5>
          <p>{$dataHistorial->Observacion}</p>
        <h5>Tratamiento</h5>
          <p>{$dataHistorial->Tratamiento}</p>
          <button type="button" class="btn btn-link">Ver archivos adjuntos</button>
      </div>
    </div>        
{/foreach}

<button type="button" class="btn btn-primary  mt-3 me-3 mb-3 float-end"><a class="dataLink" href="{BASE_URL}nuevoHistorial/{$id_mascota}" style="text-decoration:none;color:white">Agregar Nuevo</a></button>

{include file="templates/footer.tpl"}