import React from 'react'
import Header from '../Partials/Header'
import AddPostBtn from '../Components/AddPost/AddPostBtn'
import ProfileSidebar from '../Components/ProfileComponents/ProfileSidebar'
import UserPosts from '../Components/ProfileComponents/UserPosts'
export default function Profile() {
  return (
    <div id='profile'>
      <Header/>
      <div id="profile-container" className='flex items-center justify-start'>
        <ProfileSidebar/>
        <UserPosts/>
      </div>
      <AddPostBtn/>
    </div>
  )
}
