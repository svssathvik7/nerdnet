import React, { useState, useEffect } from 'react';
import NerdLogo from "../assets/nerd-logo-2.svg";
import "./Header.css";
import MaxiNavBar from '../Components/Navbar/MaxiNavBar';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { userContextProvider } from '../Context/userContext';
import { toast } from 'react-toastify';
import { IoMdClose } from "react-icons/io";
import { statContextProvider } from '../Context/statContext';
export default function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [expand, setExpand] = useState(false);
  const { user } = useContext(userContextProvider);
  const {getStats} = useContext(statContextProvider);
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
    useEffect(
      ()=>{
        getStats();
      }
    ,[user]);
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
          {user ? <img src={user?.dp} alt='dp' className='w-10 aspect-square object-cover border-white border-2' /> : <CgProfile color='white' />}
        </div>
        {expand && (
          <div className='the-menu-head absolute top-0 bg-white p-2 rounded-md shadow-md right-0'>
            <button onClick={()=>{setExpand(false)}} className='block text-red-600 hover:bg-gray-200 py-1 px-2 rounded-md font-extrabold mx-auto'><IoMdClose /></button>
            <Link to={"/profile/"+user.email} className='block text-gray-800 hover:bg-gray-200 py-1 px-2 rounded-md' onClick={()=>{setExpand(!expand)}}>
              Profile
            </Link>
            <a href='/' className='block text-gray-800 hover:bg-gray-200 py-1 px-2 rounded-md' onClick={handleLogout}>
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
