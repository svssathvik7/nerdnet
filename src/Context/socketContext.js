import React, { useState } from 'react'
import { io } from 'socket.io-client';
export const socketContextProvider = React.createContext(null);
export default function SocketContext({children}) {
        const socket = io.connect(process.env.REACT_APP_BACKEND_BASE_URL);
  return (
    <socketContextProvider.Provider value={{socket}}>
      {children}
    </socketContextProvider.Provider>
  )
}
