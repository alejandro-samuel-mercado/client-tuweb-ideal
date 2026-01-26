"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaAws, FaDocker, FaGoogle, FaNodeJs, FaReact, FaStripe } from "react-icons/fa";
import { SiFirebase, SiMongodb, SiNextdotjs, SiPostgresql, SiTailwindcss, SiTypescript } from "react-icons/si";

const logos = [
  { icon: <SiNextdotjs />, name: "Next.js" },
  { icon: <FaReact />, name: "React" },
  { icon: <SiTypescript />, name: "TypeScript" },
  { icon: <SiTailwindcss />, name: "Tailwind" },
  { icon: <FaNodeJs />, name: "Node.js" },
  { icon: <SiMongodb />, name: "MongoDB" },
  { icon: <FaAws />, name: "AWS" },
  { icon: <SiPostgresql />, name: "PostgreSQL" },
  { icon: <FaDocker />, name: "Docker" },
  { icon: <SiFirebase />, name: "Firebase" },
  { icon: <FaStripe />, name: "Stripe" },
  { icon: <FaGoogle />, name: "Google Cloud" },
];

export default function Marquee() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="py-10 bg-trasparent overflow-hidden relative transform-gpu">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
      <div className="flex w-full">
        <motion.div
          className="flex gap-16 px-8 items-center will-change-transform"
          animate={shouldReduceMotion ? {} : { x: ["0%", "-50%"] }}
          transition={{
            duration: 60, 
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...logos, ...logos, ...logos, ...logos].map((logo, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 group cursor-default">
              <div className="text-4xl text-foreground/20 group-hover:text-primary transition-colors duration-300 transform group-hover:scale-110">
                {logo.icon}
              </div>
              <span className="text-xs font-medium text-foreground/40 group-hover:text-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

