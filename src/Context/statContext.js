import React from 'react'
import axios from 'axios';
import { useState } from 'react';
export const statContextProvider = React.createContext(null);
export default function StatContext({children}) {
    const [trendingNerds,setTrendingNerds] = useState([]);
    const getTrendingNerds = async ()=>{
        const allNerds = (await axios.get(process.env.REACT_APP_BACKEND_URL+"/stats/getAllUserDetails")).data;
        if(allNerds.status){
            const sortedNerds = allNerds.users.sort((a,b)=> b.followers.length - a.followers.length);
            const topSortedNerds = sortedNerds.slice(0,Math.min(sortedNerds.length,30));
            console.log(topSortedNerds);
            setTrendingNerds(topSortedNerds);
        }
    }
  return (
    <statContextProvider.Provider value={{trendingNerds,getTrendingNerds}}>
        {children}
    </statContextProvider.Provider>
  )
}
