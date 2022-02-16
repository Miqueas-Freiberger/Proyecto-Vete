{include file="templates/header.tpl"}
<div class = "container">
    <h1>Veterinaria Catriel</h1>

        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link text-secondary" aria-current="page" href="#">Agregar Nuevo Cliente</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-secondary" href="#">Agregar Mascota</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-secondary" href="#">Libreta Sanitaria</a>
            </li>
        </ul>

        <table class="table mt-3">
            <thead>
                <tr>
                <th scope="col">Dueño</th>
                <th scope="col">Nombre Mascota</th>
                <th scope="col">Tipo</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">Pepe</th>
                <td>Roco</td>
                <td>Perro</td>
                </tr>
                <tr>
                <th scope="row">Maria</th>
                <td>Nala</td>
                <td>Gato</td>
                </tr>
                <tr>
                <th scope="row">Jose</th>
                <td>Sebastian</td>
                <td>Conejo</td>
                </tr>
            </tbody>
        </table>



{include file="templates/footer.tpl"}