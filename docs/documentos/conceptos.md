---
id: conceptos
title: Guía de conceptos

---
# Guía de conceptos


# **Desafío de la operación TI**
En la actualidad, y desde hace varios años, la tendencia es que la operación y administración de sistemas informáticos sea tercerizado en compañías dedicadas a ofrecer estos servicios, típicamente Centro de datos u otras grandes empresas del sector de TI.   Esta situación genera un desafío para éstas compañías con cientos de clientes, múltiples centros de operaciones y un escenario constantemente cambiante por nuevos proyectos y tecnologías.

ITOSS es una aplicación que tiene como objetivo dar soporte a la operación de TI para el escenario antes mencionado, enfocado en los clientes y la automatización de procesos de la operación, buscando una evolución de las metodologías actuales para operar grandes ambientes informáticos. 
# **Modelando la gestión operativa** 
ITOSS es una plataforma de trabajo donde los grupos soporte de TI modelan e implementan la gestión operativa de diferentes tecnologías de manera sencilla y flexible, dando una rápida visualización de estado y de las métricas del entorno gestionado a los centros de operación.  

Para iniciar es importante entender los conceptos sobre los cuales construimos la automatización de actividades operativas, en primera instancia el componente objeto de gestión.
## **Componente de TI**
Un componente de TI (en adelante *componente*) en ITOSS representa una entidad gestionada sobre la cual se colectan métricas, se procesan resultados y se disparan las acciones operativas según la regla que aplique.   Es el objeto que gestionan las operaciones y muchas veces está relacionado directamente con el servicio de negocio.

Los componentes están agrupados en “tipos de componentes” que hacen referencia a una tecnología particular 
### Tipos de componente
Generalmente vemos que los tipos de componentes están relacionados a los nichos de conocimiento de TI y su estructura en forma jerárquica está ligada a esto. A grandes rasgos los tipos de componentes hacen referencia a una tecnología particular donde las métricas de interés operativas son las mismas y se obtienen de la misma fuente.  

Como ejemplo de una agrupación jerárquica de tipos de componentes podemos listar la estructura de tipos para base de datos:

- Database
  - Oracle
  - MS SQL Server
  - HANA
  - Postgres
  - MySQL

Esto tipos de componentes tienen interfaces provistas por el propietario para su gestión, estas interfaces en ITOSS son denominadas instrumentaciones, por las cuales se hace la gestión automatizada.
## **Instrumentaciones**
Una instrumentación en ITOSS es la interfaz que permite acceder a datos de gestión de un componente de TI, un componente puede utilizar más de una instrumentación para la gestión. 

ITOSS provee un conjunto de instrumentaciones para la gestión moderna de la mayoría de las tecnologías, éstas son:

- SSH: interfaz/protocolo por defecto para gestión de sistemas Linux y Unix, aunque también está presente ampliamente en dispositivos de red.
- PowerShell:  es la apuesta de Microsoft para la gestión de su ecosistema de aplicaciones y sistemas operativos. Otras compañías usan esta instrumentación como VmWare que usa Powershell como herramienta de gestión y automatización mediante su paquete powercli para PWSH.  
- JDBC: es la interfaz para gestión de base de datos relacionales.
- SAP RFC:  interfaz propietaria de SAP para gestión de SAP, hay varias instrumentaciones disponibles en ITOSS para SAP
  - RFCFUNCTION:  invoca una función de SAP.
  - RFCSTATUS: valida el estado de SAP a nivel de estado.
  - RFCREADTABLE: consulta una tabla de SAP.
- API REST:  interfaz moderna, relativamente, que hoy está presente en muchas aplicaciones y nuevas tecnologías. 
- TCP: interfaz básica que valida si un componente es alcanzable por la red a un puerto especifico.
- ICMP:   interfaz básica que valida si un componente es alcanzable por la red.
- EXEC:  es la ejecución de un programa que utiliza otras interfaces no provistas nativamente en ITOSS y con esto amplía el alcance de gestión a cualquier componente.

