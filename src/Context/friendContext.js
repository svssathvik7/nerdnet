import React from 'react'
import { userContextProvider } from './userContext';
import { useContext,useState } from 'react';
import axios from 'axios';
import {loaderContextProvider} from "./loaderContext";
import {socketContextProvider} from  "./socketContext";
export const friendContextProvider = React.createContext(null);
export default function FriendContext({children}) {
    const {user} = useContext(userContextProvider);
    const {setIsLoading} = useContext(loaderContextProvider);
    const [userProfile,setUserProfile] = useState(user);
    const {socket} = useContext(socketContextProvider);
    const getUserProfile = async(profileemail)=>{
        if(profileemail === user.email)
        {
            setUserProfile(user);
        }
        else{
            socket.emit("get-profile-details",{
                profileEmail:profileemail,requestEmail:user.email
            },(response)=>{
                setUserProfile(response.userProfile);
            });
        }
    }
  return (
    <friendContextProvider.Provider value={{userProfile,getUserProfile}}>
        {children}
    </friendContextProvider.Provider>
  )
}
