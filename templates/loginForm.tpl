<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Veterinaria Catriel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="{BASE_URL}css/style.css">
    <link type="image/png" sizes="16x16" rel="icon" href="{BASE_URL}favicon/favicon.png">
</head>
<body>
    <img class="img-bg" src="{BASE_URL}images/background-image.jpg"
        style="width: 100%; position: absolute; z-index: -1; opacity: 12%;">

    <header style="background-color: #76448A">
        <h1 class="tittle ms-2 text-white">Veterinaria Catriel</h1>
    </header>

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-11 col-sm-8 col-md-5 col-lg-4">
                <div class="card mt-5 shadow-sm">
                    <div class="card-header text-center" style="background-color: #F4ECF7">
                        <b>Ingresar</b>
                    </div>
                    <div class="card-body">
                        {if isset($error)}
                            <div class="alert alert-danger py-2" role="alert">{$error}</div>
                        {/if}

                        <form method="POST" action="{BASE_URL}login">
                            <div class="mb-3">
                                <label for="usuario" class="form-label">Usuario</label>
                                <input type="text" class="form-control" id="usuario" name="usuario"
                                    autocomplete="username" autofocus required>
                            </div>
                            <div class="mb-3">
                                <label for="contrasena" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="contrasena" name="contrasena"
                                    autocomplete="current-password" required>
                            </div>
                            <button type="submit" class="btn w-100 text-white" style="background-color: #76448A">
                                Entrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous">
    </script>
</body>
</html>
