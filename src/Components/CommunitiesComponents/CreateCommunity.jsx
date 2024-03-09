import React, { useContext, useEffect, useState } from 'react'
import "./CreateCommunity.css"
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { userContextProvider } from '../../Context/userContext'
const Pages = (props)=>{
  const {user} = useContext(userContextProvider);
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    community_name : "",
    community_dp : "",
    community_cover_pic : "",
    subject : "",
    description : ""
  });
  const onFormChange = (e)=>{
    setFormData(prev=>({...prev,[e.target.name]:e.target.value}));
    console.log(formData);
  }
  const submitCommunity = async ()=>{
    try {
      const response = (await axios.post(process.env.REACT_APP_BACKEND_URL+"/community/create-community",{
        community_name : formData.community_name,
        community_dp : formData.community_dp,
        community_cover_pic : formData.community_cover_pic,
        subject : formData.subject,
        description : formData.description,
        user : user._id
      })).data;
      if(response.status){
        setFormData(response.result)
        navigate("/community/"+response.result);
        console.log("Community created!");
      }
      else{
        console.log("Community failed")
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    (props.pageNum == 0) ? 
    <div className='text-white'>
      <h1 className='text-4xl'>Welcome to NerdCommunities!</h1>
      <div>
      <label for="community_name" className='text-slate-400'>Community Name:</label><br/>
        <input onChange={onFormChange} type="text" id="community_name" name="community_name" value={formData.community_name} className='bg-transparent border-b-2 border-white outline-none pb-1 w-1/2' required/><br/>

        <label for="community_dp" className='text-slate-400'>Community Display Picture:</label><br/>
        <input onChange={onFormChange} value={formData.community_dp} type="url" id="community_dp" name="community_dp" className='bg-transparent border-b-2 border-white outline-none pb-1 w-1/2' required/><br/>

        <label for="community_cover_pic" className='text-slate-400'>Community Cover Picture:</label><br/>
        <input onChange={onFormChange} value={formData.community_cover_pic} type="url" id="community_cover_pic" name="community_cover_pic" className='bg-transparent border-b-2 border-white outline-none pb-1 w-1/2' required/><br/>

        <label for="subject" className='text-slate-400'>Subject:</label><br/>
        <input onChange={onFormChange} value={formData.subject} type="text" id="subject" name="subject" className='bg-transparent border-b-2 border-white outline-none pb-1 w-1/2' required/><br/>

        <label for="description" className='text-slate-400'>Description:</label><br/>
        <textarea onChange={onFormChange} value={formData.description} id="description" name="description" rows="5" className='bg-transparent border-2 my-1 border-white resize-none outline-none p-2' cols="50" required></textarea><br/>

        <button className='p-1 bg-white text-black rounded-lg hover:scale-105 trans100' onClick={submitCommunity}>Create</button>
        </div>
    </div> : <></>
  )
}
export default function CreateCommunity() {
  const [page,setPage] = useState(0);
  return (
    <div className='community-create absolute top-0 left-0 right-0 bottom-0 m-auto flex items-center justify-start'>
       <div className='flex items-center justify-around'>
          <div id='community-create-explain'>
            <Pages pageNum={page}/>
          </div>
       </div>
    </div>
  )
}
