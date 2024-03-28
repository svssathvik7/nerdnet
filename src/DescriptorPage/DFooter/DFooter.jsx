import React, { useContext, useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './DFooter.css';
import FooterImg from "../../assets/hero-pic.png"
import TokenValidity from '../../Utilities/TokenValidity';
import { Link, useLocation } from 'react-router-dom';
import { userContextProvider } from '../../Context/userContext';
const DFooter = () => {
  const [hasLogged,setHasLogged] = useState(false);
  const location = useLocation();
  const {user} = useContext(userContextProvider);
  useEffect(
    ()=>{
      TokenValidity().then((res)=>{
        if(res !== true){
          setHasLogged(false);
        }
        else{
          setHasLogged(true);
        }
      })
    }
  ,[location.pathname]);
  return (
    <footer className="footer-container bg-slate-500">
      <div className="footer-content">
        <div className='text-white'>
          <img id='footer-img' alt='footer-img' src={FooterImg} className='w-32 rounded-full'/>
          {
            hasLogged ? 
            <p>Explore <Link to="/home" className='text-black underline'>NerdNet</Link></p> :
            <p>Login to Nerdnet.<Link to="/" className='text-black underline'>Login</Link></p>
          }
        </div>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default DFooter;
