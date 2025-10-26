"use client";

import React from "react";
import { motion } from "framer-motion";
import CurvedLoop from "./CurvedLoop";

const titleAnimation = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letterAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.8,
    },
  },
};

const HeroSection = () => {
  const title = "Anchor";

  return (
    <section className="relative grid h-screen w-full place-content-center overflow-hidden bg-background">
      
      <div className="absolute inset-x-0 top-0 flex justify-center">
        <div className="w-full max-w-screen-lg">
          <CurvedLoop 
            marqueeText="Open Source ✦ Creatiion Overloaded ✦ "
            speed={1}
            curveAmount={450} 
            interactive={true}
            verticalOffset={-30} 
            className="text-foreground/50 text-[clamp(1rem,6vw,2rem)]"
          />
        </div>
      </div>

      {/* THE ORIGINAL STATIC SHOT */}
      <motion.h1
        className="z-10 font-display text-[20vw] md:text-[12vw] font-bold uppercase text-foreground"
        variants={titleAnimation}
        initial="hidden"
        animate="visible"
      >
        {title.split("").map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={letterAnimation}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm text-foreground/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
      >
        About Us (Rather than &apos;Us&apos;...it&apos;s just Me)
      </motion.p>
    </section>
  );
};

export default HeroSection;