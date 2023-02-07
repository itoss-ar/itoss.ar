---
id: 'concepts'
title: 'Concepts'

---
# **The Challenge of IT Operations**
Currently, and for several years, the trend is for the operation and management of computer systems to be outsourced to companies dedicated to offering these services, typically data centers or other large companies in the IT sector. This situation creates a challenge for these companies with hundreds of clients, multiple operations centers, and a constantly changing scenario due to new projects and technologies.

ITOSS is an application that aims to support IT operations for the scenario mentioned above, focusing on the clients and automation of operational processes, seeking an evolution of current methodologies for operating large computer environments.

# **Modeling Operational Management**
ITOSS is a work platform where IT support teams model and implement the operational management of different technologies in a simple and flexible manner, providing a quick visualization of the status and metrics of the managed environment to the operation centers.

To start, it is important to understand the concepts on which we build the automation of operational activities, initially the IT component object of management.

## **IT Component**
An IT component (hereafter referred to as a "component") in ITOSS represents a managed entity on which metrics are collected, results are processed, and operational actions are triggered according to the applicable rule. It is the object managed by operations and is often directly related to the business service.

Components are grouped into "component types" that refer to a particular technology.

### Component Types
Typically, component types are related to IT knowledge niches and their hierarchical structure is linked to this. Broadly speaking, component types refer to a particular technology where the operational metrics of interest are the same and obtained from the same source.

As an example of a hierarchical grouping of component types, we can list the type structure for databases:

- Database
  - Oracle
  - MS SQL Server
  - HANA
  - Postgres
  - MySQL

These types of components have owner-provided interfaces for their management, these interfaces in ITOSS are called instrumentations, through which automated management is done.

## **Instrumentations**
An instrumentation in ITOSS is the interface that allows access to IT component management data, a component can use more than one instrumentation for management.

ITOSS provides a set of instrumentations for modern management of most technologies, these are:

- SSH: default interface/protocol for Linux and Unix systems management, but also widely present in network devices.
- PowerShell: Microsoft's choice for managing its application and operating system ecosystem. Other companies use this instrumentation, such as VmWare, which uses PowerShell as a management and automation tool through its powercli package for PWSH.
- JDBC: the interface for relational database management.
- SAP RFC: SAP's proprietary interface for SAP management, several instrumentations are available in ITOSS for SAP.
  - RFCFUNCTION: invokes a SAP function.
  - RFCSTATUS: validates SAP's state level status.
  - RFCREADTABLE: queries a SAP table.
- REST API: relatively modern interface, present in many applications and new technologies today.
- TCP: basic interface that validates if a component is reachable by the network on a specific port.
- ICMP: basic interface that validates if a component is reachable by the network.
- EXEC: execution of a program that uses other interfaces not natively provided in ITOSS, thus extending management reach to any component.
The instrumentations (with the exception of the basics) support running programs or queries on components to obtain the metrics of interest.

## **Metrics**
Metrics or indicators are data of interest about the operational management (although its use can be extended) of a technology type, the data is internally mapped in ITOSS into fields, then processed in monitors. We obtain the metrics through programs (scripts), SQL queries or other mechanisms that support the instrumentations assigned to the component type, which provides data categorized into state, configuration, performance, availability, quality, storage, etc.

### State Metric
There is a metric that is particularly important within ITOSS because it establishes the operational status of a component (UP or DOWN) and is called the status metric.

The status metric allows us to infer two situations related to the external monitoring of components, which are:

Metric fault: in the case of metrics that are not of state, there is a failure when consulting the metric, and the component's status indicates "UP", the situation is referred to as "metric fault". This type of situation, if it persists over time, is a problem to be resolved for proper management.
Secondary fault: in the case of metrics that are not of state, there is a failure when consulting the metric, and the component's status indicates "DOWN", the situation is referred to as "secondary fault". This type of situation is not of operational interest.

### Field Mapping
The information resulting from a metric is assigned to fields within ITOSS for later processing, storage, and visualization. In many cases within a metric there are more than one instance, for identification within ITOSS these fields are called Tags, and Fields the fields that show values.

## **Monitors**
The operational logic of a metric is defined in the monitors, where the collection frequency and operational rules are defined. These are composed of conditions and actions associated with them.

The execution of the monitors on the components generates a status that indicates whether or not I can collect the metric. The possible states are:

- OK: the monitor was able to obtain the metric.
- FAULT: the monitor could not obtain the metric due to problems with the source or data mapping.
- SECONDARY FAULT: the monitor cannot obtain the metric because the component is not accessible.

A set of monitors of the same component type grouped for the purpose of carrying out operational management is called in ITOSS a management profile.

## **Management profiles**
Management profiles are a set of monitors that are used to define the type of operational management that will be assigned to a component and how a component is managed. The profiles are defined by component type and are focused on operational and business needs.

# **Technology Operation with ITOSS**
Operational management of technology in ITOSS allows us to view information from different angles in boards that are oriented to the needs of support centers. There are several views or boards in ITOSS (Dashboard) to achieve general and specific approaches to managed components.

## **Operational Dashboards**
A widely-used concept nowadays are dashboards aimed at visualizing key metrics of a particular theme.

In ITOSS, these dashboards have operational purposes and go beyond simple visualization, allowing interaction with them. There are different approaches to operational dashboards according to the object to be analyzed, these are:

