---
id: "instalacion ubuntu"
title: Guía de instalación ITOSS (ubuntu 22.04 LTS)
---

# Instalación básica de ITOSS en Ubuntu Server 22.04 LTS

La instalación básica, todas las funciones esenciales son instaladas en un mismo servidor, tiene como objeto utilizarse para demostraciones, pruebas o ambientes pequeños de hasta 100 componentes gestionados (número orientativo para una operación estándar).

Este guía incluye la instalación de las siguientes funciones y/o paquetes de software:

* Base de datos -  Postgresql 14 + Timescale
* Web Server - ngnix
* ITOSS Manager
* ITOSS Collector

## Requisitos de hardware

Los requerimientos de hardware mínimos para ejecutar todas las funciones centrales de ITOSS en un servidor virtual son:

* 8 CPU  
* 16 RAM
* 50 GB de disco.

## Sistema operativo

Esta guía esta orientada y probada sobre Ubuntu Server 22.04 LTS, recomendamos un servidor dedicado para ITOSS y sobre una instalación limpia.  

***

## Pasos previos

### Instalación de Postgres + TimeScaleDB

1. Configurar repositorios de TI

```shell
curl -s https://packagecloud.io/install/repositories/timescale/timescaledb/script.deb.sh | sudo bash 
```

2. Actualizar repositorios  

```shell
sudo apt update 
```

3. Instalar postgres + timeScaleDB

```shell
sudo apt install timescaledb-2-postgresql-14 
sudo  echo "shared_preload_libraries = 'timescaledb'" >> /etc/postgresql/14/main/postgresql.conf 
sudo  systemctl restart postgresql 
```


### Instalación WEB Server (NGINX)

_Para más información: _https://nginx.org/en/linux_packages.html#Ubuntu_

1. Instalar paquetes requeridos

```shell
sudo apt install curl gnupg2 ca-certificates lsb-release ubuntu-keyring
```

2. Importar clave oficial de nginx

```shell
curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null 
```

3. Verficar clave (opcional)

```shell
gpg --dry-run --quiet --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg 
```

4. Configurar repositorio de la versión estable.

```shell
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list 
```

5. Configurar prioridad de paquete nginx

```shell
echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" | sudo tee /etc/apt/preferences.d/99nginx 
```

6. Instalar nginx

```shell
sudo apt update
sudo apt install nginx
```

***

## Instalación y configuración de ITOSS

### Instalar ITOSS

Realizar los siguientes pasos:

1. Descargar el software en el directorio "/"

    **[Ir a Descargas](/descargas)**


2. Descomprimir el archive itossbasic-v4-ubuntu.tar

    ```shell
    cd /
    tar xvf itoss-v5.1.0.tar
    ```

3. Configurar ngnix  

    ```shell
    sudo cp -rf /app/setup/default.conf /etc/nginx/conf.d/default.conf 2>/dev/null 
    sudo systemctl enable nginx 
    sudo systemctl start nginx 
    ```

4. Crear de base datos y carga de datos inicial. 

    ```shell
    sudo su – postgres 
    $ psql 
    CREATE USER itoss WITH PASSWORD 'admin'; 
    CREATE DATABASE itossdb; 
    \c itossdb; 
    ALTER DATABASE itossdb OWNER TO itoss; 
    ALTER SCHEMA public OWNER TO itoss; 
    CREATE EXTENSION IF NOT EXISTS timescaledb; 
    SELECT timescaledb_pre_restore(); 
    \q
    psql -d itossdb -f /app/setup/itossdb-initial.sql
    psql
    SELECT timescaledb_post_restore(); 
    ```

5. Crear servicios de ITOSS e iniciar la aplicación 

    ```shell
    cp /app/setup/*.service /etc/systemd/system/ 
    sudo systemctl enable itoss-manager.service 
    sudo systemctl enable itoss-collector.service 
    sudo systemctl enable itoss-reporting.service
    sudo systemctl start itoss-manager 
    sudo systemctl start itoss-collector.service 
    sudo systemctl start itoss-reporting.service 
    ```

***

### Instalación de Powershell (opcional)

En los casos que requiera gestionar componentes a través de Powershell ( por ejemplo  del ecosistema Microsoft) .

_Para más información:
[https://docs.microsoft.com/en-us/powershell/scripting/install/install-ubuntu?view=powershell-7.2](https://docs.microsoft.com/en-us/powershell/scripting/install/install-ubuntu?view=powershell-7.2)_

```shell
sudo apt-get install -y wget apt-transport-https software-properties-common
wget -q[ <https://packages.microsoft.com/config/ubuntu/>$(lsb_release -rs)/packages-microsoft-prod.deb](https://packages.microsoft.com/config/ubuntu/$(lsb_release%20-rs)/packages-microsoft-prod.deb)
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update
sudo apt-get install -y powershell
sudo apt-get install -y gss-ntlmssp
```
