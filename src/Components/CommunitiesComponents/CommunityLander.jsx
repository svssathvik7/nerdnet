import React from 'react'
import Communities from "../../assets/Communities.json";
import Lottie from 'lottie-react';
import "./CommunityLander.css";
const communitySections = [
    {
        heading : "Join Our Thriving Communities",
        caption : "Connect with fellow nerds, share knowledge, and dive into discussions on your favorite topics."
    },
    {
        heading : "Discover New Passions",
        caption : "Explore a wide range of communities covering everything from technology and science to gaming and literature."
    },
    {
        heading : "Start Your Own Community",
        caption : "Have a niche interest? Create your own community and foster meaningful connections with like-minded individuals."
    }
]
export default function CommunityLander() {
    const matter = communitySections[Math.floor(Math.random()*communitySections.length)];
  return (
    <div className='community-lander flex items-center justify-start'>
        <div className='w-80'>
            <Lottie animationData={Communities}/>
        </div>
        <div className='text-white m-2'>
            <h2 className='text-4xl'>{matter?.heading??""}</h2>
            <p className='text-xs'>{matter?.caption??""}</p>
        </div>
    </div>
  )
}
