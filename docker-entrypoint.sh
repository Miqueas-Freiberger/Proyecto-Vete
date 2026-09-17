#!/bin/sh
set -e

# Railway assigns the port at runtime; Apache defaults to 80 otherwise.
PORT="${PORT:-80}"
sed -ri "s/^Listen [0-9]+$/Listen ${PORT}/" /etc/apache2/ports.conf
sed -ri "s/<VirtualHost \*:[0-9]+>/<VirtualHost *:${PORT}>/" /etc/apache2/sites-available/000-default.conf

# Smarty compiles templates on first render and needs a writable directory.
mkdir -p /var/www/html/templates_c
chown -R www-data:www-data /var/www/html/templates_c

# Uploaded files (x-rays, lab results, PDFs) must outlive a redeploy, so they
# live on a mounted volume when UPLOADS_DIR is set. The paths stored in the
# database are relative, so the in-repo directories become symlinks to it.
if [ -n "${UPLOADS_DIR}" ]; then
    for sub in images/historial archivos/historial; do
        mkdir -p "${UPLOADS_DIR}/${sub}"
        rm -rf "/var/www/html/${sub}"
        mkdir -p "$(dirname "/var/www/html/${sub}")"
        ln -sfn "${UPLOADS_DIR}/${sub}" "/var/www/html/${sub}"
    done
    chown -R www-data:www-data "${UPLOADS_DIR}"
    echo "[entrypoint] uploads mounted at ${UPLOADS_DIR}"
else
    mkdir -p /var/www/html/images/historial /var/www/html/archivos/historial
    chown -R www-data:www-data /var/www/html/images/historial /var/www/html/archivos/historial
    echo "[entrypoint] WARNING: UPLOADS_DIR is not set, uploads are lost on redeploy"
fi

# Apache refuses to start with more than one MPM loaded. mod_php needs prefork,
# so any other MPM that ends up enabled in the build environment is removed here.
for mpm in mpm_event mpm_worker; do
    if [ -e "/etc/apache2/mods-enabled/${mpm}.load" ]; then
        echo "[entrypoint] disabling ${mpm}"
        a2dismod -f "${mpm}" >/dev/null 2>&1 || true
    fi
done
a2enmod mpm_prefork >/dev/null 2>&1 || true

echo "[entrypoint] MPM enabled: $(ls /etc/apache2/mods-enabled/ | grep -i mpm | tr '\n' ' ')"
echo "[entrypoint] listening on ${PORT}"
exec "$@"
