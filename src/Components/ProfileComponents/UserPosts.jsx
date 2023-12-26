import React from 'react'
import { useContext } from 'react'
import "./UserPosts.css";
import Post from '../Post/Post';
import { friendContextProvider } from '../../Context/friendContext';
export default function UserPosts() {
  const {userProfile} = useContext(friendContextProvider);
  return (
    <div id='user-posts-scroller' className='flex flex-col items-center justify-start p-2'>
      <h1 className='font-bold text-2xl m-2'>Your Posts</h1>
      {userProfile && userProfile.posts ? 
        userProfile.posts.map((post,i)=>(
          <div className='single-feed m-2' key={i}>
            <Post {...post} userPosted={{dp:userProfile.dp,username:userProfile.username,education:userProfile.education,email:userProfile.email}} className="m-2"/>
          </div>
        ))
      :
      <div><h1>Unable to retrieve posts</h1></div>}
    </div>
  )
}
