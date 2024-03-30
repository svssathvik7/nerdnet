import React from 'react';
import './Privacy.css';
import privacyConstants from '../../constants/privacyConstants';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

export default function Privacy() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
  });

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div id='privacy' className='flex items-center justify-center flex-col bg-black text-white'>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className='z-20'>
        <h1 className='text-3xl font-bold'>Privacy Policy</h1>
      </motion.div>

      <div className='flex items-center justify-between m-2' id='policy-container'>
        {privacyConstants.map((section, index) => (
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            key={index}
            className='privacy-card md:w-1/3 p-4 bg-gray-800 rounded-lg'>
            <h2 className='text-xl font-bold mb-4'>{section.title}</h2>
            <ul className='list-disc pl-4'>
              {section.points.map((point, i) => (
                <motion.li key={i} whileHover={{ scale: 1.1 }} className='cursor-pointer'>
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
