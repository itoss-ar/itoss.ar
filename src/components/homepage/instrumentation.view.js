import clsx from 'clsx';
import React from 'react';

const SvgView = require('@site/static/img/Software Integration System Development & Deployment.svg').default;

export const Instumentation = () => {
    return (    
      <div className={clsx('col col--12')} style={{marginTop: "10px"}}>
        <div className="text--center padding-horiz--md">
            <h2 className="text--center">
              <strong>ITOSS provides a set of instrumentations</strong>
              <br/>
              <span style={{fontWeight: 300, fontSize: "18px"}}>for modern management of most technologies</span>
            </h2>
          <div className="text--center">
            <SvgView className="featureSvg" role="img" />
          </div>
          <p><strong>Jdbc, SAP (RFC), API Rest, PowerShell, SSH, and more.</strong></p>
        </div>
      </div>
    );
}
  