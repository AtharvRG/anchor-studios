"use client";

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface SectionObserverProps {
  children: React.ReactNode;
  sectionId: string;
}

const SectionObserver: React.FC<SectionObserverProps> = ({ children, sectionId }) => {
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the section is in view
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      // Silently update the URL hash
      window.history.pushState(null, '', `#${sectionId}`);
    }
  }, [inView, sectionId]);

  // We use a div here to avoid passing the ref to a custom component directly
  return <div ref={ref}>{children}</div>;
};

export default SectionObserver;