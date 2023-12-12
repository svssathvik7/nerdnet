import React from 'react'
import { userContextProvider } from '../../Context/userContext'
import { useContext } from 'react'
import { CgProfile } from 'react-icons/cg';
import { SiNamebase } from "react-icons/si";
import { MdMarkEmailRead } from "react-icons/md";
import { IoIosSchool } from "react-icons/io";
import "./ProfileSidebar.css";
import ProfileGraphVisualiser from './ProfileGraphVisualiser';
export default function ProfileSidebar() {
    const {user} = useContext(userContextProvider);
  return (
    <div id='profile-sidebar' className='flex flex-col items-center justify-start p-2 bg-white'>
      <div id='profile-info-container' className='flex flex-col items-center justify-start w-full'>
        <div id='profile-dp-container' className='p-2 m-2 flex items-center justify-around w-full'>
            <img className='object-contain object-center rounded-full w-52' alt='dp' src={user ? user.dp : <CgProfile color='white'/>}/>
            <div>
                <div className='flex items-center justify-start'>
                    <SiNamebase className='text-2xl' color='black'/>
                    <h5 className='text-3xl font-bold mx-2 text-slate-500 inline-block'>{user ? user.username : "Nerd"}</h5>
                </div>
                <div className='flex items-center justify-start'>
                    <MdMarkEmailRead className='text-2xl' color='black'/>
                    <h5 className='text-lg font-bold mx-2 text-slate-500 inline-block'>{user ? user.email : "user@gmail.com"}</h5>
                </div>
                <div className='flex items-center justify-start'>
                    <IoIosSchool className='text-2xl' color='black'/>
                    <h5 className='text-lg font-bold mx-2 text-slate-500 inline-block'>{user && user.education ? user.education : "Enthusiast at Nerd.net"}</h5>
                </div>
            </div>
        </div>
        <div id='profile-counts' className='flex items-center justify-around w-full m-2'>
            <div className='flex flex-col items-center justify-center'>
                <p>{user && user.followers ? user.followers : 0}</p>
                <p className='text-xs'>Followers</p>
            </div>
            <div className='w-1 h-6 rounded-2xl bg-black'></div>
            <div className='flex flex-col items-center justify-center'>
                <p>{user && user.following ? user.following : 0}</p>
                <p className='text-xs'>Following</p>
            </div>
            <div className='w-1 h-6 rounded-2xl bg-black'></div>
            <div className='flex flex-col items-center justify-center'>
                <p>{user && user.communities ? user.communities : 0}</p>
                <p className='text-xs'>Communities</p>
            </div>
        </div>
        <ProfileGraphVisualiser/>
      </div>
    </div>
  )
}
