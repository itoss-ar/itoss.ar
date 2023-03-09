---
id: resources
title: Resources
---

# Downloads

| Installation type | File | Platform | Architecture |   Date   |
|  :---  |  :---  |  :---  |  :---  |  :---  |
| Manager and collector installation | [itoss-5.2.tar.gz](https://github.com/fmalaspina/itoss.ar/releases/download/v5.2/itoss-v5.2.tar.gz) | Intel based Linux | x86-64 |  20-01-2023 |
| Docker image install | [docker-compose.yml](https://github.com/fmalaspina/itoss.ar/releases/download/v5.2/docker-compose.yml) | Docker | x86-64 |  20-01-2023 |

---

# Docker instructions


The easiest way to get itoss up and running is using our docker compose image.

   ```shell
   mkdir /tmp/itoss
   cd /tmp/itoss
   wget https://github.com/fmalaspina/itoss.ar/releases/download/v5.2/docker-compose.yml
   docker compose up
   ```
