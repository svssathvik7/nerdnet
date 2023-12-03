import React from 'react'
import Header from '../Partials/Header'
import MiniNavBar from '../Components/Navbar/MiniNavBar'
import { useState,useEffect } from 'react'
export default function Home() {
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
    <div id='home-page' className=''>
      <Header/>
      {isMobile ? <MiniNavBar/> : <></>}
    </div>
  )
}
