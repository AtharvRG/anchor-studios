"use client";

import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const GsapScrollerProxy = () => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scroller = document.querySelector('main');
    if (!scroller) return;

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length) {
          scroller.scrollTop = value as number;
        }
        return scroller.scrollTop;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    // This is crucial to force GSAP to re-evaluate its measurements
    const stRefresh = () => ScrollTrigger.refresh();
    stRefresh();
    // Refresh again after a short delay to be safe
    const timer = setTimeout(stRefresh, 200);

    return () => {
      clearTimeout(timer);
      // Kill all ScrollTriggers on unmount to prevent memory leaks
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return null;
};

export default GsapScrollerProxy;