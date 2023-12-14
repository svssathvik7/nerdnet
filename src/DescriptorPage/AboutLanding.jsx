import React from 'react';
import "./AboutLanding.css";
import Logo from "../assets/nerd-logo-2.svg";
import HeroBg from "../assets/HeroBG.json";
import HeroImage2 from "../assets/hero-image-2.svg";
import Post from '../Components/Post/Post';
import postConstants from '../constants/postConstants';
import Privacy from "./PrivacyPolicy/Privacy";
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import Lottie from 'lottie-react';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import Separator from '../Components/Separator';
export default function AboutLanding() {
  const ref = useRef(null);
  const isInView = useInView(ref,{
    once:false
  })
  return (
    <div id='about-landing' className='bg-black w-screen h-screen'>
      <div id='about-header' className='flex items-center justify-center p-2'>
        <img className='w-8' alt='logo' src={Logo}/>
      </div>
      <div id="hero-container" className='flex items-center justify-center bg-transparent z-20'>
        <motion.div
          ref = {ref}
          style={
              {
                opacity: isInView ? 1 : 0.7,
                transform: isInView ? 'translateY(0px)' : 'translateY(-30px)',
                scale: isInView ? 1 : 0.8,
              }
            }
            id='about-hero' className='absolute top-0 bottom-0 left-0 right-0 m-auto flex items-center justify-around z-20'>
          <div className='flex flex-col items-start justify-center'>
            <h1 className='text-white font-extrabold text-5xl'>
              Discover.Discuss.Delve
            </h1>
            <p className='text-white'>Nerd.net - Your hub for intellectual exploration</p>
            <Link to="/" className='text-white bg-yellow-400 rounded-md p-2 font-medium my-1 hover:bg-black hover:text-yellow-400 trans300'>Get Started!</Link>
          </div>
        </motion.div>
      </div>
      <Parallax speed={10} id='shadow' className='absolute top-0 bottom-0 left-0 right-0 m-auto filter flex items-center justify-center z-10'>
        <Lottie loop={true} animationData={HeroBg} className='w-96'/>
      </Parallax>
      <Separator/>
      <Privacy/>
    </div>
  )
}
