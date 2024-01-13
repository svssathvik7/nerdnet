import React, { useEffect } from 'react';
import "./Post.css";
import TextPost from './TextPost';
import ImagePost from './ImagePost';

export default function Post(props) {
  useEffect(
    ()=>{
      console.log(props);
    }
  ,[]);
  return (
    <div id='post'>
      {props.isMultimedia ? 
        <ImagePost {...props}/>
      :
        <TextPost {...props}/>
      }
    </div>
  )
}
