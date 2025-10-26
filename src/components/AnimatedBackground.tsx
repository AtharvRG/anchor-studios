"use client";

import React, { useRef, useEffect } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    const squareSize = 30;
    const speed = 0.3;
    const borderColor = "rgba(245, 245, 245, 0.1)";
    const hoverFillColor = "rgba(206, 255, 26, 0.08)";

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      gridOffset.current.x = (gridOffset.current.x - speed) % squareSize;
      gridOffset.current.y = (gridOffset.current.y - speed) % squareSize;

      const hoveredCol = Math.floor(mousePos.current.x / squareSize);
      const hoveredRow = Math.floor(mousePos.current.y / squareSize);

      for (let i = -1; i < canvas.width / squareSize + 1; i++) {
        for (let j = -1; j < canvas.height / squareSize + 1; j++) {
          const x = i * squareSize + gridOffset.current.x;
          const y = j * squareSize + gridOffset.current.y;

          if (i === hoveredCol && j === hoveredRow) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(x, y, squareSize, squareSize);
          }
          
          ctx.strokeStyle = borderColor;
          ctx.strokeRect(x, y, squareSize, squareSize);
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default AnimatedBackground;