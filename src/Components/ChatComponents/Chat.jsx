import React, { useContext, useEffect, useState } from 'react'
import { userContextProvider } from '../../Context/userContext';
import "./Chat.css";
import axios from 'axios';
export default function Chat() {
    const [active,setActive] = useState(0);
    const {user} = useContext(userContextProvider);
    const [client,setClient] = useState(user);
    const [value,setValue] = useState('');
    const [messages,setMessages] = useState([]);
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
    }
    useEffect(
        ()=>{
            fetchChat();
        }
    ,[client,user,messages]);
  return (
    <div className='absolute bottom-2 left-2 m-2 cursor-pointer w-fit flex items-center justify-start'>
      <div className='bg-white w-12 h-12 rounded-full flex items-center justify-center self-end' onClick={()=>{setActive(!active)}}>
        {active ? "X" : "O"}
      </div>
      {active==1 && <div id='online-frnds-container'>
        {user && user.following && user.following.map((member,i)=>(
            <div key={i}>
                <img alt='dp' src={member.dp} className='w-12 h-12 rounded-full mx-1 bg-white p-1' onClick={()=>{setClient(member);setActive(2)}}/>
            </div>
        ))}
      </div>}
      {active==2 && 
        <div id='chat-box' className='bg-white m-2 border-2 border-black rounded-lg p-1 flex flex-col items-center justify-start'>
            <div id='chat-header' className='h-1/6 bg-green-500 w-full flex items-center justify-between p-1'>
                <div className='flex items-center justify-start mx-1'>
                    <img alt='dp' src={client.dp} className='w-12 h-12 rounded-full bg-black p-1'/>
                    <p className='font-bold text-xl ml-1'>{client.username}</p>
                </div>
                <div className='text-red-600 font-extrabold mx-1' onClick={()=>{setActive(0)}}>
                    X
                </div>
            </div>
            <div id='chat-scroller'>
                {
                    messages && messages.length && messages?.map((message,i)=>(
                        <div key={i} className='flex w-full flex-col'>
                            {
                                (message?.user == user?._id)?
                                <div className='p-2 self-end bg-red-500 message m-1'>
                                    <p>{message.message}</p>
                                </div>
                                :
                                <div className='p-2 self-start bg-blue-600 message m-1'>
                                    <p>{message.message}</p>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
            <div id='chat-controller' className='m-2'>
                <input type='text' className='border-b-2 border-black' name='chatInput' placeholder='Enter message...' onChange={(e)=>{setValue(e.target.value);}} value={value}/>
                <button onClick={handleSendMessage} className='mx-1 p-1 bg-black text-white font-normal rounded-lg'>Send</button>
            </div>
        </div>
      }
    </div>
  )
}
