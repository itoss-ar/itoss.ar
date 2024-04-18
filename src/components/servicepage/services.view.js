import clsx from 'clsx';
import React, { useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

export const Services = () => { 
  const serviceList = [
    { title: "Software Support", 
      icon: "/icons/support.png",
      items: [
        "Our basic support package provides you with 24/7 technical support to ensure your software runs smoothly.",
        "Our premium support package offers personalized support from a dedicated technical support representative and priority response times."
      ] 
    },
    { title: "Implementation", 
      icon: "/icons/implementation.png",
      items: [
        "Our team of experts will work with you to ensure a seamless implementation of the ITOSS software in your infrastructure.",
        "From pre-implementation planning to post-implementation support, we have you covered. "
      ] 
    },
    { title: "Training", 
      icon: "/icons/training.png",
      items: [
        "Our training program is designed to provide your team with the skills and knowledge they need to effectively use the ITOSS software.",
        "Our training sessions can be customized to meet your specific needs. "
      ] 
    },
    { title: "Administration Services", 
      icon: "/icons/administration-service.png",
      items: [
        "Our administration services are designed to help you manage your IT infrastructure and products more effectively.",
        "Our team of experts will work with you to develop a customized solution that meets your unique needs.",
        "Choose ITOSS for all your IT management needs and experience a more efficient and effective way of managing your infrastructure and products."
      ] 
    },
  ];

  const ServiceView = ({icon, title, items}) => {
    return (
        <div  style={{margin: '20px', minHeight: '650px', maxHeight: '650px', height: '650px', fontSize: "115%"}}>
          <div className='box text--center'>
            <div className='hide-on-hover' style={{marginTop: "-15px"}}>
              <img src={icon}></img>
            </div>
            <div className='keep-on-hover' style={{marginTop: "-15px"}}>
              <p><strong>{title}</strong></p>
            </div>
            <div>
              <ul className='items' style={{ fontSize: "16px", textAlign: "left"}}>
                  {items.map((item, idx) => (
                      <li key={idx} className='item' style={{paddingBottom: "15px"}}>{item}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
    );
  }

  const ServiceGalleryView = () => {
    const handleDragStart = (e) => e.preventDefault();
    const items = serviceList.map((props, idx) => <ServiceView key={idx} {...props} onDragStart={handleDragStart} />);

    const responsive = {
      0: { items: 1 },
      576: { items: 1 },
      768: { items: 2 },
      992: { items: 3 },
      1024: { items: 3 },
      1400: { items: 4 },
      1600: { items: 5 }
    };

    return (
      <div className='features'>
        <AliceCarousel mouseTracking items={items} responsive={responsive} disableButtonsControls={false} disableDotsControls={true} paddingLeft={10} paddingRight={10} />
      </div>
    );
  }

  /*setTimeout(() => {
    const myVideo = document.getElementById('service_video');
    console.log(myVideo)
    
  if(myVideo) myVideo.play();
    
  }, 1000);*/

  useEffect(() => {      
    const serviceVideo = document.getElementById('service_video');   
    if(serviceVideo){ 
      serviceVideo.play();
    } 

    return () => {};    
  }, []);

  return (
    <>
      <video autoPlay muted loop id="service_video">
        <source src="/videos/banner_servicios.mp4" type="video/mp4"/>            
      </video>
      <section className="home-features" style={{paddingTop: "0px"}}>
        <div className="features" style={{position: "relative", marginTop: "0px"}}>
          <div className="container">
            <h1 className="text--center">
              <strong>Explore our services</strong>
            </h1>
          </div>        
        </div>        
        <div className={clsx('features col col--12 container-box')} style={{}}>         
          <ServiceGalleryView />
        </div>
      </section>
    </>
  )
}