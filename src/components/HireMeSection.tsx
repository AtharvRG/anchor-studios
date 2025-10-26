"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFloat from './ScrollFloat';
import { motion } from 'framer-motion';
import { updateHash } from '@/lib/url-updater';

gsap.registerPlugin(ScrollTrigger);

const services = [
  "Full-Stack Web Development",
  "UI/UX Engineering",
  "API & Backend Architecture",
  "Cross-Platform Mobile Apps",
  "Custom Desktop Solutions",
];

const HireMeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // This hook now correctly waits for the DOM and proxy to be ready.
  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        pin: true,
        start: "top top",
        end: "+=350%",
        scrub: 1,
        // Main trigger for the section
        onEnter: () => updateHash('hire'),
        onEnterBack: () => updateHash('hire'),
      },
    });

      // ACT I: The Grand Title Reveal (This animation's duration is unchanged)
      tl.fromTo(
        el.querySelectorAll(".char"),
        {
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: '50% 0%',
        },
        {
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger: 0.05,
          ease: 'power1.inOut',
        }
      );

      // ACT II: The Content Fade-in (This animation's timing is also unchanged)
      tl.from(
        el.querySelectorAll(".fade-item"),
        {
          opacity: 0,
          y: 50,
          stagger: 0.1,
        },
        "-=0.5"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

  return (
    // The ref is now on the main section for pinning
    <section ref={sectionRef} className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center">
        <ScrollFloat
          containerClassName="mb-16" // More space for a grander feel
          textClassName="font-display text-5xl font-bold md:text-7xl"
        >
          Want to hire me?
        </ScrollFloat>

        <div className="flex flex-col items-center">
          <div className="mb-12 flex flex-wrap items-center justify-center gap-4 fade-item">
            {services.map((service) => (
              <motion.a
                key={service}
                rel="noopener noreferrer"
                style={{ boxShadow: '6px 6px 0px 0px rgba(245,245,245,1)' }}
                variants={itemVariants}
                className="border border-foreground bg-background p-6 rounded-lg"
                whileHover={{
                scale: 1.05,
                color: '#CEFF1A', 
                boxShadow: '8px 8px 0px 0px #CEFF1A',
                y: -4,
                x: -4,
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <p className="font-sans font-semibold">{service}</p>
              </motion.a>
            ))}
          </div>
          <a
            href="#socials"
            className="rounded-full bg-accent px-12 py-4 font-bold text-background transition-transform hover:scale-105 fade-item"
          >
            You Definitely can!
          </a>
        </div>
      </div>
    </section>
  );
};

export default HireMeSection;