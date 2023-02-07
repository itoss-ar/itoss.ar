import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--5')}>
            <div className="text--left">
              <h1 className="hero__title">{siteConfig.title}</h1>
              <p className="hero__subtitle">{siteConfig.tagline}</p>
              <div className="medium_buttom_div">
                <a className="medium_buttom_a" href="http://localhost:3000/docs/documents/Introduction/concepts" id="mediumButtom">Más info</a>
              </div>
            </div>
          </div>
          <div className={clsx('col col--7')}>
            <div className="text--right">
              <img src="img/dashboard.png" alt="ITOSS logo" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (

    <Layout
      title={`${siteConfig.title}`}
      description="The Tool for Datacenter Service Management.<head />">
      <HomepageHeader />
      <main>

        <HomepageFeatures />
      </main>
    </Layout>
  );
}
