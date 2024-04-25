import clsx from 'clsx';
import React from 'react';

export const Brands = () => {
    const brands = [{
      logo: '/brands/logo-java.png',
      brand: 'Java'
    },{
      logo: '/brands/logo-spring.png',
      brand: 'Spring'      
    },{
      logo: '/brands/logo-postgresql.png',
      brand: 'PostgreSQL'
    },{
      logo: '/brands/logo-timescale.png',
      brand: 'TimescaleDB'
    },{
      logo: '/brands/logo-angular.png',
      brand: 'Angular'
    }];
  
    const BrandView = ({logo, brand}) => {
      return (
        <img src={logo} className="logo" alt={brand} />
      )
    }
  
    return (
      <div className="container" style={{ backgroundColor:"#212121", marginTop: "10px", marginBottom: "20px"}}>
        <div className="row justify-content-center">
          <div className={clsx('col col--12')}>
            <h2 className="text--center" style={{color: "##ffffff"}}>
              <strong>Built on based on open and modern technologies.</strong>              
            </h2>
            <hr className='separator'/>
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
