import React from 'react'
import NotFoundLottie from "../assets/connection-error.json"
import Lottie from 'lottie-react'
import { useRef,useEffect } from 'react'
export default function NotFound() {
    const moverRef = useRef(null);
    useEffect(() => {
        let angle = 0;
        const radius = 80; // Adjust the radius as needed
        const speed = 0.02; // Adjust the speed as needed
    
        const moveMover = () => {
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
    
          moverRef.current.style.transform = `translate(${x}px, ${y}px)`;
    
          angle += speed;
    
          requestAnimationFrame(moveMover);
        };
    
        moveMover();
      }, []);
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <div ref={moverRef} className='bg-white w-44 h-44 rounded-full absolute shadow-2xl shadow-white'></div>
      <Lottie animationData={NotFoundLottie} className='w-96 rounded-full'/>
    </div>
  )
}
