import React, { useEffect } from 'react'
import "./Comment.css";
import { Link } from 'react-router-dom';
const calculateTimeDifference = (timestamp) => {
    const currentTime = new Date().getTime();
    const postTime = new Date(timestamp).getTime();
    const timeDifference = currentTime - postTime;

    // Calculate seconds, minutes, hours, days, and weeks
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
        return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (days > 0) {
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours > 0) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (seconds > 10) {
        return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    } else {
        return 'Just now';
    }
};

const TimeAgo = (props) => {
    return (
        <div className='flex w-full items-center justify-end'>
            <p className='post-time-stamp'>{calculateTimeDifference(props.date)}</p>
        </div>
    );
};

export default function Comment(props) {
    useEffect(
        ()=>{
            console.log(props);
        }
    ,[]);
  return (
    <div className='comment-box m-1 flex items-center justify-start p-1 rounded-l-lg rounded-bl-lg bg-slate-400'>
        <div>
            <Link to={"/profile/"+props?.commentedUser?.email??"user@gmail.com"}>
                <img className='w-8 rounded-full comment-box-dp' alt='user-dp' src={props?.commentedUser?.dp??"#"} title={props?.commentedUser?.username??"Nerd"}/>
            </Link>
        </div>
        <div className='flex flex-col items-center justify-center'>
            <div>
                <p className='mx-1'>{props.data}</p>
            </div>
            <div className='w-full'>
                <TimeAgo date={props.date} />
            </div>
            <div id='comment-metrics'>

            </div>
        </div>
    </div>
  )
}
