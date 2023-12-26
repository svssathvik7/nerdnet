import React from 'react';
import { useState,useRef,useEffect } from 'react';
import "./Post.css";
import { IoClose } from "react-icons/io5";
import { FaAngleDoubleUp } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { FaAngleDoubleDown } from "react-icons/fa";
import { RiMessage3Fill } from "react-icons/ri";
import { IoShareSocialSharp } from "react-icons/io5";
import { motion,useInView } from 'framer-motion';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Comment from '../Comments/Comment';
import { userContextProvider } from '../../Context/userContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
export default function ImagePost(props)
{
  const location = useLocation();
  const ref = useRef(null);
  const {user} = useContext(userContextProvider);
  const [showCaption,setShowCaption] = useState(false);
  const [showComments,setShowComments] = useState(false);
  const [validComment,setValidComment] = useState(false);
  const [commentData,setCommentData] = useState('');
  const [showPost,setShowPost] = useState(true);
  const [upVotes,setUpVotes] = useState(props?.likes?.length??0-props?.dislikes?.length??0);
  const [liked, setLiked] = useState(props.dummy ? false : props?.likes?.some(like => like?._id === user?._id));
  const handleUpVote = async ()=>{
    try{
      if(!liked && !props.dummy){
        const response = (await axios.post("http://localhost:3500/api/posts/changeLikes",{
          postId : props._id,
              addLike : true,
              userLiked : user._id
            })).data;
            if(response.status){
              setLiked(true);
              setUpVotes(upVotes+1);
            }
            console.log(response);
          }
        }
        catch(error){
          console.log(error);
        }
  }
  const handleDownVote = async ()=>{
    try{
      if(liked && !props.dummy){
        const response = (await axios.post("http://localhost:3500/api/posts/changeLikes",{
          postId : props._id,
          addLike : false,
          userLiked : user._id
        })).data;
        if(response.status){
          setLiked(false);
          setUpVotes(upVotes-1);
        }
      }
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(
    ()=>{
        setUpVotes(props.dummy ? 0 : props?.likes?.length??0-props?.dislikes?.length??0);
        setLiked(props.dummy ? false : props?.likes?.some(like => like?._id === user?._id));
    }
  ,[props.likes,location.pathname,handleUpVote,handleDownVote]);
  const handleCommentChange = (e) => {
    const value = e.target.value;
    setCommentData(value);
    if (value.length) {
      setValidComment(true);
    } else {
      setValidComment(false);
    }
    console.log(commentData);
  };
  
  const handleCommentSubmit = async (e)=>{
    e.preventDefault();
    try{
      const commentPostData = {
        postId : props._id,
        comment : commentData,
        user : user.email
      }
      const response = (await axios.post("http://localhost:3500/api/posts/addComment",commentPostData)).data;
      if(response.status){
        setCommentData('');
      }
      else{
        toast.error('Error posting Comment!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
    catch(error){
      toast.error('Error posting Comment!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }
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
      <div id='post-meta-data' className='flex items-center justify-between bg-yellow-400 rounded-lg border-b-2 border-black'>
        <div className='flex items-center justify-center p-2 mx-2'>
          <Link to={"/profile/"+props.userPosted.email} className='cursor-pointer'><img alt='dp' src={props.userPosted ? props.userPosted.dp : "#"} className='w-8 mx-2 cursor-pointer select-none'/></Link>
          <div className='select-none'>
            <Link to={"/profile/"+props.userPosted.email} className='font-medium text-sm cursor-pointer'>{props.userPosted ? props.userPosted.username : "Nerd"}</Link>
            <p className='text-xs font-light text-slate-600'>{props.userPosted&&props.userPosted.education ? props.userPosted.education : "Enthusiast at Nerd.net"}</p>
          </div>
        </div>
        <div id='post-close' className='text-2xl mx-2 cursor-pointer'>
          <IoClose color='red' onClick={()=>{setShowPost(!showPost)}}/>
        </div>
      </div>
      <div id='post-data' className='p-2 pt-0 overflow-hidden m-2'>
        <img alt='post' src={props.postData} className='post-images w-full h-full object-contain object-center select-none'/>
      </div>
      <div id='post-metrics' className='flex items-center justify-start p-2 mt-0 pt-0'>
        <div id='metric-btn' className='flex items-center justify-around p-2 rounded-full'>
            <button onClick={handleUpVote} className={`text-lg cursor-pointer mx-1 ${liked ? " opacity-50 " : " "}`} disabled={liked}><FaAngleDoubleUp/></button>
          <p className='select-none'>{upVotes}</p>
          <div className='text-lg cursor-pointer mx-1'><MdDescription onClick={()=>{setShowCaption(!showCaption)}}/></div>
          <button onClick={handleDownVote} className={`text-lg cursor-pointer mx-1 ${!liked? " opacity-50 " : "  "}`} disabled={!liked}><FaAngleDoubleDown/></button>
        </div>
        <div id='reach-btn' className='flex items-center justify-around'>
          <div className='text-xl cursor-pointer mx-1' onClick={()=>{setShowComments(!showComments)}}><RiMessage3Fill/></div>
          <div className='text-xl cursor-pointer mx-1'><IoShareSocialSharp/></div>
        </div>
        <input id='comment-input' className='trans300 p-2 outline-none mx-2 placeholder:text-black placeholder:font-medium placeholder:opacity-70' type='text' placeholder='Comment your words!' value={commentData} onChange={handleCommentChange} name='commentData'/>
        <button className={`text-white font-medium p-1 bg-black rounded-md trans300 hover:scale-105 ${validComment ? " cursor-pointer " : " opacity-70 cursor-not-allowed "}`} disabled={!validComment} onClick={handleCommentSubmit} type='submit'>Post</button>
      </div>
      {showCaption ? <div id='post-caption' className='w-full p-2 h-fit trans300'>
        <p className='font-medium text-base w-fit h-fit inline-block selection:bg-yellow-400'>Word by Nerd :&nbsp;</p>
        <p className='text-base w-fit h-fit inline-block selection:bg-yellow-400'>{props.caption}</p>
      </div> : <></>}
      {
        showComments ? props?.comments.length ?
        <div className='w-full'>
          {props?.comments.map((comment,i)=>(
            <div key={i} className='w-full px-2 flex items-center justify-end'>
              <Comment {...comment}/>
            </div>
          ))}
        </div>
        :
        <div className='w-full'>
          <p>No Comments!</p>
        </div>
        :
        <></>
      }
    </motion.div>
  )
}