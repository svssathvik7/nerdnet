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
            const response = (await axios.post(process.env.REACT_APP_BACKEND_URL+"/auth/profileDetails",{profileEmail:profileemail,requestEmail:user.email})).data;
            setUserProfile(response.userProfile);
        }
    }
  return (
    <friendContextProvider.Provider value={{userProfile,getUserProfile}}>
        {children}
    </friendContextProvider.Provider>
  )
}
