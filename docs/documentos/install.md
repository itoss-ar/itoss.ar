---
id: instalacion
title: Guía de instalación ITOSS
---

# Guía de instalación ITOSS para sistemas basados en red hat

Esta guía corresponde a la instalación de ITOSS y pre-requisitos en sistemas basados en red hat. Es compatible para las siguientes distribuciones:

* Red Hat Enterprise Linux 7
* Red Hat Enterprise Linux 8
* CentOS 7
* CentOS 8
* Fedora 33
* Fedora 34
* Fedora 35

## Instalar prerequisitos 

### 1. Instalar postgres

```shell
yum install https://download.postgresql.org/pub/repos/yum/reporpms/EL-$(rpm -E %{rhel})-x86_64/pgdg-redhat-repo-latest.noarch.rpm
```

### 2. Instalar TimescaleDB

#### 1. Crear repositorio timescaledb

```shell
tee /etc/yum.repos.d/timescale_timescaledb.repo <<EOL
[timescale_timescaledb]
name=timescale_timescaledb
baseurl=https://packagecloud.io/timescale/timescaledb/el/$(rpm -E %{rhel})/\$basearch
repo_gpgcheck=1
gpgcheck=0
enabled=1
gpgkey=https://packagecloud.io/timescale/timescaledb/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300
EOL
```

#### 2. Actualizar repositorios

```shell
yum update
```

#### 3. Instalar TimescaleDB

```shell
yum install timescaledb-2-postgresql-14
```





### 3. Importar la base inicial de ITOSS

#### 1. Descargar la base de datos de configuración de ITOSS del siguiente link:

**[itossdb-initial.sql](https://github.com/fmalaspina/itoss-releases/releases/download/v4.0.0/itossdb-initial.sql)**

#### 2. Importar la base con pg_restore

Iniciada la sesión como usuario postgres y correriendo el cliente psql.

```sql
CREATE DATABASE itossdb;
\c itossdb
CREATE EXTENSION IF NOT EXISTS timescaledb;
SELECT timescaledb_pre_restore();
\! pg_restore -Fc -d itossdb itossdb-initial.sql
SELECT timescaledb_post_restore();
```



## Backup y restore de la base de datos de ITOSS

### 1. Backup 

```shell
pg_dump -Fc -f itossdb.sql itossdb
```

### 2. Restore 

Iniciada la sesión como usuario postgres y correriendo el cliente psql.

```sql
CREATE DATABASE itossdb;
\c itossdb
CREATE EXTENSION IF NOT EXISTS timescaledb;
SELECT timescaledb_pre_restore();

\! pg_restore -Fc -d itossdb itossdb.sql
SELECT timescaledb_post_restore();
```

## Instalar ITOSS 

### 1. Descargar paquete del producto

**[itoss-v4.0.0.tar](https://github.com/fmalaspina/itoss-releases/releases/download/v4.0.0/itoss-v4.0.0.tar)**


### 2. Descompactar el paquete


```shell
cd /var
tar xvf itoss-v4.0.0.tar
```


### 3. Ejecutar scripts de instalación

Crear un symbolic link en el dir raíz "/app" que apunte al folder app que se descompactó en el paso anterior.

```shell
ln -s /var/app /app
```

Ejecutar lo siguiente:

```shell
cd /app/setup
./pwsh-setup.sh
./nginx-setup.sh
./itoss-setup.sh
```
