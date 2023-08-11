import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React, { useEffect } from 'react';
import Servicepage from '../components/servicepage';

export default function Services() {
    const {siteConfig} = useDocusaurusContext();

    return (
      <Layout title={`Services`} description="The Tool for Datacenter Service Management.">
        <main>
          <div>
            <Servicepage />
          </div>
        </main>
      </Layout>
    );
  }
  