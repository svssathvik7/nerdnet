import React, { useContext, useEffect, useState } from 'react'
import "./Community.css"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Header from '../../Partials/Header';
import Loading from '../LoadPage/Loading';
import MiniNavBar from '../Navbar/MiniNavBar';
import { loaderContextProvider } from '../../Context/loaderContext';
import { CiPen } from "react-icons/ci";
import { userContextProvider } from '../../Context/userContext';
import AddPostBtn from '../AddPost/AddPostBtn';
import Post from '../Post/Post';
import { socketContextProvider } from '../../Context/socketContext';
const CommunityDetailsBar = (props)=>{
    const {socket} = useContext(socketContextProvider)
    const [communityInfo,setCommunityInfo] = useState({
        name : "Community",
        dp : "#",
        coverPic : "#",
        subject : "NerdNet",
        description : "A NerdNet Community",
        followers : [],
        posts : []
    });
    const {user} = useContext(userContextProvider);
    const [founder,setFounder] = useState({});
    const path = useLocation();
    useEffect(
        ()=>{
            const fetchCommunityDetails = async()=>{
                try {
                    socket.emit("get-community-details",{
                        id : props?.community_id
                    },(response)=>{
                        if(response.status){
                            setCommunityInfo(response?.community_info);
                        }
                        else{
                            console.log("error getting community data");
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }
            const getFounderDetails = async ()=>{
                try {
                    socket.emit("get-community-founder",{
                        user : communityInfo.createdBy
                    },(founderData)=>{
                        if(founderData.status){
                            setFounder(founderData.user)
                        }
                        else{
                            setFounder({});
                        }
                    })
                } catch (error) {
                    console.log(error);
                    setFounder({});
                }
            }
            getFounderDetails();
            fetchCommunityDetails();
        }
    ,[path.pathname]);
    const FormDiv = ()=>{
        return (
            <div className='text-white flex items-center justify-center flex-col my-1 w-full'>
                <p className='self-start bg-slate-500 rounded-lg p-1'>About</p>
                <div className='flex items-center justify-center'>
                    <h4 className='font-bold text-3xl w-fit'>{communityInfo.name}</h4>
                    <p className='mx-1 w-fit text-sm rounded-lg bg-yellow-400 text-black'>#{communityInfo.subject}</p>
                </div>
                <p className='community-description flex items-center justify-center flex-wrap'>{communityInfo.description}</p>
            </div>
        )
    }
    const MetricsDiv = ()=>{
        return (
            <div className='text-white flex flex-col items-center justify-center w-full my-1'>
                <p className='self-start bg-slate-500 rounded-lg p-1'>Lifetime Metrics</p>
                <div className='flex items-center justify-around w-full p-2 flex-wrap'>
                    <p>{communityInfo?.likes??10} Likes</p>
                    <p>{communityInfo?.followers?.length??7} Nerds</p>
                    <p>{communityInfo?.posts?.length??100} Posts</p>
                    <p>Created on {new Date(communityInfo?.dateCreated).toLocaleString()}</p>
                </div>
            </div>
        )
    }
    const AdminsDiv = ()=>{
        return (
            <div className='text-white flex flex-col items-center justify-center w-full my-1'>
                <p className='self-start bg-slate-500 rounded-lg p-1'>Created By</p>
                <Link to={"/profile/"+founder?.email??user?.email} className='flex items-center justify-start m-2'>
                    <img src={founder?.dp??"https://cdn.icon-icons.com/icons2/2468/PNG/512/user_icon_149329.png"} alt='dp' className='w-12 rounded-lg mx-1 aspect-square'/>
                    <div>
                        <p className='font-bold'>{founder?.username??"Nerd"}</p>
                        <p className='text-base text-slate-200'>{founder?.education??"Enthusiast at NerdNet"}</p>
                    </div>
                </Link>
            </div>
        )
    }
    return (
        <div className='community-aside p-2 w-fit flex items-center justify-start flex-col overflow-y-scroll'>
            <div className='img-holder flex items-end justify-end flex-col'>
                <div className='community-cover p-1 rounded-lg bg-white opacity-60 hover:opacity-100'>
                    <img alt='cover' src={communityInfo.coverPic}/>
                </div>
                <div className='community-dp p-1 m-2 absolute bg-white rounded-full'>
                    <img className='rounded-full object-contain' alt='dp' src={communityInfo.dp}/>
                </div>
            </div>
            <FormDiv/>
            <MetricsDiv/>
            <AdminsDiv/>
        </div>
    )
}
export default function Community() {
    const {community_id} = useParams();
    const {isLoading} = useContext(loaderContextProvider);
    const [isMobile,setIsMobile] = useState(window.innerWidth <= 768);
    const [communityPosts,setCommunityPosts] = useState([]);
    const {socket} = useContext(socketContextProvider)
    useEffect(
        ()=>{
            const GetCommunityPosts = async ()=>{
                try {
                    socket.emit("get-community-details",{
                        id : community_id
                    },(response)=>{
                        if(response.status){
                            setCommunityPosts(response.community_info.posts);
                        }
                        else{
                            setCommunityPosts([]);
                        }
                    });
                } catch (error) {
                    console.log(error);
                    setCommunityPosts([]);
                }
            }
            GetCommunityPosts();
        }
    ,[]);
  return (
    <div className='w-screen h-screen'>
        <Header />
        {isLoading && <Loading/>}
        {isMobile ? <MiniNavBar /> : null}
        <div className='flex items-center justify-start'>
            <CommunityDetailsBar community_id={community_id}/>
            <div id='community-feed-scroller' className='flex-1 flex items-center justify-center'>
                {communityPosts?.map((post,i)=>(
                    <div key={i}>
                        <Post {...post}/>
                    </div>
                ))}
            </div>  
        </div>
        <AddPostBtn/>
    </div>
  )
}
