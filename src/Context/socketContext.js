import React, { useState } from 'react'
import { io } from 'socket.io-client';
export const socketContextProvider = React.createContext(null);
export default function SocketContext({children}) {
    const [socket,setSocket] = useState(null);
    const initSocket = async ()=>{
        const socketConnect = io.connect(process.env.REACT_APP_BACKEND_BASE_URL);
        setSocket(socketConnect);
    }
  return (
    <socketContextProvider.Provider value={{socket,initSocket}}>
      {children}
    </socketContextProvider.Provider>
  )
}
