import React from 'react'
import Header from '../Partials/Header'
import AddPostBtn from '../Components/AddPost/AddPostBtn'
import ProfileSidebar from '../Components/ProfileComponents/ProfileSidebar'
import UserPosts from '../Components/ProfileComponents/UserPosts'
import { connect } from 'react-redux'
function Profile({data}) {
  return (
    <div id='profile'>
      <Header/>
      <div id="profile-container" className={`flex ${data.isMobile ? " flex-col " : " "} items-center justify-start`}>
        <ProfileSidebar/>
        <UserPosts/>
      </div>
      <AddPostBtn/>
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
export default connect(mapStateToProps)(Profile);

