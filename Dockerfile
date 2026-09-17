# Veterinaria Catriel - PHP 8.2 + Apache.
# Apache is used on purpose: the app routes every request through router.php via
# the .htaccess mod_rewrite rules, which Caddy and nginx would ignore.

FROM php:8.2-apache

# pdo_mysql is the only extension the app needs on top of the defaults.
RUN docker-php-ext-install pdo_mysql \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*

# Allow the .htaccess in the document root to take effect. The document root is
# the project root, so the source directories are blocked explicitly: otherwise
# the SQL dump under db/ and the .tpl templates would be downloadable.
RUN printf '%s\n' \
    '<Directory /var/www/html>' \
    '    Options FollowSymLinks' \
    '    AllowOverride All' \
    '    Require all granted' \
    '</Directory>' \
    '' \
    '<DirectoryMatch "^/var/www/html/(controllers|models|views|libs|db|templates|templates_c)/">' \
    '    Require all denied' \
    '</DirectoryMatch>' \
    '' \
    '<FilesMatch "\.(sql|tpl|ini|md|ps1|sh|log)$">' \
    '    Require all denied' \
    '</FilesMatch>' \
    '' \
    '<Files "config.php">' \
    '    Require all denied' \
    '</Files>' \
    > /etc/apache2/conf-available/app-docroot.conf \
    && a2enconf app-docroot

# Quiet the startup warning about the server name.
RUN echo "ServerName localhost" > /etc/apache2/conf-available/servername.conf \
    && a2enconf servername

# Smarty 3.1.39 emits deprecation notices on PHP 8.x; keep them out of the page
# and in the log instead.
RUN { \
      echo 'display_errors = Off'; \
      echo 'log_errors = On'; \
      echo 'error_log = /dev/stderr'; \
      echo 'error_reporting = E_ALL & ~E_DEPRECATED & ~E_NOTICE & ~E_WARNING'; \
      echo 'upload_max_filesize = 32M'; \
      echo 'post_max_size = 32M'; \
      echo 'date.timezone = America/Argentina/Buenos_Aires'; \
    } > /usr/local/etc/php/conf.d/app.ini

WORKDIR /var/www/html
COPY . /var/www/html

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["apache2-foreground"]
