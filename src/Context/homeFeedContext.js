import React, { useContext, useState } from "react";
import { userContextProvider } from "./userContext";
import { loaderContextProvider } from "./loaderContext";
import axios from "axios";
export const homeFeedContextProvider = React.createContext(null);
export default function HomeFeedContext({ children }) {
  const pageSize = 5;
  const [homeFeed, setHomeFeed] = useState([]);
  const [totalPostsLength, setTotalPostsLength] = useState(0);
  const { user } = useContext(userContextProvider);
  const { setIsLoading } = useContext(loaderContextProvider);
  const recommendHomeFeed = async (pageNum) => {
    console.log("Len - ", homeFeed.length, " pageNum - ", pageNum);
    try {
      if (!user) {
        setIsLoading(true);
        console.log(pageNum);
        return;
      } else {
        setIsLoading(false);
      }
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/posts/get-home-posts/",
        {
          user: user?._id,
          pageNum: pageNum,
        }
      );
      if (response?.data?.status) {
        if (response?.data?.totalNumPosts !== homeFeed?.length) {
          var newPosts = homeFeed.concat(response?.data?.posts);
          newPosts = [...new Set(newPosts)]
          setHomeFeed([...newPosts]);
          setTotalPostsLength(response?.data?.totalNumPosts);
        } else {
          var newPosts = [...new Set(response?.data?.posts)]
          setTotalPostsLength(response?.data?.totalNumPosts);
          setHomeFeed([...newPosts]);
        }
      } else {
        setHomeFeed(homeFeed);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <homeFeedContextProvider.Provider
      value={{ homeFeed, recommendHomeFeed, totalPostsLength }}
    >
      {children}
    </homeFeedContextProvider.Provider>
  );
}
