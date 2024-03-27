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
export default function HomeFeed() {
  const [isLoading, setIsLoading] = useState(true);
  const [pageNum, setPageNum] = useState(0);
  const { homeFeed, recommendHomeFeed, totalPostsLength } = useContext(
    homeFeedContextProvider
  );
  const fetchMoreData = async () => {
    setPageNum(pageNum + 1);
    setIsLoading(true);
    setTimeout(() => {
      recommendHomeFeed(pageNum + 1); // Fetch the next page of data
    }, 1500);
    setIsLoading(false);
  };
  useEffect(() => {
    if (homeFeed?.length === 0) {
      setIsLoading(true);
      setPageNum(pageNum + 1);
      setTimeout(() => {
        recommendHomeFeed(pageNum + 1); // Fetch the next page of data
      }, 1500);
      setIsLoading(false);
    }
  }, []);
  return (
    <div
      id="home-feed-scroller"
      className="flex flex-col items-center justify-start flex-1 p-2"
    >
      <InfiniteScroll
        className="home-feed-posts-container"
        dataLength={homeFeed?.length}
        next={fetchMoreData}
        hasMore={homeFeed?.length !== totalPostsLength} // Set hasMore to true when there is more data to load
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
      </InfiniteScroll>
    </div>
  );
}
