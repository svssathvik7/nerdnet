import axios from "axios";
import React from "react";
import { useState } from "react";
export const userContextProvider = React.createContext(null);
const UserContext = ({children}) => {
    const [user,setUser] = useState(null);
    const getUserDetails = async ()=>{
        if(user===null){
            try{
                const token = localStorage.getItem('token');
                const response = (await axios.post("http://localhost:3500/api/auth/currUser/",{token})).data;
                if(response.status){
                    setUser(response.userData);
                }
                else{
                    setUser(null);
                }
            }
            catch(error){
                setUser(null);
            }
        }
    }
    return (
        <userContextProvider.Provider value={{user,setUser,getUserDetails}}>
            {children}
        </userContextProvider.Provider>
    )
}
export default UserContext;