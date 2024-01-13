import React, { useEffect, useState } from 'react'
import TokenValidity from '../../Utilities/TokenValidity';
import Logo from "../../assets/nerd-logo-2.svg";
import axios from 'axios';
import Post from '../Post/Post';
import { Link, useParams } from 'react-router-dom';
import "./PostView.css";
import Header from '../../Partials/Header';
import MiniNavBar from '../Navbar/MiniNavBar';
import AsideBar from '../../Partials/AsideBar';
import AddPostBtn from '../AddPost/AddPostBtn';
export default function PostView() {
    const [isAuth,setIsAuth] = useState(false);
    const [post,setPost] = useState();
    const [isMobile,setIsMobile] = useState(window.innerWidth <= 768);
    const {postId} = useParams();
    useEffect(
        ()=>{
            const checkAuth = async ()=>{
                const auth = await TokenValidity();
                setIsAuth(auth);
                try{
                    const response = (await axios.get(process.env.REACT_APP_BACKEND_URL+"/stats/posts/"+"?postId="+postId)).data;
                    if(response.status){
                        if(!isAuth)
                        {
                            const dummy = {
                                isMultimedia : response.post.isMultimedia,
                                userPosted : {
                                    dp : "https://i.pinimg.com/736x/b2/54/ea/b254ea1ec256b93c61aecb2aca62e277.jpg",
                                    username : "Nerd",
                                    email : "nerd@gmail.com",
                                    education : "Enthusiast at Nerd.net"
                                },
                                postData : response.post.postData,
                                likes : response.post.likes,
                                comments : [],
                                caption : response.post.caption,
                                dislikes : response.post.dislikes,
                                noAuth : true
                            }
                            setPost(dummy);
                        }
                        else{
                            setPost(response.post);
                        }
                    }
                    else{
                        setPost({});
                    }
                }
                catch(error)
                {
                    setPost({});
                }
            }
            checkAuth();
            setIsMobile(window.innerWidth <= 768);
        }
    )
  return (
    isAuth ? 
    <div id='post-view-page' className=''>
      <Header />
      {isMobile ? <MiniNavBar /> : null}
      <div className={`flex items-center ${isMobile ? " justify-center " : " justify-start "}`}>
        {isMobile ? null : <AsideBar />}
        <Post {...post}/>
      </div>
      {isMobile ? null : <AddPostBtn />}
    </div>
    :
    <div className='w-screen flex items-center justify-start'>
        <div className='w-screen flex items-center justify-center m-2 p-2'>
            <Link to="/"><img alt='logo' src={Logo}/></Link>
        </div>
        <div className='absolute top-0 left-0 bottom-0 right-0 m-auto w-fit flex items-center justify-center' id='post-container'>
            <Post {...post}/>
        </div>
        <div className='absolute bottom-0 flex items-center justify-center w-screen m-2 p-2'>
            <h3 className='text-white font-bold w-3/4 text-center text-2xl'>Login to Nerd.net for complete access</h3>
        </div>
    </div>
  )
}
