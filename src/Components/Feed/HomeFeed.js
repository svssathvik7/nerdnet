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
  const [pageNum,setPageNum] = useState(0);
  const { homeFeed, recommendHomeFeed } = useContext(homeFeedContextProvider);
  useEffect(() => {
    setIsLoading(true);
    fetchMoreData();
    setIsLoading(false);
  }, []);
  const fetchMoreData = async () => {
    setPageNum(pageNum + 1);
    setIsLoading(true);
    await recommendHomeFeed(pageNum + 1); // Fetch the next page of data
    setIsLoading(false);
  };
  
  return (
    <div id="home-feed" className="flex flex-col items-center justify-center">
      <InfiniteScroll
        dataLength={homeFeed.length}
        next={fetchMoreData}
        hasMore={true} // Set hasMore to true when there is more data to load
        loader={
          <ThreeCircles
            visible={isLoading}
            height="90"
            width="100"
            color="#fff"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            className="infinite-scroll h-fit self-start"
          />
        }
        endMessage={
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
        }
      >
        <div
          id="home-feed-scroller"
          className="flex flex-col items-center justify-start"
        >
          {homeFeed?.map((post, i) => (
            <div className="m-2" key={i}>
              <Post {...post} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}  