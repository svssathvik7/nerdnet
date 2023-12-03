import React from 'react';
import NerdLogo from "../assets/nerd-logo.svg";
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import Home from '../Pages/Home';
import { FaMagnifyingGlass } from "react-icons/fa6";
import "./Header.css";
export default function Header() {
  return (
    <div id='header' className='bg-black p-2 flex items-center justify-around'>
      <div id='nerd-logo'>
        <img alt='nerd-logo' src={NerdLogo} className='w-8 m-2 cursor-wait'/>
      </div>
      <div id='header-nav-links' className='flex items-center justify-around'>
        <Link className='bg-[#1eb81e] p-1 rounded-lg text-white font-medium' to={Home}>Home</Link>
        <Link className='text-white font-medium' to={Home}>Explore</Link>
        <Link className='text-white font-medium' to={Home}>Communities</Link>
        <Link className='text-white font-medium' to={Home}>Notifications</Link>
        <Link className='text-white font-medium' to={Home}>Ask</Link>
        <Link className='text-white font-medium' to={Home}><FaMagnifyingGlass color='white'/></Link>
      </div>
      <div id='profile' className='text-3xl cursor-pointer'>
        <CgProfile color='white'/>
      </div>
    </div>
  )
}
