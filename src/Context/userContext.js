import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
export const userContextProvider = React.createContext(null);
const UserContext = ({children}) => {
    const location = useLocation();
    const [user,setUser] = useState(null);
    const getUserDetails = async ()=>{
        try{
            const token = localStorage.getItem('token');
            const response = (await axios.post(process.env.REACT_APP_BACKEND_URL+"/auth/currUser/",{token})).data;
            if(response.status){
                var data = response.userData;
                const temp = new Set(data.recentChats);
                data.recentChats = [...temp];
                setUser(data);
            }
            else{
                setUser(null);
            }
        }
        catch(error){
            setUser(null);
        }
    }
    return (
        <userContextProvider.Provider value={{user,setUser,getUserDetails}}>
            {children}
        </userContextProvider.Provider>
    )
}
export default UserContext;