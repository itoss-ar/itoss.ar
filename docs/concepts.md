---
slug: /concepts
sidebar_position: 1
title: Concepts
---
## The Challenge of IT Operations

For several years now, there has been a clear trend toward outsourcing the operation and management of IT systems to specialized service providers, such as data centers and large IT companies. This shift poses significant challenges for these providers, which must handle hundreds of clients, operate across multiple service centers, and adapt to an ever-changing landscape driven by new projects and emerging technologies.

ITOSS is an application designed to support IT operations in this context. It focuses on client-centric management and the automation of operational processes, aiming to evolve current methodologies for managing large-scale IT environments.
## Modeling Operational Management

ITOSS is a platform that enables IT support teams to model and implement the operational management of various technologies in a simple and flexible way. It provides operations centers with rapid visibility into the status and key metrics of the managed environment.  

To begin, it is essential to understand the core concepts used to build the automation of operational activities, starting with the component—the primary object of management.
### Component

A component in ITOSS represents a managed entity from which metrics are collected, results are processed, and operational actions are triggered according to defined rules. It is the fundamental object managed by operations and is often directly associated with a business service or shared infrastructure.

Components are organized into "component types", each representing a specific technology or product.
#### Component Types
Component types are typically associated with specific areas of IT expertise, and their hierarchical structure often reflects this specialization. In general, a component type represents a particular technology in which the relevant operational metrics are consistent and collected from the same source.
As an example of a hierarchical organization of component types, consider the following structure for databases:

- Database
	- Oracle
	- MS SQL Server
	- SAP HANA
	- PostgreSQL

These types of components provide vendor-specific management interfaces. In ITOSS, these interfaces are referred to as "instrumentations", through which automated management and operations are performed.
### Instrumentations

An instrumentation in ITOSS is the interface that provides access to the management data of an IT component. A component may use one or more instrumentations for its operation and management.  
ITOSS provides a set of instrumentations that enable modern management across a wide range of technologies, including:

- SSH: The standard protocol for managing Linux and Unix systems, also commonly used in network devices.
- JDBC: A standard interface for interacting with relational databases.
- SAP RFC: SAP’s proprietary interface for system management. ITOSS includes several SAP-specific instrumentations:
	- RFCFUNCTION: Executes a SAP function.
	- RFCSTATUS: Checks the system-level status of SAP.
	- RFCREADTABLE: Retrieves data from a SAP table.
- REST API: A modern and widely adopted interface, commonly available in many applications and services.
- TCP: A basic interface used to verify whether a component is reachable on a specific network port.
- ICMP: A basic interface used to verify network reachability.
- EXEC: Executes external programs, enabling integration with interfaces not natively supported by ITOSS and extending management capabilities to virtually any component.

Except for basic connectivity checks (such as TCP and ICMP), instrumentations support executing commands, queries, or programs on components to collect the required operational metrics.
### Metrics

Metrics (or indicators) represent data points of interest for the operational management of a given technology, although their use can be extended to other purposes. In ITOSS, metric data is internally mapped into fields and subsequently processed by monitors.
  
Metrics are obtained through programs (scripts), SQL queries, or other mechanisms supported by the instrumentations assigned to a component type. The collected data is typically categorized into areas such as state, configuration, performance, availability, quality, and storage.
#### Status Metric

The status metric is a fundamental concept within ITOSS, as it determines the operational state of a component (UP or DOWN). It is defined using specific categories, typically *status* or *availability*.  

The status metric enables the identification of two key situations related to external monitoring:

- **Metric fault**: Occurs when a non-status metric fails to be collected while the component status is **UP**. If this condition persists over time, it indicates an issue that should be addressed to ensure proper monitoring and management.  

- **Secondary fault**: Occurs when a non-status metric fails to be collected while the component status is **DOWN**. This situation is considered a consequence of the component being unavailable and is generally not relevant for operational analysis.
#### Field Mapping

The data resulting from a metric is mapped to fields within ITOSS for further processing, storage, and visualization.
In cases where a metric produces multiple instances, ITOSS differentiates between:

- **Tags**: Fields used for identification and grouping of metric instances.

- **Fields**: Fields that store the actual measured values.
### Monitors

Monitors define the operational logic associated with metrics. They specify the collection frequency and the rules that govern metric evaluation. Each monitor consists of a set of conditions and the actions triggered when those conditions are met.  

When executed on components, monitors produce a status indicating whether the metric could be successfully collected. The possible states are:

- OK: The monitor successfully collected the metric.

