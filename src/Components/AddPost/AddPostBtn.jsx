import React from 'react'
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
export default function AddPostBtn() {
  const navigate = useNavigate();
  return (
    <div id='add-post-btn' className='absolute right-0 bottom-0 m-4 w-fit h-fit p-2 rounded-lg bg-white flex items-center justify-center shadow-md shadow-black cursor-pointer hover:scale-95 trans300' onClick={()=>{navigate("/postForm")}}>
      <FaPlus color='black' className='text-2xl m-2'/>
    </div>
  )
}
