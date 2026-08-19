import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {Tutorials, BigCTA} from '@site/src/components/site/Sections';

export default function TutorialsPage() {
  return (
    <Layout title="Tutorials" description="ITOSS es self-hosted por diseño. Empezás gratis, sin licencias por host.">
      <main>
        <section className="page-head">
          <div className="glow-bg"><div className="orb orb-cyan" style={{width: 500, height: 500, top: -250, left: '50%', transform: 'translateX(-50%)'}} /><div className="grid-floor" /></div>
          <div className="itoss-container-wide" style={{position: 'relative', zIndex: 1}}>
            <span className="eyebrow" style={{justifyContent: 'center'}}>Tutorials</span>
            <h1 className="h1">Learn ITOSS <span className="brand-grad-text">by watching</span></h1>
            <p className="lede">Short, practical video guides that take you from a fresh install to a fully operational, multi-tenant monitoring platform — step by step.</p>
          </div>
        </section>        
        <Tutorials/>
        <BigCTA />
      </main>
    </Layout>
  );
}
