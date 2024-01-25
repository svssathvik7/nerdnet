import React, { useContext } from 'react';
import { friendContextProvider } from '../../Context/friendContext';
import "./FollowLists.css";
import { Link } from 'react-router-dom';
const formatAge = (age) => {
    const difference = Date.now() - Date.parse(age);
    const year = 365*24*60*60*100;
    const accAge = (difference/year).toFixed(1);
    const days = 24*60*60*100;
    console.log(accAge);
    if(accAge == 0)
    {
      return Number.parseInt(difference/days)+"d Nerd";
    }
    else if(accAge <= 12){
      return Number.parseInt(accAge) + "m Nerd";
    }
    else{
      return Number.parseInt(accAge/12) + "y Nerd";
    }
  }
export default function FollowersList() {
    const { userProfile } = useContext(friendContextProvider);

    return (
        <div id='followers-list' className='flex items-center justify-evenly flex-wrap'>
            {userProfile && userProfile.followers.length ? userProfile.followers.map((follower, i) => (
                <div key={i} className='bg-white rounded-lg w-fit h-fit flex flex-col items-center justify-around m-2 p-2 cursor-pointer hover:scale-105 trans300 flex-wrap'>
                    <Link to={`/profile/${follower.email}`}><img alt='dp' src={follower.dp} className='w-16 rounded-full'/></Link>
                    <Link to={`/profile/${follower.email}`}><p className='text-black font-medium text-lg'>{follower.username}</p></Link>
                    <p className='text-slate font-medium text-base'>{formatAge(follower?.joined??0)}</p>
                    <Link to={`/profile/${follower.email}`}><p className='text-slate-500 font-medium text-base'>{follower.education}</p></Link>
                </div>
            )) : <p>No followers available</p>}
        </div>
    );
}
