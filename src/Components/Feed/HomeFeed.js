import React from 'react'
import Post from '../Post/Post'
import postConstants from '../../constants/postConstants'
export default function HomeFeed() {
  return (
    <div id='home-feed' className='flex flex-col items-center justify-center'>
        <div id='home-feed-scroller' className='flex flex-col items-center justify-start'>
            {postConstants.map(post => (
                <div className='single-feed m-2' key={post.id}>
                    <Post {...post}/>
                </div>
            ))}
        </div>
    </div>
  )
}
