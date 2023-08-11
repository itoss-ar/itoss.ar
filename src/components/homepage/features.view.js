import clsx from 'clsx';
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

export const Features = () => { 
  const featureList = [
    { title: "Focused on IT Service Providers", icon: "/icons/it-service.png", description: "Processing key metrics, automatizes notifications, corrective actions, reporting and other operation tasks" },
    { title: "Framework for developing IT tasks", icon: "/icons/development.png", description: "Automatizes notifications, corrective actions, reporting and other operation tasks" },
    //{ title: "License free", description: "No hidden licensing costs, no usage limits" },
    { title: "Simple implementation, flexible, and scalable", icon: "/icons/simple.png", description: "Microservices-based architecture, ready to use in just minutes" },
    { title: "SAP BASIS ready and more", icon: "/icons/sap-basis.png", description: "Includes interfaces and knowledge for SAP ecosystem management, Linux, Windows and most database vendors" },
    { title: "Operation management through custom control panels", icon: "/icons/panels.png", description: "Ideal for operation centers with diverse management and support profiles" }
  ]

  const FeatureView = ({icon, title, description}) => {
    return (
        <div style={{margin: '20px', minHeight: '500px', maxHeight: '500px', height: '500px'}}>
          <div className='box text--center'>
            <div className='hide-on-hover'>
              <img src={icon}></img>
            </div>
            <div className='keep-on-hover'>
              <p><strong>{title}</strong></p>
            </div>
            <div className='show-on-hover'>
              <p style={{fontSize: "14px"}}>{description}</p>
            </div>
          </div>
        </div>
    );
  }

  const FeatureGalleryView = () => {
    const handleDragStart = (e) => e.preventDefault();
    const items = featureList.map((props, idx) => <FeatureView key={idx} {...props} onDragStart={handleDragStart} />);

    const responsive = {
      0: { items: 1 },
      576: { items: 1 },
      768: { items: 2 },
      992: { items: 3 },
      1024: { items: 3 },
      1400: { items: 5 }
    };

    return (
      <div className='features'>
        <AliceCarousel mouseTracking items={items} responsive={responsive} disableButtonsControls={false} disableDotsControls={true} paddingLeft={10} paddingRight={10} />
      </div>
    );
  }

  return (
    <>
      <section className="home-features">
        <div className="features">
          <div className="container">
            <h2 className="text--center">
              <strong>Operate IT products with ease</strong>
            </h2>
          </div>        
        </div>
        <div><hr className="separator" /></div>
        <div className={clsx('features-gallery')}> 
            <FeatureGalleryView />
        </div>
        
        <p className='try text--center'><a className='btn-try' href="/resources">TRY ITOSS</a></p>
        <p className='without-license text--center'>Without license cost - Use free</p>
      </section>
    </>
  )
}