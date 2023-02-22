---
id: "itoss-collector-services"
title: "ITOSS Collector Basic Administration"
---


This component of the ITOSS platform is distributed throughout networks to reach all objects that require management. For reasons of load balancing, geographic proximity, and specific requirements, there are generally several of them.

### Directories, Logs, and Statistics
Base directory:

```shell
/app/itoss/itoss-collector/
```

Binary directory:

```shell
/app/itoss/bin
```

Log file:

```shell
/app/itoss/itoss-collector-00/logs/itoss-collector.log
```

Configuration file:

```shell
/app/itoss/itoss-collector-00/config/application.properties
```

Alert integration file:

```shell
/app/itoss/itoss-collector-00/logs/itoss-alert.log
```

Statistics:

```shell
curl http://<endpoint_collector>/stats |python -m json.tool
```

### Status, Start, and Stop

ITOSS Collector status:

```shell
systemctl status itoss-collector
```

Start ITOSS Collector:

```shell
systemctl start itoss-collector
```

Stop ITOSS Collector:

```shell
systemctl stop itoss-collector
```
