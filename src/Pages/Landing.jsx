import React, { useContext, useState } from 'react'
import IntroBg from "../assets/nerd-intro.png";
import IntroBgMobile from "../assets/nerd-intro-mobile.png";
import Login from '../Components/Login/Login';
import { loaderContextProvider } from '../Context/loaderContext';
import Loading from '../Components/LoadPage/Loading';
export default function Landing() {
  const [isMobile,setIsMobile] = useState(window.innerWidth <768);
  const {isLoading} = useContext(loaderContextProvider);
  return (
    <div>
    {isLoading && <Loading/>}
      <img src={isMobile ? IntroBgMobile : IntroBg} alt='Introbg'
        className='absolute -z-10 opacity-50 object-cover h-screen w-[100%] top-0 left-0'
      />
      <Login/>
    </div>
  )
}