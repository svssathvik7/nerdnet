import React, { useContext, useEffect, useState } from 'react'
import "./CreateCommunity.css"
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
const Pages = (props)=>{
  return (
    (props.pageNum == 0) ? 
    <div className='text-white'>
      <h1 className='text-4xl'>Welcome to NerdCommunities!</h1>
      <div>
        
      </div>
    </div> : <></>
  )
}
export default function CreateCommunity() {
  const [page,setPage] = useState(0);
  return (
    <div className='community-create absolute top-0 left-0 right-0 bottom-0 m-auto flex items-center justify-start'>
       <div className='flex items-center justify-around'>
          <div id='community-create-explain'>
            <Pages pageNum={page}/>
          </div>
       </div>
    </div>
  )
}
