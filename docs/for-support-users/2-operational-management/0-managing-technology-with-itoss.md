# Managing Technology with ITOSS Dashboards

## Overview

Operational management in ITOSS is centered around Dashboard Entries and the dashboards that organize, prioritize, and present them to support teams.

Rather than focusing exclusively on the technical status of monitored metrics, ITOSS transforms monitoring results into operational situations that can be analyzed and managed through a structured workflow.

## Operational Dashboard Model

Operational Dashboards are composed of containers that summarize the current state of managed services and infrastructure.

Containers provide a visual representation of operational situations and help operators rapidly identify areas requiring attention. Depending on their purpose, containers may be displayed as:

- Semaphore indicators
- Issue containers
- Operational counters

## Dashboard Scope

Each dashboard is defined by a collection of containers representing a specific operational domain.

Dashboard scopes can be organized according to:

- Technologies
- Customers
- Business services
- Operational teams
- Infrastructure domains

This flexibility allows organizations to create dashboards aligned with their operational management model.

## Dashboard Entries

Dashboard Entries are the central operational object within ITOSS.

A Dashboard Entry represents an operational situation generated through monitoring logic and management rules.

Dashboard Entries provide the link between:

```text
Managed Component
↓
Monitor
↓
Metric Evaluation
↓
Dashboard Entry
↓
Operational Dashboard
```

Dashboard containers are fed by Dashboard Entries, allowing operators to understand the current operational condition of the monitored environment.

## Dashboard Entry Views

Dashboard Entries can be visualized through:

- Dashboard Containers
- Dashboard Entry Lists
- Component Dashboards

Different views provide different levels of operational detail while maintaining the same underlying operational information.

## Operational Prioritization

Each Dashboard Entry receives a priority based on operational and business criteria.

Typical factors include:

- Component environment
- Metric category
- Operational impact
- Business criticality
- Service importance

Prioritization allows support users to focus on the situations with the highest operational relevance.

## Operational Investigation

Support users normally begin their investigation from an Operational Dashboard.

The workflow typically follows:

```text
Dashboard Entry
↓
Operational Dashboard
↓
Company Dashboard
↓
Component Dashboard
↓
Metrics, Logs, Tickets and Related Components
```

This process allows operators to move from a high-level operational view to the detailed analysis required for troubleshooting.

## Situation Management

Once a situation has been identified, operators can:

- Mark the situation as attended.
- Investigate the affected components.
- Review operational metrics.
- Access diagnostic information.
- Correlate incidents with tickets.
- Monitor remediation activities.

Dashboard Entries remain the central object used to track operational situations throughout their lifecycle.

## Key Concepts

| Concept | Description |
|----------|-------------|
| Managed Component | Technology asset monitored by ITOSS |
| Monitor | Mechanism used to collect operational information |
| Metric | Operational value collected by a monitor |
| Dashboard Entry | Operational situation generated from monitoring logic |
| Dashboard Container | Visual grouping of Dashboard Entries |
| Operational Dashboard | Workspace used to manage operational situations |
| Operator | User responsible for investigating and managing situations |