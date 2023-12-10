import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TokenValidity from '../../Utilities/TokenValidity';
import { useNavigate } from 'react-router-dom';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';
export default function MaxiNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [path,setPath] = useState(location.pathname);
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
    <div id='header-nav-links' className='flex items-center justify-around'>
        <Link className={`${path === "/home" ? "bg-[#1eb81e]" : ""} p-1 rounded-lg text-white font-medium`} to="/home">Home</Link>
        <Link className={`text-white font-medium ${path === "/explore" ? "bg-[#1eb81e]" : ""} `} to="/home">Explore</Link>
        <Link className={`text-white font-medium ${path === "/communities" ? "bg-[#1eb81e]" : ""} `} to="/home">Communitites</Link>
        <Link className={`text-white font-medium ${path === "/notifications" ? "bg-[#1eb81e]" : ""} `} to="/home">Notifications</Link>
        <Link className={`text-white font-medium ${path === "/ask" ? "bg-[#1eb81e]" : ""} `} to="/home">Ask</Link>
        <Link className='text-white font-medium' to="/home"><FaMagnifyingGlass color='white'/></Link>
    </div>
  )
}
