import React, { useEffect } from "react";
import Post from "../Post/Post";
import "./HomeFeed.css";
import { useState } from "react";
import Lottie from "lottie-react";
import DoneAnimation from "../../assets/doneAnimation.json";
import { ThreeCircles } from "react-loader-spinner";
import { homeFeedContextProvider } from "../../Context/homeFeedContext";
import { useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { userContextProvider } from "../../Context/userContext";
export default function HomeFeed() {
  const [isLoading, setIsLoading] = useState(true);
  const [pageNum, setPageNum] = useState(0);
  const { homeFeed, recommendHomeFeed, totalPostsLength } = useContext(
    homeFeedContextProvider
  );
  const { user } = useContext(userContextProvider);
  const fetchMoreData = async () => {
    console.log("fetch more data");
    setPageNum(pageNum + 1);
    setIsLoading(true);
    setTimeout(() => {
      recommendHomeFeed(pageNum); // Fetch the next page of data
      setIsLoading(false);
    }, 3000); // Fetch the next page of data
  };
  useEffect(() => {
    if (homeFeed?.length === 0) {
      setIsLoading(true);
      setPageNum(1);
      setTimeout(async () => {
        recommendHomeFeed(1);
        setIsLoading(false);
      }, 3000);
    }
  }, [user]);
  return (
    <div
      id="home-feed-scroller"
      className="flex flex-col items-center justify-start p-2"
    >
      <InfiniteScroll
        dataLength={homeFeed?.length}
        next={fetchMoreData}
        hasMore={homeFeed?.length !== totalPostsLength} // Set hasMore to true when there is more data to load
        scrollableTarget="home-feed-scroller"
        loader={
          <ThreeCircles
            visible={isLoading}
            height="90"
            width="100"
            color="#fff"
          />
        }
      >
        {homeFeed?.map((post, i) => (
          <div className="m-2" key={i}>
            <Post {...post} />
          </div>
        ))}
        {homeFeed?.length == 0 && (
          <div
            id="feed-covered-message"
            className="flex items-center justify-center text-center"
          >
            <h1 className="text-5xl font-bold text-white">Feed got covered!</h1>
            <Lottie
              animationData={DoneAnimation}
              className="w-64 h-fit p-0"
              loop={true}
            />
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}
