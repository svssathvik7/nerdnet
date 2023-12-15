import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './DFooter.css';
import FooterImg from "../../assets/hero-pic.png"
const DFooter = () => {
  return (
    <footer className="footer-container bg-slate-500">
      <div className="footer-content">
        <div className="copyright">
          <p>&copy; 2023 Your Company. All rights reserved.</p>
        </div>
        <img id='footer-img' alt='footer-img' src={FooterImg} className='w-56 rounded-full'/>
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