Las instrumentaciones (a excepción de las básicas) son el soporte para ejecutar programas o consultas en los componentes para obtener las métricas de interés. 
## **Métricas**
Las métricas o indicadores son datos de interés sobre la gestión operativa (aunque su uso puede extenderse) de un tipo de tecnología, los datos son mapeados internamente en ITOSS en campos, para luego ser procesadas en monitores.  Obtenemos las métricas mediante programas (script), consultas SQL u otros mecanismos que soporten las instrumentaciones asignadas al tipo de componente, lo cual brinda datos que están categorizados en estado, configuración, rendimiento, disponibilidad, calidad, almacenamiento, etcétera.    
### Métrica de estado
Existe una métrica que tiene especial importancia dentro de ITOSS porque establece el estado operativo de un componente (UP o DOWN) y es denominada métrica de estado (status).   

La métrica de estado permite inferir dos situaciones relacionadas al monitoreo externo de componentes, las cuales son:

- Falla en métrica (*metric fault o fault)*: en los casos de las métricas que no son de estado, hay una falla al consultar la métrica, y el estado del componente indica “UP”, la situación es denominada “*falla en métrica*” (*metric fault o fault*).  Este tipo de situación, en caso de persistir en el tiempo, es un problema por resolver para una adecuada gestión.
- Falla secundaria (*secondary fault*): en los casos de las métricas que no son de estado, hay una falla al consultar la métrica, y el estado del componente indica “DOWN”, la situación es denominada “*falla secundaria*” (*secondary fault*).  Este tipo de situación no es de interés operativo.
### Mapeo de campos
La información resultante de una métrica es asignada a campos dentro de ITOSS para luego ser utilizada para su procesamiento, almacenamiento y visualización. En muchos casos dentro de una métrica existen más de una instancia, para su identificación en ITOSS estos campos son denominados *Tags, y Fields* los campos que muestran valores.
## **Monitores**
En los monitores está la definición de la lógica operativa de una métrica, donde está la frecuencia de colección y las reglas operativas, las mismas están compuestas por condiciones y acciones asociadas a estas últimas.

La ejecución de los monitores en los componentes genera un estado que nos indicar si puedo o no colectar la métrica. Los estados posibles son:

- OK:  el monitor pudo obtener la métrica.
- FAULT: el monitor no pudo obtener la métrica por problemas con la fuente o el mapeo de datos.
- SECONDARY FAULT: el monitor no puede obtener la métrica porque el componente no es accesible.

Un conjunto de monitores de un mismo tipo de componente agrupados con la finalidad de realizar la gestión operativa es denominado en ITOSS perfil de gestión (*Management profile*).
## **Perfiles de gestión**
Los perfiles de gestión son un conjunto de monitores que tienen como objeto definir qué tipo de gestión operativa va a asignarse a un componente, a su vez definen cómo es gestionado un componente.  Los perfiles están definidos por tipo de componente, y se orientan a las necesidades operativas y de negocio.
# **Operación de tecnología con ITOSS**
La gestión operativa de tecnología en ITOSS nos permite visualizar la información desde diferentes ángulos en tableros orientados a las necesidades de los centros de soporte. Existen varias vistas o tableros en ITOSS (Dashboard) para lograr enfoques generales y particulares de los componentes gestionados.
## **Tableros operativos (Dashboard)**
Un concepto muy extendido en la actualidad son los tableros que tienen como objetivo visualizar métricas claves de una temática en particular.   

En ITOSS estos tableros tienen fines operativos y van un poco más allá de una simple visualización, permitiendo interactuar con éstos.  Existen diferentes enfoques de tableros operativos de acuerdo con el objeto a analizar, éstos son:

