import React, { useEffect, useState } from "react";
import "./SearchSection.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const formatAge = (age) => {
  const difference = Date.now() - Date.parse(age);
  const year = 365*24*60*60*100;
  const accAge = (difference/year).toFixed(1);
  const days = 24*60*60*100;
  if(accAge == 0)
  {
    return Number.parseInt(difference/days)+"d Nerd";
  }
  else if(accAge <= 12){
    return Number.parseInt(accAge) + "m Nerd";
  }
  else{
    return Number.parseInt(accAge/12) + "y Nerd";
  }
}

export default function SearchSection() {
  const [result, setResult] = useState([]);
  const { searchQuery } = useParams();
  useEffect(() => {
    const handleQuery = async () => {
      try {
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
  }, [searchQuery]);
  return (
    <div
      id="search-section"
      className="flex flex-col items-center justify-start"
    >
      <div>
        <h4 className="text-white font-medium text-2xl">
          Obtaining Search results for : "{searchQuery}"
        </h4>
      </div>
      <div
        id="search-scroller"
        className="flex items-start justify-start p-2 flex-wrap"
      >
        {result?.length ? (
          result.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-lg w-fit h-fit flex flex-col items-center justify-around m-2 p-2 cursor-pointer hover:scale-105 trans300 flex-wrap"
            >
              <Link to={`/profile/${item.email}`}>
                <img alt="dp" src={item.dp} className="w-16 rounded-full" />
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
            </div>
          ))
        ) : (
          <p>No Matching Results!</p>
        )}
      </div>
    </div>
  );
}
