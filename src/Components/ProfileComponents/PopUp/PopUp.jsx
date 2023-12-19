import React, { useEffect } from 'react'
import "./PopUp.css";
import { Link } from 'react-router-dom';
export default function PopUp(props) {
  useEffect(()=>{console.log(props)},[])
  return (
    <div id='pop-up' className='absolute'>
      {Object.keys(props).map(prop=>(
        <div className='m-2'>
            <Link className='flex items-center justify-center flex-wrap' to={"/profile/"+prop?.email??"user@gmail.com"}>
                <img className='w-8 rounded-full mx-1' alt='user-dp' src={props[prop].dp} title={props[prop]?.username??"Nerd"}/>
                <p className='text-white'>{props[prop].username}</p>
            </Link>
        </div>
      ))}
    </div>
  )
}
