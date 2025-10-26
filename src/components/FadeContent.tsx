"use client";

import { useRef, useEffect, useState, ReactNode } from 'react';

// Props interface remains the same
interface FadeContentProps {
  children: ReactNode;
  blur?: boolean;
  duration?: number;
  easing?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  className?: string;
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  blur = false,
  duration = 800, // Slightly faster for a snappier feel
  easing = 'ease-out',
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  className = ''
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // THE FIX: We now set the state based on whether it's intersecting or not,
        // making it a two-way switch.
        if (entry.isIntersecting) {
          // Optional delay only when fading IN
          setTimeout(() => setInView(true), delay);
        } else {
          // Fade out immediately
          setInView(false);
        }
      },
      { 
        threshold,
        root: document.querySelector('main')
      }
    );

    observer.observe(element);

    // THE FIX: We no longer unobserve the element. It's being watched continuously.
    return () => observer.disconnect();
  }, [threshold, delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : initialOpacity,
        transition: `opacity ${duration}ms ${easing}, filter ${duration}ms ${easing}`,
        filter: blur ? (inView ? 'blur(0px)' : 'blur(10px)') : 'none'
      }}
    >
      {children}
    </div>
  );
};

export default FadeContent;