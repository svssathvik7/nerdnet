import React, { useContext,useState } from 'react'
import { userContextProvider } from './userContext';
import { loaderContextProvider } from './loaderContext';
import axios from 'axios';
export const homeFeedContextProvider = React.createContext(null);
export default function HomeFeedContext({children}) {
    const [homeFeed,setHomeFeed] = useState([]);
    const [totalPostsLength,setTotalPostsLength] = useState(0);
    const {user} = useContext(userContextProvider);
    const {setIsLoading} = useContext(loaderContextProvider);
    const recommendHomeFeed = async (pageNum)=>{
        try {
          if(!user){
            setIsLoading(true);
            return ;
          }
          else{
            setIsLoading(false);
          }
          const response = await (axios.post(process.env.REACT_APP_BACKEND_URL+"/posts/get-home-posts/",{
            user : user?._id,
            pageNum : pageNum
          }));
          if(response?.data?.status){
            if(response?.data?.totalNumPosts !== homeFeed?.length){
              setHomeFeed(prevHomeFeed => [...prevHomeFeed,...response?.data?.posts]);
              setTotalPostsLength(response?.data?.totalNumPosts);
            }
            else{
              setTotalPostsLength(response?.data?.totalNumPosts);
              setHomeFeed(response?.data?.posts);
            }
          }
          else{
            setHomeFeed([]);
          }
        } catch (error) {
          console.log(error);
        }
    }
  return (
    <homeFeedContextProvider.Provider value={{homeFeed,recommendHomeFeed,totalPostsLength}}>
        {children}
    </homeFeedContextProvider.Provider>
  )
}
