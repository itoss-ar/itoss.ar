// Shared site data + small presentational helpers

export const MODULES = [
  {
    id: 'providers', code: 'Focused on IT Service Providers', name: 'Managed Service Providers',
    desc: 'Ideal for IT providers for a deep operational management of their clients',
    feats: ['Native multi-tenant', 'Per-client visibility', 'Role-based access', 'Centralized operations'],
  },
  {
    id: 'framework', code: 'Framework for developing IT tasks', name: 'IT Framework',
    desc: 'Processing key metrics, automatizes notifications, corrective actions, reporting and other operation tasks',
    feats: ['Key metric processing', 'Automated notifications', 'Corrective actions', 'Built-in reporting'],
  },
  {
    id: 'scalable', code: 'Simple implementation, flexible, and scalable', name: 'Scalable',
    desc: 'Microservices-based architecture, ready to use in just minutes',
    feats: ['Microservices architecture', 'Ready in minutes', 'Horizontally scalable', 'Flexible deployment'],
  },
  {
    id: 'panels', code: 'Operation management through custom control panels', name: 'Control Panels',
    desc: 'Ideal for operation centers with diverse management and support profiles',
    feats: ['Custom control panels', 'Operation-center ready', 'Multiple profiles', 'Management + support views'],
  },
  {
    id: 'sap', code: 'SAP BASIS ready and more', name: 'SAP BASIS',
    desc: 'Includes interfaces and knowledge for SAP ecosystem management, Linux, Windows and most database vendors',
    feats: ['SAP ecosystem ready', 'Linux · Windows', 'Most DB vendors', 'Prebuilt interfaces'],
  },
];

export const SERVICES = [
  {
    id: 'support', code: 'Software support packages', name: 'Software Support',
    desc: 'Keep your ITOSS platform running smoothly with reliable software maintenance and expert assistance.',
    feats: ['Software bug fixes and issue resolutions.', 'Two ITOSS platform upgrades per calendar year, assisted by our support team', 'End-user "how-to" support.', 'Access to ITOSS training materials, documentation, and video tutorials.'],
  },
  {
    id: 'administration', code: 'Manage your IT infrastructure', name: 'Platform Administration',
    desc: 'Maximize the value of your ITOSS investment with proactive platform administration, operational support, and ongoing optimization.',
    feats: ['Regular reviews of platform health, performance, and configuration.', 'Execution of day-to-day administrative tasks.', 'Platform adoption and data quality analysis to help improve operational effectiveness.', 'Planning and execution of platform updates and upgrades when required.'],
  },
  {
    id: 'implementation', code: 'Seamless software implementation', name: 'Professional Implementation',
    desc: 'Ensure a fast and successful ITOSS deployment with expert guidance and best-practice adoption.',
    feats: ['ITOSS deployment planning and implementation.', 'Knowledge transfer sessions for operational and technical teams.', 'Access to operational training videos and onboarding materials.', 'Best-practice recommendations for platform configuration and adoption.'],
  },
  {
    id: 'training', code: 'Skills and knowledge for your team', name: 'AI Integration & Automation',
    desc: 'Empower ITOSS with AI-driven automation to enhance operational efficiency and service delivery. Through secure MCP integration.',
    feats: ['AI-powered operational assistants.', 'Intelligent KPI and alert analysis.', 'Automated reporting and workflow execution.', 'Secure, governed AI integration.', 'Designed for MSP and multi-tenant environments.'],
  }
];

export const COMPLETE_OPERATIONS = [
  {
    id: 'kpi', code: 'Real-time KPI processing', name: 'KPI Processing',
    desc: 'ITOSS transforms operational data into actionable intelligence by collecting, calculating, and evaluating KPIs in real time. Configurable rules and conditions enable the platform to determine operational states and automatically trigger notifications, populate control panels, and feed Service Management processes.',
    feats: ['Real-time KPI evaluation', 'Threshold-based monitoring', 'Trend and capacity analysis', 'Service health indicators', 'Operational state monitoring', 'Automated notification triggering'],
  },
  {
    id: 'lifecycle', code: 'End-to-end life cycle management', name: 'Life Cycle Management',
    desc: 'Track and govern every stage of a technology product\'s lifecycle. From initial delivery to operational support, maintenance activities, service retirement, and end-of-life, ITOSS provides a complete operational record with ownership, timestamps, and historical traceability.',
    feats: ['End-to-end lifecycle visibility', 'Product status evolution', 'Historical traceability', 'Activity ownership tracking', 'Audit-ready records', 'Service lifecycle governance'],
  },
  {
    id: 'tracking', code: 'Precise activity tracking', name: 'Activity Tracking',
    desc: 'ITOSS provides a unified operational timeline for each managed technology component, capturing lifecycle changes, support team annotations, automated and manual operational actions, alert-driven activities, and related service tickets. This historical record enables efficient troubleshooting, operational analysis, and service governance.',
    feats: ['Unified component timeline', 'Lifecycle transition records', 'Support notes and annotations', 'Alert-related operational events', 'Linked ticketing records', 'End-to-end operational traceability'],
  },
  {
    id: 'opstate', code: 'Smart operations', name: 'Operational Task Automation',
    desc: 'Schedule and automate operational tasks across managed technology components. ITOSS enables recurring and event-driven activities to reduce manual effort, improve operational consistency, and ensure critical tasks are executed on time.',
    feats: ['Scheduled operational tasks', 'Recurring maintenance activities', 'Event-driven task execution', 'Reduced manual effort', 'Operational consistency', 'Automated task tracking'],
  },
  {
    id: 'customerdb', code: 'Live Operational CMDB', name: 'Customer Operational Database',
    desc: 'ITOSS creates a connected operational ecosystem where customers, technology products, and support teams are linked through a common operational data model. This enables operators and managers to understand the current operational state, historical evolution, support activities, alerts, incidents, and business impact from a single place.',
    feats: ['Connected customer ecosystem', 'Product and component relationships', 'Support structure visibility', 'Current operational state', 'Historical operational information', 'Comprehensive operational reality'],
  },
  {
    id: 'performance', code: 'Performance, configuration & security', name: 'Service Management Intelligence',
    desc: 'Provide the operational intelligence required to support Incident, Performance, Capacity, Configuration, and Service Reporting processes. ITOSS consolidates operational data, lifecycle information, KPIs, and managed component information into a single source of operational context.',
    feats: ['Automated incident initiation', 'Performance management insights', 'Capacity planning support', 'Trusted configuration data', 'Security assurance visibility', 'Customer-tailored reporting'],
  },
];

