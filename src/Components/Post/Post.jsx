import React, { useEffect } from 'react';
import "./Post.css";
import TextPost from './TextPost';
import ImagePost from './ImagePost';

export default function Post(props) {
  return (
    <div id='post' className='my-6'>
      {props.isMultimedia ? 
        <ImagePost {...props}/>
      :
        <TextPost {...props}/>
      }
    </div>
  )
}
