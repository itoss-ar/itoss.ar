import React from 'react';
import Layout from '@theme/Layout';
import {Hero, LogosStrip, Modules, CompleteOperations, BigCTA} from '@site/src/components/site/Sections';

export default function Home() {
  return (
    <Layout
      title="Operate IT products with ease"
      description="ITOSS — IT operations platform para MSPs y proveedores de servicios. Multi-tenant, self-hosted, sin licencias.">
      <main>
        <Hero />
        <LogosStrip />
        <Modules />
        <CompleteOperations />
        <BigCTA />
      </main>
    </Layout>
  );
}
