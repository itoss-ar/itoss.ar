---
id: "ubuntu-installation"
title: ITOSS installation (ubuntu 22.04 LTS)
---
# Basic ITOSS Installation on Ubuntu Server 22.04 LTS"

This basic installation guide covers all essential functions installed on one server, intended for demonstrations, testing, or small environments with up to 100 managed components (orientative number for standard operation).

This guide includes the installation of the following functions and/or software packages:

- Database - Postgresql 14 + Timescale 2.15
- Web Server - Nginx
- ITOSS Manager
- ITOSS Collector
- ITOSS Reporting

## Hardware Requirements
The minimum hardware requirements to run all central functions of ITOSS on a virtual server are:

- 4 CPUs
- 8 GB RAM
- 50 GB of disk space.

## Operating System
This guide is oriented and tested on Ubuntu Server 22.04 LTS, a dedicated server for ITOSS on a clean installation is recommended.

***

### Previous Steps
### Installation of Postgres + TimeScaleDB

> Follow the vendor instructions for an updated installation, the following instructions may not be updated: https://docs.timescale.com/self-hosted/latest/install/installation-linux/
  
1. At the command prompt, as root, add the PostgreSQL third party repository to get the latest PostgreSQL packages:
```shell 
sudo apt install gnupg postgresql-common apt-transport-https lsb-release wget
```
2. Run the PostgreSQL repository setup script:
```shell 
sudo /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh
```
3. Add the TimescaleDB third party repository:
```shell
sudo echo "deb https://packagecloud.io/timescale/timescaledb/ubuntu/ $(lsb_release -c -s) main" | sudo tee /etc/apt/sources.list.d/timescaledb.list
```
4. Install TimescaleDB GPG key
```shell
sudo wget --quiet -O - https://packagecloud.io/timescale/timescaledb/gpgkey | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/timescaledb.gpg
```
5. Update your local repository list:
```shell
sudo apt update
```
6. Install TimescaleDB:
```shell
sudo apt-get install timescaledb-2-postgresql-14
```
7. Tunning Timescaledb:
```shell
sudo timescaledb-tune --yes
```
8. In the file /etc/postgresql/14/main/pg_hba.conf edit the line:
```shell
local all all peer
```
Replace "peer" with "trust"

9. Restart the postgresql service:
```shell
sudo systemctl restart postgresql
``` 
### Installation WEB Server (NGINX)
_For more information: https://nginx.org/en/linux_packages.html#Ubuntu_

1. Install required packages
```shell
sudo apt install curl gnupg2 ca-certificates lsb-release ubuntu-keyring
```
2. Import nginx official key
```shell
sudo curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
```

3. Verify key (optional)
```shell
sudo gpg --dry-run --quiet --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
```

4. Configure stable version repository.

```shell
sudo echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list
```

5. Configure nginx package priority
```shell
sudo echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" | sudo tee /etc/apt/preferences.d/99nginx
``` 

6. Install nginx

```shell
sudo apt update
sudo apt install nginx
```

***

## ITOSS Installation and Configuration
### Installing ITOSS
Follow these steps as root:

1. Download the software to the "/" directory

**[Go to Resources](/resources)**

2. Unzip the itoss-v7.tar.gz archive

```shell
cd /
tar xvf itoss-v7.tar.gz
``` 

3. Configure nginx

```shell
sudo cp -rf /app/setup/default.conf /etc/nginx/conf.d/default.conf 2>/dev/null
sudo systemctl enable nginx
sudo systemctl start nginx
```

4. Create the database and load the initial data.

```shell
sudo su - postgres
```
```shell
psql
```
```shell
CREATE USER itoss WITH PASSWORD 'admin';
CREATE DATABASE itossdb;
```
```shell
\c itossdb;
```
```shell
ALTER DATABASE itossdb OWNER TO itoss;
ALTER SCHEMA public OWNER TO itoss;
CREATE EXTENSION IF NOT EXISTS timescaledb;
SELECT timescaledb_pre_restore();
```
```shell
\q
```
```shell
psql -d itossdb -f /app/setup/itossdb-initial.sql
```
```shell
psql
```
```shell
\c itossdb
```
```shell
SELECT timescaledb_post_restore();
```
```shell
\q
```
5. Create ITOSS services and start the application

```shell
sudo cp /app/setup/*.service /etc/systemd/system/
sudo systemctl enable itoss-manager.service
sudo systemctl enable itoss-collector.service
sudo systemctl enable itoss-reporting.service
sudo systemctl start itoss-manager
sudo systemctl start itoss-collector.service
sudo systemctl start itoss-reporting.service
```