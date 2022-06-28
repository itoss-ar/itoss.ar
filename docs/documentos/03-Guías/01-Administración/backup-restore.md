---
id: "backup y restore"
title: Backup y restore ITOSS 
---
# Backup y restore de la base de datos de ITOSS

## Backup 

```shell
pg_dump -Fc -f itossdb.sql itossdb
```

## Restore 

Iniciada la sesión como usuario postgres y correriendo el cliente psql.

```sql
CREATE DATABASE itossdb;
\c itossdb
CREATE EXTENSION IF NOT EXISTS timescaledb;
SELECT timescaledb_pre_restore();

\! pg_restore -Fc -d itossdb itossdb.sql
SELECT timescaledb_post_restore();
```
