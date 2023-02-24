---
id: "itoss-manager-services"
title: "ITOSS Manager Basic Administration"
---
This section contains information on the basic administration activities of the ITOSS software platform.
This software component is the center of the platform, and any unavailability affects the entire service, comprising the back-end and front-end modules.

### Directories, Logs, and Statistics
Base directory:

```shell
/app/itoss/itoss-manager/
```

Binary directory:

```shell
/app/itoss/bin
```

Graphic Interface directory:

```shell
/app/itoss/www/itoss
```

Help Desk Integration directory:

```shell
/app/itoss/integration
```

Log file:

```shell
/app/itoss/itoss-manager/logs/itoss-manager.log
```

Configuration file:

```shell
/app/itoss/itoss-manager/config/application.properties
```

Statistics:

```shell
curl http://<manager_endpoint>/stats |python -m json.tool
```

### Status, Start, and Stop

ITOSS Manager Status:

```shell
systemctl status itoss-manager
```

Start ITOSS Manager:

```shell
systemctl start itoss-manager
```

Stop ITOSS Manager:

```shell
systemctl stop itoss-manager
```

Web Service (UI) Status:

```shell
systemctl status nginx
```

Start Web Service (UI):

```shell
systemctl start nginx
```

Stop Web Service (UI):

```shell
systemctl stop nginx
```

Web Service Configuration file:

```shell
/etc/nginx/conf.d/default.conf
```
