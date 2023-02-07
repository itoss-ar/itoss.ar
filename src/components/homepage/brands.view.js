import clsx from 'clsx';
import React from 'react';

export const Brands = () => {
    const brands = [{
      logo: '/brands/oracle-logo.png',
      brand: 'Oracle'
    },{
      logo: '/brands/sap-logo.png',
      brand: 'SAP'
    },{
      logo: '/brands/redhat-logo.png',
      brand: 'Red Hat'
    },{
      logo: '/brands/sql-server-logo.png',
      brand: 'MS SQL Server'
    },{
      logo: '/brands/sybase-logo.jpeg',
      brand: 'Sybase'
    },{
      logo: '/brands/fortinet-logo.png',
      brand: 'Fortinet'
    }];
  
    const BrandView = ({logo, brand}) => {
      return (
        <img src={logo} className="logo" alt={brand} />
      )
    }
  
    return (
      <div className="container" style={{marginTop: "10px", marginBottom: "20px"}}>
        <div className="row justify-content-center">
          <div className={clsx('col col--12')}>
            <h2 className="text--center">
              <strong>Designed to operate efficiently and securely</strong>
              <br/>
              <span style={{fontWeight: 300, fontSize: "18px"}}>many enterprises systems</span>
            </h2>
          </div>          
          <div className={clsx('col col--12 col--sm-10')}>
            <div className="logos">
            {brands.map((props, idx) => (
              <BrandView key={idx} {...props} />
            ))}
            </div>
          </div>
        </div>
      </div>
    )
}