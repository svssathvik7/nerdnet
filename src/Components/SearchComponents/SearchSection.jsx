import React, { useContext, useEffect, useState } from "react";
import "./SearchSection.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Post from "../Post/Post";
import dateFormat from "dateformat";
import { userContextProvider } from "../../Context/userContext";
const formatAge = (date) => {
  return "Created - " + dateFormat(date, "mmmm dS, yyyy");
};

export default function SearchSection() {
  const [usersresult, setUsersResult] = useState([]);
  const [communitiesresult, setCommunitiesResult] = useState([]);
  const { type, searchQuery } = useParams();
  const { user, setUser } = useContext(userContextProvider);
  const [recentChatList, setRecentChatsList] = useState(user?.recentChats);
  useEffect(() => {
    setRecentChatsList(user?.recentChats);
  }, [user]);
  useEffect(() => {
    setRecentChatsList(user?.recentChats);
    const handleQuery = async () => {
      try {
        if (type == "user") {
          const response = (
            await axios.get(
              process.env.REACT_APP_BACKEND_URL +
                "/stats/search/" +
                "?q=" +
                searchQuery
            )
          ).data;
          if (response.status) {
            setUsersResult(response?.usersresult);
            setCommunitiesResult(response?.communityresult);
            console.log(usersresult);
          } else {
            setUsersResult([]);
          }
        } else if (type == "filter") {
          const response = (
            await axios.get(
              process.env.REACT_APP_BACKEND_URL +
                "/stats/search/" +
                "?p=" +
                searchQuery
            )
          ).data;
          console.log(response.status);
          if (response.status) {
            setUsersResult(response.posts);
            setCommunitiesResult(response?.communityresult);
          } else {
            setUsersResult([]);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Error retrieving data!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    };
    handleQuery();
  }, [searchQuery, type]);
  const handleAddChat = async (friendId) => {
    try {
      const response = (
        await axios.post(
          process.env.REACT_APP_BACKEND_URL + "/chat/add-recent-chats",
          {
            userId: user._id,
            friendId: friendId,
          }
        )
      ).data;
      if (!response.status) {
        console.log(response);
      } else {
        setUser((user) => ({
          ...user,
          chatList: response?.chatList,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [hasSubscibedTempVar, setHasSubsTempVar] = useState(false);
  const handleAddCommunity = async (community) => {
    try {
      const response = (
        await axios.post(
          process.env.REACT_APP_BACKEND_URL + "/auth/add-user-space",
          {
            user: user._id,
            space: community._id,
          }
        )
      ).data;
      if (response.status) {
        console.log("Space added");
        setHasSubsTempVar(true);
      } else {
        console.log("Failed adding space");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      id="search-section"
      className="flex flex-col items-center justify-start"
    >
      <div>
        {type == "user" ? (
          <h4 className="text-white font-medium text-2xl">
            Obtaining Search results for : "{searchQuery}"
          </h4>
        ) : (
          <h4 className="text-white font-medium text-2xl">
            Obtaining Search results for : #{searchQuery}
          </h4>
        )}
      </div>
      <div
        id="search-scroller"
        className="flex items-center justify-center p-2 flex-wrap"
      >
        {(usersresult?.length ?? 0) || (communitiesresult?.length ?? 0) ? (
          type === "user" ? (
            usersresult.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-lg w-fit h-fit flex flex-col items-center justify-around m-2 p-2 cursor-pointer hover:scale-105 trans100 flex-wrap"
              >
                <Link to={`/profile/${item.email}`}>
                  <img
                    alt="dp"
                    src={item.dp}
                    className="w-16 h-16 rounded-full"
                  />
                </Link>
                <Link to={`/profile/${item.email}`}>
                  <p className="text-black font-medium text-lg">
                    {item.username}
                  </p>
                </Link>
                <p className="text-slate font-medium text-base">
                  {formatAge(item?.joined ?? 0)}
                </p>
                <Link to={`/profile/${item.email}`}>
                  <p className="text-slate-500 font-medium text-base">
                    {item.education}
                  </p>
                </Link>
                {!((user?.recentChats && [item._id]) == item._id) && ( // Check if recentChatList is empty or item._id is not present
                  <button
                    onClick={() => {
                      handleAddChat(item._id);
                    }}
                    className={`bg-slate-500 text-white p-2 text-sm rounded-md hover:rounded-xl trans100`}
                  >
                    Add to Chats!
                  </button>
                )}
              </div>
            ))
          ) : (
            usersresult.map((item, i) => (
              <div key={i} className="m-2">
                <Post {...item} />
              </div>
            ))
          )
        ) : (
          <div>
            <p className="text-white font-extrabold text-3xl m-8">
              No Matching Results!
            </p>
          </div>
        )}
        {communitiesresult?.length ?? 0 ? (
          communitiesresult.map((community, i) => (
            <div
              key={i}
              className="bg-white w-fit p-1 flex flex-col items-center justify-start flex-wrap rounded-lg community-card"
            >
              <div className="flex flex-col items-end justify-end">
                <img
                  alt="cover"
                  src={community.coverPic}
                  className="preview-cover-pic object-contain"
                />
                <div className="p-1 bg-white absolute rounded-full">
                  <img
                    alt="dp"
                    src={community.dp}
                    className="preview-dp-pic rounded-full object-contain"
                  />
                </div>
              </div>
              <div>
                <div>
                  <div className="flex items-center justify-center">
                    <h4 className="font-bold text-lg w-fit">
                      {community.name}
                    </h4>
                    <p className="mx-1 w-fit text-sm rounded-lg bg-yellow-400 text-black">
                      #{community.subject}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-around w-fit p-2 flex-wrap">
                <p>
                  <b>{community?.likes ?? 10}</b> Likes
                </p>
                <p>
                  <b>{community?.followers?.length ?? 7}</b> Nerds
                </p>
                <p>
                  <b>{community?.posts?.length ?? 100}</b> Posts
                </p>
                <p>{formatAge(community?.dateCreated) ?? "Some date"}</p>
              </div>
              <div className="flex items-center justify-around w-full">
                <Link
                  className="bg-black text-white rounded-md p-1 w-24 hover:scale-95 trans100 hover:bg-white hover:text-black hover:border-2 hover:border-black text-center"
                  to={"/community/" + community?._id}
                >
                  Visit
                </Link>
                {!(
                  community?.followers?.includes(user?._id) ||
                  hasSubscibedTempVar
                ) && (
                  <button
                    className="bg-black text-white rounded-md p-1 w-24 hover:scale-95 trans100 hover:bg-white hover:text-black hover:border-2 hover:border-black text-center"
                    onClick={() => {
                      handleAddCommunity(community);
                    }}
                  >
                    Subscribe
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
