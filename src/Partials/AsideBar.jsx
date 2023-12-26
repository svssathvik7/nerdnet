import React, { useContext, useEffect } from 'react'
import "./AsideBar.css";
import { Link } from 'react-router-dom';
import { statContextProvider } from '../Context/statContext';
function TrendingNerdsDiv(){
  const {trendingNerds} = useContext(statContextProvider);
  return (
    <div className='flex flex-wrap flex-col my-4'>
        <h6 className='font-medium underline'>Trending Nerds</h6>
        {trendingNerds.map((value,i)=>(
            <Link to={"/profile/"+value.email} key={i} className='text-slate-500'>{value.username}</Link>
        ))}
    </div>
  )
}
export default function AsideBar() {
  const {getTrendingNerds} = useContext(statContextProvider);
  useEffect(
    ()=>{
      getTrendingNerds();
    }
  ,[]);
  return (
    <div className='bg-white flex flex-col items-center justify-start p-2' id='aside-bar'>
        <TrendingNerdsDiv/>
    </div>
  )
}
