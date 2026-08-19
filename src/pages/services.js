import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {Services, BigCTA} from '@site/src/components/site/Sections';

const HEADLINE = [
  {num: '10', unit: '+ yrs', label: 'Production experience', desc: 'Real-world customer projects'},
  {num: '25', unit: '+ yrs', label: 'Technology operations expertise', desc: 'Real-world customer projects'},
  /*{num: '10', unit: 'k+', label: 'Components managed', desc: 'Across SOC + data centers'},
  {num: '500', unit: '+', label: 'Customers served', desc: 'Multi-client by design'},
  {num: '6', unit: '', label: 'Operational centers', desc: 'Across multiple countries'},*/
];

export default function PricingPage() {
  return (
    <Layout title="Services" description="ITOSS es self-hosted por diseño. Empezás gratis, sin licencias por host.">
      <main>
        <section className="page-head">
          <div className="glow-bg"><div className="orb orb-cyan" style={{width: 500, height: 500, top: -250, left: '50%', transform: 'translateX(-50%)'}} /><div className="grid-floor" /></div>
          <div className="itoss-container-wide" style={{position: 'relative', zIndex: 1, textAlign: 'center'}}>
            <h1 className="h1" style={{margin: '0 auto 16px'}}>Explore our <span className="brand-grad-text">services</span></h1>
            <p className="lede" style={{margin: '0 auto'}}>ITOSS is self-hosted by design. Start for free and, if it helps, let's talk about production support, onboarding or partnership.</p>
          </div>
        </section>   
        <Services/>
        <BigCTA />
      </main>
    </Layout>
  );
}
