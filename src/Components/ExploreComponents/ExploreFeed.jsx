import React, { useEffect } from 'react'
import Post from '../Post/Post'
import "./ExploreFeed.css";
import { useState } from 'react';
import Lottie from 'lottie-react';
import DoneAnimation from "../../assets/doneAnimation.json";
import { ThreeCircles } from 'react-loader-spinner';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {homeFeedContextProvider} from "../../Context/homeFeedContext";
import { useContext } from 'react';
export default function ExploreFeed() {
  const [isLoading,setIsLoading] = useState(true);
  const location = useLocation();
  const [posts,setPosts] = useState([]);
  useEffect(
    ()=>{
      const getPosts = async ()=>{
        const allPosts = (await axios.get(process.env.REACT_APP_BACKEND_URL+"/posts/getAllPosts")).data;
        setPosts(allPosts);
        // console.log(allPosts);
        setIsLoading(false);
      }
      getPosts();
    }
  ,[posts,location.pathname]);
  return (
    <div id='explore-feed' className='flex flex-col items-center justify-center'>
    {isLoading ? (
      <div className='w-96 flex items-center justify-center'>
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#fff"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    ) : (
      posts.length > 0 ? (
        <div id='explore-feed-scroller' className='flex flex-col items-center justify-start'>
          {posts.map((post, i) => (
            <div className='single-feed m-2' key={i}>
              <Post {...post}/>
            </div>
          ))}
        </div>
      ) : (
        <div id='feed-covered-message' className='flex items-center justify-center text-center'>
          <h1 className='text-5xl font-bold text-white'>Feed got covered!</h1>
          <Lottie animationData={DoneAnimation} className='w-64 h-fit p-0' loop={true}/>
        </div>
      )
    )}
  </div>
  )
}