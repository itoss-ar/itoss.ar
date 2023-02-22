---
id: "itoss-reporting-services"
title: "ITOSS Reporting Basic Administration"
---


This component of the platform provides support for advanced reporting functions in ITOSS.

### Directories and Logs
Base directory:
```shell
/app/itoss/itoss-reporting
```

Binary directory:

```shell
/app/itoss/bin
```

Log file:

```shell
/app/itoss/itoss-reporting/logs/itoss-reporting.log
```

Configuration file:

```shell
/app/itoss/itoss-reporting/config/application.properties
```

Statistics:

```shell
curl http://<reporting_endpoint>/stats |python -m json.tool
```

### Status, Start, and Stop

ITOSS Reporting status:

```shell
systemctl status itoss-reporting
```

Start ITOSS Reporting:

```shell
systemctl start itoss-reporting
```

Stop ITOSS Reporting:

```shell
systemctl stop itoss-reporting
```
