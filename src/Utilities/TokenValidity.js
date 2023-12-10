import React from 'react'
import axios from 'axios'
export default async function TokenValidity() {
    try{
        const token = localStorage.getItem('token');
        if(token!=="undefined" && token!==null){
            const headers = {
                'Authorization' : `Beared ${token}`,
                'Content-type' : "application/json"
            }
            const response = await axios.post("http://localhost:3500/api/auth/authorizeUser/",{},{headers});
            const data = response.data;
            return data.status;
        }
        else{
            return false;
        }
    }
    catch(error){
        return false;
    }
}
