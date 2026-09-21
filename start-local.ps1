# Levanta el entorno local de Proyecto-Vete:
#   - MariaDB de XAMPP (datos reales) en el puerto 3306
#   - servidor PHP en http://localhost:8080
# Uso:  powershell -ExecutionPolicy Bypass -File start-local.ps1

$xampp   = "C:\Users\mique\OneDrive\Escritorio\xampp"
$project = "C:\laragon\www\Proyecto-Vete"
$logs    = "$env:TEMP\proyecto-vete"
New-Item -ItemType Directory -Force -Path $logs | Out-Null

# --- MariaDB ---------------------------------------------------------------
$running = Get-NetTCPConnection -LocalPort 3306 -State Listen -ErrorAction SilentlyContinue
if ($running) {
    Write-Host "MySQL ya escucha en 3306, lo reuso." -ForegroundColor Yellow
} else {
    Write-Host "Arrancando MariaDB de XAMPP en 3306..." -ForegroundColor Cyan
    # sql_mode igual al de produccion, con STRICT_TRANS_TABLES.
    # Antes replicaba el my.ini de XAMPP, que es permisivo, y por eso un alta
    # sin documento andaba en local y tiraba 500 en Railway. Que local sea tan
    # estricto como produccion hace que esos errores salten aca primero.
    Start-Process -FilePath "$xampp\mysql\bin\mysqld.exe" `
        -ArgumentList @(
            "--no-defaults",
            "--datadir=$xampp\mysql\data",
            "--port=3306",
            "--sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION"
        ) `
        -RedirectStandardOutput "$logs\mysqld.log" `
        -RedirectStandardError  "$logs\mysqld.err.log" `
        -WindowStyle Hidden
    Start-Sleep -Seconds 10
}

# --- PHP -------------------------------------------------------------------
$web = Get-NetTCPConnection -LocalPort 8080 -State Listen -ErrorAction SilentlyContinue
if ($web) {
    Write-Host "El puerto 8080 ya esta ocupado. Cerra ese proceso y volve a correr el script." -ForegroundColor Red
    exit 1
}
Write-Host "Arrancando PHP en http://localhost:8080 ..." -ForegroundColor Cyan
Start-Process -FilePath "php" `
    -ArgumentList @(
        "-d", "error_reporting=22517",
        "-d", "display_errors=0",
        "-d", "log_errors=1",
        "-d", "error_log=$logs\php-errors.log",
        "-S", "localhost:8080",
        "-t", $project,
        "$project\devserver.php"
    ) `
    -WorkingDirectory $project `
    -RedirectStandardOutput "$logs\php.log" `
    -RedirectStandardError  "$logs\php.err.log" `
    -WindowStyle Hidden
Start-Sleep -Seconds 4

try {
    $r = Invoke-WebRequest -Uri "http://localhost:8080/home" -UseBasicParsing -TimeoutSec 15
    Write-Host "Listo. HTTP $($r.StatusCode). Abri http://localhost:8080" -ForegroundColor Green
    Write-Host "Logs en $logs" -ForegroundColor DarkGray
} catch {
    Write-Host "El servidor no respondio. Revisa $logs\php-errors.log" -ForegroundColor Red
}
