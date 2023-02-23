---
id: "backup-restore"
title: ITOSS Backup and restore
---
# ITOSS Database Backup and Restore

## Backup

```shell
pg_dump -Fc -f itossdb.sql itossdb
```

## Restore

Session started as user "postgres" and running the "psql" client.

```sql
CREATE DATABASE itossdb;
\c itossdb
CREATE EXTENSION IF NOT EXISTS timescaledb;
SELECT timescaledb_pre_restore();

\! pg_restore -Fc -d itossdb itossdb.sql
SELECT timescaledb_post_restore();
```
