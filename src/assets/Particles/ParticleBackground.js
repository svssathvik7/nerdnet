import React from "react";
import Particles from "@tsparticles/react";
import ParticleConstant from "../../constants/particleConstant";
export default function ParticleBackground() {
  const particlesLoaded = (container) => {
    console.log(container);
  };
  return (
    <Particles
      className="w-screen h-screen z-0"
      options={ParticleConstant}
      particlesLoaded={particlesLoaded}
    ></Particles>
  );
}
