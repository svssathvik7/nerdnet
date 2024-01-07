import React, { useContext, useEffect } from 'react'
import "./AsideBar.css";
import { Link } from 'react-router-dom';
import TopNerdIcon from "../assets/bright-idea.svg";
import TopTopicIcon from "../assets/test-tubes.svg";
import TopPostIcon from "../assets/article.svg";
import { statContextProvider } from '../Context/statContext';
function TrendingNerdsDiv(){
  const {trendingNerds} = useContext(statContextProvider);
  return (
    <div className='flex flex-wrap flex-col my-4'>
    <div className='flex items-center justify-start'>
      <img title='TrendingNerds' className='w-8' alt='emoji' src={TopNerdIcon}/>
      <h6 className='font-medium underline text-slate-200'>Trending Nerds</h6>
    </div>
    <ol className='list-decimal pl-4 flex flex-col items-center justify-start text-white'>
      {trendingNerds.map((value, i) => (
          <li key={i}><Link to={"/profile/" + value.email} className='text-fuchsia-50 font-base text-lg'>{value.username.split(" ")[0].length <= 7 ? value.username.split(" ")[0] : value.username.slice(0,5)+"..."}</Link>
          <sub className='text-xs mx-2'>[{value?.followersCount??"Beginner"}]</sub>
          </li>
      ))}
    </ol>
    </div>
  )
}
function TrendingTopicsDiv(){
  const {trendingTopics} = useContext(statContextProvider);
  return (
    <div className='flex flex-wrap flex-col my-4'>
    <div className='flex items-center justify-start'>
      <img title='TrendingNerds' className='w-8' alt='emoji' src={TopTopicIcon}/>
      <h6 className='font-medium underline text-slate-200'>Trending Topics</h6>
    </div>
    <ol className='list-decimal pl-4 flex flex-col items-center justify-start text-white'>
      {trendingTopics.map((value, i) => (
          <li key={i}>
            <p>{value._id}<sub>({value.count})</sub></p>
          </li>
      ))}
    </ol>
    </div>
  )
}
function TrendingPostsDiv(){
  const {trendingTopics} = useContext(statContextProvider);
  return (
    <div className='flex flex-wrap flex-col my-4'>
    <div className='flex items-center justify-start'>
      <img title='TrendingNerds' className='w-8' alt='emoji' src={TopPostIcon}/>
      <h6 className='font-medium underline text-slate-200'>Trending Posts</h6>
    </div>
    <ol className='list-decimal pl-4 flex flex-col items-center justify-start text-white'>
      {trendingTopics.map((value, i) => (
          <li key={i}>
            <p>{value._id}<sub>({value.count})</sub></p>
          </li>
      ))}
    </ol>
    </div>
  )
}
function RedirectFooter(){
  return (
    <div id='semi-footer' className='flex w-[100%] items-center justify-around mt-4'>
      <Link to="/about" className='font-light text-gray-500 text-xs hover:underline'>About</Link>
      <Link to="/about" className='font-light text-gray-500 text-xs hover:underline'>Privacy & Policy</Link>
      <Link to="/about" className='font-light text-gray-500 text-xs hover:underline'>Revenue</Link>
      <p className='font-light text-gray-500 text-xs'>&copy; Nerd.net {new Date().getFullYear()}</p>
    </div>
  )
}
export default function AsideBar() {
  const {getStats} = useContext(statContextProvider);
  useEffect(
    ()=>{
      getStats();
    }
  ,[]);
  return (
    <div className='flex flex-col items-center justify-start p-2' id='aside-bar'>
        <TrendingNerdsDiv/>
        <TrendingTopicsDiv/>
        <TrendingPostsDiv/>
        <RedirectFooter/>
    </div>
  )
}
