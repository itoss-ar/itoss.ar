import emailjs from '@emailjs/browser';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";

export const ContactUs = () => {
    const [showThankYou, setShowThankYou] = useState(false);  
    const [errorMessage, setErrorMessage] = useState(null);  

    const { register, formState: { errors }, handleSubmit } = useForm();
    const form = useRef();
  
    useEffect(() => {      
      const contactVideo = document.getElementById('contact_video');   
      if(contactVideo){ 
        contactVideo.play();
      } 
  
      return () => {};    
    }, []);

    const sendEmail = (e) => {
      emailjs.sendForm('itoss_demo', 'itoss_contact_sales', form.current, '_k-ccalcSRdg49pcK')
        .then((result) => {
          setShowThankYou(true)
        }, (error) => {
          setErrorMessage(error.text);
        });
    };

    const ThankYouView = () => {
      return (
        <div className="thank-you-message">
          <div>
            <img decoding="async" src="/img/contactform.png" width="200" height="166" alt="" />
          </div>
          <div className='title'><strong>Thank you!</strong></div>
          <h2>We appreciate you reaching out.</h2>
        </div>
      )
    }   
    const ErrorMessageView = (message) => {
      return (
        <div className="error-message">
              <div><strong>Error!</strong></div>
              <p>{{message}}</p>
        </div>
      )
    }  
   /* setTimeout(() => {
      const myVideo = document.getElementById('contact_video');
      console.log(myVideo)
      
    if(myVideo) myVideo.play();
      
    }, 1000);
    */

    const FormView = () => {
      return (
        <>
        <form className='contact_form' ref={form} onSubmit={handleSubmit(sendEmail)}>   
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'stretch'}}>     
            <div style={{width: '225px', paddingLeft: '30px'}}>
              <p><label className="label">Full name</label></p>
              <p className="field">
                <input {...register("user_name", { required: true })} placeholder="Full name"  />
                { errors.user_name && <span className='error'>* This field is required</span> }
              </p>            
              <p><label className="label">Job Title</label></p>
              <p className="field">
                <input {...register("user_job", { required: true })} placeholder="Job Title" />
                { errors.user_job && <span className='error'>* This field is required</span> }
              </p>            
              <p><label className="label">Email</label></p>
              <p className="field">
                <input {...register("user_email", { required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" } })} placeholder="Company Email" />
                { errors.user_email && <span className='error'>* { (errors.user_email?.message) ? errors.user_email?.message : 'This field is required' }</span> }
              </p>
            </div>
            <div style={{width: '375px', paddingLeft: '30px', paddingRight: '30px'}}>
              <p><label className="label">Phone (Optional)</label></p>
              <p className="field">
                <span className="form-control">
                  <input {...register("user_phone", { required: false})} placeholder="Phone (Optional)" />
                </span>
              </p>
              <p><label className="label">Message</label></p>
              <p style={{marginBottom: '15px'}}>
                <span className="form-control">
                  <textarea {...register("message", { required: false })}  cols="40" rows="8" className="form-control-textarea"  placeholder="How can we help?"></textarea>
                </span>
              </p>
              <p>
                <input className="btn-submit" type="submit" value="Contact sales" />
              </p>
            </div>
          </div>
          { errorMessage ? <ErrorMessageView /> : null }          
        </form>  
      </>
    );
  }
  
    return (
      <>
        <video autoPlay muted loop id="contact_video2">
          <source src="/videos/banner_contacto.mp4" type="video/mp4"/>            
        </video>
        <div className="contact-us">
          { showThankYou ? <ThankYouView /> : <FormView /> }          
        </div>
      </>
    );
  };
  