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
  const { setIsLoading } = useContext(loaderContextProvider);
  const {socket} = useContext(socketContextProvider);
  const getTrendingNerds = async () => {
    setIsLoading(true);
    try {
      socket.emit("get-trending-nerds",(allNerds)=>{
        if (allNerds.status) {
          // console.log(topSortedNerds);
          setTrendingNerds(allNerds.nerds);
          setIsLoading(false);
        } else {
          setTrendingNerds([]);
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
      setTrendingNerds([]);
      setIsLoading(false);
    }
  };
  const getTrendingTopics = async () => {
    setIsLoading(true);
    try {
      socket.emit("get-trending-topics",(response)=>{
        if (response.status) {
          setTrendingTopics(response.tags);
          setIsLoading(false);
        } else {
          setTrendingTopics([]);
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
      setTrendingTopics([]);
      setIsLoading(false);
    }
  };
  const getTrendingPosts = async () => {
    setIsLoading(true);
    try {
      socket.emit("get-trending-posts",(response)=>{
        if (response.status) {
          setTrendingPosts(response.posts);
          console.log(trendingPosts);
        } else {
          setTrendingPosts([]);
        }
      });
      setIsLoading(false);
    } catch (error) {
      setTrendingPosts([]);
      setIsLoading(false);
    }
  };
  const getMySpaces = async () => {
    setIsLoading(true);
    try {
      socket.emit("get-user-spaces",{
        user: user?._id
      },(response)=>{
        if (response.status) {
          setSpaces(response.spaces);
          setIsLoading(false);
          console.log(response.spaces);
        } else {
          setSpaces([]);
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
      setSpaces([]);
      setIsLoading(false);
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
