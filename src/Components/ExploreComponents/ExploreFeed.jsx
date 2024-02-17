import React, { useEffect } from 'react'
import Post from '../Post/Post'
import "./ExploreFeed.css";
import { useState } from 'react';
import Lottie from 'lottie-react';
import DoneAnimation from "../../assets/doneAnimation.json";
import { ThreeCircles } from 'react-loader-spinner';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
export default function ExploreFeed() {
  const [isLoading,setIsLoading] = useState(true);
  const location = useLocation();
  const [posts,setPosts] = useState([]);
  const [selectedPost,setSelectedPost] = useState(null);
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
    <div id='explore-feed' className='flex items-center justify-start flex-wrap'>
    {isLoading ? (
      <div className='w-96 flex items-center justify-center self-center text-center flex-wrap'>
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
        <div id='explore-feed-scroller' className='flex items-center justify-start flex-wrap'>
          {posts.map((post, i) => (
            <div className='single-feed flex-wrap flex items-center justify-start rounded-lg' key={i} onClick={()=>{setSelectedPost(post)}}>
              {
                post?.isMultimedia ? 
                <img className='trans100 img-post-preview m-1 object-contain object-center select-none cursor-pointer rounded-lg p-2' alt='post' src={post.postData}/>
                :
                <p className='trans100 font-normal m-1 text-post-preview text-black bg-white p-2 rounded-lg cursor-pointer'>{post.postData}</p>
              }
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
    {selectedPost ? <div className='absolute w-screen h-screen flex items-center justify-center flex-col top-0 left-0 bg-[#000000a5]' onClick={()=>{setSelectedPost(null)}}>
        <div className='single-feed blue-sm mx-auto w-full self-center' onClick={(e)=>{e.stopPropagation()}}>
          <Post {...selectedPost}/>
        </div>
    </div> : <></>}
  </div>
  )
}
