import React, { useEffect } from 'react'
import Post from '../Post/Post'
import "./HomeFeed.css";
import { useState } from 'react';
import axios from 'axios';
export default function HomeFeed() {
  const [posts,setPosts] = useState([]);
  useEffect(
    ()=>{
      const getPosts = async ()=>{
        const allPosts = (await axios.get("http://localhost:3500/api/posts/getAllPosts")).data;
        setPosts(allPosts);
        // console.log(allPosts);
      }
      getPosts();
    }
  ,[posts]);
  return (
    <div id='home-feed' className='flex flex-col items-center justify-center'>
        {posts.length > 0 ? <div id='home-feed-scroller' className='flex flex-col items-center justify-start'>
            {posts.map((post,i) => (
                <div className='single-feed m-2' key={i}>
                    <Post {...post}/>
                </div>
            ))}
        </div> : <h1 className='text-5xl font-bold'>Feed got covered!</h1>}
    </div>
  )
}
