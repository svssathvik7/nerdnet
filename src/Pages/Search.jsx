import React, { useEffect } from 'react'
import Header from '../Partials/Header';
import MiniNavBar from '../Components/Navbar/MiniNavBar';
import AsideBar from '../Partials/AsideBar';
import AddPostBtn from '../Components/AddPost/AddPostBtn';
import { connect } from 'react-redux';
import SearchSection from '../Components/SearchComponents/SearchSection';
import Chat from '../Components/ChatComponents/Chat';
function Search({data}) {
  return (
    <div id='search-page'>
      <Header />
      {data.isMobile ? <MiniNavBar /> : null}
      <div className={`flex items-center ${data.isMobile ? " justify-center " : " justify-start "}`}>
        {data.isMobile ? null : <AsideBar />}
        <SearchSection/>
      </div>
      {data.isMobile ? null : <AddPostBtn />}
      <Chat/>
    </div>
  )
}
const mapStateToProps = (state)=>{
    return {
        data : {
            isMobile : state.isMobile,
        }
    }
}
export default connect(mapStateToProps)(Search);