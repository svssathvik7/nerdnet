import React, { useState } from 'react'
import Header from '../../Partials/Header'
import { useContext } from 'react'
import { userContextProvider } from '../../Context/userContext'
import { CgProfile } from 'react-icons/cg'
import axios from 'axios'
import { toast } from 'react-toastify'
import "./AddPost.css";
export default function AddPostForm() {
    const {user} = useContext(userContextProvider);
    const [textInput,setInputType] = useState(true);
    const [disabled,setDisabled] = useState(true);
    const [formData,setFormData] = useState({
        isMultimedia : false,
        textPostData : "",
        imgPostData : "",
        caption : "",
    })
    const handleFormChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        if(e.target.name === "textPostData"){
            textActivate();
        }
        else{
            imgActivate();
        }
      };
    const textActivate = ()=>{
        setInputType(true);
        if(formData.textPostData.length > 0){
            setDisabled(false);
        }
        else{
            setDisabled(true);
        }
    }
    const imgActivate = ()=>{
        setInputType(false);
        if(formData.imgPostData.length > 0){
            setDisabled(false);
        }
        else{
            setDisabled(true);
        }
    }
    const handlePostSubmit = async (e)=>{
        e.preventDefault();
        try{
            const backendData = {
                isMultimedia : !textInput,
                email : user.email,
                postData : textInput ? formData.textPostData : formData.imgPostData,
                caption : !textInput ? formData.caption : ""
            }
            const response = await axios.post("http://localhost:3500/api/posts/newPost",{backendData});
            if(response.data.status){
                toast.success('Post added successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setFormData({
                    isMultimedia : false,
                    textPostData : "",
                    imgPostData : "",
                    caption : "",
                });
                setInputType(true);
                setDisabled(true);
            }
            else{
                toast.error("Error uploading Post!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
        catch(error){
            toast.error("Error uploading Post!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
  return (
    <div>
      <Header/>
      <form id='add-post-form' className={`bg-white h-fit p-2 absolute left-0 right-0 top-0 bottom-0 m-auto rounded-lg`}>
        <div id='post-meta-data' className='flex items-center justify-between'>
            <div className='flex items-center justify-center p-2 mx-2'>
            <img alt='dp' src={user.dp ? user.dp : <CgProfile/>} className='w-8 mx-2 cursor-pointer select-none'/>
            <div className='select-none'>
                <p className='font-medium text-sm cursor-pointer'>{user.username}</p>
                <p className='text-xs font-light text-slate-600'>{user.education ? user.education : "Enthusiast at Nerd.net"}</p>
            </div>
            </div>
        </div>
        <div id='post-input-type' className='flex items-start flex-col justify-start'>
            <div className='flex items-center justify-center flex-col w-full'>
                <div className='flex items-center justify-start w-full m-2'>
                    <div name="text-type" className={`${textInput===true ? " scale-105 " : " opacity-70 scale-95 "} w-fit mx-1 h-fit p-1 rounded-md cursor-pointer bg-slate-300`} onClick={textActivate}>Text-Post</div>
                    <div name="img-type" className={`bg-slate-300 w-fit mx-1 h-fit p-1 rounded-md cursor-pointer ${textInput===false ? " scale-105 " : " opacity-70 scale-95 "}`} onClick={imgActivate}>Image-Post</div>
                </div>
                <div id='post-input-container' className='w-full'>
                    {textInput ? 
                        <div id='text-input-subform' className='flex items-center justify-center w-full p-2'>
                            <input name='textPostData' id='text-input' required placeholder='Enter your tweet!' type='text' className='m-2' value={formData.textPostData} onChange={handleFormChange}/>
                        </div>
                        :
                        <div id='image-input-subform' className='m-2'>
                            <input name='imgPostData' id='image-input' required placeholder='Enter image url' type='url' className='' value={formData.imgPostData} onChange={handleFormChange}/>
                            <input name='caption' id='image-input-caption' placeholder='Enter image caption(optional)' type='text' className='' value={formData.caption} onChange={handleFormChange}/>
                        </div>
                    }
                </div>
                <button type='submit' id='post-submit' className={`bg-yellow-400 p-2 m-2 text-md flex items-center justify-center rounded-full px-8 ${disabled ? " opacity-50 bg-slate-400 " : " "}`} onClick={handlePostSubmit} disabled={disabled}>Post</button>
            </div>
        </div>
      </form>
    </div>
  )
}
