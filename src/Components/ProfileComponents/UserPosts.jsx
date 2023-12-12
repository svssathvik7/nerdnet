import React from 'react'
import { useContext } from 'react'
import { userContextProvider } from '../../Context/userContext'
import "./UserPosts.css";
import Post from '../Post/Post';
export default function UserPosts() {
  const {user} = useContext(userContextProvider);
  return (
    <div id='user-posts-scroller' className='flex flex-col items-center justify-start p-2'>
      <h1 className='font-bold text-2xl m-2'>Your Posts</h1>
      {user && user.posts ? 
        user.posts.map(post=>(
          <div className='single-feed m-2' key={post.id}>
            <Post {...post} className="m-2"/>
          </div>
        ))
      :
      <div><h1>Unable to retrieve posts</h1></div>}
    </div>
  )
}
