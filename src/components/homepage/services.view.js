import clsx from 'clsx';
import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export const Services = () => { 
  const tabs = [
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
        "Choose ITOSS for all your IT management needs and experience a more efficient and effective way of managing your infrastructure and products. Contact us today to learn more about our services."
      ] 
    },
  ]

  return (
    <section className="home-services">
      <div className="services">
        <div className="container">
          <h2 className="text--center">
            <strong>Services</strong>
          </h2>
        </div>        
      </div>
      <div className={clsx('services col col--12 container-box')}> 
        
          <Tabs>
            {tabs.map((props, idx) => (
                <TabItem value={idx} label={props.title}>
                    <ul className='items'>
                      {props.items.map((item) => (
                          <li className='item'>{item}</li>
                      ))}
                    </ul>
                </TabItem>
            ))}   
          </Tabs>

      </div>
    </section>
  )
}