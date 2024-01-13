import React, { useContext } from 'react';
import { friendContextProvider } from '../../Context/friendContext';
import "./FollowLists.css";
import { Link } from 'react-router-dom';
const formatAge = (age) => {
    const difference = Date.now() - Date.parse(age);
    const year = 365*24*60*60*100;
    const accAge = (difference/year).toFixed(1);
    const days = 24*60*60*100;
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
        <div id='following-list' className='flex items-center justify-evenly flex-wrap'>
            {userProfile && userProfile.following ? userProfile.following.map((following, i) => (
                <div key={i} className='bg-white rounded-lg w-fit h-fit flex flex-col items-center justify-around m-2 p-2 cursor-pointer hover:scale-105 trans300 flex-wrap'>
                    <Link to={`/profile/${following.email}`}><img alt='dp' src={following.dp} className='w-16 rounded-full'/></Link>
                    <Link to={`/profile/${following.email}`}><p className='text-black font-medium text-lg'>{following.username}</p></Link>
                    <p className='text-slate font-medium text-base'>{formatAge(following?.joined??0)}</p>
                    <Link to={`/profile/${following.email}`}><p className='text-slate-500 font-medium text-base'>{following.education}</p></Link>
                </div>
            )) : <p>No following available</p>}
        </div>
    );
}
