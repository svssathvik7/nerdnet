import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../Partials/Header';
import MiniNavBar from '../Components/Navbar/MiniNavBar';
import HomeFeed from '../Components/Feed/HomeFeed';
import AddPostBtn from '../Components/AddPost/AddPostBtn';
import AsideBar from '../Partials/AsideBar';
export default function Home() {
  const [isMobile,setIsMobile] = useState(window.innerWidth<768);
    useEffect(
        ()=>{
            setIsMobile(window.innerWidth < 768);
        }
    ,[window.innerWidth]);
  return (
    <div id='home-page' className=''>
      <Header />
      {isMobile ? <MiniNavBar /> : null}
      <div className={`flex items-center ${isMobile ? " justify-center " : " justify-start "}`}>
        {isMobile ? null : <AsideBar />}
        <HomeFeed />
      </div>
      {isMobile ? null : <AddPostBtn />}
    </div>
  );
}