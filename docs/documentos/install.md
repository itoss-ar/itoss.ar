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

## Instalar ITOSS 

### 1. Instalar postgres

```sh

yum install https://download.postgresql.org/pub/repos/yum/reporpms/EL-$(rpm -E %{rhel})-x86_64/pgdg-redhat-repo-latest.noarch.rpm

```

### 2. Instalar TimescaleDB

#### 1. Crear repositorio timescaledb

```sh

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

```sh

yum update

```

#### 3. Instalar TimescaleDB

```sh

yum install timescaledb-2-postgresql-14

```

#### 4. Descargar la base de datos de configuración de ITOSS del siguiente link:

### **[itossdb-initial.sql](https://github.com/fmalaspina/itoss-releases/releases/download/v4.0.0/itossdb-initial.sql)**




#### 5. Restore de la base inicial de ITOSS

```sh

CREATE DATABASE itossdb;
\c itossdb
CREATE EXTENSION IF NOT EXISTS timescaledb;
SELECT timescaledb_pre_restore();
\! pg_restore -Fc -d itossdb itossdb-initial.sql
SELECT timescaledb_post_restore();

```



## Backup y restore de la base de configuración ITOSS

### 1. Backup de la base de configuración

```sh

pg_dump -Fc -f itossdb.sql itossdb
 
```

### 2. Restore de la base de configuración

```sh

CREATE DATABASE itossdb;
\c itossdb
CREATE EXTENSION IF NOT EXISTS timescaledb;
SELECT timescaledb_pre_restore();

\! pg_restore -Fc -d itossdb itossdb.sql
SELECT timescaledb_post_restore();

```

## Backup y restore de la base de métricas ITOSS

### 1. Backup de la base de métricas

```sh

pg_dump -Fc -f metrics.sql metrics
 
```

### 2. Restore de la base de métricas

```sh

CREATE DATABASE metrics;
\c metrics
CREATE EXTENSION IF NOT EXISTS timescaledb;
SELECT timescaledb_pre_restore();

\! pg_restore -Fc -d metrics metrics.sql
SELECT timescaledb_post_restore();

```


