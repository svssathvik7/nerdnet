import React, { useContext, useEffect, useState } from 'react'
import { userContextProvider } from '../../Context/userContext';
import "./Chat.css";
import axios from 'axios';
import { IoClose } from "react-icons/io5";
import { SyncLoader } from 'react-spinners';
export default function Chat() {
    const [active,setActive] = useState(0);
    const {user} = useContext(userContextProvider);
    const [client,setClient] = useState(user);
    const [value,setValue] = useState('');
    const [messages,setMessages] = useState([]);
    const [loading,setLoading] = useState(false);
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
  return (
    <div className='absolute bottom-2 left-2 m-2 cursor-pointer w-fit flex items-center justify-start'>
      <div className='bg-white w-12 h-12 rounded-full flex items-center justify-center' onClick={()=>{setActive(!active)}}>
        {active ? <p>X</p> : <p>O</p>}
      </div>
      {active==1 && <div id='online-frnds-container' className='flex items-center justify-start'>
        {user && user.following && user.following.map((member,i)=>(
            <div key={i} className='flex'>
                <img alt='dp' src={member.dp} className='w-12 h-12 rounded-full mx-1 bg-white p-1' onClick={()=>{setClient(member);setActive(2)}}/>
            </div>
        ))}
      </div>}
      {active==2 && 
        <div id='chat-box' className='bg-white m-2 border-2 border-black rounded-lg p-1 flex flex-col items-center justify-start trans300'>
            <div id='chat-header' className='h-1/6 bg-green-500 w-full flex items-center justify-between p-1'>
                <div className='flex items-center justify-start mx-1'>
                    <img alt='dp' src={client.dp} className='w-12 h-12 rounded-full bg-black p-1'/>
                    <p className='font-bold text-xl ml-1'>{client.username}</p>
                </div>
                <IoClose color='red' className='font-extrabold mx-1 text-2xl' onClick={()=>{setActive(0)}}/>
            </div>
            <div id='chat-scroller'>
                {
                    messages && messages.length && messages?.map((message,i)=>(
                        <div key={i} className='flex w-full flex-col'>
                            {
                                (message?.user == user?._id)?
                                <div className='p-2 self-end bg-black text-white message m-1 flex-wrap flex flex-col'>
                                    <div className='flex items-center justify-start msg-box flex-wrap p-1'>
                                        <p className='flex-wrap'>{message.message}</p>
                                        <img alt='dp' src={user?.dp} className='w-6 h-6 rounded-full mx-1'/>
                                    </div>
                                    <div className='text-xs'>
                                        <p>{message.timestamp}</p>
                                    </div>
                                </div>
                                :
                                <div className='p-2 self-start bg-slate-600 text-white message m-1 flex-wrap flex flex-col'>
                                    <div className='flex items-center justify-start msg-box flex-wrap p-1'>
                                        <img alt='dp' src={client?.dp} className='w-6 h-6 rounded-full mx-1'/>
                                        <p className='flex-wrap'>{message.message}</p>
                                    </div>
                                    <div className='text-xs'>
                                        <p>{message.timestamp}</p>
                                    </div>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
            <div id='chat-controller' className='m-2 flex items-center justify-start'>
                <input type='text' className='border-b-2 border-black' name='chatInput' placeholder='Enter message...' onChange={(e)=>{setValue(e.target.value);}} value={value}/>
                {loading ? <div className='bg-black w-fit mx-1 p-2 rounded-lg flex items-center justify-center h-fit'><SyncLoader color="#fff" size={15}/></div> : <button onClick={handleSendMessage} className='mx-1 p-1 bg-black text-white font-normal rounded-lg'>Send</button>}
            </div>
        </div>
      }
    </div>
  )
}
