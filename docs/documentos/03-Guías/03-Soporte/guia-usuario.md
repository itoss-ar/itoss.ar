---
id: guia-usuario
title: Guía de usuario

---
# Guía usuario de soporte

# **Utilizando ITOSS en la operación de TI**
La presente guía está orientada a las personas de soporte de TI, con el objetivo de mostrar las funcionalidades de la aplicación y mejores prácticas para su uso óptimo.
## Acceso a la interfaz de usuario
La interfaz de usuario de ITOSS es accesible vía navegador WEB moderno compatible con JavaScript, al ingresar serán solicitadas las credenciales de acceso.

Desde un navegador WEB coloque la URL del WEB Server de ITOSS, e ingrese las credenciales de usuario.

Nota: ITOSS ha sido probado intensivamente con Google Chorme, recomendamos el uso de este navegador. 
## Menú de Operación
El menú de operación está diseñado para personas encargadas de administrar y operar componentes en ITOSS.  

Al iniciar ITOSS muestra los tableros de estado de componentes y sobre la izquierda la barra para extender el menú.  Tenemos las siguientes opciones:

- Gestión de clave de usuario.
- Preferencias de usuario.
- Menú Operativo (Operation).

En este menú se inician las actividades cotidianas de revisión y análisis operativo para entender el comportamiento general de las métricas operativas más importantes.  

- Tableros 
- Visor de DE
- Ciclo de vida
- Menú Explorador (Explore).
  - Compañías
  - Componentes
  - Reportes
- Menú Configurador (Configuration).
  - Componentes
  - Compañías
  - Contactos
  - Grupos de trabajo


Imagen inicial del menú Operativo
## Tableros operativos
Dan información sobre métricas claves de la operación y permiten analizar desde una perspectiva general los indicadores de interés. 
### Tablero de estado
El tablero de estado general (General Status) permite entender el estado de los componentes desde diferentes perspectivas, por compañía, por ubicación y por tipo de componente.  

El tablero permite aplicar filtros por ambiente y sobre las compañías que el usuario de soporte tiene bajo su responsabilidad directa (Only my companies).




Imagen de tablero de estado, resaltado en amarillo las opciones de vistas por diferentes tipos de agrupación.

Imagen de tablero de estado, resaltado en amarillo el acceso al menú de filtros por ambiente y compañías responsabilidad de usuario de soporte conectado.
### Tablero de monitores
Los tableros de monitores están conformados por *contendores*, los cuales   muestran las cantidades DE generados según el análisis realizado sobre la métrica.

Existen tableros públicos, diseñados y configurados por el administrador de ITOSS, y tableros personalizados por el usuario de soporte.  Para acceder o crear nuevos tableros, en la pantalla de Tableros seleccionar “Add”.



`	`Imagen que muestra el acceso a la configuración de tableros de monitores.

Inicialmente, al ingresar a ITOSS, los tableros públicos solo se muestran si fueron asignamos por el administrador de ITOSS al usuario de soporte, en caso de que no fuera así, es posible configurar para que estos tableros se abran al ingresar.

Imagen muestra la solapa “My dashboards” los tableros publicos asignado al usuario de soporte.  En la solapa “Public dashboard” los tableros disponibles. 

Imagen muestra cómo un tablero público puede abrirse por defecto a iniciar la sesión en ITOSS.
#### *Creación de un tablero*
Los usuarios de soporte pueden crear su propio tablero con los contenedores de interés para una visión personalizada.

Para crear un tablero, realizar los siguientes pasos:

1. En la sección de “Dashboard”, seleccionar “Add”.

1. Crear un nuevo tablero, presionando el botón “+”.


1. Ingresar información de nombre, etiqueta para el nuevo tablero e indicar que sea un tablero por defecto.  Guarde los cambios con el botón “Save”. 

1. El nuevo tablero estará situado en la última solapa, posicionarse sobre el menú del tablero para agregar los contenedores deseados.


1. Adicionar uno a uno los contenedores que serán parte de nuevo tablero.

