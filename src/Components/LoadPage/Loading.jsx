import React from 'react'
import LoaderAnimation from "../../assets/LoaderAnimation.json";
import Lottie from 'lottie-react';
export default function Loading() {
  return (
    <div className='w-screen h-screen bg-black absolute top-0 left-0 z-50 flex items-center justify-center overflow-hidden'>
        <div className='flex items-center justify-center'>
          <Lottie animationData={LoaderAnimation}/>
        </div>
    </div>
  )
}
