import React, { useContext, useEffect, useState } from 'react'
import Header from '../Partials/Header';
import MiniNavBar from '../Components/Navbar/MiniNavBar';
import AsideBar from '../Partials/AsideBar';
import { loaderContextProvider } from '../Context/loaderContext';
import AddPostBtn from '../Components/AddPost/AddPostBtn';
import Chat from '../Components/ChatComponents/Chat';
import CommunityLander from '../Components/CommunitiesComponents/CommunityLander';
import Loading from '../Components/LoadPage/Loading';
import { useNavigate } from 'react-router-dom';
import TokenValidity from '../Utilities/TokenValidity';
export default function Communities() {
  const {isLoading} = useContext(loaderContextProvider);
  const [isMobile,setIsMobile] = useState(window.innerWidth<768);
  const navigate = useNavigate();
    useEffect(
        ()=>{
            setIsMobile(window.innerWidth < 768);
        }
    ,[window]);
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
