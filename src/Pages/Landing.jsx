import React, { useContext, useEffect, useState } from 'react'
import IntroBg from "../assets/nerd-intro.png";
import IntroBgMobile from "../assets/nerd-intro-mobile.png";
import Login from '../Components/Login/Login';
import { loaderContextProvider } from '../Context/loaderContext';
import Loading from '../Components/LoadPage/Loading';
import TokenValidity from '../Utilities/TokenValidity';
import { useNavigate } from 'react-router-dom';
export default function Landing() {
  const [isMobile,setIsMobile] = useState(window.innerWidth <768);
  const {isLoading} = useContext(loaderContextProvider);
  const navigate = useNavigate();
  useEffect(
    ()=>{
      TokenValidity().then((res)=>{
        if(res === true){
          navigate("/home");
        }
        else{
          navigate("/");
        }
      })
    }
  ,[]);
  return (
    <div>
    {isLoading && <Loading/>}
      <img src={isMobile ? IntroBgMobile : IntroBg} alt='Introbg'
        className='absolute -z-10 opacity-50 object-cover h-screen w-screen top-0 left-0'
      />
      <Login/>
    </div>
  )
}