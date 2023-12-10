import React from 'react';
import "./AboutLanding.css";
import Logo from "../assets/nerd-logo-2.svg";
import HeroPic from "../assets/hero-pic.png";
export default function AboutLanding() {
  return (
    <div id='about-landing' className='bg-black w-screen h-fit'>
      <div id='about-header' className='flex items-center justify-center p-2'>
        <img className='w-8' alt='logo' src={Logo}/>
      </div>
      <div id='about-hero'>
        
      </div>
    </div>
  )
}
