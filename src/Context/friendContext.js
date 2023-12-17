import React from 'react'
import { userContextProvider } from './userContext';
import { useContext,useState } from 'react';
import axios from 'axios';
export const friendContextProvider = React.createContext(null);
export default function FriendContext({children}) {
    const {user} = useContext(userContextProvider);
    const [userProfile,setUserProfile] = useState(user);
    const getUserProfile = async(profileemail)=>{
        if(profileemail === user.email)
        {
            setUserProfile(user);
        }
        else{
            const response = (await axios.post("http://localhost:3500/api/auth/profileDetails",{profileEmail:profileemail,requestEmail:user.email})).data;
            console.log(response.userProfile.isfollowing);
            setUserProfile(response.userProfile);
        }
    }
  return (
    <friendContextProvider.Provider value={{userProfile,getUserProfile}}>
        {children}
    </friendContextProvider.Provider>
  )
}
