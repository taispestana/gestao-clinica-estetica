# Gestao Clinica Estetica

## Introdução

Projeto final do CEASE, com o objetivo de criar um site em react e laravel para a gestão de uma clinica de estetica

## Como Rodar o projeto

Ao Iniciar o Projeto rodar o comando

```
npm install && npm run build
composer run dev
```

Adicionar as configurações do banco de dados no .env 

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=clinica-estetica
DB_USERNAME=root
DB_PASSWORD=roote
```

Para que as tabelas de SQL sejam criadas deve executar o seguinte comando:

```
php artisan config:clear
php artisan migrate
composer run dev
```

OBS: é necessário ter uma base de dados SQL para rodar o Projeto

mais informações do laravel na documentação oficial do [LARAVEL](https://laravel.com/docs/11.x/installation)

## Erros Conhecidos

### Erro extensões PHP

Caso tenham algum erro relacionado as extensões do PHP
Buscar o arquivo php.ini que se encontra na pasta de instalação do PHP
e configurar as extensões como abaixo:

```
;extension=bz2
extension=curl
;extension=exif
;extension=ffi
;extension=ftp
extension=fileinfo
extension=gd
;extension=gettext
;extension=gmp
;extension=intl
;extension=ldap
extension=mbstring
extension=mysqli
;extension=odbc
extension=openssl
;extension=pdo_firebird
extension=pdo_mysql
;extension=pdo_odbc
;extension=pdo_pgsql
extension=pdo_sqlite
;extension=pgsql
;extension=shmop

;extension=snmp

;extension=soap
;extension=sockets
;extension=sodium
extension=sqlite3
;extension=tidy
;extension=xsl
extension=zip
```
OBS: Ao remover o ";" estamos retirando o comentário da extensão

### Erro APP key

caso tenham o erro de MISSING APP KEY
Rodar o comando abaixo para gerar uma nova key no .env

```
php artisan key:generate
```
