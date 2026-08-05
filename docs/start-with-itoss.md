---
title: Start with ITOSS
---
## Deploying ITOSS 

ITOSS is deployed using Docker Compose, enabling a fast and straightforward setup process. This guide provisions the complete platform stack — including Manager, Collector, Reporting, Data Science Service, Job Scheduler, and Frontend — on a single machine.

This deployment model is ideal for evaluation purposes, proof of concept (POC), development environments, or small operational teams that require a simplified and self-contained setup.

By consolidating all core services into a single-node deployment, users can quickly explore ITOSS capabilities, validate use cases, and perform functional testing without the complexity of a distributed infrastructure.  

:::note Lab / POC
This setup is intended for evaluation and non-production use. 
For enterprise-grade deployments, it is recommended to engage with a consultant to define the appropriate architecture, such as a Kubernetes-based deployment or a virtual machine (VM) model aligned with scalability, availability, and performance requirements.
:::
### Requirements

Before deploying ITOSS using Docker Compose, ensure that the target environment meets the following prerequisites.
#### System  

The deployment supports the following operating systems:

- Linux or Windows 10/11

- Docker Engine 24 or later

- Docker Compose v2 (`docker compose` CLI)

Minimum recommended resources:

- ~8 vCPU

- ~16 GB RAM

- ~10 GB of available disk space (for container images and database volumes)
#### Ports

The following ports must be available and not in use by other services:

| Port   | Service          | Description                                      |
|--------|------------------|--------------------------------------------------|
| `80`   | Frontend         | Web user interface                               |
| `5432` | PostgreSQL       | Primary database service                         |
| `8079` | Reporting        | Reporting and analytics service                  |
| `8080` | Manager          | Core management service                          |
| `8081` | Collector        | Data collection and processing service           |
| `8084` | Job Scheduler    | Task scheduling and automation service           |
| `8085` | Decision Service | Decision and rule evaluation service             |
  
Ensure that these ports are accessible within the network context of the deployment and properly exposed if external access is required.

In environments with strict network policies, firewall rules and port mappings should be reviewed and configured accordingly.
### Install

```bash
# Download the suite
curl -L https://github.com/itoss-ar/itoss.ar/releases/download/v8.4/itoss-suite-v8.4.zip -o itoss-suite.zip # don't use -L option on windows
unzip itoss-suite.zip

# Bring up the stack
docker compose pull
docker compose up -d

# Check that it's up
docker compose ps
open http://localhost
```
#### Detailed installation

The suite's `docker-compose.yml` defines the following services:

| Service           | Image                              | Health                   | Host → Container                 |
| ----------------- | ---------------------------------- | ------------------------ | -------------------------------- |
| `itoss-db`        | `itosssoftware/itoss-db:v8`        | `pg_isready` + init flag | `5432 → 5432`                    |
| `itoss-manager`   | `itosssoftware/itoss-manager:v8`   | `GET /stats`             | `${MANAGER_PORT:-8080} → 8080`   |
| `itoss-collector` | `itosssoftware/itoss-collector:v8` | depends on DB/Manager    | `${COLLECTOR_PORT:-8081} → 8081` |
| `itoss-reporting` | `itosssoftware/itoss-reporting:v8` | depends on DB            | `${REPORTING_PORT:-8079} → 8079` |
| `itoss-ds`        | `itosssoftware/itoss-ds:v8`        | depends on DB            | `${DS_PORT:-8085} → 8085`        |
| `itoss-jobsched`  | `itosssoftware/itoss-jobsched:v8`  | depends on DB            | `${JOBSCHED_PORT:-8084} → 8084`  |
| `itoss-frontend`  | `itosssoftware/itoss-frontend:v8`  | depends on Mgr / Rep     | `${FRONTEND_PORT:-80} → 80`      |
Data persists in `./db (mapped into the Postgres container).

## Access to ITOSS

To access ITOSS, open a modern web browser and navigate to the URL where the **ITOSS FrontEnd service** is hosted.

Use the default credentials:
- **Username:** `Administrator` 
- **Password:** `admin` 

> ⚠️ **Security Recommendation** 
>
> It is strongly recommended to disable the default Administrator user after creating a named user with Administrator privileges. 
>
> Navigate to: 
> **Menu → Security → Users**

## Getting Started with ITOSS

A proper initial configuration is essential to ensure that ITOSS accurately reflects and adapts to the environment being managed.

For testing purposes, you may start by using the default entities included in the system for demo.
### Initial Configuration Order

The following entities should be created in this order:

1. **Locations** 

2. **Companies** 

3. **Workgroups** 

4. **Support Users** 

5. **Tenants** *(if applicable to your organization)* 

This sequence ensures a consistent and structured setup of the operational model.
### Creating Your First Component

Once the initial configuration is complete, you can start defining the components to be managed.
#### Steps

1. Navigate to: 
	   **Menu → Configuration → Components**
2. Click the **"+"** button to create a new component.
3. Select the **technology type** to be managed
	   *(refer to supported technologies documentation).*
4. Complete the required information in the creation form.
5. After creation, the component will be in **DELIVERY** state.
6. To begin monitoring, change the component state to: **OPERATION**
### Starting Monitoring

Once the component is set to **OPERATION**, ITOSS will:

- Begin collecting metrics automatically 
- Evaluate operational rules defined in monitors 
- Generate Dashboard Entries (DE) based on results

This marks the start of active operational management within ITOSS.