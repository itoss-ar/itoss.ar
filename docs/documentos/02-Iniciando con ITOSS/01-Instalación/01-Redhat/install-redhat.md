---
id: "instalacion redhat"
title: Guía de instalación ITOSS (sistemas basados en red hat)
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
***
## Instalar prerequisitos 

Para ejecutar ITOSS se requieren los siguientes productos:
- PostgresSQL 14
- TimescaleDB (opcional para guardado y reporte de métricas colectadas)
- Nginx (*)
- PowerShell Core (*)
- OpenJDK 17 (*)
- SAP JCO Netweaver connector (*)
- Sapcontrol tool (*)

##### * Incluidos en paquete de instalación

### Instalar PostgreSQL

```shell
yum install https://download.postgresql.org/pub/repos/yum/reporpms/EL-$(rpm -E %{rhel})-x86_64/pgdg-redhat-repo-latest.noarch.rpm
```

### Instalar TimescaleDB

#### Crear repositorio timescaledb

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

#### Actualizar repositorios

```shell
yum update
```

#### Instalar TimescaleDB

```shell
yum install timescaledb-2-postgresql-14
```


### Importar la base inicial de ITOSS

#### Descargar la base de datos de configuración de ITOSS del siguiente link:

**[itossdb-initial.sql](https://github.com/fmalaspina/itoss-releases/releases/download/v4.0.0/itossdb-initial.sql)**

#### Importar la base 

Iniciada la sesión como usuario postgres y correriendo el cliente psql.

```sql
CREATE DATABASE itossdb;
\c itossdb
CREATE EXTENSION IF NOT EXISTS timescaledb;
SELECT timescaledb_pre_restore();
\! pg_restore -Fc -d itossdb itossdb-initial.sql
SELECT timescaledb_post_restore();
```



## Instalar ITOSS 

### Descargar paquete del producto

**[itoss-v4.0.0.tar](https://github.com/fmalaspina/itoss-releases/releases/download/v4.0.0/itoss-v4.0.0.tar)**


### Descompactar el paquete


```shell
cd /var
tar xvf itoss-v4.0.0.tar
```


### Ejecutar scripts de instalación

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

***

## Backup y restore de la base de datos de ITOSS

### Backup 

```shell
pg_dump -Fc -f itossdb.sql itossdb
```

### Restore 

Iniciada la sesión como usuario postgres y correriendo el cliente psql.

```sql
CREATE DATABASE itossdb;
\c itossdb
CREATE EXTENSION IF NOT EXISTS timescaledb;
SELECT timescaledb_pre_restore();

\! pg_restore -Fc -d itossdb itossdb.sql
SELECT timescaledb_post_restore();
```
