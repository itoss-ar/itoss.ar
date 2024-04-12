import clsx from 'clsx';
import React from 'react';
import { ContactUs } from './contactus.view';
setTimeout(() => {
  const myVideo = document.getElementById('myVideo');
  console.log(myVideo)
  
if(myVideo) myVideo.play();
  
}, 1000);

export default function Contactpage() {
  return (
    <>
      <div >
        <div className="features">
          <div className="container">
            <h1 className="text--center">
              <strong>Talk to our experts</strong>
            </h1>
          </div>        
        </div>
        <div><hr className="separator" /></div>
        <div className={clsx('features col col--12 container-box')}> 
          <div className={clsx('col col--3')}></div>
          <div className={clsx('col col--6')}>
            <ContactUs />
          </div>  
          <div className={clsx('col col--3')}></div>        
        </div>
      </div>
    </>
  );
}