import clsx from 'clsx';
import React from 'react';

export const CompleteOperation = () => { 
    return (
      <>        
        <div className="features" style={{paddingBottom: 0}}>
          <div className="container">
            <h2 className="text--center">
              <strong>Complete operation</strong>
            </h2>
          </div>        
        </div>
        <div className={clsx('features col col--12 container-box home-complete-operation')}> 
          <div className={clsx('col col--3')}>
            <ul>
              <li>Operational state</li>
              <li>KPI processing</li>
            </ul>
          </div>
          <div className={clsx('col col--3')}>
            <ul>
              <li>Lyfe cycle management</li>
              <li>Tracking</li>
            </ul>
          </div>
          <div className={clsx('col col--3')}>
            <ul>
              <li>Customer operational database</li>
              <li>Performance, configuration, security and more</li>
            </ul>
          </div>
        </div>
        <div style={{paddingTop: '20px'}}><hr className="separator-more" /></div>
      </>
    )
}