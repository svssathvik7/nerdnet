import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { loaderContextProvider } from "./loaderContext";
import { userContextProvider } from "./userContext";
import { socketContextProvider } from "./socketContext";
export const statContextProvider = React.createContext(null);
export default function StatContext({ children }) {
  const [trendingNerds, setTrendingNerds] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const { user } = useContext(userContextProvider);
  const {socket} = useContext(socketContextProvider);
  const getTrendingNerds = async () => {
    if(trendingNerds?.length !== 0){
      return;
    }
    try {
      socket.emit("get-trending-nerds",(allNerds)=>{
        if (allNerds.status) {
          setTrendingNerds(allNerds.nerds);
        } else {
          setTrendingNerds([]);
        }
      });
    } catch (error) {
      console.log(error);
      setTrendingNerds([]);
    }
  };
  const getTrendingTopics = async () => {

    if(trendingTopics?.length !== 0){
      return;
    }
    try {
      socket.emit("get-trending-topics",(response)=>{
        if (response.status) {
          setTrendingTopics(response.tags);
        } else {
          setTrendingTopics([]);
        }
      });
    } catch (error) {
      console.log(error);
      setTrendingTopics([]);
    }
  };
  const getTrendingPosts = async () => {
    if(trendingPosts?.length !== 0){
      return;
    }
    try {
      socket.emit("get-trending-posts",(response)=>{
        if (response.status) {
          setTrendingPosts(response.posts);
        } else {
          setTrendingPosts([]);
        }
      });
    } catch (error) {
      setTrendingPosts([]);
    }
  };
  const getMySpaces = async () => {
    if(spaces?.length !== 0){
      return;
    }
    if(!user){
      return;
    }
    try {
      socket.emit("get-user-spaces",{
        user: user?._id
      },(response)=>{
        if (response?.status) {
          setSpaces(response?.spaces);
        } else {
          setSpaces([]);
        }
      });
    } catch (error) {
      console.log(error);
      setSpaces([]);
    }
  };
  const getStats = async () => {
    getMySpaces();
    getTrendingNerds();
    getTrendingTopics();
    getTrendingPosts();
  };
  return (
    <statContextProvider.Provider
      value={{ trendingNerds, getStats, trendingTopics, trendingPosts, spaces }}
    >
      {children}
    </statContextProvider.Provider>
  );
}
