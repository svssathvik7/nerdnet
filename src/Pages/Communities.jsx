import React, { useContext, useEffect, useState } from 'react'
import Header from '../Partials/Header';
import MiniNavBar from '../Components/Navbar/MiniNavBar';
import AsideBar from '../Partials/AsideBar';
import { loaderContextProvider } from '../Context/loaderContext';
import AddPostBtn from '../Components/AddPost/AddPostBtn';
import Chat from '../Components/ChatComponents/Chat';
import CommunityLander from '../Components/CommunitiesComponents/CommunityLander';
import Loading from '../Components/LoadPage/Loading';
export default function Communities() {
  const {isLoading} = useContext(loaderContextProvider);
  const [isMobile,setIsMobile] = useState(window.innerWidth<768);
    useEffect(
        ()=>{
            setIsMobile(window.innerWidth < 768);
        }
    ,[window]);
  return (
    <div id='community-page' className=''>
      {isLoading && <Loading/>}
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
