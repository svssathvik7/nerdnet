import React from 'react';
import { useState } from 'react';
import "./Post.css";
import { IoClose } from "react-icons/io5";
import { FaAngleDoubleUp } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { FaAngleDoubleDown } from "react-icons/fa";
import { RiMessage3Fill } from "react-icons/ri";
import { IoShareSocialSharp } from "react-icons/io5";
function ImagePost(props)
{
  const [showCaption,setShowCaption] = useState(false);
  const [showPost,setShowPost] = useState(true);
  return (
    <div id='image-post' className={`bg-white rounded-lg flex flex-col items-center justify-center ${!showPost ? "hidden" : ""}`}>
      <div id='post-meta-data' className='flex items-center justify-between'>
        <div className='flex items-center justify-center p-2 mx-2'>
          <img alt='dp' src={props.dp} className='w-8 mx-2 cursor-pointer select-none'/>
          <div>
            <p className='font-medium text-sm cursor-pointer'>{props.username}</p>
            <p className='text-xs font-light text-slate-600'>{props.education ? props.education : "Enthusiast at Nerd.net"}</p>
          </div>
        </div>
        <div id='post-close' className='text-2xl mx-2 cursor-pointer'>
          <IoClose color='red' onClick={()=>{setShowPost(!showPost)}}/>
        </div>
      </div>
      <div id='post-data' className='p-2 pt-0 overflow-hidden'>
        <img alt='post' src={props.post} className='post-images w-full h-full object-contain object-center select-none'/>
      </div>
      <div id='post-metrics' className='flex items-center justify-start p-2 mt-0 pt-0'>
        <div id='metric-btn' className='flex items-center justify-around p-2 rounded-full'>
          <div className='text-lg cursor-pointer mx-1'><FaAngleDoubleUp/></div>
          <div className='text-lg cursor-pointer mx-1'><MdDescription onClick={()=>{setShowCaption(!showCaption)}}/></div>
          <div className='text-lg cursor-pointer mx-1'><FaAngleDoubleDown/></div>
        </div>
        <div id='reach-btn' className='flex items-center justify-around'>
          <div className='text-xl cursor-pointer mx-1'><RiMessage3Fill/></div>
          <div className='text-xl cursor-pointer mx-1'><IoShareSocialSharp/></div>
        </div>
      </div>
      {showCaption ? <div id='post-caption' className='w-full p-2 h-fit trans300'>
        <p className='font-medium text-base w-fit h-fit inline-block selection:bg-yellow-400'>Word by Nerd :&nbsp;</p>
        <p className='text-base w-fit h-fit inline-block selection:bg-yellow-400'>{props.caption}</p>
      </div> : <></>}
    </div>
  )
}
function TextPost(props)
{

}
export default function Post(props) {
  console.log(props);
  return (
    <div id='post'>
      {props.isMultiMedia ? 
        <ImagePost {...props}/>
      :
        <TextPost {...props}/>
      }
    </div>
  )
}
