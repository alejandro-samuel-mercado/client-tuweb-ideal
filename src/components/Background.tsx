"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Background() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 100]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-background transition-colors duration-500" />
      
      {/* Dynamic Gradients with Parallax */}
      <motion.div
        style={{ y: y1 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4], 
          x: [0, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] w-[60vh] h-[60vh] rounded-full bg-primary/40 blur-[100px] mix-blend-multiply dark:mix-blend-screen"
      />

      <motion.div
        style={{ y: y2 }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.5, 0.3], 
          x: [0, -100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[20%] right-[-10%] w-[70vh] h-[70vh] rounded-full bg-secondary/30 blur-[120px] mix-blend-multiply dark:mix-blend-screen"
      />

      <motion.div
        style={{ y: y3 }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3], 
          x: [0, 50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-[-10%] left-[20%] w-[80vh] h-[80vh] rounded-full bg-accent/30 blur-[140px] mix-blend-multiply dark:mix-blend-screen"
      />

      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.3] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none brightness-100 contrast-150" />

      {/* Grid Overlay for Texture */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] dark:opacity-[0.08]" />
    </div>
  );
}