- FAULT: The monitor failed to collect the metric due to issues with the data source or mapping.

- SECONDARY FAULT: The monitor could not collect the metric because the component is not accessible.

A group of monitors associated with the same component type and organized for operational management purposes is referred to in ITOSS as a "management profile".
### Management Profiles

Management profiles are collections of monitors that define how a component is managed and the type of operational management applied to it.

Profiles are defined at the component type level and are designed to address both operational and business requirements. They determine which monitors are enabled, how frequently metrics are collected, and which rules govern the evaluation and response to those metrics.
### Commands

In ITOSS, commands are executable actions designed to perform diagnostic, corrective, and monitoring operations on managed components. Their availability, behavior, and execution context are determined by the specific component type to which they are associated.  

Commands can be initiated manually by support users (on-demand) to support operational tasks, troubleshooting, or validation activities. In addition, they can be triggered automatically as part of a monitoring rule action when predefined conditions are met, or executed through scheduled tasks to support recurring operational checks and maintenance routines.

When commands are executed by monitoring processes, they generate structured entries in the operational log. These records capture a snapshot of the system state at the exact moment an exception condition is detected, providing valuable context for analysis, traceability, and incident investigation.

This capability ensures that commands not only act as operational tools but also as key mechanisms for observability, enabling teams to correlate events, diagnose issues more efficiently, and maintain a reliable audit trail of system behavior.

### Jobs

To support repetitive or large-scale operational tasks on managed components, ITOSS provides a Job Scheduler module.

This module enables the definition and execution of scheduled tasks within environments managed by ITOSS. Jobs can be configured to run against a specific list of components or dynamically applied based on management profiles, allowing for flexible and scalable task execution.

Jobs are typically used to automate routine operational activities such as maintenance procedures, validation checks, data collection, backups, or bulk actions across multiple components. By centralizing scheduling and execution, the module helps ensure consistency, reduce manual effort, and minimize the risk of human error.

Additionally, the Job Scheduler provides control over execution timing, frequency, and scope, enabling teams to align automated tasks with operational requirements and service windows.

The use of jobs enhances operational efficiency and supports standardized processes, contributing to improved reliability, traceability, and overall system governance within ITOSS-managed environments.
### External Links

External Links allow users to establish direct connections from the ITOSS interface component dashboard to relevant external resources. These links facilitate quick access to complementary systems and tools without leaving the platform.  

Typical use cases include access to management systems, third-party business applications, operational platforms, or any other web-based resource associated with the managed component.

By integrating external links into the dashboard, ITOSS enhances user efficiency, improves navigation workflows, and centralizes access to critical information across the organization.

## Technology Operation with ITOSS

Technology operations in ITOSS enable information to be visualized from multiple perspectives through dashboards tailored to the needs of support and operations teams.

ITOSS provides a variety of dashboards that support both high-level overviews and detailed analysis of managed components, allowing users to address operational requirements at different levels of granularity.
### Operational Dashboards
A widely-used concept nowadays are dashboards aimed at visualizing key metrics of a particular theme.

In ITOSS, these dashboards have operational purposes and go beyond simple visualization, allowing interaction with them. There are different approaches to operational dashboards according to the object to be analyzed, these are:

- General Status Dashboard: provides an overall view of all managed components. The status is given by the status metric that defines the UP or DOWN state of the component. The status dashboards can be grouped by clients, location, and component type.
- Monitor Dashboards: Monitor dashboards are composed of containers that are fed by dashboard entries (DE). Each container reflects the result of the analysis of a metric for all components that apply to a monitor. There are public monitor-type dashboards that are available to all users and owners (which are customized by the user). They give the user a general overview of the entire managed environment, with the possibility of creating views for a particular focus.
	- Containers: ITOSS containers provide us with information on the analysis of a monitor, showing the number of components with a particular state or situations with problems. There are two types of containers today:
		1. Semaphore: shows the number of components in GREEN, YELLOW, or RED state. These states represent a level of criticality in the analysis of the metric, and not all states are always required, which will depend on the operational logic to be applied. In general, RED is used in serious situations, YELLOW in those that require attention and/or preventive actions, and GREEN for normal situations.
		2. Issues: shows the number of exceptions or problems found when analyzing a metric.

		Containers are fed by dashboard entries (known as Dashboard entries) that are triggered by the actions of the monitors to populate the operational dashboards. The relationship between the container and monitor is one-to-one, that is, for each monitor, there is a container that represents the state of the components that that monitor manages.
		
