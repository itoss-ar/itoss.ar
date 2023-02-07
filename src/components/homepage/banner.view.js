import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from 'clsx';
import React from 'react';

export const Banner = () => {
    const {siteConfig} = useDocusaurusContext();

    return (
      <>
        <header>
          <div className="hero">
            <div className="hero-background"></div>
            <div className="container hero-main">
              <div className="row">
                <div className={clsx('col col--5')}>
                  <div className="text--left">
                    <h1 className="hero-title">Operate IT products with ease</h1>
                    <p className="hero-subtitle">Complete customer visibility into infrastructure performance with effortless deployment and agentless</p>
                    <div className="hero-more-info">
                      <a href="/docs/documentos/Introducci%C3%B3n/conceptos">more info</a>
                    </div>
                  </div>
                </div>
                <div className={clsx('col col--7')}>
                  <div className="text--right">
                    <img className="hero-img" src="img/dashboard.png" alt="ITOSS logo" /> 
                  </div>
                </div>
              </div>  
            </div> 
          </div>
        </header>
      </>
    );
  }