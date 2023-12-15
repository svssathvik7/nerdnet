import React from 'react';
import { useState,useRef } from 'react';
import "./Post.css";
import { IoClose } from "react-icons/io5";
import { FaAngleDoubleUp } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { FaAngleDoubleDown } from "react-icons/fa";
import { RiMessage3Fill } from "react-icons/ri";
import { IoShareSocialSharp } from "react-icons/io5";
import { motion,useInView } from 'framer-motion';
function ImagePost(props)
{
  const ref = useRef(null);
  const [showCaption,setShowCaption] = useState(false);
  const [showPost,setShowPost] = useState(true);
  const [upVotes,setUpVotes] = useState(0);
  const isInView = useInView(ref,{
    once : false
  });
  return (
    showPost && 
    <motion.div 
    ref={ref}
    style={{
        opacity: isInView ? 1 : 0.7,
        transform: isInView ? 'translateY(0px)' : 'translateY(-30px)',
        scale: isInView ? 1 : 0.8,
    }}
    id='image-post' className={`bg-white rounded-lg flex flex-col items-center justify-center trans300`}>
      <div id='post-meta-data' className='flex items-center justify-between'>
        <div className='flex items-center justify-center p-2 mx-2'>
          <img alt='dp' src={props.userPosted ? props.userPosted.dp : "#"} className='w-8 mx-2 cursor-pointer select-none'/>
          <div className='select-none'>
            <p className='font-medium text-sm cursor-pointer'>{props.userPosted ? props.userPosted.username : "Nerd"}</p>
            <p className='text-xs font-light text-slate-600'>{props.userPosted&&props.userPosted.education ? props.userPosted.education : "Enthusiast at Nerd.net"}</p>
          </div>
        </div>
        <div id='post-close' className='text-2xl mx-2 cursor-pointer'>
          <IoClose color='red' onClick={()=>{setShowPost(!showPost)}}/>
        </div>
      </div>
      <div id='post-data' className='p-2 pt-0 overflow-hidden'>
        <img alt='post' src={props.postData} className='post-images w-full h-full object-contain object-center select-none'/>
      </div>
      <div id='post-metrics' className='flex items-center justify-start p-2 mt-0 pt-0'>
        <div id='metric-btn' className='flex items-center justify-around p-2 rounded-full'>
          <div className='text-lg cursor-pointer mx-1'><FaAngleDoubleUp onClick={()=>{setUpVotes(upVotes+1)}}/></div>
          <p className='select-none'>{upVotes}</p>
          <div className='text-lg cursor-pointer mx-1'><MdDescription onClick={()=>{setShowCaption(!showCaption)}}/></div>
          <div className='text-lg cursor-pointer mx-1'><FaAngleDoubleDown onClick={()=>{setUpVotes(upVotes-1)}}/></div>
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
    </motion.div>
  )
}
function TextPost(props)
{
  const ref = useRef(null);
  const [showPost,setShowPost] = useState(true);
  const [upVotes,setUpVotes] = useState(0);
  const isTextInView = useInView(ref,{
    once : false
  });
  return (
    showPost && <motion.div
    ref={ref}
    initial="hidden"
    style={{
        opacity: isTextInView ? 1 : 0.7,
        transform: isTextInView ? 'translateY(0px)' : 'translateY(-30px)',
        scale: isTextInView ? 1 : 0.8,
    }}
     id='text-post' className={`bg-white rounded-lg flex flex-col items-center justify-center trans300`}>
      <div id='post-meta-data' className='flex items-center justify-between'>
        <div className='flex items-center justify-center p-2 mx-2'>
          <a href='#'><img alt='dp' src={props.userPosted&&props.userPosted.dp ? props.userPosted.dp : "#"} className='w-8 mx-2 cursor-pointer select-none'/></a>
          <div className='select-none'>
            <p className='font-medium text-sm cursor-pointer'>{props.userPosted ? props.userPosted.username : "Nerd"}</p>
            <p className='text-xs font-light text-slate-600'>{props.userPosted&&props.userPosted.education ? props.userPosted.education : "Enthusiast at Nerd.net"}</p>
          </div>
        </div>
        <div id='post-close' className='text-2xl mx-2 cursor-pointer'>
          <IoClose color='red' onClick={()=>{setShowPost(!showPost)}}/>
        </div>
      </div>
      <div id='post'>
        <h6 className='font-normal m-2'>{props.postData}</h6>
      </div>
      <div id='post-metrics' className='flex items-center justify-start p-2 mt-0 pt-0'>
      <div id='metric-btn' className='flex items-center justify-around p-2 rounded-full'>
        <div className='text-lg cursor-pointer mx-1'><FaAngleDoubleUp onClick={()=>{setUpVotes(upVotes+1)}}/></div>
        <p className='select-none'>{upVotes}</p>
        <div className='text-lg cursor-pointer mx-1'><FaAngleDoubleDown onClick={()=>setUpVotes(upVotes-1)}/></div>
        </div>
        <div id='reach-btn' className='flex items-center justify-around'>
          <div className='text-xl cursor-pointer mx-1'><RiMessage3Fill/></div>
          <div className='text-xl cursor-pointer mx-1'><IoShareSocialSharp/></div>
        </div>
      </div>
    </motion.div>
  )
}
export default function Post(props) {
  return (
    <div id='post'>
      {props.isMultimedia ? 
        <ImagePost {...props}/>
      :
        <TextPost {...props}/>
      }
    </div>
  )
}
