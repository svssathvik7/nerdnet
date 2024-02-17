import React, { useContext } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { loaderContextProvider } from './loaderContext';
export const statContextProvider = React.createContext(null);
export default function StatContext({children}) {
    const [trendingNerds,setTrendingNerds] = useState([]);
    const [trendingTopics,setTrendingTopics] = useState([]);
    const [trendingPosts,setTrendingPosts] = useState([]);
    const {setIsLoading} = useContext(loaderContextProvider);
    const getTrendingNerds = async ()=>{
      setIsLoading(true);
      try{
        const allNerds = (await axios.get(process.env.REACT_APP_BACKEND_URL+"/stats/getTrendingNerds")).data;
        if(allNerds.status){
            // console.log(topSortedNerds);
            setTrendingNerds(allNerds.nerds);
            setIsLoading(false);
        }
        else{
          setTrendingNerds([]);
          setIsLoading(false);
        }
      }
      catch(error){
        console.log(error);
        setTrendingNerds([]);
        setIsLoading(false);
      }
    }
    const getTrendingTopics = async ()=>{
      setIsLoading(true);
      try{
        const response = (await axios.get(process.env.REACT_APP_BACKEND_URL+"/stats/getTrendingTopics/")).data;
        if(response.status){
          setTrendingTopics(response.tags);
          setIsLoading(false);
        }
        else{
          setTrendingTopics([]);
          setIsLoading(false);
        }
      }
      catch(error){
        console.log(error);
        setTrendingTopics([]);
        setIsLoading(false);
      }
    }
    const getTrendingPosts = async ()=>{
      setIsLoading(true);
      try{
        const response = (await axios.get(process.env.REACT_APP_BACKEND_URL+"/stats/getTrendingPosts/")).data;
        if(response.status){
          setTrendingPosts(response.posts);
          console.log(trendingPosts);
        }
        else{
          setTrendingPosts([]);
        }
        setIsLoading(false);
      }
      catch(error)
      {
        setTrendingPosts([]);
        setIsLoading(false);
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
