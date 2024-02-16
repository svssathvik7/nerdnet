import React, { useEffect, useState } from 'react'
import Header from '../Partials/Header';
import MiniNavBar from '../Components/Navbar/MiniNavBar';
import AsideBar from '../Partials/AsideBar';
import AddPostBtn from '../Components/AddPost/AddPostBtn';
import Chat from '../Components/ChatComponents/Chat';
import CommunityLander from '../Components/CommunitiesComponents/CommunityLander';
export default function Communities() {
  const [isMobile,setIsMobile] = useState(window.innerWidth<768);
    useEffect(
        ()=>{
            setIsMobile(window.innerWidth < 768);
        }
    ,[window]);
  return (
    <div id='home-page' className=''>
      <Header />
      {isMobile ? <MiniNavBar /> : null}
      <div className={`flex items-center ${isMobile ? " justify-center " : " justify-start "}`}>
        {/* {isMobile ? null : <AsideBar />} */}
      <CommunityLander/>
      </div>
      {isMobile ? null : <AddPostBtn />}
      <Chat/>
    </div>
  );
}
