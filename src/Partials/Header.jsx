import React, { useState, useEffect } from 'react';
import NerdLogo from "../assets/nerd-logo-2.svg";
import "./Header.css";
import MaxiNavBar from '../Components/Navbar/MaxiNavBar';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { userContextProvider } from '../Context/userContext';
import { toast } from 'react-toastify';
export default function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [expand, setExpand] = useState(false);
  const { user } = useContext(userContextProvider);
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    toast.success('LoggedOut!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  useEffect(
    ()=>{
        setIsMobile(window.innerWidth <= 768);
    }
  ,[window.innerWidth]);

  const toggleDropdown = () => {
    setExpand(!expand);
  }

  return (
    <div id='header' className={`bg-black p-2 flex items-center ${isMobile ? 'justify-between' : 'justify-around'} border-b-2 border-slate-50`}>
      <a href='/home' id='nerd-logo'>
        <img alt='nerd-logo' src={NerdLogo} className='w-8 m-2 cursor-pointer' />
      </a>
      {isMobile ? <></> : <MaxiNavBar />}
      <div className='flex items-center justify-center relative'>
        <div onClick={toggleDropdown} className='text-3xl cursor-pointer m-2 relative'>
          {user ? <img src={user.dp} alt='dp' className='w-10 border-white border-2' /> : <CgProfile color='white' />}
        </div>
        {expand && (
          <div className='absolute bg-white p-2 top-0 rounded-md shadow-md right-0'>
            <Link to={"/profile/"+user.email} className='block text-gray-800 hover:bg-gray-200 py-1 px-2 rounded-md' onClick={()=>{setExpand(!expand)}}>
              Profile
            </Link>
            <Link to={"/profile/"+user.email} className='block text-gray-800 hover:bg-gray-200 py-1 px-2 rounded-md' onClick={()=>{setExpand(!expand)}}>Notifications</Link>
            <a href='/' className='block text-gray-800 hover:bg-gray-200 py-1 px-2 rounded-md' onClick={handleLogout}>
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
