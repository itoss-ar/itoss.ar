
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Contactpage from '../components/contactpage';

export default function Contact() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={`Contact`} description="The Tool for Datacenter Service Management.">
      <main>
        <div>
          <Contactpage />
        </div>
      </main>
    </Layout>
  );
}
