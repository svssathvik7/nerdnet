import React, { useContext } from 'react';
import { friendContextProvider } from '../../Context/friendContext';
import "./FollowLists.css";
import { Link } from 'react-router-dom';

export default function FollowersList() {
    const { userProfile } = useContext(friendContextProvider);

    return (
        <div id='following-list' className='flex items-center justify-evenly flex-wrap'>
            {userProfile && userProfile.following ? userProfile.following.map((following, i) => (
                <div key={i} className='bg-white rounded-lg w-fit h-fit flex flex-col items-center justify-around m-2 p-2 cursor-pointer hover:scale-105 trans300 flex-wrap'>
                    <Link to={`/profile/${following.email}`}><img alt='dp' src={following.dp} className='w-16 rounded-full'/></Link>
                    <Link to={`/profile/${following.email}`}><p className='text-black font-medium text-lg'>{following.username}</p></Link>
                    <p className='text-slate font-medium text-base'>{following?.age??1}y/o nerd</p>
                    <Link to={`/profile/${following.email}`}><p className='text-slate-500 font-medium text-base'>{following.education}</p></Link>
                </div>
            )) : <p>No following available</p>}
        </div>
    );
}
