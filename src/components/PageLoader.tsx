"use client";

import { motion } from "framer-motion";
import { useLoader } from "@/contexts/LoaderContext";
import { useState, useEffect } from "react";

export default function PageLoader() {
  const { isLoading, progress } = useLoader();
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [holeSize, setHoleSize] = useState(0);

  // When loading finishes, trigger the iris exit animation
  useEffect(() => {
    if (!isLoading && !isExiting) {
      setIsExiting(true);
      
      // Animate the hole size
      let start: number | null = null;
      const duration = 800; // 800ms for the hole expansion
      
      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth expansion
        const eased = 1 - Math.pow(1 - progress, 3);
        setHoleSize(eased * 150); // Expand to 150% to cover corners
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Animation complete, remove from DOM
          setTimeout(() => setShouldRender(false), 100);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isLoading, isExiting]);

  if (!shouldRender) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{ 
        pointerEvents: isExiting ? "none" : "auto",
      }}
    >
      {/* White background with a transparent hole in the center */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          backgroundColor: "#ffffff",
          // Create a hole in the center using mask
          WebkitMaskImage: isExiting 
            ? `radial-gradient(circle at 50% 50%, transparent ${holeSize}%, black ${holeSize}%)`
            : "none",
          maskImage: isExiting 
            ? `radial-gradient(circle at 50% 50%, transparent ${holeSize}%, black ${holeSize}%)`
            : "none",
          opacity: isExiting && holeSize >= 150 ? 0 : 1,
        }}
      >
        {/* Center container - perfectly centered */}
        <motion.div 
          className="flex flex-col items-center gap-8"
          animate={{
            opacity: isExiting ? 0 : 1,
            scale: isExiting ? 0.8 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Spinning ring with center dot */}
          <div className="relative">
            <motion.div
              className="rounded-full"
              style={{
                width: 64,
                height: 64,
                border: "2px solid rgba(17, 17, 17, 0.1)",
                borderTopColor: "#111111",
                borderRightColor: "rgba(17, 17, 17, 0.4)",
              }}
              animate={{ 
                rotate: 360,
              }}
              transition={{
                rotate: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            />
            
            {/* Center dot - this is visually where the hole opens from */}
            <motion.div
              className="absolute top-1/2 left-1/2 rounded-full"
              style={{ 
                backgroundColor: "#111111",
                width: 12,
                height: 12,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </div>

          {/* Loading text */}
          <div className="flex flex-col items-center gap-3">
            <motion.p
              className="text-sm font-light tracking-wide"
              style={{ color: "rgba(17, 17, 17, 0.6)" }}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Please wait for the best experience
            </motion.p>

            <span
              className="text-[10px] font-mono tracking-widest"
              style={{ color: "rgba(17, 17, 17, 0.35)" }}
            >
              {Math.round(progress)}%
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
