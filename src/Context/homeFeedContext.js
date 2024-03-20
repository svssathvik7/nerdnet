import React, { useContext,useState } from 'react'
import { userContextProvider } from './userContext';
import { loaderContextProvider } from './loaderContext';
export const homeFeedContextProvider = React.createContext(null);
export default function HomeFeedContext({children}) {
  const {setIsLoading} = useContext(loaderContextProvider);
    const [homeFeed,setHomeFeed] = useState([]);
    const {user} = useContext(userContextProvider);
    const recommendHomeFeed = async ()=>{
        setIsLoading(true);
        const following = user?.following;
        var posts = [];
        for(var i=0;i<following?.length;i++)
        {
          for(var j=0;j<following[i]?.posts?.length;j++){
            posts.push(following[i]?.posts[j]);
          }
        }
        setHomeFeed(posts);
        setIsLoading(false);
    }
  return (
    <homeFeedContextProvider.Provider value={{homeFeed,recommendHomeFeed}}>
        {children}
    </homeFeedContextProvider.Provider>
  )
}
