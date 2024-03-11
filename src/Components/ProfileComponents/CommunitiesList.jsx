import React, { useContext } from 'react'
import "./CommunitiesList.css";
import { statContextProvider } from '../../Context/statContext';
import { Link } from 'react-router-dom';
export default function CommunitiesList() {
    const {spaces} = useContext(statContextProvider);
  return (
    <div className='flex items-center justify-evenly flex-wrap communities-list'>
      {spaces && spaces.map((space,i)=>(
        <Link to={"/community/"+space._id} key={i} className='bg-white p-1 rounded-lg opacity-80 hover:opacity-100 space-card'>
            <div className='flex flex-col items-end justify-end flex-wrap'>
                <img alt='cover' src={space.coverPic} className='w-full aspect-video object-contain'/>
                <div className='p-1 bg-white rounded-lg absolute m-2'>
                    <img alt='dp' src={space.dp} className='w-12 aspect-square object-contain'/>
                </div>
            </div>
            <div className='flex items-center justify-center flex-wrap'>
                <h4 className='font-bold text-3xl w-fit'>{space?.name}</h4>
                <p className='mx-1 w-fit text-sm rounded-lg bg-yellow-400 text-black'>#{space?.subject}</p>
            </div>
        </Link>
      ))}
    </div>
  )
}
