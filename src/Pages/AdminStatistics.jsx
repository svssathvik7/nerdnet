import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../Components/LoadPage/Loading";
import Header from "../Partials/Header";
import MiniNavBar from "../Components/Navbar/MiniNavBar";
import { loaderContextProvider } from "../Context/loaderContext";
import Chat from "../Components/ChatComponents/Chat";
import AddPostBtn from "../Components/AddPost/AddPostBtn";
import AsideBar from "../Partials/AsideBar";
import { socketContextProvider } from "../Context/socketContext";
import { userContextProvider } from "../Context/userContext";

export default function AdminStatistics() {
  const { admin_need } = useParams();
  const [users, setUsers] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const { user } = useContext(userContextProvider);
  const { socket } = useContext(socketContextProvider);
  const location = useLocation();
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
          } else {
            setUsers([]);
            console.log(response);
          }
        }
      );
    };
    getUsers();
  }, [users, location.pathname, pageNum]);
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
              setPageNum(pageNum - 1);
            }}
          >
            Previous
          </button>
          <button
            onClick={() => {
              setPageNum(pageNum + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  const ShowAllUsersData = () => {
    return <div></div>;
  };
  const ShowNerdNetMetrics = () => {
    return <div></div>;
  };
  const AddOrRemoveAdmins = () => {
    return <div></div>;
  };
  const { isLoading } = useContext(loaderContextProvider);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, [window]);
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
