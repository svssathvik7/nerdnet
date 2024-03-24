import React, { useContext, useEffect, useState } from 'react'
import AsideBar from '../Partials/AsideBar';
import AddPostBtn from '../Components/AddPost/AddPostBtn';
import Header from '../Partials/Header';
import MiniNavBar from '../Components/Navbar/MiniNavBar';
import ExploreFeed from '../Components/ExploreComponents/ExploreFeed';
import Chat from '../Components/ChatComponents/Chat';
import { loaderContextProvider } from '../Context/loaderContext';
import Loading from '../Components/LoadPage/Loading';
import TokenValidity from '../Utilities/TokenValidity';
import { useNavigate } from 'react-router-dom';
export default function Explore() {
  const {isLoading} = useContext(loaderContextProvider);
  const navigate = useNavigate();
    const [isMobile,setIsMobile] = useState(window.innerWidth<=768);
    useEffect(
        ()=>{
            setIsMobile(window.innerWidth <= 768);
        }
    ,[window.innerWidth]);
    useEffect(
      ()=>{
        TokenValidity().then((res)=>{
          if(res !== true){
            navigate("/");
          }
        })
      }
    ,[]);
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
