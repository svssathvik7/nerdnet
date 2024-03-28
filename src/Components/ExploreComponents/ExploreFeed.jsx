import React, { useContext, useEffect } from 'react'
import Post from '../Post/Post'
import "./ExploreFeed.css";
import { useState } from 'react';
import Lottie from 'lottie-react';
import DoneAnimation from "../../assets/doneAnimation.json";
import { ThreeCircles } from 'react-loader-spinner';
import axios from 'axios';
import {socketContextProvider} from "../../Context/socketContext";
import { useLocation } from 'react-router-dom';
export default function ExploreFeed() {
  const [isLoading,setIsLoading] = useState(true);
  const location = useLocation();
  const [posts,setPosts] = useState([]);
  const [selectedPost,setSelectedPost] = useState(null);
  const {socket} = useContext(socketContextProvider);
  useEffect(
    ()=>{
      const getPosts = async ()=>{
        socket.emit("get-all-posts-explore-feed",(response)=>{
          if(response.status){
            setPosts(response.data);
            setIsLoading(false);
          }
        })
      }
      getPosts();
      return ()=>{
        socket.off("get-all-posts-explore-feed");
      }
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
            <div className='single-feed flex-wrap flex items-center justify-start rounded-lg post-container relative' key={i} onClick={()=>{setSelectedPost(post)}}>
              <p className='absolute bg-yellow-500 text-black rounded-md bottom-0 right-4 px-1'>{post?.userPosted?.username}</p>
              {
                post?.isMultimedia ? 
                <img className='trans100 img-post-preview m-1 object-contain object-center select-none cursor-pointer rounded-lg p-2 bg-white' alt='post' src={post.postData}/>
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
