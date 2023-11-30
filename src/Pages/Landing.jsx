import React from 'react'
import IntroBg from "../assets/nerd-intro.png";
import Login from '../Components/Login';
export default function Landing() {
  return (
    <div>
      <img src={IntroBg} alt='Introbg'
        className='absolute -z-10'
      />
      <Login/>
    </div>
  )
}
