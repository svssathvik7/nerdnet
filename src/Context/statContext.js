import React from 'react'
import axios from 'axios';
import { useState } from 'react';
export const statContextProvider = React.createContext(null);
export default function StatContext({children}) {
    const [trendingNerds,setTrendingNerds] = useState([]);
    const [trendingTopics,setTrendingTopics] = useState([]);
    const getTrendingNerds = async ()=>{
        const allNerds = (await axios.get(process.env.REACT_APP_BACKEND_URL+"/stats/getAllUserDetails")).data;
        if(allNerds.status){
            const sortedNerds = allNerds.users.sort((a,b)=> b.followers.length - a.followers.length);
            const topSortedNerds = sortedNerds.slice(0,Math.min(sortedNerds.length,5));
            // console.log(topSortedNerds);
            setTrendingNerds(topSortedNerds);
        }
    }
    const getTrendingTopics = async ()=>{
      console.log("asking")
      try{
        const response = (await axios.get(process.env.REACT_APP_BACKEND_URL+"/stats/getTrendingTopics/")).data;
        if(response.status){
          setTrendingTopics(response.tags);
        }
        else{
          setTrendingTopics([]);
        }
      }
      catch(error){
        console.log(error);
        setTrendingTopics([]);
      }
    }
    const getStats = async ()=>{
      getTrendingNerds();
      getTrendingTopics();
    }
  return (
    <statContextProvider.Provider value={{trendingNerds,getStats,trendingTopics}}>
        {children}
    </statContextProvider.Provider>
  )
}
