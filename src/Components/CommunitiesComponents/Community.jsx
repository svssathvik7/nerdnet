import React, { useContext, useEffect, useState } from 'react'
import "./Community.css"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Header from '../../Partials/Header';
import Loading from '../LoadPage/Loading';
import MiniNavBar from '../Navbar/MiniNavBar';
import { loaderContextProvider } from '../../Context/loaderContext';
import { CiPen } from "react-icons/ci";
import axios from 'axios';
const CommunityDetailsBar = (props)=>{
    const [communityInfo,setCommunityInfo] = useState({
        name : "Community",
        dp : "#",
        coverPic : "#",
        subject : "NerdNet",
        description : "A NerdNet Community",
        followers : []
    });
    const path = useLocation();
    useEffect(
        ()=>{
            const fetchCommunityDetails = async()=>{
                try {
                    const response = (await axios.post(process.env.REACT_APP_BACKEND_URL+"/community/get-community-info/",{
                        name : props.community_name
                    })).data;
                    if(response.status){
                        setCommunityInfo(response.community_info);
                    }
                    else{
                        console.log("error getting community data");
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            fetchCommunityDetails();
        }
    ,[path.pathname]);
    const FormDiv = ()=>{
        return (
            <div className='text-white flex items-center justify-center flex-col my-1'>
                <p className='self-start bg-slate-500 rounded-lg p-1'>About</p>
                <div className='flex items-center justify-center'>
                    <h4 className='font-bold text-xl w-fit'>{communityInfo.name}</h4>
                    <p className='mx-1 w-fit text-sm rounded-lg bg-yellow-400 text-black'>#{communityInfo.subject}</p>
                </div>
                <p className='community-description flex items-center justify-center flex-wrap underline'>{communityInfo.description}</p>
            </div>
        )
    }
    const MetricsDiv = ()=>{
        return (
            <div className='text-white flex flex-col items-center justify-center w-full my-1'>
                <p className='self-start bg-slate-500 rounded-lg p-1'>Lifetime Metrics</p>
                <div className='flex items-center justify-around w-full p-2 flex-wrap'>
                    <p>{communityInfo?.likes??10} Likes</p>
                    <p>{communityInfo?.members??7} Nerds</p>
                    <p>{communityInfo?.posts??100} Posts</p>
                    <p>Created on {communityInfo?.age??"Some date"}</p>
                </div>
            </div>
        )
    }
    const AdminsDiv = ()=>{
        return (
            <div className='text-white flex flex-col items-center justify-center w-full my-1'>
                <p className='self-start bg-slate-500 rounded-lg p-1'>Admins</p>
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
    const {community_name} = useParams();
    const {isLoading} = useContext(loaderContextProvider);
    const [isMobile,setIsMobile] = useState(window.innerWidth <= 768);
  return (
    <div className='w-screen h-screen'>
        <Header />
        {isLoading && <Loading/>}
        {isMobile ? <MiniNavBar /> : null}
        <CommunityDetailsBar community_name={community_name}/>
    </div>
  )
}
