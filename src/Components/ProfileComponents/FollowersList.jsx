import React, { useContext } from 'react';
import { friendContextProvider } from '../../Context/friendContext';
import "./FollowLists.css";
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
const formatAge = (date) => {
    return "Joined - "+dateFormat(date,"mmmm dS, yyyy");
  }
export default function FollowersList() {
    const { userProfile } = useContext(friendContextProvider);

    return (
        <div id='followers-list' className='flex items-center justify-evenly flex-wrap'>
            {userProfile && userProfile.followers.length ? userProfile.followers.map((follower, i) => (
                <div key={i} className='bg-white rounded-lg w-fit h-fit flex flex-col items-center justify-around m-2 p-2 cursor-pointer hover:scale-105 trans300 flex-wrap'>
                    <Link to={`/profile/${follower.email}`}><img alt='dp' src={follower.dp} className='w-16 h-16 rounded-full'/></Link>
                    <Link to={`/profile/${follower.email}`}><p className='text-black font-medium text-lg'>{follower.username}</p></Link>
                    <p className='text-slate font-medium text-base'>{formatAge(follower?.joined??0)}</p>
                    <Link to={`/profile/${follower.email}`}><p className='text-slate-500 font-medium text-base'>{follower.education}</p></Link>
                </div>
            )) : <p>No followers available</p>}
        </div>
    );
}
