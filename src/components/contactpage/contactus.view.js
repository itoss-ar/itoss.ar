import emailjs from '@emailjs/browser';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";

export const ContactUs = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const form = useRef(null);

  useEffect(() => {
    const contactVideo = document.getElementById('contact_video2');
    if (contactVideo && contactVideo.play) contactVideo.play();
  }, []);

  const sendEmail = async () => {
    if (!form.current) return;
    try {
      const result = await emailjs.sendForm(
        'itoss_demo',              // service_id
        'itoss_contact_sales',     // template_id
        form.current,
        '_k-ccalcSRdg49pcK'        // public key
      );
      console.log('EmailJS OK:', result.status, result.text);
      setShowThankYou(true);
      setErrorMessage(null);
      reset();
    } catch (err) {
      console.error('EmailJS ERROR:', err);
      setErrorMessage((err && err.text) || 'Error al enviar el formulario (revisá IDs, variables y dominio).');
    }
  };

  const ThankYouView = () => (
    <div className="thank-you-message">
      <div>
        <img decoding="async" src="/img/contactform.png" width="200" height="166" alt="" />
      </div>
      <div className='title'><strong>Thank you!</strong></div>
      <h2>We appreciate you reaching out.</h2>
    </div>
  );

  const ErrorMessageView = ({ message }) => (
    <div className="error-message">
      <div><strong>Error!</strong></div>
      <p>{message}</p>
    </div>
  );

  const FormView = () => (
    <form className='contact_form' ref={form} onSubmit={handleSubmit(sendEmail)}>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'stretch'}}>
        <div style={{width: '225px', paddingLeft: '30px'}}>
          <p><label className="label">Full name</label></p>
          <p className="field">
            <input {...register("user_name", { required: true })} placeholder="Full name" />
            { errors.user_name && <span className='error'>* This field is required</span> }
          </p>

          <p><label className="label">Job Title</label></p>
          <p className="field">
            <input {...register("user_job", { required: true })} placeholder="Job Title" />
            { errors.user_job && <span className='error'>* This field is required</span> }
          </p>

          <p><label className="label">Email</label></p>
          <p className="field">
            <input
              {...register("user_email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              placeholder="Company Email"
            />
            { errors.user_email && (
              <span className='error'>* { errors.user_email?.message || 'This field is required' }</span>
            ) }
          </p>
        </div>

        <div style={{width: '375px', paddingLeft: '30px', paddingRight: '30px'}}>
          <p><label className="label">Phone (Optional)</label></p>
          <p className="field">
            <span className="form-control">
              <input {...register("user_phone")} placeholder="Phone (Optional)" />
            </span>
          </p>

          <p><label className="label">Message</label></p>
          <p style={{marginBottom: '15px'}}>
            <span className="form-control">
              <textarea
                {...register("message")}
                cols="40"
                rows="8"
                className="form-control-textarea"
                placeholder="How can we help?" />
            </span>
          </p>

          <p><input className="btn-submit" type="submit" value="Contact sales" /></p>
        </div>
      </div>

      { errorMessage ? <ErrorMessageView message={errorMessage} /> : null }
    </form>
  );

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
