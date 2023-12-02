import React from 'react'
import IntroBg from "../assets/nerd-intro.png";
import IntroBgMobile from "../assets/nerd-intro-mobile.png";
import { useState,useEffect } from 'react';
import Register from '../Components/Signup/Register';
export default function RegisterPage() {
  const [isMobile,setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(
    ()=>{
      const handleResize = ()=>{
        setIsMobile(window.innerWidth <= 768);
      }
      window.addEventListener("resize",handleResize);
      // good practise to remote this on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  ,[]);
  return (
    <div id='registration-page'>
      <img src={isMobile ? IntroBgMobile : IntroBg} alt='Introbg'
        className='absolute -z-10 opacity-50 object-cover h-screen w-[100%] top-0 left-0'
      />
      <Register/>
    </div>
  )
}
