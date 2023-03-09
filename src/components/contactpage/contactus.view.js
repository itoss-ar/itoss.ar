import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
    const form = useRef();
  
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('itoss_demo', 'itoss_contact_sales', form.current, '_k-ccalcSRdg49pcK')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };
  
    return (
        <div className="contact-us">
          <div className="screen-reader-response">
            
          </div>
          <form ref={form} onSubmit={sendEmail}>
            <p><label className="label">Full name</label></p>
            <p className="field">
              <input size="40" aria-required="true" aria-invalid="false" placeholder="Full name" type="text" name="user_name" />
            </p>
            <p><label className="label">Job Title</label></p>
            <p className="field">
              <input size="40" aria-required="true" aria-invalid="false" placeholder="Job Title" value="" type="text" name="user_job" />
            </p>
            <p><label className="label">Email</label></p>
            <p className="field">
              <input size="40" aria-required="true" aria-invalid="false" placeholder="Company Email" type="email" name="user_email" />
            </p>
            <p><label className="label">Phone (Optional)</label></p>
            <p class="field">
              <span className="form-control">
                <input size="40" aria-invalid="false" placeholder="Phone (Optional)" type="text" name="user_phone" />
              </span>
            </p>
            <p><label className="label">Message</label></p>
            <p style={{marginBottom: '15px'}}>
              <span className="form-control">
                <textarea cols="40" rows="8" className="form-control-textarea" aria-invalid="false" placeholder="How can we help?" name="message"></textarea>
              </span>
            </p>
            <p>
              <input className="btn-submit" type="submit" value="Contact sales" />
            </p>
          </form>
        </div>
    );
  };
  