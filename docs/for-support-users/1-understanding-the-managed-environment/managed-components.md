# Managed Components

## Overview

Managed Components are the core operational entities within ITOSS. They represent the infrastructure, platforms, applications, services, databases, network devices, and other technology assets that are monitored and managed by the platform.

All operational information displayed in dashboards, reports, events, metrics, notifications, and service views originates from managed components and their associated monitoring processes.

## Purpose

Managed components provide the foundation for operational visibility across the monitored environment. They allow support users to:

- Monitor the health of technology assets.
- Collect operational metrics.
- Analyze performance and availability.
- Investigate incidents.
- Associate technical assets with business entities.
- Establish operational ownership and responsibility.
- Support service-oriented operational management.

---

# Component Types

Each managed component belongs to a specific component type that defines its operational characteristics and management capabilities.

Component types determine:

- Available connection methods.
- Monitoring capabilities.
- Supported metrics.
- Configuration information.
- Operational management profiles.

## Examples

Typical component types may include:

- Linux hosts
- Windows servers
- Databases
- Network devices
- Applications
- Cloud services
- Containers
- Kubernetes resources

Depending on the selected type, ITOSS automatically adapts the information required to communicate with and manage the component.

---

# Component Information Model

A managed component combines technical, organizational, and operational information into a single management entity.

## Basic Information

Every component contains a set of fundamental attributes used to identify and classify the asset.

Typical attributes include:

- Component name
- Component type
- Environment
- Integration identifier
- Administrative information

### Environment

The environment identifies the operational context where a component exists.

Examples include:

- Production
- Test
- Development
- Quality Assurance

Environment classification helps support users focus on the operational scope relevant to their responsibilities.

---

# Connectivity Information

Managed components contain the information required by collectors and monitors to establish communication and obtain operational data.

Connection parameters vary depending on the component type and supported management protocols.

## Example Connectivity Attributes

For infrastructure components, connectivity information may include:

- Hostname
- IP address
- Port numbers
- User credentials
- Protocol-specific attributes

Examples of supported communication methods include:

- ICMP
- SSH
- SNMP
- HTTP/HTTPS
- Database protocols
- Vendor-specific interfaces

This information enables monitoring components to collect metrics, configuration data, and operational status from the managed asset.

---

# Organizational Relationships

Managed components are linked to organizational entities that provide business and operational context.

These relationships allow support users to understand who owns a component, which team supports it, and which business entities depend on it.

## Tenants

Tenants are used to control visibility and access to managed components.

Tenant assignments determine:

- Which users can access the component.
- Visibility boundaries.
- Organizational segmentation.

## Company

Each component can be associated with a company representing the customer, business unit, or organization that owns or consumes the service.

This relationship enables customer-oriented operational views and reporting.

## Location

Locations provide geographic or logical context for managed components.

Examples include:

- Data centers
- Office locations
- Sites
- Cloud regions
- Facilities

Location information supports operational analysis and incident investigation activities.

## Contacts

Contacts represent customer stakeholders, service owners, or business representatives associated with the component.

These relationships facilitate communication and escalation processes during incident management activities.

## Workgroups

Workgroups define the operational teams responsible for supporting and maintaining the component.

They provide:

- Ownership assignment.
- Operational accountability.
- Escalation paths.
- Service responsibility information.

---

# Operational Management

## Management Profile

Each component is associated with a Management Profile.

The Management Profile defines:

- Applicable monitors.
- Operational rules.
- Metric collection scope.
- Monitoring behavior.
- Management capabilities.

The profile determines how ITOSS manages and evaluates the component throughout its operational lifecycle.

## Collector

Components are associated with a Collector responsible for obtaining metrics, status information, and configuration data.

Collectors act as the operational bridge between ITOSS and the monitored environment.

---

# Component Lifecycle

Managed components follow a lifecycle model that controls their progression into operational management.

## Delivery

Newly created components initially enter the **Delivery** stage.

During this phase, the component is available for validation and preparation before becoming part of the active operational environment.

### Typical Activities

- Review configuration information.
- Validate connectivity.
- Verify monitoring configuration.
- Confirm operational ownership.

## Operations

Components move to the **Operations** stage after validation activities have been completed successfully.

Components in this lifecycle stage participate fully in operational monitoring and management processes.

### Typical Activities

- Monitor execution.
- Metric collection.
- Event generation.
- Dashboard entry creation.
- Operational reporting.

---

# Monitoring Validation

Before entering operational management, monitoring validation can be performed to confirm that assigned monitors are functioning correctly.

Validation activities may include:

- Connectivity verification.
- Monitor execution testing.
- Data collection review.
- Status validation.

Successful validation helps ensure reliable operational visibility once the component is promoted to production monitoring.

---

# Relationship Model

The following conceptual model illustrates how a managed component connects technical, operational, and business information.

```text
Managed Component
│
├── Component Type
├── Environment
├── Connectivity Information
├── Management Profile
├── Collector
│
├── Company
├── Location
├── Contact
├── Workgroup
└── Tenant
```

This model enables ITOSS to provide both technical monitoring and business-oriented operational management.

---

# Typical Use Cases

## Infrastructure Monitoring

Support users can monitor servers, databases, network devices, and applications through managed components.

## Incident Investigation

Operational teams can identify ownership, location, relationships, and monitoring information associated with a component during troubleshooting activities.

## Service Management

Managed components provide the foundation for business service mapping, operational dashboards, and customer-oriented reporting.

## Monitoring Governance

Management profiles and collectors allow organizations to standardize monitoring practices across large operational environments.

---

# Operational Considerations

- Managed components are the primary operational entities within ITOSS.
- All monitoring, metrics, events, and dashboards are associated with managed components.
- Organizational relationships provide business and ownership context.
- Management Profiles define how components are monitored.
- Collectors provide access to operational data sources.
- Lifecycle stages support controlled onboarding into operational management.
- Monitoring validation reduces the risk of incomplete operational visibility.

## Related Features

- Component Dashboard
- Company Dashboard
- Operational Dashboards
- Management Profiles
- Collectors
- Monitoring
- Metrics
- Events
- Companies, Workgroups, and Contacts
- Reports