import React, { useContext,useState } from 'react'
import { userContextProvider } from './userContext';
import { loaderContextProvider } from './loaderContext';
import axios from 'axios';
export const homeFeedContextProvider = React.createContext(null);
export default function HomeFeedContext({children}) {
  const {setIsLoading} = useContext(loaderContextProvider);
    const [homeFeed,setHomeFeed] = useState([]);
    const {user} = useContext(userContextProvider);
    const recommendHomeFeed = async (pageNum)=>{
        setIsLoading(true);
        try {
          const response = await (axios.post(process.env.REACT_APP_BACKEND_URL+"/posts/get-home-posts/",{
            user : user._id,
            pageNum : pageNum
          }));
          console.log(response)
          if(response?.data?.status){
            setHomeFeed(prevHomeFeed => [...prevHomeFeed,...response?.data?.posts]);
            setIsLoading(false);
            console.log(homeFeed)
          }
          else{
            setHomeFeed([]);
          }
        } catch (error) {
          console.log(error);
        }
        setIsLoading(false);
    }
  return (
    <homeFeedContextProvider.Provider value={{homeFeed,recommendHomeFeed}}>
        {children}
    </homeFeedContextProvider.Provider>
  )
}
