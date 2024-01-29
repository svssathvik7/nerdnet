import React, { useContext, useEffect, useState } from 'react'
import { userContextProvider } from '../../Context/userContext';
import "./Chat.css";
import axios from 'axios';
import { IoClose } from "react-icons/io5";
import { SyncLoader } from 'react-spinners';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import ChatIcon from "../../assets/chat.png";
import { FaLink } from "react-icons/fa6";
import EmojiPicker from 'emoji-picker-react';
import { MdEmojiEmotions } from "react-icons/md";
export default function Chat() {
    const [active,setActive] = useState(0);
    const {user} = useContext(userContextProvider);
    const [client,setClient] = useState(user);
    const [value,setValue] = useState('');
    const [messages,setMessages] = useState([]);
    const [loading,setLoading] = useState(false);
    const [showEmojiPicker,setEmojiPicker] = useState(false);
    const formatDate = (date)=>{
        return dateFormat(date,"mmmm dS, yyyy");
    }
    const fetchChat = async ()=>{
        try{
            const users = [user._id,client._id].sort();
            const chatId = users[0]+users[1];
            const response = (await axios.post(process.env.REACT_APP_BACKEND_URL+"/chat/get-chat",{
                chatId : chatId
            })).data;
            if(response.status){
                setMessages(response.data.chats);
                console.log(messages);
            }
            else{
                setMessages([]);
            }
        }
        catch(error){
            console.log(error);
        }
    }
    const handleSendMessage = async ()=>{
        const users = [user._id,client._id].sort();
        try{
            setLoading(true);
            const chatId = users[0]+users[1];
            const response = (await axios.post(process.env.REACT_APP_BACKEND_URL+"/chat/add-message/",{
                chatId : chatId,
                userId : user._id,
                message : value
            })).data;
            if(response.status){
                console.log("Success");
            }
            else{
                console.log(response);
            }
            setValue('');
            fetchChat();
        }
        catch(error){
            console.log(error);
        }
        setLoading(false);
    }
    useEffect(
        ()=>{
            fetchChat();
        }
    ,[client,user,messages]);
    const customPicker = {
        width : '200px',
        height : '200px'
    }
    const handleEmojiClick = async (emoji)=>{
        setValue(value+emoji.emoji);
    }
  return (
    <div className='absolute bottom-2 left-2 m-2 cursor-pointer w-fit flex items-center justify-start'>
      <div className='bg-white w-12 h-12 rounded-full flex items-center justify-center' onClick={()=>{setActive(!active); setEmojiPicker(false)}} title={`${user?.following?.length + " friends"}`}>
        {!active ? 
        <div className='w-12 h-12'>
            <img alt='chat-icon' src={ChatIcon}/>
        </div> : <div className='w-12 h-12 text-red-700 flex items-center justify-center font-extrabold text-2xl'>X</div>}
      </div>
      {active==1 && <div id='online-frnds-container' className='flex items-center justify-start'>
        {user && user.following && user.following.map((member,i)=>(
            <div key={i} className='flex'>
                <img alt='dp' src={member.dp} className='w-12 h-12 rounded-full mx-1 bg-white p-1' onClick={()=>{setClient(member);setActive(2);setEmojiPicker(false)}}/>
            </div>
        ))}
      </div>}
      {active==2 && 
        <div id='chat-box' className='bg-white m-2 border-2 border-black rounded-lg flex flex-col items-center justify-start trans300'>
            <div id='chat-header' className='h-1/6 bg-yellow-500 w-full flex items-center justify-between p-1'>
                <Link to={"/profile/" + client?.email} className='flex items-center justify-start mx-1 cursor-pointer'>
                    <img alt='dp' src={client?.dp} className='w-10 h-10'/>
                    <div className="mx-1">
                        <p className='font-bold text-xl'>{client?.username}</p>
                        <p className='text-xs'>{client?.education}</p>
                    </div>
                </Link>
                <IoClose color='red' className='font-extrabold mx-1 text-2xl' onClick={()=>{setActive(0)}}/>
            </div>
            <div id='chat-scroller' className='my-1'>
                {
                    messages && messages.length && messages?.map((message,i)=>(
                        <div key={i} className='flex w-full flex-col'>
                            {
                                (message?.user == user?._id)?
                                <div className='self-end text-white message m-1 flex-wrap flex'>
                                    <div className='flex items-center justify-start msg-box flex-wrap p-2 bg-slate-500 rounded-lg flex-col group'>
                                        {(message.isUrl===true)
                                        ? 
                                        <a title={`${message?.message}`} target='_blank' href={`${message?.message}`} className='flex-wrap flex items-center justify-center group-hover:scale-110 trans100'>Link<FaLink/></a>
                                         :
                                         <p className='flex-wrap'>{message.message}</p>
                                        }
                                        <div className='time-stamp-holders'>
                                            <p>{formatDate(message.timestamp)}</p>
                                        </div>
                                    </div>
                                    <Link to={"/profile/" + user?.email}><img alt='dp' src={user?.dp} className='w-6 h-6 rounded-full mx-1'/></Link>
                                </div>
                                :
                                <div className='self-start text-white message m-1 flex-wrap flex'>
                                    <Link to={"/profile/" + client?.email}><img alt='dp' src={client?.dp} className='w-6 h-6 rounded-full mx-1'/></Link>
                                    <div className='flex items-center justify-start msg-box flex-wrap p-2 bg-black rounded-lg flex-col group'>
                                        {(message.isUrl===true)
                                        ? 
                                        <a title={`${message?.message}`} target='_blank' href={`${message?.message}`} className='flex-wrap flex items-center justify-center group-hover:scale-110 trans100'>Link<FaLink/></a>
                                         :
                                         <p className='flex-wrap'>{message.message}</p>
                                        }
                                        <div className='time-stamp-holders'>
                                            <p>{formatDate(message.timestamp)}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
            <form id='chat-controller' className='m-2 flex items-center justify-start'>
                {
                    showEmojiPicker &&
                    <div className='emoji-picker absolute flex scale-75 top-0 bottom-0 left-0 right-0 m-auto'>
                        <EmojiPicker theme='dark' onEmojiClick={handleEmojiClick} width={350} height={400}/>
                    </div>
                }
                <MdEmojiEmotions className={`${showEmojiPicker ? " bg-slate-500 rounded-lg text-white " : "  "} text-2xl mx-2`} onClick={()=>{setEmojiPicker(!showEmojiPicker)}}/>
                <input type='text' className='border-b-2 border-black w-56' name='chatInput' placeholder='Enter message...' onChange={(e)=>{setValue(e.target.value);}} value={value}/>
                {loading ? <div className='bg-black w-fit mx-1 p-2 rounded-lg flex items-center justify-center h-fit'><SyncLoader color="#fff" size={15}/></div> : <button type='submit' onClick={handleSendMessage} className='mx-1 p-1 bg-yellow-500 text-white font-normal rounded-lg'>Send</button>}
            </form>
        </div>
      }
    </div>
  )
}
