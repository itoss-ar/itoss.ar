import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  
  {
    Svg: require('@site/static/img/Software Integration System Development & Deployment.svg').default,
    title: 'Una amplia variedad de instrumentaciones para colección y análisis de métricas',
    description: (
      <>
        Jdbc, SAP (RFC), API Rest, PowerShell, SSH, y más.  
      </>
    ),
    
  }
];

function Feature({Svg,title, description}) {
  return (
    <div className={clsx('col col--12')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
        
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
