import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import "./Revenue.css";

export default function Revenue() {
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
      id='revenue-div'
      className='flex items-center justify-center p-2 flex-col trans300'
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={animationVariants}
    >
      <div className='text-white font-bold md:text-4xl'>
        Revenue
      </div>

      <div className='mt-4 text-white'>
        <h2 className='text-2xl font-semibold mb-2'>Explore Exciting Opportunities</h2>
        <p className='mb-2'>
          At Nerd.net, we believe in fostering a diverse and talented team. Join us on our journey to create innovative solutions and shape the future of technology. Check out the various job opportunities below:
        </p>

        <ul className='list-disc pl-6'>
          <li>Software Developer</li>
          <li>Data Scientist</li>
          <li>UX/UI Designer</li>
          <li>Product Manager</li>
          {/* Add more job types as needed */}
        </ul>

        <p className='mt-4'>
          If you're passionate about technology, enjoy solving complex problems, and want to be part of an exciting team, we'd love to hear from you.
        </p>

        <p className='mt-4'>
          <strong>Note:</strong> Currently, there are no available openings. However, we encourage you to check back regularly for updates or submit your resume for future consideration.
        </p>
      </div>
    </motion.div>
  );
}
