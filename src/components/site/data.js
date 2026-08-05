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
    id: 'support', code: '24/7 technical support packages', name: 'Software Support',
    desc: 'Our basic package provides 24/7 technical support to keep your software running smoothly, while premium adds a dedicated support representative and priority response times.',
    feats: ['24/7 technical support', 'Basic & premium tiers', 'Dedicated support rep', 'Priority response times'],
  },
  {
    id: 'implementation', code: 'Seamless software implementation', name: 'Implementation',
    desc: 'Our team of experts works with you to ensure a seamless implementation of the ITOSS software in your infrastructure, from pre-implementation planning to post-implementation support.',
    feats: ['Expert-led implementation', 'Pre-implementation planning', 'Post-implementation support', 'Infrastructure integration'],
  },
  {
    id: 'training', code: 'Skills and knowledge for your team', name: 'Training',
    desc: 'Our training program gives your team the skills and knowledge they need to effectively use the ITOSS software, with sessions that can be customized to your specific needs.',
    feats: ['Hands-on training program', 'Effective product usage', 'Customizable sessions', 'Tailored to your needs'],
  },
  {
    id: 'administration', code: 'Manage your IT infrastructure', name: 'Administration Services',
    desc: 'Our administration services help you manage your IT infrastructure and products more effectively, with our experts building a customized solution that meets your unique needs.',
    feats: ['Infrastructure management', 'Customized solutions', 'Expert team support', 'Efficient IT management'],
  },
];

export const COMPLETE_OPERATIONS = [
  {
    id: 'kpi', code: 'Real-time KPI processing', name: 'KPI Processing',
    desc: 'Our application is actively optimizing Key Performance Indicators (KPIs), ensuring efficient and real-time analysis.',
    feats: ['Real-time analysis', 'KPI optimization', 'Efficient processing', 'Actionable metrics'],
  },
  {
    id: 'lifecycle', code: 'End-to-end life cycle management', name: 'Life Cycle Management',
    desc: 'Efficient life cycle management is underway in our application, ensuring seamless progression and functionality.',
    feats: ['Seamless progression', 'Stage-by-stage control', 'Reliable functionality', 'Efficient management'],
  },
  {
    id: 'tracking', code: 'Precise activity tracking', name: 'Tracking',
    desc: 'Our application is adept at precise tracking, providing real-time insights into user activities.',
    feats: ['Precise tracking', 'Real-time insights', 'User activity visibility', 'Continuous monitoring'],
  },
  {
    id: 'opstate', code: 'Always-on operational state', name: 'Operational State',
    desc: 'Our app is currently operational, ensuring an optimal and uninterrupted user experience.',
    feats: ['Always operational', 'Uninterrupted experience', 'Optimal performance', 'High availability'],
  },
  {
    id: 'customerdb', code: 'Robust customer operational database', name: 'Customer Operational Database',
    desc: 'Facilitating seamless operations, our application maintains a robust customer database, ensuring efficient organization and accessibility of customer-related information.',
    feats: ['Robust customer database', 'Efficient organization', 'Easy accessibility', 'Seamless operations'],
  },
  {
    id: 'performance', code: 'Performance, configuration & security', name: 'Performance, Configuration & Security',
    desc: 'Exceling in performance, configuration, security, and other essential aspects, the application ensures top-notch functionality.',
    feats: ['High performance', 'Flexible configuration', 'Built-in security', 'Top-notch functionality'],
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
