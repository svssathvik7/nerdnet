import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TokenValidity from '../../Utilities/TokenValidity';
import { useNavigate } from 'react-router-dom';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';
import { userContextProvider } from '../../Context/userContext';
import { useContext } from 'react';
import "./Navbar.css"
export default function MaxiNavBar() {
  const {user,getUserDetails} = useContext(userContextProvider);
  const navigate = useNavigate();
  const location = useLocation();
  const [path,setPath] = useState(location.pathname);
  const [searchQuery,setSearchQuery] = useState("");
  const handleSearchChange = (e)=>{
    setSearchQuery(e.target.value);
  }
  const handleSearchSubmit = (e)=>{
    e.preventDefault();
    setSearchQuery(searchQuery.trim());
    if(searchQuery[0]=="#" && searchQuery.length>1)
    {
      navigate("/search/filter/"+searchQuery.slice(1,));
    }
    else{
      navigate("/search/user/"+searchQuery);
    }
  }
  useEffect(
    ()=>{
      TokenValidity().then((res)=>{
        if(res!==true){
          navigate("/");
        }
      })
      setPath(location.pathname);
    }
  ,[user,location.pathname]);
  return (
    <div id='header-nav-links' className='flex items-center justify-around'>
        <Link className={`${path === "/home" ? "bg-[#1eb81e]" : ""} p-1 rounded-lg text-white font-medium`} to="/home">Home</Link>
        <Link className={`text-white font-medium ${path === "/explore" ? "bg-[#1eb81e]" : ""} p-1 rounded-lg `} to="/explore">Explore</Link>
        <Link className={`text-white font-medium ${(path).includes("/commun") ? "bg-[#1eb81e]" : ""} p-1 rounded-lg `} to="/communities">Communitites</Link>
        <div className='text-white font-medium flex items-center justify-center' to="/home"><input name='headerSearch' value={searchQuery} onChange={handleSearchChange} id='header-search' type='text' className='bg-transparent outline-none border-b-2 w-56' placeholder='Search nerds, #topics...' autoComplete='off'/><button onClick={handleSearchSubmit} className='p-1 bg-white rounded-full' disabled={!(searchQuery.length>1)}><FaMagnifyingGlass color='black'/></button></div>
    </div>
  )
}
