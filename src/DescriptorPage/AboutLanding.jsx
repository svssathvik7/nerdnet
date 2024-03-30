import React, { useState } from "react";
import "./AboutLanding.css";
import Logo from "../assets/nerd-logo-2.svg";
import Post from "../Components/Post/Post";
import postConstants from "../constants/postConstants";
import Revenue from "./Revenue/Revenue";
import Privacy from "./PrivacyPolicy/Privacy";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";
import Separator from "../Components/Separator";
import DFooter from "./DFooter/DFooter";
import Credits from "./Credits/Credits";

export default function AboutLanding() {
  const [aboutNavigator, setAboutNavigator] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
  });

  return (
    <div
      id="about-landing"
      className="bg-black w-screen h-fit flex flex-col items-center justify-start relative"
    >
      <div className="absolute top-10 left-1 text-white z-50">
        <p
          onClick={() => {
            setAboutNavigator(0);
          }}
          className={`${aboutNavigator === 0 ? " ml-2 scale-105 text-base underline bg-slate-400 rounded-md p-1 px-2 " : "  "} cursor-pointer trans100 text-sm`}
        >
          NerdNet - An Intro
        </p>
        <p
          onClick={() => {
            setAboutNavigator(1);
          }}
          className={`${aboutNavigator === 1 ? " scale-105 ml-2 text-base underline bg-slate-400 rounded-md p-1 px-2 " : "  "} cursor-pointer text-sm trans100`}
        >
          Developer's Note
        </p>
        <p
          onClick={() => {
            setAboutNavigator(2);
          }}
          className={`${aboutNavigator === 2 ? " scale-105 ml-2 text-base underline bg-slate-400 rounded-md p-1 px-2 " : "  "} cursor-pointer text-sm trans100`}
        >
          Our Privacy Policy
        </p>
        <p
          onClick={() => {
            setAboutNavigator(3);
          }}
          className={`${aboutNavigator === 3 ? " scale-105 ml-2 underline text-base bg-slate-400 rounded-md p-1 px-2 " : "  "} cursor-pointer trans100 text-sm`}
        >
          The revenue model
        </p>
      </div>
      <div id="about-header" className="flex items-center justify-center p-2">
        <img className="w-8" alt="logo" src={Logo} />
      </div>
      {(aboutNavigator === 0) && (
        <div id="hero-container" className="flex items-center justify-center">
          <div className="flex flex-col items-start justify-center">
            <h1
              id="landing-quote"
              className="text-white font-extrabold md:text-5xl lg:text-5xl"
            >
              Discover.Discuss.Delve
            </h1>
            <p className="text-white">
              Nerd.net - Your hub for intellectual exploration
            </p>
            <Link
              to="/"
              className="text-white bg-yellow-400 rounded-md p-2 font-medium my-1 hover:bg-black hover:text-yellow-400 trans300"
            >
              Get Started!
            </Link>
          </div>
          <div
            className={`scale-50 absolute left-24 top-24 -rotate-6`}
            id="sample-post1"
          >
            <Post {...postConstants[0]} noAuth={true} />
          </div>
          <div
            className={`scale-50 absolute right-24 top-16 rotate-6`}
            id="sample-post2"
          >
            <Post {...postConstants[1]} noAuth={true} />
          </div>
          <div
            className={`scale-50 absolute right-24 top-80 rotate-6`}
            id="sample-post3"
          >
            <Post {...postConstants[2]} noAuth={true} />
          </div>
          <Separator className="m-2" />
        </div>
      )}
      {(aboutNavigator === 1) && (
        <>
          <Credits />
          <Separator className="m-2" />
        </>
      )}
      {(aboutNavigator === 2) && (
        <>
          <Privacy />
          <Separator className="m-2" />
        </>
      )}
      {(aboutNavigator === 3) && <>
        <Revenue />
      </>}
    </div>
  );
}
