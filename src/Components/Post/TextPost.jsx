import React, { useEffect } from "react";
import { useState, useRef } from "react";
import "./Post.css";
import { FaAngleDoubleUp } from "react-icons/fa";
import { RiMenu3Fill } from "react-icons/ri";
import { FaAngleDoubleDown } from "react-icons/fa";
import { RiMessage3Fill } from "react-icons/ri";
import { IoShareSocialSharp } from "react-icons/io5";
import { motion, useInView } from "framer-motion";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Comment from "../Comments/Comment";
import { userContextProvider } from "../../Context/userContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
export default function TextPost(props) {
  const location = useLocation();
  const [validComment, setValidComment] = useState(false);
  const [commentData, setCommentData] = useState("");
  const { user } = useContext(userContextProvider);
  const [showComments, setShowComments] = useState(false);
  const ref = useRef(null);
  const [showPost, setShowPost] = useState(false);
  const [upVotes, setUpVotes] = useState(
    props?.likes?.length ?? 0 - props?.dislikes?.length ?? 0
  );
  const [liked, setLiked] = useState(
    props.noAuth ? true : props?.likes?.some((like) => like?._id === user?._id)
  );
  const [isSameUser,setIsSameUser] = useState((props?.userPosted?._id??0)==(user?._id??1));
  const handleUpVote = async () => {
    try {
      if (!liked) {
        const response = (
          await axios.post(
            process.env.REACT_APP_BACKEND_URL + "/posts/changeLikes",
            {
              postId: props._id,
              addLike: true,
              userLiked: user._id,
            }
          )
        ).data;
        if (response.status) {
          setLiked(true);
          setUpVotes((prevValue) => prevValue + 1);
        }
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDownVote = async () => {
    try {
      if (liked) {
        const response = (
          await axios.post(
            process.env.REACT_APP_BACKEND_URL + "/posts/changeLikes",
            {
              postId: props._id,
              addLike: false,
              userLiked: user._id,
            }
          )
        ).data;
        if (response.status) {
          setLiked(false);
          setUpVotes((prevValue) => prevValue - 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setUpVotes(
      props.noAuth ? 0 : props?.likes?.length ?? 0 - props?.dislikes?.length ?? 0
    );
    setLiked(
      props.noAuth ? 0 : props?.likes?.some((like) => like?._id === user?._id)
    );
    setIsSameUser((props?.userPosted?._id??0)==(user?._id??1));
    // console.log(props);
  }, [props.likes, location.pathname]);
  const handleCommentChange = (e) => {
    const value = e.target.value;
    setCommentData(value);
    if (value.trim().length) {
      setValidComment(true);
    } else {
      setValidComment(false);
    }
    // console.log(commentData);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    try {
      const commentPostData = {
        postId: props._id,
        comment: commentData,
        user: user.email,
      };
      const response = (
        await axios.post(
          process.env.REACT_APP_BACKEND_URL + "/posts/addComment",
          commentPostData
        )
      ).data;
      console.log(response);
      if (response.status) {
        setCommentData("");
      } else {
        toast.error("Error posting Comment!", {
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
    } catch (error) {
      console.log(error);
      toast.error("Error posting Comment!", {
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
  };
  const isTextInView = useInView(ref, {
    once: false,
  });
  const handleShareClick = ()=>{
    navigator.clipboard.writeText(process.env.REACT_APP_FRONTEND_HOST+"/posts/"+props._id);
  }
  const handlePostSave = async ()=>{
    try{
      setShowPost(!showPost);
      const response = (await axios.post(process.env.REACT_APP_BACKEND_URL+"/posts/savePost",{
        userId : user._id,
        postId : props._id,
        operation : "add"
      })).data;
      if(response.status){
        console.log("Success");
      }
      else{
        console.log(response);
      }
    }
    catch(error){
      console.log(error);
    }
  }
  const handlePostDelete = async ()=>{
    try {
      setShowPost(!showPost);
      const response = (await axios.post(process.env.REACT_APP_BACKEND_URL+"/posts/deletePost",{
        postId : props._id
      })).data;
      if(response.status){
        console.log("Successfull deletion!");
      }
      else{
        throw new Error("Failed to delete due to : "+response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    (
      <motion.div
        ref={ref}
        initial="hidden"
        style={{
          opacity: isTextInView ? 1 : 0.7,
          transform: isTextInView ? "translateY(0px)" : "translateY(-30px)",
          scale: isTextInView ? 1 : 0.8,
        }}
        id="text-post"
        className={`bg-white rounded-lg flex flex-col items-center justify-center trans300 z-10`}
      >
        <div
          id="post-meta-data"
          className={`${props.noAuth ? " pointer-events-none " : "  " } flex items-center justify-between rounded-lg bg-yellow-400 border-b-2 border-black mb-1`}
        >
          <div className="flex items-center justify-center p-2 mx-2">
            <Link
              to={"/profile/" + props?.userPosted?.email}
              className="cursor-pointer"
            >
              <img
                alt="dp"
                src={props.userPosted ? props.userPosted.dp : "#"}
                className="w-8 mx-2 cursor-pointer select-none"
              />
            </Link>
            <div className="select-none">
              <Link
                to={"/profile/" + props?.userPosted?.email}
                className="font-medium text-sm cursor-pointer"
              >
                {props.userPosted ? props.userPosted.username : "Nerd"}
              </Link>
              <p className="text-xs font-light text-slate-600">
                {props.userPosted && props.userPosted.education
                  ? props.userPosted.education
                  : "Enthusiast at Nerd.net"}
              </p>
            </div>
          </div>
          <div id="post-close" className={`${showPost ? " relative m-2 " : " "} text-2xl mx-2 cursor-pointer h-fit flex flex-col items-center justify-start`}>
            <RiMenu3Fill
              color="black"
              onClick={() => {
                setShowPost(!showPost);
              }}
              className='hover:scale-110 trans100'
            />
            {showPost ? 
            <div className="bg-white p-1 text-sm rounded-md border-black border-2 trans300">
              <p onClick={handlePostSave} className="border-2 px-1 border-black m-1">Save</p>
              {isSameUser ? <p onClick={handlePostDelete} className="border-2 border-black m-1">Delete</p> : <></>}
            </div> : <></>}
          </div>
        </div>
        <div id="post">
          {!showPost ? <h6 className="trans100 font-normal m-2">{props.postData}</h6> : <></>}
        </div>
        <div
          id="post-metrics"
          className={`${props.noAuth ? " pointer-events-none blur-sm " : "  "} flex items-center justify-center p-2 mt-0 pt-0 w-full`}
        >
          <div
            id="metric-btn"
            className="flex items-center justify-around p-2 rounded-full"
          >
            <button
              onClick={handleUpVote}
              className={`text-lg cursor-pointer mx-1 ${
                liked ? " opacity-50 " : " "
              }`}
              disabled={liked}
            >
              <FaAngleDoubleUp className="active:scale-110 hover:scale-110"/>
            </button>
            <p className="select-none">{upVotes}</p>
            <button
              onClick={handleDownVote}
              className={`text-lg cursor-pointer mx-1 ${
                !liked ? " opacity-50 " : "  "
              }`}
              disabled={!liked}
            >
              <FaAngleDoubleDown className="active:scale-110 hover:scale-110"/>
            </button>
          </div>
          <div id="reach-btn" className="flex items-center justify-around">
            <div
              onClick={() => {
                setShowComments(!showComments);
              }}
              className="text-xl cursor-pointer mx-1"
            >
              <RiMessage3Fill className="active:scale-110 hover:scale-110"/>
            </div>
            <div className="text-xl cursor-pointer mx-1">
              <IoShareSocialSharp onClick={handleShareClick} className="active:scale-110 hover:scale-110"/>
            </div>
          </div>
          <input
            id="comment-input"
            className="trans300 p-2 outline-none mx-2 placeholder:text-black placeholder:font-medium placeholder:opacity-70 border-b-2 hover:border-black"
            type="text"
            placeholder="Comment your words!"
            value={commentData}
            onChange={handleCommentChange}
            name="commentData"
          />
          <button
            className={`text-white font-medium p-1 bg-black rounded-md trans300 hover:scale-105 ${
              validComment
                ? " cursor-pointer "
                : " opacity-70 cursor-not-allowed "
            }`}
            disabled={!validComment}
            onClick={handleCommentSubmit}
            type="submit"
          >
            Post
          </button>
        </div>
        {showComments ? (
          props.comments.length ? (
            <div className="w-full">
              {props?.comments.map((comment, i) => (
                <div
                  key={i}
                  className="w-full flex items-center justify-end"
                >
                  <Comment {...comment} />
                </div>
              ))}
            </div>
          ) : (
            <h1 className="font-base">Nothing to show!</h1>
          )
        ) : (
          <></>
        )}
      </motion.div>
    )
  );
}
