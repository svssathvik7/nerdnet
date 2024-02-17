import React, { useContext, useEffect, useState } from 'react'
import Header from '../Partials/Header';
import MiniNavBar from '../Components/Navbar/MiniNavBar';
import AsideBar from '../Partials/AsideBar';
import AddPostBtn from '../Components/AddPost/AddPostBtn';
import SearchSection from '../Components/SearchComponents/SearchSection';
import Chat from '../Components/ChatComponents/Chat';
import { loaderContextProvider } from '../Context/loaderContext';
import Loading from '../Components/LoadPage/Loading';
export default function Search() {
  const [isMobile,setIsMobile] = useState(window.innerWidth <768);
  const {isLoading} = useContext(loaderContextProvider);
  return (
    <div id='search-page'>
    {isLoading && <Loading/>}
      <Header />
      {isMobile ? <MiniNavBar /> : null}
      <div className={`flex items-center ${isMobile ? " justify-center " : " justify-start "}`}>
        {isMobile ? null : <AsideBar />}
        <SearchSection/>
      </div>
      {isMobile ? null : <AddPostBtn />}
      <Chat/>
    </div>
  )
}
