import React from 'react';
import Link from '@docusaurus/Link';
import {MODULES, COMPLETE_OPERATIONS, SERVICES, TUTORIALS, ModuleIcon, CompleteOperationIcon, ServiceIcon} from './data';

export function Hero() {
  return (
    <section className="hero">
      <HeroGlow />
      <div className="itoss-container-wide" style={{position: 'relative', zIndex: 1}}>
        <div className="hero-grid">
          <div>
            <div className="hero-head">
              <span className="pill pill-cyan"><span className="status-dot" /> v8.4 · Now available</span>
              <span className="pill">No license fees</span>
            </div>
            <h1 className="h1">Operational Intelligence for <span className="brand-grad-text">Technology Services</span></h1>
            <p className="lede">
              Manage technology products through a unified operational model that connects lifecycle management, automation, KPIs processing, operational activities, and Service Management processes. 
            </p>
            <div className="hero-ctas">
              <Link to="/contact" className="btn btn-primary btn-lg">Request a guided demo<span className="arrow">→</span></Link>
              <Link to="/docs/start-with-itoss" className="btn btn-secondary btn-lg">Get started with ITOSS</Link>
            </div>
            <div className="hero-meta">
              <span><span className="ok">●</span> Self-hosted · Docker compose</span>
              <span className="dot" />
              <span>Production-ready in 5 minutes</span>
              <span className="dot" />
              <span>Multi-client</span>
            </div>
          </div>
          <div>          
            <img src="img/hero-dashboard2.webp" alt="ITOSS dashboard preview" style={{width: '100%', borderRadius: 8, boxShadow: '0 20px 40px rgba(0,0,0,0.3)'}} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroGlow({lime = true}) {
  return (
    <div className="glow-bg">
      <div className="orb orb-cyan" style={{width: 500, height: 500, top: -200, left: -100}} />
      {lime && <div className="orb orb-lime" style={{width: 400, height: 400, top: 100, right: -150}} />}
      <div className="grid-floor" />
    </div>
  );
}

// ============================================================
// LOGOS STRIP
// ============================================================
export function LogosStrip() {
  return (
    <div className="logos-strip">
      <div className="itoss-container-wide">
        <div className="label">Built on based on open and modern technologies.</div>
        <div className="logos-row">
          {['JAVA · Spring Boot', 'Angular', 'PostgreSQL', 'TimescaleDB', 'Docker', 'Kubernetes', 'OpenAPI'].map((l) => (
            <span className="lg" key={l}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MODULES
// ============================================================
export function Modules() {
  return (
    <section className="section">
      <div className="itoss-container-wide">
        <div className="section-head" style={{textAlign: 'left', marginBottom: 48, maxWidth: 1200}}>
          <span className="eyebrow" style={{marginBottom: 16, justifyContent: 'flex-start'}}>Platform</span>
          <h2 className="h2">Operational Intelligence for <span className="brand-grad-text">Technology Services</span></h2>
          <p className="lede" style={{marginTop: 16, textAlign: 'left'}}>
            ITOSS is an extensible operational framework that enables organizations to manage diverse technology products through a common operational model. 
            It provides the building blocks required to develop, and scale technology management solutions. 
          </p>
        </div>
        <div className="grid grid-5" style={{gap: 16}}>
          {MODULES.map((m) => (
            <article className="module-card" key={m.id}>
              <div className="module-icon"><ModuleIcon kind={m.id} /></div>
              <div className="module-name">{m.code}</div>
              <h3>{m.name}</h3>
              <p>{m.desc}</p>
              <ul className="module-feat">{m.feats.map((f, i) => <li key={i}>{f}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// COMPLETE OPERATION
// ============================================================
export function CompleteOperations() {
  return (
    <section className="section" style={{background: 'var(--bg-1)'}}>
      <div className="itoss-container-wide">
        <div className="section-head" style={{textAlign: 'left', marginBottom: 48, maxWidth: 1200}}>
          <span className="eyebrow" style={{marginBottom: 16, justifyContent: 'flex-start'}}>Capabilities</span>
          <h2 className="h2">Complete <span className="brand-grad-text">operation</span></h2>
          <p className="lede" style={{marginTop: 16, textAlign: 'left'}}>
            ITOSS centralizes operational data, metrics, events, notifications, and customer information into a single platform, 
            giving IT teams and service providers complete visibility across their managed environments.
          </p>
        </div>
        <div className="grid grid-3" style={{gap: 16}}>
          {COMPLETE_OPERATIONS.map((m) => (
            <article className="module-card" key={m.id}>
              <div className="module-icon"><CompleteOperationIcon kind={m.id} /></div>
              <div className="module-name">{m.code}</div>
              <h3>{m.name}</h3>
              <p>{m.desc}</p>
              { true && <ul className="module-feat">{m.feats.map((f, i) => <li key={i}>{f}</li>)}</ul> }
            </article>
          ))}
        </div>        
      </div>
    </section>
  );
}

// ============================================================
// TUTORIALS
// ============================================================
export function Tutorials() {
  return (
    <section className="section" style={{background: 'var(--bg-1)'}}>
      <div className="itoss-container-wide">
        
        <div className="grid grid-2" style={{gap: 24}}>
          {TUTORIALS.map((t) => (
            <article className="module-card" key={t.id} style={{padding: 0, overflow: 'hidden'}}>
              { false && <div style={{position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#000', borderBottom: '1px solid var(--border)'}}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${t.videoId}`}
                  title={t.name}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0}}
                />
              </div> }
              <div style={{padding: 28, display: 'flex', flexDirection: 'column', flex: 1}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14}}>
                  <div className="module-icon" style={{margin: 0}}><TutorialIcon kind={t.id} /></div>
                  <div className="module-name" style={{marginBottom: 0}}>{t.code}</div>
                </div>
                <h3>{t.name}</h3>
                <p>{t.desc}</p>
                { false && <ul className="module-feat">{t.feats.map((f, i) => <li key={i}>{f}</li>)}</ul> }
                <a href={`https://www.youtube.com/watch?v=${t.videoId}`} target="_blank" rel="noopener" className="module-link">
                  Watch on YouTube <span>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function TutorialIcon({kind}) {
  const s = {width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round'};
  switch (kind) {
    case 'quickstart':
      return <svg {...s}><circle cx="12" cy="12" r="9" /><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" /></svg>;
    case 'multitenant':
      return <svg {...s}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><polygon points="17.5 14.5 20.5 20 14.5 20 17.5 14.5" fill="currentColor" stroke="none" /></svg>;
    default:
      return null;
  }
}

// ============================================================
// SERVICES
// ============================================================
export function Services() {
  return (
    <section className="section">
      <div className="itoss-container-wide">
        <div className="section-head" style={{textAlign: 'left', marginBottom: 48, maxWidth: 1200}}>
          <span className="eyebrow" style={{marginBottom: 16, justifyContent: 'flex-start'}}>Services</span>
          <h2 className="h2">Technology Platform + <span className="brand-grad-text">Expert Services</span></h2>
          <p className="lede" style={{marginTop: 16, textAlign: 'left'}}>
            Get the flexibility of an enterprise-grade IT operations platform without licensing costs, 
            backed by professional services that ensure successful deployment, operational excellence, and continuous improvement. 
          </p>
        </div>
        <div className="grid grid-4" style={{gap: 16}}>
          {SERVICES.map((m) => (
            <article className="module-card" key={m.id}>
              <div className="module-icon"><ServiceIcon kind={m.id} /></div>
              <div className="module-name">{m.code}</div>
              <h3>{m.name}</h3>
              <p>{m.desc}</p>
              <ul className="module-feat">{m.feats.map((f, i) => <li key={i}>{f}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GenericIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>;
}

// ============================================================
// BIG CTA
// ============================================================
export function BigCTA() {
  return (
    <section className="section">
      <div className="itoss-container-wide">
        <div className="cta-block">
          <span className="eyebrow" style={{justifyContent: 'center'}}>Let's talk</span>
          <h2 className="h2">Operating IT for multiple clients?<br /><span className="brand-grad-text">We'll show you how ITOSS scales with you</span></h2>
          <p className="lede">Book a 30-minute guided demo with a consultant. We'll walk you through real MSP use cases and how they'd apply to your operation.</p>
          <div className="hero-ctas">
            <Link to="/contact" className="btn btn-primary btn-lg">Request a guided demo <span className="arrow">→</span></Link>
            <Link to="/docs/start-with-itoss" className="btn btn-secondary btn-lg">Get started with ITOSS</Link>
          </div>
          <div style={{marginTop: 24, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-4)'}}>
            <span style={{color: 'var(--lime)'}}>●</span> No licensing costs &nbsp;·&nbsp; Deploy with docker compose &nbsp;·&nbsp; Multi-client
          </div>
        </div>
      </div>
    </section>
  );
}
