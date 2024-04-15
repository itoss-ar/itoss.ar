import React, { useState } from 'react';
import { Banner } from './banner.view';
import { Brands } from './brands.view';
import { CompleteOperation } from './complete-operation.view';
import { Features } from './features.view';

/*window.addEventListener('scroll', function() {
  
  const navbar = document.querySelector('.navbar');
  console.log(navbar)
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.animation = 'slideUp 0.3s';
    navbar.style.display = 'none';
        } 

         else {
          navbar.style.animation = 'slideDown 0.3s';
          navbar.style.display = 'block';
    }
  }
});*/

export default function Homepage() {
  return (
    <>
      <Banner />
      <Features />
      <CompleteOperation />
      <section className="home-brands">
        <div className="container">
          <div className="row">
            <Brands />
          </div>                    
        </div>
      </section>
    </>
  );
}

/*
  <div className='margin-top'><hr className="separator-gray" /></div>
  <section className="features">
    <div className="container">
      <div className="row">
        <Instumentation />
      </div>          
    </div>
  </section> 
*/