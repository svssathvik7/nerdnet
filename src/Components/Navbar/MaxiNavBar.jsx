import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import TokenValidity from '../../Utilities/TokenValidity';
import { useNavigate } from 'react-router-dom';
import { FaMagnifyingGlass } from "react-icons/fa6";
export default function MaxiNavBar() {
  const navigate = useNavigate();
  useEffect(
    ()=>{
      TokenValidity().then((res)=>{
        if(!res){
          navigate("/");
        }
      })
    }
  ,[]);
  return (
    <div id='header-nav-links' className='flex items-center justify-around'>
        <Link className='bg-[#1eb81e] p-1 rounded-lg text-white font-medium' to="/home">Home</Link>
        <Link className='text-white font-medium' to="/home">Explore</Link>
        <Link className='text-white font-medium' to="/home">Communities</Link>
        <Link className='text-white font-medium' to="/home">Notifications</Link>
        <Link className='text-white font-medium' to="/home">Ask</Link>
        <Link className='text-white font-medium' to="/home"><FaMagnifyingGlass color='white'/></Link>
    </div>
  )
}
