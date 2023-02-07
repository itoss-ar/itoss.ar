import clsx from 'clsx';
import React from 'react';

export const Features = () => { 
  const featureList = [
    { title: "Focused on IT Service Providers", description: "More than just monitoring, a comprehensive solution for managing your multi- client technology environment from start to finish" },
    { title: "Framework for developing IT tasks", description: "Automatizes notifications, corrective actions, reporting and other operation tasks" },
    { title: "License free", description: "No hidden licensing costs, no usage limits" },
    { title: "Simple implementation, flexible, and scalable", description: "Microservices-based architecture, ready to use in just minutes" },
    { title: "SAP BASIS ready and more", description: "Includes interfaces and knowledge for SAP ecosystem management, Linux, Windows and most database vendors" },
    { title: "Operation management through custom control panels", description: "Ideal for operation centers with diverse management and support profiles" }
  ]

  const FeatureView = ({title, description}) => {
    return (
        <div className={clsx('col col--2')}>
          <div className='box text--center'>
            <div>
              <p><strong>{title}</strong></p>
            </div>
            <div>
              <p style={{fontSize: "14px"}}>{description}</p>
            </div>
          </div>
        </div>
    );
  }

  return (
    <section className="home-features">
      <div className="features">
        <div className="container">
          <h2 className="text--center">
            <strong>Operate IT products with ease</strong>
            <br/>
            <span style={{fontWeight: 300, fontSize: "18px"}}>Modern management & monitoring</span>
          </h2>
        </div>        
      </div>
      <div><hr className="separator" /></div>
      <div className={clsx('features col col--12 container-box')}>  
        {featureList.map((props, idx) => (
            <FeatureView key={idx} {...props} />
        ))}      
      </div>
      <p className='try text--center'><a className='btn-try' href="/try">TRY ITOSS</a></p>
    </section>
  )
}