1. Editar el tablero para configurar aspectos de visualización del tablero.

#### *Vistas para tablero monitor*
Los tableros muestran información al personal de soporte de todos los componentes, pero existe la posibilidad de crear vistas sobre los tableros de monitor para hacer foco en un servicio, aplicación, ubicación u otro requerimiento visual.

Las vistas son personalizadas por usuario de soporte y configuradas desde el menú del tablero.

Los pasos para crear una nueva vista son:

1. Adicionar una nueva vista al tablero de monitor deseado presionan “+” en el menú del tablero.

1. Configurar el nombre de la vista.

1. Filtrar por componente, compañía, ubicación o grupo de trabajo para obtener la vista deseada.  Cada selección por entidad es excluyente en el filtro.

1. Guardar y cierre la configuración de nueva vista.

1. Editar una vista existente.


### Tablero de compañía
Los tableros de compañía son claves para el usuario o grupo de soporte en un escenario con cientos de éstas, permite acceder rápidamente el estado operativo de los componentes de la compañía en análisis.
#### *Acceso al tablero de compañía*
En el menú de exploración “Explore” hay una sección de compañías y desde allí acceder al tablero de control.

La opción más rápida es buscar por nombre en el margen superior derecho de interfaz de usuario, colocando el nombre de la compañía.

#### *Secciones del tablero de compañía*
El tablero de compañía es configurado por el administrador de ITOSS, contiene 3 secciones/solapas:

- General: tablero inicial con
  - Información de la compañía.
  - Estado de los componentes, con totales generales, por tipo y ambiente.
  - Lista de DE

Imagen de la vista general del tablero de compañía

- Lista de componentes.

`	`Imagen de la lista de componentes en el tablero de compañía.

- DE Overview: información organizada por tipo de componente y perfil de gestión para análisis resumido del comportamiento del ambiente del cliente.

`	`Imagen del análisis de estado y DE de todos los componentes de la compañía agrupados por 	tipo y perfile de gestión.

#### *Reportes y tableros de monitores*
Desde el menú disponible en el tablero de compañías podemos acceder a visualizar o crear tableros de monitores y reportes analíticos.

Los tableros de monitores limitan la información presentada a los componentes de esta compañía, pueden visualizarse los tableros de monitor públicos o crearse tableros a medida con los componentes y contenedores que el usuario de soporte defina.

Los reportes son gestionados por el administrador de ITOSS y están disponibles para ejecutarse por demanda desde la interfaz del cliente.

Imagen con los reportes disponibles para la compañía Lumen


### Tablero de componente
El componente es el último eslabón en el análisis, donde se requiere más profundidad de información y existe más interacción con los usuarios de soporte.  El tablero de componente no solo permite analizar información operativa y de soporte de este, también nos da herramientas para una operación más sencilla y eficiente.
#### *Acceso al tablero de componentes*
Al tablero de componente es posible acceder desde la búsqueda general, en el menú Explore en la sección de “Components” y desde un DE presente en algunos de los otros tableros antes mencionados.

Imagen del explorador de componentes, permite filtrar y acceder al tablero de componente desde el icono con diseño de “ojo”. 


Imagen para acceder al tablero del componente desde la búsqueda rápida en el margen superior derecho de interfaz de usuario.  

Imagen de la lista de DE en un contenedor en el tablero de monitores, permite acceder ágilmente a los componentes con situaciones anormales. 
#### *Secciones del tablero de componente*
El tablero de componentes tiene 3 secciones iniciales y el resto de las sesiones estarán relacionadas al perfil de gestión que tiene asignado el componente.

Las secciones son:

- Componente (Component): 
  - Información general de componente.
  - Componentes relacionados.
  - Estado de los monitores
  - Lista de DE del componente.
- Historial (History): información referida a la gestión de soporte del componente, como ser cambio en el ciclo de vida, notas de usuario y gestión de DE. 
- Bitácora operacional: información referida a tareas de diagnóstico y/o remediación.
##### Sección componente
Es la sección inicial al ingresar al tablero de componente y da información general, de relaciones con otros componentes, DE del componente y estado de los monitores.  

