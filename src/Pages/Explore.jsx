import React, { useContext, useEffect, useState } from 'react'
import AsideBar from '../Partials/AsideBar';
import AddPostBtn from '../Components/AddPost/AddPostBtn';
import Header from '../Partials/Header';
import MiniNavBar from '../Components/Navbar/MiniNavBar';
import ExploreFeed from '../Components/ExploreComponents/ExploreFeed';
import Chat from '../Components/ChatComponents/Chat';
import { loaderContextProvider } from '../Context/loaderContext';
import Loading from '../Components/LoadPage/Loading';
export default function Explore() {
  const {isLoading} = useContext(loaderContextProvider);
    const [isMobile,setIsMobile] = useState(window.innerWidth<=768);
    useEffect(
        ()=>{
            setIsMobile(window.innerWidth <= 768);
        }
    ,[window.innerWidth]);
    return (
        <div id='explore-page' className=''>
          {isLoading && <Loading/>}
          <Header />
          {isMobile ? <MiniNavBar /> : <></>}
          <div className={`flex items-center ${isMobile ? " justify-center " : " justify-start "}`}>
            {isMobile ? <></> : <AsideBar />}
            <ExploreFeed/>
          </div>
          {isMobile ? <></> : <AddPostBtn />}
          <Chat/>
        </div>
    );
}
