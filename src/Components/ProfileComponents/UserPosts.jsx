import React, { useState } from 'react'
import { useContext } from 'react'
import "./UserPosts.css";
import Post from '../Post/Post';
import { friendContextProvider } from '../../Context/friendContext';
export default function UserPosts() {
  const {userProfile} = useContext(friendContextProvider);
  const [showPosts,setShowPosts] = useState(true);
  return (
    <div id='user-posts-scroller' className='flex flex-col items-center justify-start p-2'>
      <div className='flex w-fit items-center justify-around p-1'>
        <p className={`text-white font-bold text-xl ${showPosts ? " opacity-100 " : " opacity-50 "} cursor-pointer`} onClick={()=>{setShowPosts(true)}}>Your Posts</p>
        <div className='w-[2px] h-4 bg-slate-500 mx-2 rounded-lg'></div>
        <p className={`text-white font-bold text-xl ${!showPosts ? " opacity-100 " : " opacity-50 "} cursor-pointer`} onClick={()=>{setShowPosts(false)}}>Saved Posts</p>
      </div>
      {userProfile && userProfile.posts ? 
        userProfile.posts.map((post,i)=>(
          <div className='single-feed m-2' key={i}>
            <Post {...post} userPosted={{dp:userProfile.dp,username:userProfile.username,education:userProfile.education,email:userProfile.email}} className="m-2"/>
          </div>
        ))
      :
      <div><h1 className='text-white'>Unable to retrieve posts</h1></div>}
    </div>
  )
}
