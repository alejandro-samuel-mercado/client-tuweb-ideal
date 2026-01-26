"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Background() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 100]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none transform-gpu">
      <div className="absolute inset-0 bg-background transition-colors duration-500" />
      
      {/* Dynamic Gradients with Parallax */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : y1 }}
        animate={shouldReduceMotion ? {} : {
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3], 
          x: [0, 50, 0], 
        }}
        transition={{
          duration: 25, 
          repeat: Infinity,
          ease: "linear", 
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] rounded-full bg-primary/30 blur-[80px] mix-blend-multiply dark:mix-blend-screen will-change-transform"
      />

      <motion.div
        style={{ y: shouldReduceMotion ? 0 : y2 }}
        animate={shouldReduceMotion ? {} : {
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2], 
          x: [0, -50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
        className="absolute top-[20%] right-[-10%] w-[60vh] h-[60vh] rounded-full bg-secondary/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen will-change-transform"
      />

      <motion.div
        style={{ y: shouldReduceMotion ? 0 : y3 }}
        animate={shouldReduceMotion ? {} : {
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2], 
          x: [0, 30, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
          delay: 4,
        }}
        className="absolute bottom-[-10%] left-[20%] w-[70vh] h-[70vh] rounded-full bg-accent/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen will-change-transform"
      />

      {/* Subtle Noise Texture - Reduced opacity */}
      <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none brightness-100 contrast-150" />

      {/* Grid Overlay for Texture */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05]" />
    </div>
  );
}

