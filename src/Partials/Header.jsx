import React, { useState, useEffect } from "react";
import NerdLogo from "../assets/nerd-logo-2.svg";
import "./Header.css";
import MaxiNavBar from "../Components/Navbar/MaxiNavBar";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { userContextProvider } from "../Context/userContext";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { statContextProvider } from "../Context/statContext";
import axios from "axios";
const NotificationComponent = (props) => {
  const [showNotify,setShowNotify] = useState(true);
  const handleNotificationResult = async(action)=>{
    try {
      const response = (await axios.post(process.env.REACT_APP_BACKEND_URL+"/admins/respond-admin-invite",{
        admin : props.from,
        responder : props.to,
        action : action,
        notification_id : props._id
      })).data;
      if(response.status){
        setShowNotify(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div key={props.i} className="flex items-center justify-around">
      <p>{props?.message}</p>
      {showNotify && <div className="flex flex-col items-center justify-start mx-2 text-white gap-1">
        <button onClick={()=>{handleNotificationResult("accept")}} className="bg-green-500 px-1 rounded-sm">Accept</button>
        <button onClick={()=>{handleNotificationResult("decline")}} className="bg-red-600 px-1 rounded-sm">Decline</button>
      </div>}
    </div>
  );
};
export default function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [expand, setExpand] = useState(false);
  const { user, getUserDetails } = useContext(userContextProvider);
  const { getStats } = useContext(statContextProvider);
  const [showNotification, setShowNotification] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("LoggedOut!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  useEffect(() => {
    getStats();
  }, [user]);
  useEffect(() => {
    getUserDetails();
  }, []);
  const toggleDropdown = () => {
    setExpand(!expand);
  };
  return (
    <div
      id="header"
      className={`bg-black p-2 flex items-center ${
        isMobile ? "justify-between" : "justify-around"
      } border-b-2 border-slate-50`}
    >
      <a href="/home" id="nerd-logo">
        <img
          alt="nerd-logo"
          src={NerdLogo}
          className="w-8 m-2 cursor-pointer"
        />
      </a>
      {isMobile ? <></> : <MaxiNavBar />}
      <div className="flex items-center justify-center relative">
        <div
          onClick={toggleDropdown}
          className="text-3xl cursor-pointer m-2 relative"
        >
          {user ? (
            <img
              src={user?.dp}
              alt="dp"
              className="w-10 aspect-square object-cover border-white border-2"
            />
          ) : (
            <CgProfile color="white" />
          )}
        </div>
        {expand && (
          <div className="the-menu-head absolute top-0 bg-white p-2 rounded-md shadow-md right-0 min-w-44 w-fit flex flex-col items-center h-fit justify-start trans100">
            <button
              onClick={() => {
                setExpand(false);
              }}
              className="block text-red-600 hover:bg-gray-200 py-1 px-2 rounded-md font-extrabold mx-auto"
            >
              <IoMdClose />
            </button>
            <Link
              to={"/profile/" + user.email}
              className="block text-gray-800 hover:bg-gray-200 py-1 px-2 rounded-md"
              onClick={() => {
                setExpand(!expand);
              }}
            >
              Profile
            </Link>
            <button
              className="block relative text-gray-800 hover:bg-gray-200 py-1 px-2 rounded-md"
              onClick={() => {
                setShowNotification(!showNotification);
              }}
            >
              Notifications
              {user && user.notifications && user.notifications.length > 0 && (
                <p className="bg-red-600 absolute top-0 -right-2 w-4 h-4 text-white rounded-full text-center flex items-center justify-center text-xs">
                  {user.notifications.length > 9
                    ? "9+"
                    : user.notifications.length}
                </p>
              )}
            </button>
            {user?.notifications?.length > 0 && showNotification && (
              <div className="block relative text-xs text-white bg-gray-800 py-1 px-2 rounded-md notification-tab w-80 trans100 hover:bg-gray-500 cursor-pointer">
                {user?.notifications?.map((note, i) => (
                  <NotificationComponent {...note}/>
                ))}
              </div>
            )}
            <a
              href="/"
              className="block text-gray-800 hover:bg-gray-200 py-1 px-2 rounded-md"
              onClick={handleLogout}
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
