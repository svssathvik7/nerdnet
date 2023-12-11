import React from 'react'
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
export default function AddPostBtn() {
  const navigate = useNavigate();
  return (
    <div id='add-post-btn' className='absolute right-0 bottom-0 m-2 w-fit h-fit p-2 rounded-lg bg-white flex items-center justify-center shadow-md shadow-black cursor-pointer' onClick={()=>{navigate("/postForm")}}>
      <FaPlus color='green' className='text-xl'/> Add post
    </div>
  )
}
