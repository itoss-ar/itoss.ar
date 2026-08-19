import React from 'react';
import Layout from '@theme/Layout';
import {BigCTA} from '@site/src/components/site/Sections';

const HEADLINE = [
  {num: '10', unit: '+ yrs', label: 'Production experience', desc: 'Real-world customer projects'},
  //{num: '25', unit: '+ yrs', label: 'Technology operations expertise', desc: 'Real-world customer projects'},
  {num: '10', unit: 'k+', label: 'Components managed', desc: 'Across SOC + data centers'},
  {num: '500', unit: '+', label: 'Customers served', desc: 'Multi-client by design'},
  {num: '6', unit: '', label: 'Operational centers', desc: 'Across multiple countries'},
];

const STORIES = [
  {
    id: 'soc', tag: 'Security Operations', icon: 'shield',
    title: 'Supporting Large-Scale Security Operations',
    desc: 'ITOSS supports a Security Operations Center delivering managed services for more than 500 customers and 1,800 security components. The platform provides centralized visibility, operational context, automated backups, and end-to-end traceability across customer environments.',
    stats: [
      {v: '1,800+', l: 'Managed security components'},
      {v: '500+', l: 'Customers'},
      {v: 'SOC', l: 'Operations support'},
      {v: 'Auto', l: 'Backup devices automation'},
    ],
  },
  {
    id: 'datacenter', tag: 'Distributed Data Centers', icon: 'globe',
    title: 'Enabling Distributed Data Center Operations at Scale',
    desc: 'ITOSS supports a distributed data center operation spanning multiple countries and six operational centers. The platform provides unified visibility and operational management for more than 8,000 components across operating systems, databases, SAP environments, and VMware vSphere infrastructure.',
    stats: [
      {v: '8,000+', l: 'Managed components'},
      {v: '6', l: 'Operational centers'},
      {v: 'Multi', l: 'Countries'},
      {v: 'OS · DB · SAP', l: 'Systems & virtual infra'},
    ],
  },
  {
    id: 'baremetal', tag: 'Bare-Metal Management', icon: 'server',
    title: 'Building a Multi-Vendor Bare-Metal Management Solution',
    desc: 'ITOSS was used to build the operational management solution for a bare-metal infrastructure product. The solution incorporates hardware from multiple manufacturers through Redfish and integrates with ServiceNow to initiate and enrich incident management workflows.',
    stats: [
      {v: 'Multi', l: 'Vendor hardware'},
      {v: 'Redfish', l: 'Based management'},
      {v: 'Unified', l: 'Operational model'},
      {v: 'ServiceNow', l: 'Cloud integration'},
    ],
  },
];

function StoryIcon({kind}) {
  const s = {width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round'};
  const g = {
    shield: <svg {...s}><path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3z" /><path d="m9 12 2 2 4-4" /></svg>,
    globe: <svg {...s}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" /></svg>,
    server: <svg {...s}><rect x="3" y="4" width="18" height="7" rx="1.5" /><rect x="3" y="13" width="18" height="7" rx="1.5" /></svg>,
  };
  return g[kind] || null;
}

export default function CustomersPage() {
  return (
    <Layout title="Use cases" description="Built from operational experience — how ITOSS powers SOCs, distributed data centers and bare-metal management at scale.">
      <main>
        <section className="page-head">
          <div className="glow-bg"><div className="orb orb-cyan" style={{width: 500, height: 500, top: -250, left: -100}} /><div className="orb orb-lime" style={{width: 380, height: 380, bottom: -180, right: -80}} /><div className="grid-floor" /></div>
          <div className="itoss-container-wide" style={{position: 'relative', zIndex: 1}}>
            <span className="eyebrow">Proven in Production </span>
            <h1 className="h1">Built from <span className="brand-grad-text">operational experience</span></h1>
            <p className="lede" style={{maxWidth: '90ch'}}>
              More than 10 years of real-world customer projects and production experience have shaped
              ITOSS into an extensible operational framework for complex, distributed, and
              multi-customer technology operations.
            </p>
          </div>
        </section>

        { false && <section className="section section--sm" style={{padding: '38px 0'}}>
          <div className="itoss-container-wide">
            <div className="stats">
              {HEADLINE.map((s, i) => (
                <div className="stat" key={i}>
                  <div className="stat-num"><span className="brand-grad-text">{s.num}</span>{s.unit && <span className="unit">{s.unit}</span>}</div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section> }

        <section className="section" style={{background: 'var(--bg-1)', paddingTop: 40}}>
          <div className="itoss-container-wide">
            <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
              {STORIES.map((st) => (
                <article key={st.id} className="card" style={{padding: 0}}>
                  <div className="split" style={{'--cols': '1.3fr 1fr', '--gap': '0px', alignItems: 'stretch'}}>
                    <div style={{padding: '40px 44px'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18}}>
                        <div className="module-icon" style={{margin: 0}}><StoryIcon kind={st.icon} /></div>
                        <span className="pill pill-cyan">{st.tag}</span>
                      </div>
                      <h3 style={{fontSize: 24, marginBottom: 14}}>{st.title}</h3>
                      <p style={{color: 'var(--text-3)', fontSize: 15, lineHeight: 1.65, margin: 0}}>{st.desc}</p>
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)', borderLeft: '1px solid var(--border)'}}>
                      {st.stats.map((m, j) => (
                        <div key={j} style={{background: 'var(--surface)', padding: '22px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                          <div className="mono" style={{fontSize: 22, fontWeight: 600, color: 'var(--lime)', lineHeight: 1.1}}>{m.v}</div>
                          <div className="mono" style={{fontSize: 10.5, color: 'var(--text-3)', letterSpacing: '0.04em', marginTop: 6, lineHeight: 1.4}}>{m.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <BigCTA />
      </main>
    </Layout>
  );
}
