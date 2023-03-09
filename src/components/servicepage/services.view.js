import clsx from 'clsx';
import React from 'react';

export const Services = () => { 
  const serviceList = [
    { title: "Software Support", 
      items: [
        "Our basic support package provides you with 24/7 technical support to ensure your software runs smoothly.",
        "Our premium support package offers personalized support from a dedicated technical support representative and priority response times."
      ] 
    },
    { title: "Implementation", 
      items: [
        "Our team of experts will work with you to ensure a seamless implementation of the ITOSS software in your infrastructure.",
        "From pre-implementation planning to post-implementation support, we have you covered. "
      ] 
    },
    { title: "Training", 
      items: [
        "Our training program is designed to provide your team with the skills and knowledge they need to effectively use the ITOSS software.",
        "Our training sessions can be customized to meet your specific needs. "
      ] 
    },
    { title: "Administration Services", 
      items: [
        "Our administration services are designed to help you manage your IT infrastructure and products more effectively.",
        "Our team of experts will work with you to develop a customized solution that meets your unique needs.",
        "Choose ITOSS for all your IT management needs and experience a more efficient and effective way of managing your infrastructure and products."
      ] 
    },
  ]

  const ServiceView = ({title, items}) => {
    return (
        <div className={clsx('col col--3')}>
          <div className='box text--center'>
            <div>
              <p><strong>{title}</strong></p>
            </div>
            <div>
              <ul className='items' style={{ fontSize: "14px", textAlign: "left"}}>
                  {items.map((item, idx) => (
                      <li key={idx} className='item' style={{paddingBottom: "15px"}}>{item}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
    );
  }

  return (
    <>
      <section className="home-features" style={{paddingTop: "0px", backgroundImage: "none"}}>
        <div className="features">
          <div className="container">
            <h1 className="text--center">
              <strong>Services</strong>
            </h1>
          </div>        
        </div>
        <div><hr className="separator" /></div>
        <div className={clsx('features col col--12 container-box')}> 
          {serviceList.map((props, idx) => (
              <ServiceView key={idx} {...props} />
          ))}   
        </div>
      </section>


    </>
  )
}