- Tablero de estado general (General Status):  da una visión de estado general de todos los componentes gestionados.  El estado se da por la métrica de estado que define el estado UP o DOWN del componente.   Los tableros de estados pueden agruparse por clientes, ubicación y tipo de componente.
- Tableros de Monitores:  Los tableros de monitores están conformados por contenedores (containers) que están alimentados por entradas en tableros (Dashboard entries o DE).  Cada contenedor refleja el resultado del análisis de una métrica para todos los componentes que aplica a un monitor.  Existen tableros tipo monitor públicos que están disponibles para todos los usuarios y propietarios (que son configurados a medida por el usuario).  Dan al usuario un panorama general de todo el ambiente gestionado, con la posibilidad de crear vistas para un enfoque particular.
- Tableros de compañía:  los tableros de compañía dan una vista orientada a un cliente particular donde visualizamos información relativa a estado y monitores de todos los componentes de la compañía objeto de análisis.
- Tableros de componentes: los tableros de componentes dan información de soporte y permite que el usuario de soporte interactúe con el componente.
- Contenedores: Los contenedores (containers) en ITOSS nos dan información sobre el análisis de un monitor mostrando cantidades de componentes con un estado particular o situaciones con problemas.  Hoy en día existen dos tipos de contenedores, estos son:
1. Semáforo (Semaphore):  muestra la cantidad de componentes en estado VERDE (GREEN), AMARILLO (YELLOW) o ROJO (RED).  Estos estados representan un nivel de criticidad en el análisis de la métrica, y no siempre son requeridos todos los estados, lo cual dependerá de la lógica operativa que quiera aplicarse.  En general, RED es utilizado en situaciones graves, YELLOW en aquellas que requieren atención y/o preventivas y GREEN para situaciones normales.
1. Problemas o Excepciones (Issue): muestra la cantidad de excepciones o problemas encontrados al analizar una métrica.

Los contenedores están alimentados por entradas en el tablero (denominadas Dashboard entries) que son disparadas desde las acciones de los monitores para popular los tableros operativos.

La relación entre el contenedor y monitor es uno a uno, es decir por cada monitor existe un contendor que representa el estado de los componentes que ese monitor gestiona.
## **Entradas en el tablero (Dashboard entries o DE)**
Las entradas en tablero (en adelante DE por sus siglas en inglés) son disparados por las acciones de los monitores para indicar un estado de situación referido al análisis de una métrica.

A simple vista son similares a los eventos, pero con la salvedad que estos reflejan siempre el último estado analizado de las métricas colectadas y se mantienen en el tiempo hasta que la situación cambie por otro nivel.   No puede reconocerse ni borrarse. 
### Atendiendo un DE
En caso de situaciones conocidas o sobre las cuales se está trabajando, el DE puede “atenderse”, esto provoca que el DE cambie a otro color en la interfaz de usuario y registre en el historial dicha interacción.  De esta forma, todas las personas de soporte con responsabilidad sobre ese componente pueden conocer el estado de trabajo de un DE.
### Información de un DE
La información contenida en un DE es la siguiente:

- Nivel de severidad:  indica el nivel de gravedad de la situación para una métrica particular en un componente.  Según el tipo de contenedor donde se reflejen los DE, los niveles son:
  - RED
  - YELLOW
  - GREEN
  - ISSUE
- Puntuación (Score): nos indica la prioridad de DE considerando los aspectos de compañía, monitor y componente.
- Fecha de última actualización (last date): indica la fecha y hora de la última actualización del DE.
- Fecha de creación (creation date): indica la fecha y hora de creación del DE.
- Monitor:  nombre del monitor disparador del DE.
- Categoría (category): es la tipificación del DE heredada de la métrica y relacionada con un ámbito operativo en análisis.
- Regla (rule):  es la regla operativa que aplicó durante el análisis de la métrica por el monitor para un componente. 

Los DE dan una visión actual y completa de todas las métricas claves en gestión operativa de un componente.
## **Notificaciones**
ITOSS provee un sistema de notificaciones para informar de situaciones que requieren de urgencia operativa, como la detección de caídas de componentes. 