export function ModuleIcon({kind}) {
  const s = {width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round'};
  switch (kind) {
    case 'providers':
      return <svg {...s}><circle cx="9" cy="7.5" r="3.2" /><path d="M2.5 20c0-3.4 2.9-5.6 6.5-5.6s6.5 2.2 6.5 5.6" /><circle cx="17.5" cy="9" r="2.3" /><path d="M16 13.8c3 .2 5.5 2.2 5.5 5.2" /></svg>;
    case 'framework':
      return <svg {...s}><circle cx="12" cy="12" r="3" /><path d="M12 3 L12 7" /><path d="M12 17 L12 21" /><path d="M3 12 L7 12" /><path d="M17 12 L21 12" /><path d="M5.6 5.6 L8.5 8.5" /><path d="M15.5 15.5 L18.4 18.4" /></svg>;
    case 'scalable':
      return <svg {...s}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>;
    case 'panels':
      return <svg {...s}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="9" x2="9" y2="21" /></svg>;
    case 'sap':
      return <svg {...s}><path d="M3 9 L12 4 L21 9 L12 14 Z" /><path d="M3 14 L12 19 L21 14" /></svg>;
    default:
      return null;
  }
}

export function CompleteOperationIcon({kind}) {
  const s = {width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round'};
  switch (kind) {
    case 'kpi':
      // bar chart with trend line / KPI analysis
      return <svg {...s}><path d="M3 21h18" /><rect x="4.5" y="12" width="3" height="6" rx="0.5" /><rect x="10.5" y="9" width="3" height="9" rx="0.5" /><rect x="16.5" y="5" width="3" height="13" rx="0.5" /><path d="M4 9 L9 6 L14 8 L20 3" /></svg>;
    case 'lifecycle':
      // circular arrows / life cycle
      return <svg {...s}><path d="M20 12a8 8 0 1 1-2.3-5.6" /><path d="M20 4v3.5h-3.5" /><circle cx="12" cy="12" r="2.2" /></svg>;
    case 'tracking':
      // crosshair / precise tracking
      return <svg {...s}><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="2.4" /><path d="M12 2v3" /><path d="M12 19v3" /><path d="M2 12h3" /><path d="M19 12h3" /></svg>;
    case 'opstate':
      // pulse / heartbeat operational
      return <svg {...s}><path d="M3 12h4l2.5-6 4 12 2.5-6H21" /></svg>;
    case 'customerdb':
      // database cylinder / customer database
      return <svg {...s}><ellipse cx="12" cy="5.5" rx="7" ry="2.8" /><path d="M5 5.5v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-6" /><path d="M5 11.5v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-6" /></svg>;
    case 'performance':
      // shield + gauge / performance, config, security
      return <svg {...s}><path d="M12 3 5 6v5c0 4.3 3 7.5 7 9 4-1.5 7-4.7 7-9V6Z" /><path d="M12 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path d="M12 11l2-2" /></svg>;
    default:
      return null;
  }
}

export function ServiceIcon({kind}) {
  const s = {width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round'};
  switch (kind) {
    case 'support':
      // headset / 24-7 support
      return <svg {...s}><path d="M4 13v-1a8 8 0 0 1 16 0v1" /><rect x="2.5" y="13" width="4" height="6" rx="1.5" /><rect x="17.5" y="13" width="4" height="6" rx="1.5" /><path d="M20 19v.5a3 3 0 0 1-3 3h-3" /></svg>;
    case 'implementation':
      // gear + check / deployment
      return <svg {...s}><circle cx="11" cy="11" r="3" /><path d="M11 4v2" /><path d="M11 16v2" /><path d="M4 11h2" /><path d="M16 11h2" /><path d="M6 6l1.4 1.4" /><path d="M14.6 14.6 16 16" /><path d="M14 19.5l2 2 4-4.5" /></svg>;
    case 'training':
      // graduation cap / knowledge
      return <svg {...s}><path d="M2.5 8.5 12 4l9.5 4.5L12 13Z" /><path d="M6 10.8V15c0 1.5 2.7 2.8 6 2.8s6-1.3 6-2.8v-4.2" /><path d="M21.5 8.5v5" /></svg>;
    case 'administration':
      // shield / managed infrastructure
      return <svg {...s}><path d="M12 3 5 6v5c0 4.3 3 7.5 7 9 4-1.5 7-4.7 7-9V6Z" /><path d="M9 11.5 11 13.5 15 9.5" /></svg>;
    default:
      return null;
  }
}

export function ArrowIcon() {
  return <span className="arrow">→</span>;
}
