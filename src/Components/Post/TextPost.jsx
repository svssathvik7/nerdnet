import React, { useEffect } from 'react';
import { useState,useRef } from 'react';
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
export default function TextPost(props)
{
  const location = useLocation();
  const [validComment,setValidComment] = useState(false);
  const [commentData,setCommentData] = useState('');
  const {user} = useContext(userContextProvider);
  const [showComments,setShowComments] = useState(false);
  const ref = useRef(null);
  const [showPost,setShowPost] = useState(true);
  const [upVotes,setUpVotes] = useState(props?.likes?.length??0-props?.dislikes?.length??0);
  const [liked, setLiked] = useState(props?.likes?.some(like => like?._id === user?._id));
  const handleUpVote = async ()=>{
    try{
      if(!liked && !props.dummy){
        const response = (await axios.post(process.env.REACT_APP_BACKEND_URL+"/posts/changeLikes",{
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
            const response = (await axios.post(process.env.REACT_APP_BACKEND_URL+"/posts/changeLikes",{
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
            setLiked(props.dummy ? false : props.likes.some(like => like?._id === user?._id));
        }
      ,[props.likes,location.pathname,handleUpVote,handleDownVote]);
      const handleCommentChange = (e) => {
    const value = e.target.value;
    setCommentData(value);
    if (value.trim().length) {
      setValidComment(true);
    } else {
      setValidComment(false);
    }
    console.log(commentData);
  };
  
  const handleCommentSubmit = async (e)=>{
    e.preventDefault();
    console.log("submitted");
    try{
      const commentPostData = {
        postId : props._id,
        comment : commentData,
        user : user.email
      }
      const response = (await axios.post(process.env.REACT_APP_BACKEND_URL+"/posts/addComment",commentPostData)).data;
      console.log(response);
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
      console.log(error);
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
      <div id='post'>
        <h6 className='font-normal m-2'>{props.postData}</h6>
      </div>
      <div id='post-metrics' className='flex items-center justify-start p-2 mt-0 pt-0'>
      <div id='metric-btn' className='flex items-center justify-around p-2 rounded-full'>
        <button onClick={handleUpVote} className={`text-lg cursor-pointer mx-1 ${liked ? " opacity-50 " : " "}`} disabled={liked}><FaAngleDoubleUp/></button>
        <p className='select-none'>{upVotes}</p>
        <button onClick={handleDownVote} className={`text-lg cursor-pointer mx-1 ${!liked? " opacity-50 " : "  "}`} disabled={!liked}><FaAngleDoubleDown/></button>
        </div>
        <div id='reach-btn' className='flex items-center justify-around'>
          <div onClick={()=>{setShowComments(!showComments)}} className='text-xl cursor-pointer mx-1'><RiMessage3Fill/></div>
          <div className='text-xl cursor-pointer mx-1'><IoShareSocialSharp/></div>
        </div>
        <input id='comment-input' className='trans300 p-2 outline-none mx-2 placeholder:text-black placeholder:font-medium placeholder:opacity-70' type='text' placeholder='Comment your words!' value={commentData} onChange={handleCommentChange} name='commentData'/>
        <button className={`text-white font-medium p-1 bg-black rounded-md trans300 hover:scale-105 ${validComment ? " cursor-pointer " : " opacity-70 cursor-not-allowed "}`} disabled={!validComment} onClick={handleCommentSubmit} type='submit'>Post</button>
      </div>
      {
        showComments ? props.comments.length ?
        <div className='w-full'>
          {props?.comments.map((comment,i)=>(
            <div key={i} className='w-full px-2 flex items-center justify-end'>
              <Comment {...comment}/>
            </div>
          ))}
        </div>
        : <h1 className='font-base'>Nothing to show!</h1>
        :
        <></>
      }
    </motion.div>
  )
}