import React from 'react'
import { Link } from 'react-router-dom'
import Home from '../../Pages/Home'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenValidity from '../../Utilities/TokenValidity';
import "./Navbar.css";
export default function MiniNavBar() {
  const navigate = useNavigate();
  useEffect(
    ()=>{
      TokenValidity().then((res)=>{
        if(!res){
          navigate("/");
        }
      })
      setPath(location.pathname);
    }
  ,[]);
  return (
    <div id='header-nav-links-mini' className='fixed bottom-0 left-0 right-0 h-fit mx-auto mb-2 flex items-center justify-around bg-black p-2 rounded-full'>
        <Link className='bg-[#1eb81e] text-3xl rounded-lg text-white p-1' to={Home}><FaHome/></Link>
        <Link className='text-white mx-2 my-1 text-2xl p-1' to={Home}><FaMagnifyingGlass color='white'/></Link>
        <Link className='text-white mx-2 my-1 text-2xl p-1' to={Home}><MdExplore /></Link>
        <Link className='text-white mx-2 my-1 text-2xl p-1' to={Home}><FaPeopleGroup /></Link>
        <Link className='text-white mx-2 my-1 text-2xl p-1' to={Home}><FaQuestion /></Link>
    </div>
  )
}
