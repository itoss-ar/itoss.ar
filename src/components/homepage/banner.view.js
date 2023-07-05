import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from 'clsx';
import React from 'react';

export const Banner = () => {
    const {siteConfig} = useDocusaurusContext();

    return (
      <>
        <header>
          <div className="hero">
            <div className="hero-main">
              <video className="hero-video" loop muted autoPlay src="/videos/homepage2.mp4"></video>               
            </div> 
          </div>
        </header>
      </>
    );
  }