- General Status Dashboard: provides an overall view of all managed components. The status is given by the status metric that defines the UP or DOWN state of the component. The status dashboards can be grouped by clients, location, and component type.
- Monitor Dashboards: Monitor dashboards are composed of containers that are fed by dashboard entries (DE). Each container reflects the result of the analysis of a metric for all components that apply to a monitor. There are public monitor-type dashboards that are available to all users and owners (which are customized by the user). They give the user a general overview of the entire managed environment, with the possibility of creating views for a particular focus.
- Company Dashboards: Company dashboards provide a view oriented to a particular client where information related to the status and monitors of all components of the company being analyzed is displayed.
- Component Dashboards: Component dashboards provide support information and allow the support user to interact with the component.
- Containers: ITOSS containers provide us with information on the analysis of a monitor, showing the number of components with a particular state or situations with problems. There are two types of containers today:
1. Semaphore: shows the number of components in GREEN, YELLOW, or RED state. These states represent a level of criticality in the analysis of the metric, and not all states are always required, which will depend on the operational logic to be applied. In general, RED is used in serious situations, YELLOW in those that require attention and/or preventive actions, and GREEN for normal situations.
2. Issues: shows the number of exceptions or problems found when analyzing a metric.

Containers are fed by dashboard entries (known as Dashboard entries) that are triggered by the actions of the monitors to populate the operational dashboards.

The relationship between the container and monitor is one-to-one, that is, for each monitor, there is a container that represents the state of the components that that monitor manages.

## **Dashboard Entries (DE)**
Dashboard entries (referred to as DE for short) are triggered by the actions of the monitors to indicate a state of situation related to the analysis of a metric.

At first sight, they are similar to events, but with the difference that these always reflect the last analyzed state of the collected metrics and are maintained over time until the situation changes to another level. They cannot be recognized or deleted.

### Attending a DE
In case of known situations or those that are being worked on, the DE can be "attended to," which causes the DE to change color in the user interface and register the interaction in the history. This way, all support personnel responsible for that component can know the working status of a DE.
### Information of a DE
The information contained in a DE is as follows:

- Severity level: indicates the level of seriousness of the situation for a particular metric in a component. According to the type of container where the DEs are reflected, the levels are:
  - RED
  - YELLOW
  - GREEN
  - ISSUE
- Score: indicates the priority of the DE considering company, monitor, and component aspects.
- Last update date: indicates the date and time of the last DE update.
- Creation date: indicates the date and time of DE creation.
- Monitor: name of the triggering monitor of the DE.
- Category: is the DE classification inherited from the metric and related to an operational scope in analysis.
- Rule: is the operational rule that was applied during the metric analysis by the monitor for a component.
DEs provide an up-to-date and complete view of all key metrics in the operational management of a component.
## **Notifications**
ITOSS provides a notification system to inform of urgent operational situations, such as the detection of component failures.
Notifications are managed by each support user from the user interface, giving the possibility to generate a sound in front of a new notification. Notifications can be generated by a change in the state of a component, in response to a network problem detection, or as an action of a monitor.
## **Life Cycle Management**
From the deployment of a new component to its removal, there are changes in the operating mode related to operational requirements, this is what we call the life cycle.

In ITOSS, a component can be in one of the following life cycle states:

- DELIVERY: this is the initial state of a component in ITOSS, it is a state that the component automatically acquires when loaded into the application. In this state, there is no management by ITOSS.
- OPERATION: in operational state, a component is managed according to the profile assigned to it, only this state shows updated information on ITOSS dashboards and the operational state of the component (UP or DOWN).
- OUT OF SERVICE: during the out of service state, the component is not managed by ITOSS. This state is managed on demand by support users. In this mode, the operational state of the component is UNKNOWN.
- MAINTENANCE: during the maintenance state, the component is not managed by ITOSS. Unlike the out of service state, a start and end time of the maintenance must be defined. In this mode, the operational state of the component is UNKNOWN.
- END OF SERVICE: ends the management of the component. This state has no turning back.
All state changes are recorded in the component's history with information about the date, acquired state, user, and comments (optional).

# **Other Actors in ITOSS**
For a complete and related view of all actors that are part of IT Support Management, they are represented as entities in ITOSS. The other actors are the people who interact in IT support, workgroups, and contracting companies with their contacts.

## **Support User**
The IT support, service management, and operation personnel are the main users of ITOSS, where they analyze the operational information of the environment under their management.

Within ITOSS, users could have the following roles:

- Delivery
- Operation
- Service Manager
- Manager
- Operational Design
- Administrator
  
The roles may vary depending on the operational structures, size, or organization, which can be adapted by creating roles tailored to each scenario.

Support users may belong to more than one workgroup and have components assigned to their responsibility.

## **Workgroup**
IT support organizations generally form groups of people to attend to a theme, support level, or technology in particular. Classic cases are database groups, operation groups, operating system groups, among many others.

Workgroups in ITOSS are always assigned one-to-one to components, giving a framework of responsibility over it, and the workgroups are composed of ITOSS support users.

## **Companies**
Companies in ITOSS identify internal and external organizations that own a set of components and service providers.

A component must always belong to a company in ITOSS in order to be managed. Companies are also assigned to support users and contacts.

## **Contact**
For the case of external companies, which in most cases are client companies that contract the support service, we have people who are not ITOSS users but require being notified of incidents and access the company portal. This person in ITOSS is a contact.

In ITOSS, a contact can be assigned one-to-one to a component in order to receive notifications and access the portal.
