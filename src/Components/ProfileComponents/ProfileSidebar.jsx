import React, { useEffect } from 'react'
import { userContextProvider } from '../../Context/userContext'
import { useContext } from 'react'
import { CgProfile } from 'react-icons/cg';
import { SiNamebase } from "react-icons/si";
import { MdMarkEmailRead } from "react-icons/md";
import { IoIosSchool } from "react-icons/io";
import { FaImages } from "react-icons/fa6";
import { useState } from 'react';
import "./ProfileSidebar.css";
import { useLocation } from 'react-router-dom';
import {friendContextProvider} from "../../Context/friendContext";
import ProfileGraphVisualiser from './ProfileGraphVisualiser';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function ProfileSidebar() {
    const {profileemail} = useParams();
    const {user,getUserDetails} = useContext(userContextProvider);
    const {userProfile,getUserProfile} = useContext(friendContextProvider);
    const [isSameUser,setIsSameUser] = useState(false);
    const location = useLocation();
    useEffect(
        ()=>{
            const miniUtilities = async()=>{
                const userType = await user.email === profileemail;
                setIsSameUser(userType);
                getUserProfile(profileemail ? profileemail : user.email);
            }
            miniUtilities();
        }
    ,[location.pathname]);
    const [editable,setEditable] = useState(false);
    const handledEditButton = async (e)=>{
        e.preventDefault();
        console.log(formData);
        try{
            if(editable===true){
                if(formData.username!==user.username || formData.education !== user.education || formData.dp !== user.dp){
                    const response = await axios.post("http://localhost:3500/api/auth/updateProfile",{
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
                        getUserDetails();
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
            }
        }
        catch(error){
            
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
    <div id='profile-sidebar' className='flex flex-col items-center justify-start p-2 bg-white'>
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
                        <MdMarkEmailRead className='text-2xl' color='black' title='email'/>
                        <h6 className='text-lg font-bold mx-2 text-slate-500 inline-block w-fit'>{user ? user.email : "user@gmail.com"}</h6>
                    </div>
                    <div className='flex items-center justify-start w-fit'>
                        <IoIosSchool className='text-2xl' color='black' title='education'/>
                        <input className='text-lg font-bold mx-2 text-slate-500 inline-block outline-none w-fit' placeholder={`${user && user.education ? user.education : "Enthusiast at Nerd.net"}`} maxLength={23} onChange={handleFormChange} value={formData.education} name='education'/>
                    </div>
                    <div className='flex items-center justify-start flex-wrap w-fit'>
                        <FaImages className='text-2xl' color='black' title='dp'/>
                        <input className='text-lg font-bold mx-2 text-slate-500 inline-block outline-none w-fit' placeholder={`${user && userProfile.dp ? user.dp : "#"}`} onChange={handleFormChange} value={formData.dp} name='dp'/>
                    </div>
                </form>
                :
                <div>
                    <div className='flex items-center justify-start'>
                        <SiNamebase className='text-2xl' color='black' title='username'/>
                        <h5 className={`text-lg font-bold mx-2 text-slate-500 inline-block`}>{userProfile ? userProfile.username : "Nerd"}</h5>
                    </div>
                    <div className='flex items-center justify-start'>
                        <MdMarkEmailRead className='text-2xl' color='black' title='email'/>
                        <h5 className='text-lg font-bold mx-2 text-slate-500 inline-block'>{userProfile ? userProfile.email : "user@gmail.com"}</h5>
                    </div>
                    <div className='flex items-center justify-start'>
                        <IoIosSchool className='text-2xl' color='black' title='education'/>
                        <h5 className='text-lg font-bold mx-2 text-slate-500 inline-block'>{userProfile && userProfile.education ? userProfile.education : "Enthusiast at Nerd.net"}</h5>
                    </div>
                </div>
                }
                {isSameUser ? <button type='button' className='px-2 bg-sky-400 text-white rounded-lg m-2' onClick={handledEditButton}>{editable ? "Save" : "Edit"}</button> : <></>}
                {isSameUser && editable && <button onClick={()=>{setEditable(false)}}>Back</button>}
            </div>
        </div>
        <div id='profile-counts' className='flex items-center justify-around w-full m-2'>
            <div className='flex flex-col items-center justify-center'>
                <p>{userProfile && userProfile.followers ? userProfile.followers : 0}</p>
                <p className='text-xs'>Followers</p>
            </div>
            <div className='w-1 h-6 rounded-2xl bg-black'></div>
            <div className='flex flex-col items-center justify-center'>
                <p>{userProfile && userProfile.following ? userProfile.following : 0}</p>
                <p className='text-xs'>Following</p>
            </div>
            <div className='w-1 h-6 rounded-2xl bg-black'></div>
            <div className='flex flex-col items-center justify-center'>
                <p>{userProfile && userProfile.communities ? userProfile.communities : 0}</p>
                <p className='text-xs'>Communities</p>
            </div>
        </div>
        <ProfileGraphVisualiser/>
      </div>
    </div>
  )
}
