import React from 'react'
import axios from 'axios';
import { useState } from 'react';
export const statContextProvider = React.createContext(null);
export default function StatContext({children}) {
    const [trendingNerds,setTrendingNerds] = useState([]);
    const [trendingTopics,setTrendingTopics] = useState([]);
    const [trendingPosts,setTrendingPosts] = useState([]);
    const getTrendingNerds = async ()=>{
      try{
        const allNerds = (await axios.get(process.env.REACT_APP_BACKEND_URL+"/stats/getTrendingNerds")).data;
        if(allNerds.status){
            // console.log(topSortedNerds);
            setTrendingNerds(allNerds.nerds);
        }
        else{
          setTrendingNerds([]);
        }
      }
      catch(error){
        console.log(error);
        setTrendingNerds([]);
      }
    }
    const getTrendingTopics = async ()=>{
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
    const getTrendingPosts = async ()=>{
      try{
        const response = (await axios.get(process.env.REACT_APP_BACKEND_URL+"/stats/getTrendingPosts/")).data;
        if(response.status){
          setTrendingPosts(response.posts);
          console.log(trendingPosts);
        }
        else{
          setTrendingPosts([]);
        }
      }
      catch(error)
      {
        setTrendingPosts([]);
      }
    }    
    const getStats = async ()=>{
      getTrendingNerds();
      getTrendingTopics();
      getTrendingPosts();

    }
  return (
    <statContextProvider.Provider value={{trendingNerds,getStats,trendingTopics,trendingPosts}}>
        {children}
    </statContextProvider.Provider>
  )
}