Las notificaciones son gestionadas por cada usuario de soporte desde la interfaz de usuario dando la posibilidad de generar un sonido frente a una nueva notificación, las notificaciones pueden generarse por cambio de estado de un componente, frente a una detección de un problema de red o como una acción de un monitor.
## **Gestión del ciclo de vida**
Desde el despliegue de un nuevo componente hasta la baja de este, existen cambios en el modo de operación relacionados a los requerimientos operativos, a esto lo denominamos ciclo de vida.

En ITOSS un componente puede estar en uno de los siguientes estados de ciclo de vida:

- DELIVERY:  esta inicial de componente en ITOSS, es un estado que adquiere el componente de forma automática cuando es cargado en la aplicación.  En este estado no hay gestión por parte de ITOSS.
- OPERATION: en estado operativo un componente es gestionado acorde al perfil que tenga asignado, solo este estado muestra información actualizada en los tableros de ITOSS y en estado operativo de componente (UP o DOWN)
- OUT OF SERVICE: durante el estado fuera de servicio el componente no es gestionado por ITOSS.  Este estado es gestionado por demanda de los usuarios de soporte.  En este modo el estado operativo de componente es UNKNOWN.
- MAINTENANCE: durante el estado en mantenimiento el componente no es gestionado por ITOSS.  A diferencia del estado fuera de servicio, hay que definir un horario de inicio y fin del mantenimiento. En este modo el estado operativo de componente es UNKNOWN.
- END OF SERVICE: da por finalizada la gestión del componente.   Este estado no tiene vuelta atrás. 

Todos los cambios de estados registran en el histórico de componente información de fecha, estado adquirido, usuario y comentarios (opcional). 
# **Otros actores en ITOSS** 
Para una visión completa y relacionada de todos los actores que son parte de la gestión de Soporte de TI están representados como entidades en ITOSS. Los otros actores son las personas que interactúan en el soporte de TI, los grupos de trabajo y las compañías contratantes del servicio con sus contactos.
## **Usuario de soporte**
El personal de soporte, gestión de servicios y operación de TI es el usuario principal de ITOSS, desde donde analizan la información operativa del ambiente bajo su gestión. 

Dentro de ITOSS los usuarios podrían tener los siguientes roles:

- Delivery
- Operation
- Service Manager
- Manager
- Operational Design
- Administrator

Los roles pueden variar dependiendo de las estructuras operativas, su tamaño u organización, la cual puede adaptarse creando roles a medida de cada escenario.  

Los usuarios de soporte pueden pertenecer a más de un grupo de trabajo y tener componentes asignados a su responsabilidad. 
## **Grupo de trabajo**
Las organizaciones de soporte de TI generalmente conforman grupos de personas para atender una temática, nivel de soporte o tecnología en especial. Los casos clásicos son los grupos de base de datos, grupos de operación, grupos de sistemas operativos, entre muchos otros. 

Los grupos de trabajo en ITOSS son asignados siempre uno a uno a los componentes dando un marco de responsabilidad sobre este y los grupos están conformados por los usuarios de soporte de ITOSS.
## **Compañías**
Las compañías en ITOSS identifican a las organizaciones internas y externas dueñas de un conjunto de componentes y a proveedores de servicios.  

Un componente debe pertenecer siempre a una compañía en ITOSS para poder ser gestionado.  Las compañías son asignadas también a los usuarios de soporte y a los contactos. 
## **Contacto**
Para el caso de compañías externas, que en la mayoría de los casos son las compañías tipo cliente que contratan el servicio de soporte, tenemos personas que no son usuarios de ITOSS pero que requieren ser notificadas por incidencias y acceder al portal de compañías.  Esta persona en ITOSS es un contacto.  

En ITOSS un contacto puede asignarse uno a uno a un componente con la finalidad de recibir notificaciones.













12

