import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../Components/LoadPage/Loading";
import Header from "../Partials/Header";
import MiniNavBar from "../Components/Navbar/MiniNavBar";
import { loaderContextProvider } from "../Context/loaderContext";
import Chat from "../Components/ChatComponents/Chat";
import AddPostBtn from "../Components/AddPost/AddPostBtn";
import AsideBar from "../Partials/AsideBar";
import { socketContextProvider } from "../Context/socketContext";
import { userContextProvider } from "../Context/userContext";
import TokenValidity from "../Utilities/TokenValidity";

export default function AdminStatistics() {
  const { admin_need } = useParams();
  const [users, setUsers] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [stats, setStats] = useState([]);
  const [triggerFetch, setTriggerFetch] = useState(true);
  const [pageLimit, setPageLimit] = useState(1);
  const [displayUserInterests, setDisplayUserInterests] = useState(false);
  const [userRecord, setUserRecord] = useState([]);
  const { user } = useContext(userContextProvider);
  const { socket } = useContext(socketContextProvider);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const getUsers = async () => {
      socket.emit(
        "admin-get-all-users",
        {
          userId: user?._id,
          pageNum: pageNum,
        },
        (response) => {
          console.log(response);
          if (response.status) {
            setUsers(response.data);
            setPageLimit(response.pageLimit);
          } else {
            setUsers([]);
            console.log(response);
          }
        }
      );
    };
    const getStats = async () => {
      try {
        socket.emit(
          "admin-get-all-stats",
          {
            userId: user?._id,
          },
          (response) => {
            if (response.status) {
              setStats(response.stats);
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
    getUsers();
  }, [users, triggerFetch]);
  const ShowAllUsers = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center flex-wrap m-2">
          {users &&
            users?.map((userRecord, i) => (
              <div
                key={i}
                className="bg-white text-black p-2 rounded-md w-fit flex-wrap m-2"
              >
                <div className="flex items-center justify-center">
                  <img
                    alt="dp"
                    src={userRecord?.dp}
                    className="w-12 object-cover aspect-square rounded-md mx-1"
                  />
                  <div className="flex flex-col items-center justify-center">
                    <p>{userRecord?.username}</p>
                    <p>{userRecord?.email}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 m-1">
                  <div className="flex flex-col items-center justify-center">
                    <p>{userRecord?.followers?.length}</p>
                    <p>Followers</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p>{userRecord?.following?.length}</p>
                    <p>Following</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p>{userRecord?.spaces?.length}</p>
                    <p>Communities</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div
          id="pagination"
          className="text-black flex items-center justify-around w-52 my-2 bg-white p-1 rounded-md"
        >
          <button
            onClick={() => {
              if (pageNum != 1) setPageNum(pageNum - 1);
            }}
            className={`${
              pageNum === 1
                ? " opacity-50 pointer-events-none "
                : " cursor-pointer "
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => {
              setPageNum(pageNum + 1);
            }}
            className={`${
              pageNum === pageLimit
                ? " opacity-50 pointer-events-none "
                : " cursor-pointer "
            }`}
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  const ShowAllUsersData = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center flex-wrap m-2">
          {users &&
            users?.map((userRecord, i) => (
              <div
                key={i}
                className="bg-white cursor-pointer text-black p-2 rounded-md w-fit flex-wrap m-2"
                onClick={() => {
                  setUserRecord(userRecord);
                  setDisplayUserInterests(true);
                }}
              >
                <div className="flex items-center justify-center">
                  <img
                    alt="dp"
                    src={userRecord?.dp}
                    className="w-12 object-cover aspect-square rounded-md mx-1"
                  />
                  <div className="flex flex-col items-center justify-center">
                    <p>{userRecord?.username}</p>
                    <p>{userRecord?.email}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 m-1">
                  <div className="flex flex-col items-center justify-center">
                    <p>{userRecord?.followers?.length}</p>
                    <p>Followers</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p>{userRecord?.following?.length}</p>
                    <p>Following</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p>{userRecord?.spaces?.length}</p>
                    <p>Communities</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div
          id="pagination"
          className="text-black flex items-center justify-around w-52 my-2 bg-white p-1 rounded-md"
        >
          <button
            onClick={() => {
              if (pageNum != 1) setPageNum(pageNum - 1);
            }}
            className={`${
              pageNum === 1
                ? " opacity-50 pointer-events-none "
                : " cursor-pointer "
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => {
              setPageNum(pageNum + 1);
            }}
            className={`${
              pageNum === pageLimit
                ? " opacity-50 pointer-events-none "
                : " cursor-pointer "
            }`}
          >
            Next
          </button>
        </div>
        {displayUserInterests === true &&
          (userRecord?.interestsHistory?.length ? (
            <div className="absolute bg-yellow-400 w-fit h-fit rounded-md flex items-center justify-start flex-col text-black flex-wrap p-2 z-50">
              <p className="font-bold">{userRecord?.username}'s Interests</p>
              <div className="flex items-center justify-start max-w-2xl flex-wrap max-h-96 overflow-y-scroll">
                {userRecord?.interestsHistory?.map((interest, i) => (
                  <div
                    key={i}
                    className="w-fit inline bg-white p-2 rounded-lg m-2"
                  >
                    {interest}
                  </div>
                ))}
              </div>
              <button
                className="bg-black text-white p-2 rounded-sm"
                onClick={() => {
                  setDisplayUserInterests(false);
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <div className="absolute bg-yellow-400 w-fit h-fit rounded-md flex items-center justify-start flex-col flex-wrap p-2 z-50">
              <p className="text-black">No Interests to display</p>
              <button
                className="bg-black text-white p-2 rounded-sm"
                onClick={() => {
                  setDisplayUserInterests(false);
                }}
              >
                Close
              </button>
            </div>
          ))}
      </div>
    );
  };
  const ShowNerdNetMetrics = () => {
    return (
      <div className="bg-white p-2 text-black w-3/4 flex flex-col items-center justify-start rounded-sm ">
        <p className="font-bold text-xl">Real Time Stats</p>
        <div className="flex items-center justify-around flex-wrap gap-2 m-2">
          <div className="bg-black text-white p-2 rounded-md flex items-center justify-center flex-col">
            <p>{stats?.totalNerds}</p>
            <p>Total Nerds</p>
          </div>
          <div className="bg-black text-white p-2 rounded-md flex items-center justify-center flex-col">
            <p>{stats?.totalAdmins}</p>
            <p>Total Admins</p>
          </div>
          <div className="bg-black text-white p-2 rounded-md flex items-center justify-center flex-col">
            <p>{stats?.totalPosts}</p>
            <p>Total Posts</p>
          </div>
          <div className="bg-black text-white p-2 rounded-md flex items-center justify-center flex-col">
            <p>{stats?.totalCommunities}</p>
            <p>Total Communities</p>
          </div>
          <div className="bg-black text-white p-2 rounded-md flex items-center justify-center flex-col">
            <p>{stats?.totalComments}</p>
            <p>Total Comments</p>
          </div>
        </div>
        <button
          className="bg-yellow-400 hover:scale-105 p-2 rounded-md font-bold m-2"
          onClick={() => {
            setTriggerFetch(!triggerFetch);
          }}
        >
          ReFetch Data
        </button>
      </div>
    );
  };
  const AddOrRemoveAdmins = () => {
    return <div></div>;
  };
  const { isLoading } = useContext(loaderContextProvider);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, [window]);
  useEffect(() => {
    TokenValidity().then((res) => {
      if (res !== true) {
        navigate("/");
      }
    });
  }, []);
  return (
    <div className="text-white flex flex-col item-center justify-start">
      {isLoading && <Loading />}
      <Header />
      <div className="flex items-center justify-start">
        <AsideBar />
        <div className="flex flex-1 w-fit items-center justify-start flex-col">
          {admin_need === "users" ? (
            <ShowAllUsers />
          ) : admin_need === "users-data" ? (
            <ShowAllUsersData />
          ) : admin_need === "metrics" ? (
            <ShowNerdNetMetrics />
          ) : admin_need === "admins" ? (
            <AddOrRemoveAdmins />
          ) : (
            <></>
          )}
        </div>
      </div>
      {isMobile ? <MiniNavBar /> : null}
      {isMobile ? null : <AddPostBtn />}
      <Chat />
    </div>
  );
}
