import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import "./Credits.css";
import DevPic from "../../assets/sathvik1.jpeg"
import { Link } from 'react-router-dom';
import techStack from "../../constants/techStackConstants";
import { SocialIcon } from 'react-social-icons';
export default function Credits() {
  const ref = useRef(null);
  const isInView = useInView(ref,{
    once: false,
  });

  const animationVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      id='credits-div'
      className='flex items-center justify-around p-2 trans300'
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={animationVariants}
    >
      <div id='developer-card' className='relative bg-transparent w-1/4 bg-white rounded-lg'>
        <p className='left-0 bg-yellow-500 text-xs dev-tag text-black px-1 rounded-md w-fit absolute -top-1'>Dev profile</p>
        <div id='dev-img-holder' className='w-full flex items-center justify-start text-center flex-col'>
        <div className='w-full rounded-lg p-2 '>
            <img alt='dp' className='w-full rounded-lg shadow-black shadow-lg' src={DevPic}/>
        </div>
        </div>
        <p className='font-extrabold mx-auto w-full text-center'>SVS SATHVIK</p>
        <div id='dev-social-media' className='flex items-center justify-around w-full'>
            <SocialIcon url={process.env.REACT_APP_DEVELOPER_GITHUB} className='scale-75 hover:shadow-slate-600 hover:shadow-lg rounded-full trans100'/>
            <SocialIcon url={process.env.REACT_APP_DEVELOPER_LINKEDIN} className='scale-75 hover:shadow-blue-400 hover:shadow-lg rounded-full trans100'/>
            <SocialIcon className='scale-75 hover:shadow-red-500 hover:shadow-lg rounded-full trans100' url={`mailto:${process.env.REACT_APP_DEVELOPER_MAIL}`} bgColor='#f30709'/>
            <SocialIcon url={process.env.REACT_APP_DEVELOPER_INSTAGRAM} className='scale-75 hover:shadow-blue-600 hover:shadow-lg rounded-full trans100' bgColor='#405de6'/>
        </div>
      </div>
      <div id='tech-stack' className='text-white flex flex-col items-center justify-start flex-wrap'>
            <p className='font-bold text-3xl'>Technologies used</p>
            <div className='flex items-center justify-around flex-wrap overflow-y-scroll tech-scroller'>
                {techStack.map((tech,i)=>(
                    <div key={i} className='bg-white relative text-black rounded-md flex flex-col items-center justify-center tech-card m-2 text-3xl text-center hover:text-white hover:bg-black trans300 cursor-pointer'>
                        {tech.logo}
                        <p className='text-xs'>{tech.name}</p>
                        <p className={`absolute text-white text-xs ${tech.color === "c1" ? " bg-[#ff0000] " : tech.color === "c2" ? " bg-[#0000ff] " : tech.color === "c3" ? " bg-[#1ec11e] " : " bg-[#Ffa500] "} rounded-md px-1 -top-1 right-0`}>{tech.tag}</p>
                    </div>
                ))}
            </div>
      </div>
    </motion.div>
  );
}