En esta sección se despliega una barra con acciones que permiten agilizar la gestión operativa del componente a los usuarios de soporte.

Barra de acciones permite realizar las siguientes actividades de gestión:

1. Agregar una nota en el componente (visualizada en el historial).

1. Ejecución de monitores (correspondientes al perfil de gestión del componente).  Es factible ejecutar, el monitor de estado, una selección de monitores o todos los monitores.


1. Gestión de ciclo de vida (\*): agendar un mantenimiento. 

1. Gestión de ciclo de vida (\*): colocar el componente fuera de servicio.

1. Ajustes de parámetros de conexión del componente.

1. Reinicio de la gestión (Management reset).  Esta actividad elimina información de estado de componente y todos sus DE, comenzando la gestión desde cero nuevamente.  NO ES RECOMENDABLE realizar esta acción, solo en casos muy puntuales que así lo requieran.

1. Información detalla del perfil de gestión del componente.

1. Estado de la última ejecución de los monitores.


(\*) Las acciones que ejecutan cambios en los ciclos de vida van a variar en la barra según el estado de que se encuentre, este es el caso de un componente en estado operativo.

Los tipos de componentes que tengan definidos herramientas suman una acción a la barra.

1. Tool.  Herramientas de diagnóstico y remediación a ejecutarse en el componente por demanda.

##### Sección historial (history)
Es una bitácora que registra actividades de gestión operativa por parte de los usuarios de soporte, como ser cambios en el ciclo de vida, notas del usuario, gestión de DE, entre otras.   El historial no es reciclado en el tiempo. 

##### Sección bitácora operacional (Operational log)
Es una bitácora para registrar información de diagnóstico y/o remedición.
##### Otras secciones
Según el perfil de gestión asociado al componente, es la información disponible que se tiene, por este motivo las otras secciones se ajustan al perfil. 

Generalmente en otras sesiones se muestran datos referidos a rendimiento, almacenamiento, configuración para tener un análisis total de las métricas claves del componente. Algunos ejemplos.





## Gestión de DE y notificaciones
La gestión de DE y notificaciones es clave para una eficiente operación del componente, mejorando la disponibilidad y calidad de los servicios informáticos.
### Gestión de DE
Los DE pueden visualizarse en los tableros operativos y en el visor de DE en el menú Operativo.



Imagen del “Dashboard entry viewer” que permite explorar los DE de todos los componentes.

El usuario de soporte puede “atender” un DE con el objetivo indicar que se esta trabajando o informado sobre la situación.  

`	`Imagen que resalta el icono que permite “atender” un DE.
### Gestión de notificaciones
Las notificaciones son direccionadas a los usuarios de soporte por situaciones consideras urgentes, pueden eliminarse (tiene efecto solo para el usuario de soporte conectado) de manera individual o general. 

El icono de estilo “campana” en el margen superior derecho indica la cantidad de notificaciones y es el acceso al listado de notificaciones.

Imagen que muestra el icono para acceso a las notificaciones en ITOSS.

`	`Imagen muestra el icono para eliminar de manera puntual y general.

Desde una notificación puede acceder a al tablero de componente, es muy útil para validar la situación actual del componente de manera ágil. 

En el menú de preferencias pueden ajustarse la recepción o no de notificaciones, la posibilidad accionar un sonido cuando arriba una notificación.


## Gestión del ciclo de vida del componente
En el menú de operaciones esta la sección para gestionar el ciclo de vida de los componentes (Component life cycle), desde este sitio es posible realizar cambios de estado masivo, probar estado y monitores.   

## Reportes
En la sección de “Report” del menú “Explore” están los reportes por demanda de ITOSS, los cuales son armados y publicados por los administradores de la aplicación.

Los reportes están agrupados por tipo de componente y permiten genera información de todo el ambiente, por cliente o ubicación.



27

