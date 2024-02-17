import React, { useEffect, useState } from "react";
import "./SearchSection.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Post from "../Post/Post";
import dateFormat from "dateformat";
const formatAge = (date) => {
  return "Joined - " + dateFormat(date,"mmmm dS, yyyy");
};

export default function SearchSection() {
  const [result, setResult] = useState([]);
  const { type, searchQuery } = useParams();
  useEffect(() => {
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
          console.log(response.status);
          if (response.status) {
            setResult(response.result);
            console.log(result);
          } else {
            setResult([]);
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
            setResult(response.posts);
          } else {
            setResult([]);
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
  }, [searchQuery,type]);
  const handleAddChat = async(e)=>{
    e.preventDefault();
  }
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
      <div id="search-scroller" className="flex items-center justify-center p-2 flex-wrap">
          {result?.length??0 ? 
            type === "user" ?
            result.map((item, i) => (
              <div key={i} className="bg-white rounded-lg w-fit h-fit flex flex-col items-center justify-around m-2 p-2 cursor-pointer hover:scale-105 trans100 flex-wrap">
                <Link to={`/profile/${item.email}`}>
                  <img alt="dp" src={item.dp} className="w-16 h-16 rounded-full" />
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
                <button onClick={handleAddChat} className="bg-slate-500 text-white p-2 text-sm rounded-md hover:rounded-xl trans100">Add to Chats!</button>
              </div>
            ))
            :
            result.map((item, i)=>(
              <div key={i} className="m-2">
                <Post {...item}/>
              </div>
            )
          ):(
            <div>
              <p className="text-white font-extrabold text-3xl m-8">No Matching Results!</p>
            </div>
          )}
      </div>
    </div>
  );
}
