import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import "./UserPosts.css";
import Post from '../Post/Post';
import { friendContextProvider } from '../../Context/friendContext';
import { userContextProvider } from '../../Context/userContext';
export default function UserPosts() {
  const {userProfile} = useContext(friendContextProvider);
  const {user} = useContext(userContextProvider);
  const [showPosts,setShowPosts] = useState(true);
  // useEffect(()=>{console.log(userProfile.savedPosts)})
  return (
    <div id='user-posts-scroller' className='flex flex-col items-start justify-start p-2'>
      <div className='flex w-full items-center justify-center p-1'>
        <p className={`text-white font-bold text-xl ${showPosts ? " opacity-100 " : " opacity-50 "} cursor-pointer`} onClick={()=>{setShowPosts(true)}}>Your Posts</p>
        {(userProfile?._id??0 == user?._id??1) && <div className='w-[2px] h-4 bg-slate-500 mx-2 rounded-lg'></div>}
        {(userProfile?._id??0 == user?._id??1) && <p className={`text-white font-bold text-xl ${!showPosts ? " opacity-100 " : " opacity-50 "} cursor-pointer`} onClick={()=>{setShowPosts(false)}}>Saved Posts</p>}
      </div>
      {showPosts ? userProfile && userProfile.posts ? 
        userProfile.posts.map((post,i)=>(
          <div className='single-feed m-2' key={i}>
            <Post {...post} userPosted={{dp:userProfile.dp,username:userProfile.username,education:userProfile.education,email:userProfile.email}} className="m-2"/>
          </div>
        ))
      :
      <div><h1 className='text-white'>Unable to retrieve posts</h1></div>
      : userProfile && userProfile.savedPosts ? 
          userProfile.savedPosts.map((post,i)=>(
            <div key={i} className='single-feed m-2'>
            {/* <p className='text-black'>{post}</p> */}
              <Post {...post} className="m-2"/>
            </div>
          ))
      : <></>}
    </div>
  )
}
