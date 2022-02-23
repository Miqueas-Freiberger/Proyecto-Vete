{include file="templates/header.tpl"}

{foreach from=$historialMascota item=$dataHistorial}
<div class="card" style="width: 100%;margin-top:20px">
  <div class="card-header">
    <h2>Historial Clinico</h2>    
  </div>
  <div style="margin:20px">
    <h3>Motivos de Consulta</h3>
    <p>{$dataHistorial->MotivoConsulta}</p>
    {foreach from=$complementarios item=$dataComplementario}
        <h3>Complementarios: {$dataComplementario->Complementarios}</h3>
    {/foreach}
    <h5>Observaciones</h5>
    <p>{$dataHistorial->Observacion}</p>
    <h3>Tratamiento</h3>
    <p>{$dataHistorial->Tratamiento}</p>
</div>
</div>
    
{/foreach}

{*  <button>HOLA</button>*} {* BOTON AGREGAR HISTORIAL *}

{include file="templates/footer.tpl"}