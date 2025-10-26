"use client";

import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { updateHash } from '@/lib/url-updater';

gsap.registerPlugin(ScrollTrigger);

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const InfoCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
              <motion.a
              rel="noopener noreferrer"
              style={{ boxShadow: '6px 6px 0px 0px rgba(245,245,245,1)' }}
              variants={itemVariants}
              className="border border-foreground bg-background p-6 rounded-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: '8px 8px 0px 0px #CEFF1A',
                y: -4,
                x: -4,
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
    <h3 className="font-display text-2xl font-bold mb-4 text-accent">{title}</h3>
    <p className="font-sans text-foreground/80">{children}</p>
  </motion.a>
);

const WhyAnchorSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el || !titleRef.current || !contentRef.current) return;

     const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        pin: true,
        start: "top top",
        end: "+=250%",
        scrub: 1,
        // THE FIX: Add callbacks to the main trigger
        onEnter: () => updateHash('why'),
        onEnterBack: () => updateHash('why'),
      },
    });

      // --- THE CHOREOGRAPHY, RE-TIMED ---

      // ACT I (0 -> 0.6s): The title fades in.
            tl.fromTo(
        titleRef.current,
        { 
          opacity: 0, 
          scale: 2, // Was 3, now much larger
          y: "40vh", // Was "40vh", now perfectly centered vertically
        }, 
        { 
          opacity: 1, 
          duration: 0.6, 
          ease: "power1.in" 
        },
        0
      );

      // ACT II: The title transforms to its final state.
      // The "to" values remain the same.
      tl.to(
        titleRef.current,
        {
          scale: 1,
          y: "5vh",
          ease: "power1.inOut",
          duration: 0.5,
        },
        0.5
      );

      // FINAL ACT: The content is revealed with the corrected timing.
      tl.from(
        contentRef.current,
        {
          opacity: 0,
          duration: 0.2,
        },
        1
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <section ref={sectionRef} className="relative h-screen bg-background overflow-hidden">
      {/* The Title that will be animated */}
      <div ref={titleRef} className="absolute inset-x-0 top-0">
        <h2 className="text-center font-display text-5xl md:text-8xl font-bold text-foreground">
          Why Anchor?
        </h2>
        <p className="text-center text-foreground/60 mt-4">
          Why does it exist? What do I get from this?
        </p>
      </div>

      {/* The Content that will be revealed */}
      <div ref={contentRef} className="absolute top-[30vh] flex h-full w-full flex-col gap-16 px-8 md:px-16">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="max-w-md">
            <h3 className="font-display text-4xl mb-4">Open Source Ethos</h3>
            <p className="text-foreground/50" style={{ color: "#e1ff76ff" }}>
              Every personal project flying the Anchor flag is open-source, down to the last semicolon. This is my public sketchbook, a commitment to sharing the process behind the magic. (Client work, of course, is a different story—your secrets are always safe.)
            </p>
          </div>
          <InfoCard title="What's The Catch?">
            You get to experience unique, sometimes gloriously stupid, ideas that might just solve a problem you didn&apos;t know you had. What do I get? The satisfaction of seeing someone&apos;s delight. That&apos;s the fuel I use to go hunting for the next wild idea.
          </InfoCard>
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <InfoCard title="The Philosophy">
            Every line of code is a small bet on a better future. The hope is that something I build makes someone&apos;s life a little easier, or their work a little more joyful. If you end up loving the code (and maybe me too), that&apos;s the ultimate win.
          </InfoCard>
          <div className="max-w-md md:text-right ml-auto">
            <h3 className="font-display text-4xl mb-4">The Dopamine of Design</h3>
            <p className="text-foreground/50" style={{ color: "#e1ff76ff" }}>
              I am relentlessly chasing visual delight. Why? Because a beautiful, fluid interface delivers a hit of dopamine I refuse to live without. Anchor projects are not just functional; they are my experiments in design and animation where utility and artistry are non-negotiable partners.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAnchorSection;