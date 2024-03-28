import React from 'react';
import "./AboutLanding.css";
import Logo from "../assets/nerd-logo-2.svg";
import Post from '../Components/Post/Post';
import postConstants from '../constants/postConstants';
import Revenue from './Revenue/Revenue';
import Privacy from "./PrivacyPolicy/Privacy";
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import Separator from '../Components/Separator';
import DFooter from './DFooter/DFooter';
import Credits from './Credits/Credits';
export default function AboutLanding() {
  const ref = useRef(null);
  const isInView = useInView(ref,{
    once:false
  })
  return (
    <div id='about-landing' className='bg-black w-screen h-fit flex flex-col items-center justify-start'>
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
            id='about-hero' className='flex items-center justify-around z-20'>
          <div className='flex flex-col items-start justify-center'>
            <h1 id="landing-quote" className='text-white font-extrabold md:text-5xl lg:text-5xl'>
              Discover.Discuss.Delve
            </h1>
            <p className='text-white'>Nerd.net - Your hub for intellectual exploration</p>
            <Link to="/" className='text-white bg-yellow-400 rounded-md p-2 font-medium my-1 hover:bg-black hover:text-yellow-400 trans300'>Get Started!</Link>
          </div>
        </motion.div>
      </div>
      <Separator className="m-2"/>
      <Credits/>
      <Separator className="m-2"/>
      <Privacy/>
      <Separator className="m-2"/>
      <Revenue/>
      <DFooter/>
      <div className={`scale-50 absolute left-24 top-24 -rotate-6 z-30`} id="sample-post1">
        <Post {...postConstants[0]} noAuth={true}/>
      </div>
      <div className={`scale-50 absolute right-24 top-16 rotate-6 z-30`} id="sample-post2">
        <Post {...postConstants[1]} noAuth={true}/>
      </div>
      <div className={`scale-50 absolute right-24 top-80 rotate-6 z-30`} id="sample-post3">
        <Post {...postConstants[2]} noAuth={true}/>
      </div>
    </div>
  )
}
