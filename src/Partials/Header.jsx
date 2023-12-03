import React from 'react';
import NerdLogo from "../assets/nerd-logo-2.svg";
import { CgProfile } from "react-icons/cg";
import "./Header.css";
import { useState,useEffect } from 'react';
import MaxiNavBar from '../Components/Navbar/MaxiNavBar';
export default function Header() {
  const [isMobile,setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(
    ()=>{
      const handleResize = ()=>{
        setIsMobile(window.innerWidth <= 768);
      }
      window.addEventListener("resize",handleResize);
      
      return ()=>{
        window.removeEventListener("resize",handleResize);
      }
    }
  ,[]);
  return (
    <div id='header' className={`bg-black p-2 flex items-center ${isMobile ? 'justify-between' : 'justify-around'}`}>
      <div id='nerd-logo'>
        <img alt='nerd-logo' src={NerdLogo} className='w-8 m-2 cursor-wait'/>
      </div>
      {isMobile ? <></> : <MaxiNavBar/>}
      <div id='profile' className='text-3xl cursor-pointer m-2'>
        <CgProfile color='white'/>
      </div>
    </div>
  )
}
