import React from 'react'
import Lottie from 'lottie-react'
import loginAnimation from "../../assets/loginAnimation.json";
import { Link } from 'react-router-dom';
import "./Login.css";
import { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useContext } from 'react';
import { userContextProvider } from '../../Context/userContext';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function Login({data}) {
  const {getUserDetails} = useContext(userContextProvider);
    const history = useNavigate();
    const [loading,setLoading] = useState(false);
    const [validForm,setValidForm] = useState(false);
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
            if(value==="")
            {
              setErrorMail("");
              setValidForm(false);
            }
            else if(emailPattern.test(value))
            {
              setErrorMail("");
              setValidForm(true);
            }
            else{
              setErrorMail("!Enter proper email address");
              setValidForm(false);
            }
        }
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        axios.post("http://localhost:3500/api/auth/login/",{
          useremail : formData.userEmail,
          password : formData.password
        }).then(async (response)=>{
          setLoading(false);
          const data = await response.data;
          localStorage.setItem("token",data.userToken);
          getUserDetails();
          history("/home");
        }).catch((error)=>{
          setLoading(false);
          try{
            toast.error(error.response.data.loginResponse, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
          }
          catch(error){
            toast.error("An error occurred!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
          }
        })
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
                    className={`outline-none p-2 pb-0 text-black rounded-sm login-inputs`}
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
                    className={`outline-none text-black p-2 pb-0 rounded-sm login-inputs`}
                    />
                </div>
                <button id='login-submit' className={`flex items-center justify-center bg-yellow-400 p-1 m-2 border-2 border-black rounded-lg select-none hover:bg-black hover:text-yellow-400 trans100 ${validForm ? "cursor-pointer" : "cursor-not-allowed opacity-40"}`} type="submit" onClick={handleSubmit} disabled={!validForm}>{loading ? <PulseLoader className='scale-75' color='white'/> : "Login"}</button>
            </form>
        </div>
        {data.isMobile ? <></> : <div id='v-line' className='bg-slate-400 w-1 h-20 rounded-full mx-2'></div>}
        {data.isMobile ? <></> : <div id='login-lottie' className='w-52'>
            <Lottie animationData={loginAnimation} loop={true}/>
        </div>}
      </div>
      <div id='register-note' className='flex items-center justify-center'>
            <p>Do not have an account?</p>
            <Link to='/newUser' className='bg-yellow-400 p-1 rounded-lg mx-2 hover:scale-105 trans100'>Register Here.</Link>
      </div>
      <div id='semi-footer' className='flex w-[100%] items-center justify-around mt-4'>
        <Link to="/about" className='font-light text-gray-500 text-xs hover:underline'>About</Link>
        <Link to="/about" className='font-light text-gray-500 text-xs hover:underline'>Privacy & Policy</Link>
        <Link to="/about" className='font-light text-gray-500 text-xs hover:underline'>Revenue</Link>
        <p className='font-light text-gray-500 text-xs'>&copy; Nerd.net {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}
const mapStateToProps = (state)=>{
  return {
    data : {
      isMobile : state.isMobile,
    }
  }
}
export default connect(mapStateToProps)(Login);