- Company Dashboards: Company dashboards provide a view oriented to a particular client where information related to the status and monitors of all components of the company being analyzed is displayed.

- Component Dashboards: Component dashboards provide support information and allow the support user to interact with the component.

### Dashboard Entries (DE)

Dashboard entries (referred to as DEs) are generated by monitor actions to represent the state of a situation resulting from the analysis of a metric.  

At first glance, they may appear similar to events; however, DEs differ in that they always reflect the most recently evaluated state of a metric. They persist over time until the situation changes and a new state is recorded.

Unlike events, dashboard entries cannot be acknowledged or deleted, as they are intended to represent the current operational state of the monitored components.

#### Attending a DE

For known situations or those currently being addressed, a dashboard entry (DE) can be "attended". Attending a DE changes its visual representation in the user interface (e.g., color) and records the interaction in the history.

This allows all support personnel responsible for the component to be aware of the current handling status of the situation.

#### DE Information

A dashboard entry (DE) contains the following information:

- **Severity level**: Indicates the level of criticality of the situation for a specific metric on a component. Depending on the container type in which the DE is displayed, the levels may include:

	  - **RED**

	  - **YELLOW**

	  - **GREEN**

	  - **ISSUE**

- **Priority**: Represents the relative importance of the DE, considering factors such as the company, metric and component.

- **Last update date**: The date and time when the DE was last updated.

- **Creation date**: The date and time when the DE was created.

- **Monitor**: The name of the monitor that generated the DE.

- **Category**: The classification inherited from the metric, associated with a specific operational domain or area of analysis.

- **Rule**: The operational rule applied by the monitor during the metric evaluation for the component.

DEs provide an up-to-date and comprehensive view of key metrics involved in the operational management of a component.
### Notifications

ITOSS provides a notification system to alert users to urgent operational situations, such as the detection of component failures.

Notifications are managed individually by each support user through the user interface, with options such as enabling sound alerts for new notifications.

Notifications can be triggered by:

- Changes in a component’s status

- Detection of network-related issues

- Actions executed by monitors
### Life Cycle Management

From the deployment of a new component to its eventual retirement, operational requirements may change over time. This evolution is referred to as the component life cycle.

In ITOSS, a component can be in one of the following life cycle states:

- **DELIVERY**: The initial state of a component in ITOSS. This state is automatically assigned when the component is created in the system. No operational management is performed in this state.

- **OPERATION**: In this state, the component is actively managed according to its assigned management profile. Only components in this state provide updated information in ITOSS dashboards, including their operational status (UP or DOWN).

- **OUT OF SERVICE**: In this state, the component is not managed by ITOSS. It is manually set by support users. The operational status of the component is considered **UNKNOWN**.  

- **MAINTENANCE**: In this state, the component is temporarily excluded from management activities. Unlike the *Out of Service* state, a defined start and end time is required. The operational status of the component is also **UNKNOWN**.

- **END OF SERVICE**: This state marks the permanent removal of the component from operational management. Once applied, this state is irreversible.

All state transitions are recorded in the component’s history, including the date, the new state, the user responsible for the change, and optional comments.
## Other Actors in ITOSS

To provide a comprehensive and integrated view of all participants involved in IT support management, ITOSS represents them as entities within the system. These actors include support personnel, workgroups, and companies, along with their associated contacts.
### Support User

IT support, service management, and operations personnel are the primary users of ITOSS. They are responsible for analyzing and managing the operational information of the environments under their responsibility.

Within ITOSS, users can be assigned one or more roles, such as:  

- Delivery

- Operation

- Service Manager

- Manager

- Operational Design

- Administrator

Roles may vary depending on the organizational structure, size, or operational model, and can be customized to fit specific scenarios.

Support users may belong to multiple workgroups and can be assigned responsibility for one or more components.
### Workgroup

IT support organizations typically form teams focused on specific areas such as technologies, support levels, or operational domains. Common examples include database teams, operations teams, and operating system teams.

In ITOSS, each component is assigned to a single workgroup, establishing a clear ownership and responsibility model. Workgroups are composed of ITOSS support users.
### Companies

Companies in ITOSS represent both internal and external organizations that own or are associated with a set of components and service providers.

Each component must be associated with a company in order to be managed within ITOSS. Companies are also linked to support users and contacts.
### Contact

For external organizations (typically client companies that consume support services), there are individuals who are not ITOSS users but still need to receive notifications and access the company portal. These individuals are defined as contacts in ITOSS.  

A contact can be assigned to specific components, enabling them to receive notifications and access relevant information through the portal.
