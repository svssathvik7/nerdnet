import React, { useContext, useEffect } from "react";
import "./AsideBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TopNerdIcon from "../assets/bright-idea.svg";
import TopTopicIcon from "../assets/test-tubes.svg";
import TopPostIcon from "../assets/article.svg";
import Home from "../assets/home-logo.png";
import 'react-accessible-accordion/dist/fancy-example.css';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { statContextProvider } from "../Context/statContext";
import { userContextProvider } from "../Context/userContext";
const formatToK = (val) => {
  if (val >= 1000) {
    return Math.round(val / 1000) + "k";
  } else if (val < 100) {
    return val;
  } else {
    return (val / 1000).toFixed(2) + "k";
  }
};
function TrendingNerdsDiv() {
  const { trendingNerds } = useContext(statContextProvider);
  return (
    <div className="flex flex-wrap flex-col my-4">
      <Accordion allowZeroExpanded>
        <AccordionItem key={"nerds"}>
          <AccordionItemHeading className="flex items-center justify-start">
            <AccordionItemButton>
              <div className="flex items-center justify-start">
                <img
                  title="TrendingNerds"
                  className="w-8"
                  alt="emoji"
                  src={TopNerdIcon}
                />
                <h6 className="font-medium underline text-slate-200">
                  Trending Nerds
                </h6>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <ol className="list-decimal pl-4 flex flex-col items-center justify-start text-white">
              {trendingNerds.map((value, i) => (
                <li key={i} className="hover:scale-110 trans100">
                  <Link
                    to={"/profile/" + value.email}
                    className="text-fuchsia-50 font-base text-lg"
                  >
                    {value.username.split(" ")[0].length <= 7
                      ? value.username.split(" ")[0]
                      : value.username.slice(0, 5) + "..."}
                  </Link>
                  <sub className="text-xs mx-2">
                    [{formatToK(value.followersCount)}]
                  </sub>
                </li>
              ))}
            </ol>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
function TrendingTopicsDiv() {
  const { trendingTopics } = useContext(statContextProvider);
  return (
    <div className="flex flex-wrap flex-col my-4">
      <Accordion allowZeroExpanded>
        <AccordionItem key={"topics"}>
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className="flex items-center justify-start">
                <img
                  title="TrendingNerds"
                  className="w-8"
                  alt="emoji"
                  src={TopTopicIcon}
                />
                <h6 className="font-medium underline text-slate-200">
                  Trending Topics
                </h6>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <ol className="list-decimal pl-4 flex flex-col items-center justify-start text-white">
              {trendingTopics.map((value, i) => (
                <li key={i} className="hover:scale-110 trans100">
                  <Link to={"/search/filter/" + value._id}>
                    {value._id} <sub>[{formatToK(value.count)}]</sub>
                  </Link>
                </li>
              ))}
            </ol>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
function TrendingPostsDiv() {
  const { trendingPosts } = useContext(statContextProvider);
  return (
    <div className="flex flex-wrap flex-col my-4">
      <Accordion allowZeroExpanded>
        <AccordionItem key={"topics"}>
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className="flex items-center justify-start">
                <img
                  title="TrendingNerds"
                  className="w-8"
                  alt="emoji"
                  src={TopPostIcon}
                />
                <h6 className="font-medium underline text-slate-200">
                  Trending Posts
                </h6>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <ol className="list-decimal pl-4 flex flex-col items-center justify-start text-white">
              {trendingPosts.map((value, i) => (
                <li key={i} className="hover:scale-110 trans100">
                  <Link
                    to={"/posts/" + value._id}
                    title={
                      value.caption.length > 0 ? value.caption : value.postData
                    }
                  >
                    {value.caption.length > 0
                      ? value.caption.slice(0, 10) + "..."
                      : value.postData.slice(0, 10) + "..."}
                  </Link>
                </li>
              ))}
            </ol>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
const MySpaces = () => {
  const { spaces } = useContext(statContextProvider);
  return (
    <div className="flex flex-wrap flex-col my-4">
      <div className="flex items-center justify-center">
        <img title="My Spaces" className="w-8" alt="emoji" src={Home} />
        <h6 className="font-medium underline text-slate-200 text-center">
          My Spaces
        </h6>
      </div>
      <ol className="flex pl-4 items-center justify-center text-center text-white flex-wrap">
        {spaces.map((space, i) => (
          <Link
            className="w-fit p-1 m-1 bg-white rounded-lg hover:scale-110 trans100"
            to={"/community/" + space._id}
            key={i}
          >
            <img
              alt={space.name}
              src={space.dp}
              className="w-8 rounded-lg aspect-square"
            />
          </Link>
        ))}
      </ol>
    </div>
  );
};
function RedirectFooter() {
  return (
    <div
      id="semi-footer"
      className="flex w-[100%] items-center justify-around mt-4"
    >
      <Link
        to="/about"
        className="font-light text-gray-500 text-xs hover:underline"
      >
        About
      </Link>
      <Link
        to="/about"
        className="font-light text-gray-500 text-xs hover:underline"
      >
        Privacy & Policy
      </Link>
      <Link
        to="/about"
        className="font-light text-gray-500 text-xs hover:underline"
      >
        Revenue
      </Link>
      <p className="font-light text-gray-500 text-xs">
        &copy; Nerd.net {new Date().getFullYear()}
      </p>
    </div>
  );
}
export default function AsideBar() {
  const location = useLocation();
  const { getStats } = useContext(statContextProvider);
  useEffect(() => {
    getStats();
  }, [location.pathname]);
  const { user } = useContext(userContextProvider);
  return (
    <div
      className="flex flex-col items-center justify-start p-2 border-r-2 border-slate-300"
      id="aside-bar"
    >
      <TrendingNerdsDiv />
      <TrendingTopicsDiv />
      <TrendingPostsDiv />
      <MySpaces />
      {user?.isAdmin ? (
        <div
          className="flex flex-wrap flex-col my-4 rounded-full text-black"
          id="aside-bar-admin"
        >
          <Link
            to={"/admin/statistics/users"}
            className="p-2 bg-white rounded-md hover:scale-95 trans100 m-2"
          >
            Monitor Users
          </Link>
          <Link
            to={"/admin/statistics/users-data"}
            className="p-2 bg-white rounded-md hover:scale-95 trans100 m-2"
          >
            Monitor User's data
          </Link>
          <Link
            to={"/admin/statistics/metrics"}
            className="p-2 bg-white rounded-md hover:scale-95 trans100 m-2"
          >
            Statistics
          </Link>
          <Link
            to={"/admin/statistics/admins"}
            className="p-2 bg-white rounded-md hover:scale-95 trans100 m-2"
          >
            Add Admins
          </Link>
        </div>
      ) : (
        <></>
      )}
      <RedirectFooter />
    </div>
  );
}
