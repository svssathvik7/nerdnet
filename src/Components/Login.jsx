import React, { useEffect } from 'react'
import { useState } from 'react';
import Lottie from 'lottie-react'
import loginAnimation from "../assets/loginAnimation.json";
// import { LuEye } from "react-icons/lu";
// import { LuEyeOff } from "react-icons/lu";
import "./Login.css";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export default function Login() {
    const [isMobile,setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(
      ()=>{
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        };
    
        window.addEventListener('resize', handleResize);
    
        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }
    ,[]);
    const [formData, setFormData] = useState({
        userEmail: '',
        password: '',
        showPassword: false,
      });
      const [errorMail,setErrorMail] = useState("");
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if(name==="userEmail"){
            if(emailPattern.test(value) || value==="")
            {
              setErrorMail("");
            }
            else{
              setErrorMail("!Enter proper email address");
            }
        }
      };
    
      // const togglePasswordVisibility = () => {
      //   setFormData({ ...formData, showPassword: !formData.showPassword });
      // };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
      };
  return (
    <div id='login-container' className={`h-fit bg-white flex flex-col items-center justify-around p-8 pb-4 absolute top-0 bottom-0 left-0 right-0 m-auto rounded-lg`}>
      <div id='welcome-text' className='text-center'>
        <h2 className='text-5xl text-black font-extrabold'>Nerd.net</h2>
        <p className='text-base font-medium text-slate-400'>A place where nerds help nerds.</p>
      </div>
      <div id='login-div' className={`flex items-center justify-around p-4`}>
        <div id='login'>
            <form id='login-form' className='flex flex-col items-center justify-around text-center p-2 h-48'>
                <h4 className='text-2xl font-medium'>Login details</h4>
                <div>
                    <input
                    type="email"
                    id="userEmail"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleChange}
                    required
                    placeholder='Enter your Email'
                    className={`outline-none p-2 pb-0 text-black rounded-sm`}
                    />
                    <p className='text-red-600 font-light text-xs text-left'>{errorMail}</p>
                </div>
                <div>
                    <input
                    type={formData.showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder='Enter your password'
                    className={`outline-none text-black p-2 pb-0 rounded-sm`}
                    />
                    {/* <span onClick={togglePasswordVisibility}>
                    {formData.showPassword ? <LuEye className='w-fit inline ml-1'/> : <LuEyeOff className='w-fit inline ml-1'/>}
                    </span> */}
                </div>
                <button id='login-submit' className={`bg-yellow-400 p-1 m-2 border-2 border-black rounded-lg select-none`} type="submit" onClick={handleSubmit}>Login</button>
            </form>
        </div>
        {isMobile ? <></> : <div id='v-line' className='bg-slate-400 w-1 h-20 rounded-full mx-2'></div>}
        {isMobile ? <></> : <div id='login-lottie' className='w-52'>
            <Lottie animationData={loginAnimation} loop={true}/>
        </div>}
      </div>
      <div id='register-note' className='flex items-center justify-center'>
            <p>Do not have an account?</p>
            <a href='/' className='bg-yellow-400 p-1 rounded-lg mx-2'>Register Here.</a>
      </div>
      <div id='semi-footer' className='flex w-[100%] items-center justify-around mt-4'>
        <a href='/' className='font-light text-gray-500 text-xs'>About</a>
        <a href='/' className='font-light text-gray-500 text-xs'>Privacy & Policy</a>
        <a href='/' className='font-light text-gray-500 text-xs'>Revenue</a>
        <p className='font-light text-gray-500 text-xs'>&copy; Nerd.net {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}
