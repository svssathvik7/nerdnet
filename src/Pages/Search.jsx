import React, { useEffect } from 'react'
import Header from '../Partials/Header';
import MiniNavBar from '../Components/Navbar/MiniNavBar';
import AsideBar from '../Partials/AsideBar';
import AddPostBtn from '../Components/AddPost/AddPostBtn';
import SearchSection from '../Components/SearchComponents/SearchSection';
import Chat from '../Components/ChatComponents/Chat';
export default function Search() {
  const [isMobile,setIsMobile] = useState(window.innerWidth <768);
  return (
    <div id='search-page'>
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
