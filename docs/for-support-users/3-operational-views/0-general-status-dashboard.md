# General Status Dashboard

## Overview

The General Status Dashboard provides a consolidated view of the operational health of managed components across the monitored environment. It allows support users to quickly assess component availability, identify operational issues, and analyze infrastructure distribution across companies, locations, and environments.

The dashboard is designed to deliver a high-level operational perspective while enabling users to drill down into specific areas requiring investigation.

## Purpose

The dashboard helps support teams:

- Monitor the current operational state of managed components.
- Identify unavailable or degraded infrastructure elements.
- Analyze component distribution across organizational and geographical dimensions.
- Focus on specific operational environments.
- Support incident investigation and operational awareness activities.

## Status Metric

The primary indicator displayed by the dashboard is the **Status** metric, which represents the operational state of a managed component.

### Status Representation

| Status | Meaning |
|----------|----------|
| Green | Component is operational and available |
| Red | Component is unavailable or experiencing an operational issue |

The status metric provides immediate visibility into the health of monitored infrastructure and services.

## Dashboard Views

The General Status Dashboard offers multiple perspectives of the monitored environment, allowing users to analyze operational information from different business and infrastructure dimensions.

### Components by Company

This view organizes managed components according to company ownership or organizational structure.

For each company, components are grouped by type and display their current operational status.

#### Typical Use Cases

- Assess service health for a specific customer or business unit.
- Identify organizations affected by operational incidents.
- Review component availability across companies.

### Components by Location

This view groups managed components according to their physical or logical location.

Each location provides visibility into the operational status of the component types deployed within that site.

Support users can drill down into a location to obtain more detailed information regarding the associated managed components.

#### Typical Use Cases

- Investigate location-specific service disruptions.
- Analyze operational status by site or facility.
- Isolate infrastructure issues affecting a particular location.

### Component Inventory by Type and Location

This view presents the number of managed components categorized by component type and location.

The information provides visibility into infrastructure distribution and component concentration across the monitored environment.

#### Typical Use Cases

- Review infrastructure inventory.
- Analyze component distribution across sites.
- Support capacity and operational planning activities.

### Companies by Country

This view provides a geographical perspective of organizational distribution by presenting companies associated with specific countries or locations.

#### Typical Use Cases

- Understand organizational geographic coverage.
- Analyze customer distribution by region.
- Support regional operational reviews.

## Environment Filtering

The dashboard supports filtering by environment, allowing support users to focus on a specific operational context.

Common environments include:

- Production
- Test
- Development

Environment filtering helps reduce information noise and enables users to analyze only the components relevant to a particular operational scenario.

## Operational Considerations

- Component status reflects the current operational condition reported by monitoring processes.
- Dashboard views present the same managed environment from different organizational and operational perspectives.
- Drill-down capabilities provide access to more detailed information when additional investigation is required.
- Environment filtering can be used to isolate operational issues within a specific deployment stage.
- The dashboard is intended to provide rapid situational awareness and assist in identifying areas requiring further analysis.

## Related Features

- Managed Entities
- Status Metrics
- Monitoring
- Events
- Notifications
- Reports
- Operational Dashboards