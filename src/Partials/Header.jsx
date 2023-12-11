import React from 'react';
import NerdLogo from "../assets/nerd-logo-2.svg";
import "./Header.css";
import { useState,useEffect } from 'react';
import MaxiNavBar from '../Components/Navbar/MaxiNavBar';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { userContextProvider } from '../Context/userContext';
export default function Header() {
  const [isMobile,setIsMobile] = useState(window.innerWidth <= 768);
  const {getUserDetails} = useContext(userContextProvider);
  const {user} = useContext(userContextProvider);
  useEffect(
    ()=>{
      const userDetailsExtraction = async ()=>{
        await getUserDetails();
      }
      userDetailsExtraction();
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
      <Link to="/profile" id='profile' className='text-3xl cursor-pointer m-2'>
        {user ? <img src={user.dp} alt='dp' className='w-10 border-white border-2'/> : <CgProfile color='black'/>}
      </Link>
    </div>
  )
}
