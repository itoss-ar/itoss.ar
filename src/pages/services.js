import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Services() {
    const {siteConfig} = useDocusaurusContext();

    return (
      <Layout title={`${siteConfig.title}`} description="The Tool for Datacenter Service Management.">
        <main>
          <div>services</div>
        </main>
      </Layout>
    );
  }
  