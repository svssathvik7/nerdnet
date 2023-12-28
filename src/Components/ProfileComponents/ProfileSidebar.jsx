import React, { useEffect } from 'react'
import { userContextProvider } from '../../Context/userContext'
import { useContext } from 'react'
import { CgProfile } from 'react-icons/cg';
import { SiNamebase } from "react-icons/si";
import { MdMarkEmailRead } from "react-icons/md";
import { IoIosSchool } from "react-icons/io";
import { FaImages } from "react-icons/fa6";
import { useState } from 'react';
import PopUp from './PopUp/PopUp';
import "./ProfileSidebar.css";
import { useLocation } from 'react-router-dom';
import {friendContextProvider} from "../../Context/friendContext";
import { PulseLoader } from 'react-spinners';
import ProfileGraphVisualiser from './ProfileGraphVisualiser';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function ProfileSidebar() {
    const [loading,setIsLoading] = useState(false);
    const {user} = useContext(userContextProvider);
    const {userProfile,getUserProfile} = useContext(friendContextProvider);
    const [isSameUser,setIsSameUser] = useState(false);
    const [followers,setFollowers] = useState(userProfile?.followers?.length ?? 0);
    const [following,setFollowing] = useState(userProfile?.following?.length ?? 0);
    const [communities,setCommunities] = useState(userProfile?.communities?.length ?? 0);
    const [isFollowing,setIsFollowing] = useState(userProfile?userProfile.isfollowing : false);
    const {profileemail} = useParams();
    const location = useLocation();
    const [showFollowers,setShowFollowers] = useState(false);
    const [showFollowing,setShowFollowing] = useState(false);
    useEffect(
        ()=>{
            const miniUtilities = async()=>{
                if(user?.email){
                    const userType = await user.email === profileemail;
                    setIsSameUser(userType);
                    getUserProfile(profileemail ? profileemail : user.email);
                    setIsFollowing(userProfile?.isfollowing??false);
                    setFollowers(userProfile?.followers?.length ?? 0);
                    setFollowing(userProfile?.following.length??0);
                    setCommunities(userProfile?.communities?.length ?? 0);
                }
            }
            miniUtilities();
        }
    ,[location.pathname,user?.email,userProfile,isFollowing,profileemail]);
    const [editable,setEditable] = useState(false);
    const handleFollowBtn = async (e) =>{
        e.preventDefault();
        setIsLoading(true);
        try{
            const response =  (await axios.post(process.env.REACT_APP_BACKEND_URL+"/auth/updateFollowers",{
                masterAcc : userProfile.email,
                followerAcc : user.email,
                isFollowing : isFollowing
            })).data;
            console.log(response);
            if(response.status){
                setIsFollowing(!isFollowing);
                setIsLoading(false);
                toast.success('Refresh to update changes!', {
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
            else{
                toast.error('Try again later!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setIsLoading(false);
            }
        }
        catch(error){
            toast.error('Try again later!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setIsLoading(false);
        }
    }
    const handledEditButton = async (e)=>{
        e.preventDefault();
        try{
            if(editable===true){
                setIsLoading(true);
                if(formData.username!==user.username || formData.education !== user.education || formData.dp !== user.dp){
                    const response = await axios.post(process.env.REACT_APP_BACKEND_URL+"/auth/updateProfile",{
                        email : user.email,
                        username : formData.username.length ? formData.username : user.username,
                        education : formData.education.length ? formData.education : (user&&user.education ? user.education : "Enthusiast at Nerd.net"),
                        dp : formData.dp.length ? formData.dp : user.dp
                    });
                    if(response.data.status){
                        toast.success('User details Updated successfully!', {
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
                    else{
                        toast.error('Problem updating. Try later!', {
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
                else{
                    setEditable(false);
                }
                setIsLoading(false);
            }
        }
        catch(error){
            toast.error('Error updating profile!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            setIsLoading(false);
        }
        setEditable(!editable);
    }
    const [formData,setFormData] = useState({
        username : "",
        education : "",
        dp : ""
    })
    const handleFormChange = (e)=>{
        const {name,value} = e.target;
        setFormData({...formData,[name]:value});
        console.log(formData);
    }
  return (
    <div id='profile-sidebar' className='flex flex-col items-center justify-start p-2'>
      <div id='profile-info-container' className='flex flex-col items-center justify-start w-full'>
        <div id='profile-dp-container' className='p-2 m-2 flex items-center justify-around w-full'>
            <img className='object-contain object-center rounded-full w-52' alt='dp' src={userProfile ? userProfile.dp : <CgProfile color='white'/>}/>
            <div>
                {isSameUser && editable ? 
                <form>
                    <div className='flex items-center justify-start w-fit'>
                        <SiNamebase className='text-2xl' color='black' title='username'/>
                        <input className={`text-lg font-bold mx-2 text-slate-500 inline-block outline-none w-fit`} placeholder={`${user ? user.username : "Nerd"}`} onChange={handleFormChange} value={formData.username} name='username'/>
                    </div>
                    <div className='flex items-center justify-start w-fit'>
                        <MdMarkEmailRead className='text-2xl' color='#fff' title='email'/>
                        <h6 className='text-lg font-bold mx-2 text-slate-500 inline-block w-fit'>{user ? user.email : "user@gmail.com"}</h6>
                    </div>
                    <div className='flex items-center justify-start w-fit'>
                        <IoIosSchool className='text-2xl' color='white' title='education'/>
                        <input className='text-lg font-bold mx-2 text-slate-500 inline-block outline-none w-fit' placeholder={`${user && user.education ? user.education : "Enthusiast at Nerd.net"}`} maxLength={23} onChange={handleFormChange} value={formData.education} name='education'/>
                    </div>
                    <div className='flex items-center justify-start flex-wrap w-fit'>
                        <FaImages className='text-2xl' color='white' title='dp'/>
                        <input className='text-lg font-bold mx-2 text-slate-500 inline-block outline-none w-fit' placeholder={`${user && userProfile.dp ? user.dp : "#"}`} onChange={handleFormChange} value={formData.dp} name='dp'/>
                    </div>
                </form>
                :
                <div>
                    <div className='flex items-center justify-start'>
                        <SiNamebase className='text-2xl' color='white' title='username'/>
                        <h5 className={`text-lg font-bold mx-2 text-slate-500 inline-block`}>{userProfile ? userProfile.username : "Nerd"}</h5>
                    </div>
                    <div className='flex items-center justify-start'>
                        <MdMarkEmailRead className='text-2xl' color='white' title='email'/>
                        <h5 className='text-lg font-bold mx-2 text-slate-500 inline-block'>{userProfile ? userProfile.email : "user@gmail.com"}</h5>
                    </div>
                    <div className='flex items-center justify-start'>
                        <IoIosSchool className='text-2xl' color='white' title='education'/>
                        <h5 className='text-lg font-bold mx-2 text-slate-500 inline-block'>{userProfile && userProfile.education ? userProfile.education : "Enthusiast at Nerd.net"}</h5>
                    </div>
                </div>
                }
                <div className='flex items-center justify-around'>
                {isSameUser ? <button type='button' className='px-2 bg-sky-400 text-white rounded-lg m-2 flex items-center justify-center' onClick={handledEditButton}>{loading ? <PulseLoader className='scale-50'/> : editable ? "Save" : "Edit"}</button> : <button type='button' className={`flex items-center justify-center px-2 bg-sky-400 text-white rounded-lg m-2 hover:bg-black hover:text-sky-400 trans300 ${isFollowing ? " bg-slate-400 text-white opacity-60 " : " "}`} onClick={handleFollowBtn}>{loading ? <PulseLoader className='scale-50'/> : isFollowing ? "UnFollow" : "Follow"}</button>}
                {isSameUser && editable && <button className='bg-black text-white rounded-lg m-2 hover:border-white trans300 hover:border-2 px-2' onClick={()=>{setEditable(false)}}>Back</button>}
                </div>
            </div>
        </div>
        <div id='profile-counts' className='flex items-center justify-around w-full m-2 text-white'>
            <div className='flex flex-col items-center justify-center cursor-pointer' onClick={()=>{setShowFollowers(!showFollowers)}}>
                <p>{followers}</p>
                <p className='text-xs'>Followers</p>
            </div>
            <div className='w-1 h-6 rounded-2xl bg-black cursor-pointer' onClick={()=>{}}></div>
            <div className='flex flex-col items-center justify-center cursor-pointer' onClick={()=>{setShowFollowing(!showFollowing)}}>
                <p>{following}</p>
                <p className='text-xs'>Following</p>
            </div>
            <div className='w-1 h-6 rounded-2xl bg-black'></div>
            <div className='flex flex-col items-center justify-center'>
                <p>{communities}</p>
                <p className='text-xs'>Communities</p>
            </div>
            {showFollowers ? <PopUp {...userProfile?.followers??[]}/> : <></>}
            {showFollowing ? <PopUp {...userProfile?.following??[]}/> : <></>}
        </div>
        <ProfileGraphVisualiser/>
      </div>
    </div>
  )
}


