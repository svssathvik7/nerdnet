import React from 'react'
import IntroBg from "../assets/nerd-intro.png";
import IntroBgMobile from "../assets/nerd-intro-mobile.png";
import Login from '../Components/Login';
import { useState,useEffect } from 'react';
export default function Landing() {
  const [isMobile,setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(
    ()=>{
      const handleResize = ()=>{
        setIsMobile(window.innerWidth <= 768);
      }
      window.addEventListener('resize',handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  ,[]);
  return (
    <div>
      <img src={isMobile ? IntroBgMobile : IntroBg} alt='Introbg'
        className='absolute -z-10 opacity-50 object-cover h-screen w-[100%] top-0 left-0'
      />
      <Login/>
    </div>
  )
}
