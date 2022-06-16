import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    Svg: require('@site/static/img/fast.svg').default,
    
    title: 'Rápida implementación',
    
    description: (
      <>
        Pensada para cubrir rápidamente la necesidad del negocio
      </>
    ),
    
  },
  {
    Svg: require('@site/static/img/important.svg').default,
    title: 'Focalizado en lo importante',
    description: (
      <>
        Con el énfasis puesto en las métricas de vital importancia para la operación de los servicios
      </>
    ),
    
  },
  {
    Svg: require('@site/static/img/flex.svg').default,
    title: 'Flexible',
    description: (
      <>
         Cualquier dispositivo o tecnología puede ser monitoreada en muy pocos pasos
      </>
    ),
    
  },
];

function Feature({Svg,title, description}) {
  return (
    <div className={clsx('col col--4')}>
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
