# Companies, Workgroups, and Contacts

## Overview

Companies, Workgroups, and Contacts are foundational organizational entities within ITOSS. They provide the business and operational context required to organize managed components, assign responsibilities, establish ownership relationships, and support operational management processes.

These entities enable support users to understand who owns a service, which teams are responsible for its operation, and which stakeholders should be involved during incident management and operational activities.

## Purpose

The organizational model supports several operational objectives:

- Associate managed components with customers, business units, or internal organizations.
- Define operational ownership and responsibility.
- Organize support teams.
- Identify customer stakeholders and service owners.
- Facilitate incident escalation and communication.
- Provide business context for operational monitoring.

---

# Companies

## Overview

A Company represents an organizational entity within ITOSS. Companies are used to group managed components according to ownership, customer relationships, business units, subsidiaries, or other organizational structures.

The company model provides the foundation for customer-centric operational views, reporting, service ownership, and operational accountability.

## Business Context

Companies help support users answer questions such as:

- Which customer is affected by an operational issue?
- Which business unit owns a service?
- Which components belong to a specific organization?
- How is infrastructure distributed across customers?

## Company Types

Organizations may classify companies according to their operational model.

Examples include:

- Customers
- Internal organizations
- Business units
- Service providers
- Partners

## Company Information

A company record typically contains business-related information, including:

- Company name
- Location
- Organizational classification
- Additional descriptive attributes

### Required Information

The following information is mandatory when defining a company:

- Name
- Location

## Operational Benefits

Companies provide the organizational structure required for:

- Customer-oriented dashboards.
- Service reporting.
- Infrastructure organization.
- Operational visibility.
- Responsibility assignment.
- Business service management.

---

# Workgroups

## Overview

Workgroups represent support teams and operational groups responsible for managing monitored services and infrastructure.

They provide the organizational structure used to assign ownership and responsibility for operational activities within ITOSS.

## Purpose

Workgroups define who is responsible for operating, maintaining, and supporting managed components.

Examples include:

- Database Administration Team
- Linux Support Team
- Network Operations Team
- Application Support Team
- Cloud Operations Team

## Operational Responsibilities

When associated with managed components, workgroups provide:

- Ownership assignment.
- Operational accountability.
- Escalation routing.
- Team-based management.
- Responsibility tracking.

## Relationship with Managed Components

A workgroup can be associated with one or more managed components.

Through this relationship, support users can:

- Identify the responsible support team.
- Understand operational ownership.
- Locate the appropriate escalation path.
- Review operational responsibilities.

## Operational Benefits

Workgroups help organizations:

- Establish support ownership.
- Improve operational governance.
- Coordinate support activities.
- Organize operational responsibilities.
- Streamline incident management processes.

---

# Contacts

## Overview

Contacts represent individuals or groups associated with managed services and components. They serve as the connection between operational services and the people responsible for, or impacted by, those services.

In many cases, contacts represent customer stakeholders, service owners, business representatives, or other relevant participants involved in service operation and support.

## Purpose

Contacts provide a mechanism for linking people and organizational stakeholders to monitored services and infrastructure.

This relationship is particularly important during:

- Incident management.
- Escalation processes.
- Service communications.
- Operational reviews.
- Customer support activities.

## Contact Relationships

Contacts can be associated directly or indirectly with managed components and services.

These associations help support users identify:

- Service owners.
- Customer representatives.
- Responsible stakeholders.
- Business contacts.
- Operational points of contact.

## Operational Benefits

Contacts help support teams:

- Identify the appropriate stakeholders.
- Improve communication during incidents.
- Facilitate escalation procedures.
- Maintain service ownership information.
- Support customer relationship management.

---

# Organizational Relationships

The relationship between Companies, Workgroups, and Contacts provides the organizational framework used throughout ITOSS.

### Company

Represents the organization, customer, or business entity that owns or consumes the service.

### Workgroup

Represents the team responsible for supporting, operating, or maintaining the service.

### Contact

Represents the person or stakeholder associated with the service from a business or operational perspective.

### Managed Component

Represents the technical element being monitored and managed by ITOSS.

## Example Relationship Model

```text
Company
├── Business Service
├── Managed Component
├── Workgroup (Support Team)
└── Contact (Service Owner)
```

This model provides both the business context and operational ownership required for effective service management and incident resolution.

---

# Typical Use Cases

## Incident Investigation

When an operational issue is detected, support users can:

- Identify the affected company.
- Determine the responsible workgroup.
- Locate the appropriate contact or stakeholder.
- Coordinate response activities.

## Service Ownership Review

Support personnel can verify:

- Which organization owns a service.
- Which team supports the service.
- Which stakeholders should be informed of operational events.

## Customer-Centric Operations

Companies, contacts, and workgroups enable support users to view operational information from a business perspective rather than only from a technical infrastructure perspective.

---

# Operational Considerations

- Companies provide the organizational and business context for managed services.
- Workgroups define operational ownership and responsibility.
- Contacts identify business and customer stakeholders.
- Associations between these entities support incident management, escalation, reporting, and operational governance.
- These entities are referenced throughout dashboards, reports, managed components, and service management processes.

## Related Features

- Company Dashboard
- Component Dashboard
- Managed Components
- Operational Dashboards
- Service Management
- Tickets
- Reports
- Notifications