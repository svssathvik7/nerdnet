import React, { useContext } from 'react'
import "./CommunitiesList.css";
import { statContextProvider } from '../../Context/statContext';
import { Link } from 'react-router-dom';
import { userContextProvider } from '../../Context/userContext';
import { friendContextProvider } from '../../Context/friendContext';
export default function CommunitiesList() {
    const {userProfile} = useContext(friendContextProvider);
    const {user} = useContext(userContextProvider)
  return (
    <div className='flex items-center justify-evenly flex-wrap communities-list'>
      {userProfile && userProfile?.spaces?.map((space,i)=>(
        <Link to={"/community/"+space._id} key={i} className='bg-white p-1 rounded-lg opacity-80 hover:opacity-100 space-card m-2'>
            <div className='flex flex-col items-end justify-end flex-wrap'>
                <img alt='cover' src={space.coverPic} className='w-full aspect-video object-contain'/>
            </div>
            <div className='flex items-center justify-center flex-wrap'>
                <h4 className='font-bold text-3xl w-fit'>{space?.name}</h4>
                <p className='mx-1 w-fit text-sm rounded-lg bg-yellow-400 text-black'>#{space?.subject}</p>
            </div>
            {((space?.followers?.includes(user?._id))) && <button className='bg-black text-white w-24 rounded-md trans100 hover:scale-95 m-1'>Subscribe!</button>}
        </Link>
      ))}
    </div>
  )
}
