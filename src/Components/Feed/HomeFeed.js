import React, { useEffect } from 'react'
import Post from '../Post/Post'
import "./HomeFeed.css";
import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {homeFeedContextProvider} from "../../Context/homeFeedContext";
import { useContext } from 'react';
export default function HomeFeed() {
  const location = useLocation();
  const [posts,setPosts] = useState([]);
  const {homeFeed,recommendHomeFeed} = useContext(homeFeedContextProvider);
  useEffect(
    ()=>{
      const getPosts = async ()=>{
        const allPosts = (await axios.get("http://localhost:3500/api/posts/getAllPosts")).data;
        setPosts(allPosts);
        recommendHomeFeed();
        // console.log(allPosts);
      }
      getPosts();
    }
  ,[posts,location.pathname]);
  return (
    <div id='home-feed' className='flex flex-col items-center justify-center'>
        {homeFeed.length > 0 ? <div id='home-feed-scroller' className='flex flex-col items-center justify-start'>
            {homeFeed.map((post,i) => (
                <div className='single-feed m-2' key={i}>
                    <Post {...post}/>
                </div>
            ))}
        </div> : <h1 className='text-5xl font-bold'>Feed got covered!</h1>}
    </div>
  )
}
