"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBolt, FaLaptopCode, FaPaintBrush, FaShieldAlt } from "react-icons/fa";
import { IoRocketSharp } from "react-icons/io5";

export default function Hero() {
  const t = useTranslations("Hero");
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollToPlanes = () => {
    const element = document.getElementById("planes");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    { icon: <FaBolt />, title: t("features.delivery"), subtitle: "⚡" },
    { icon: <FaPaintBrush />, title: t("features.design"), subtitle: "🎨" },
    { icon: <FaLaptopCode />, title: t("features.responsive"), subtitle: "📱" },
    { icon: <FaShieldAlt />, title: t("features.secure"), subtitle: "🔒" },
  ];

  /* ... rest of variants ... */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const particleCount = isMobile ? 5 : 20;
  const particles = Array.from({ length: particleCount });
  const waves = Array.from({ length: 3 });

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-32 pb-20">
      
      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none transform-gpu" />

      {/* Hero Particles */}
      {!shouldReduceMotion && (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800), 
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            className="absolute w-1 h-1 bg-primary rounded-full will-change-transform"
          />
        ))}
      </div>
      )}

       {/* Moving Waves */}
       <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none transform translate-y-[1px] w-full z-20">
        <svg
          className="w-full h-[150px] md:h-[200px]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          {waves.map((_, i) => (
             <motion.path
                key={i}
                fill="none"
                stroke="currentColor" 
                strokeWidth={2 + i}
                className="text-primary/30 dark:text-primary/20 will-change-transform"
                d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128"
                initial={shouldReduceMotion ? {} : { pathLength: 0, x: -100 }}
                animate={shouldReduceMotion ? {} : { 
                    x: [0, -100, 0],
                    d: [
                      "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128",
                      "M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,170.7C672,149,768,139,864,144C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96",
                      "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128"
                    ]
                }}
                transition={{
                    duration: 15 + i * 5,
                    repeat: Infinity,
                    ease: "linear", 
                }}
                style={{ opacity: 0.3 + i * 0.1, y: i * 15 }}
            />
          ))}
            {/* Filled Wave - Matches next section background */}
           <path
              fill="currentColor"
              className="text-secondary/5 dark:text-secondary/5 transition-colors duration-500"
              fillOpacity="1"
              d="M0,224L48,218.7C96,213,192,203,288,197.3C384,192,480,192,576,202.7C672,213,768,235,864,240C960,245,1056,235,1152,218.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
        </svg>
      </div>

      <motion.div 
        className="relative z-10 container mx-auto px-6 text-center flex-grow flex flex-col justify-center items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="inline-block mb-4 relative group">
          <span className="py-2 px-4 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold tracking-wide uppercase relative z-10">
            {t("tagline")}
          </span>

        </motion.div>

        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight tracking-tight text-foreground">
          {t("title_start")} <span className="gradient-text">{t("title_highlight")}</span>{" "}
          <br />
          <span className="text-foreground/80">{t("title_end")}</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-foreground/60 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          {t("subtitle")}
        </motion.p>

        {/* Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24 w-full sm:w-auto">
          <button
            onClick={scrollToPlanes}
            className="group relative px-10 py-5 bg-primary text-white font-bold text-lg rounded-full overflow-hidden shadow-lg shadow-primary/40 hover:shadow-primary/60 transition-all hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t("cta_plans")} <IoRocketSharp className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <Link
            href="/ejemplos"
            className="px-10 py-5 bg-background/50 backdrop-blur-md border border-foreground/10 rounded-full text-foreground/80 font-semibold text-lg hover:bg-foreground/5 hover:text-foreground hover:scale-105 transition-all shadow-lg flex items-center gap-3"
          >
            <span>👁️</span> {t("cta_examples")}
          </Link>
        </motion.div>

        {/* Features Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto w-full">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              className="flex items-center gap-4 p-5 bg-background/40 backdrop-blur-lg border border-foreground/5 rounded-2xl transition-all cursor-default group shadow-sm text-left"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center text-2xl text-primary border border-primary/10 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <div>
                <div className="text-foreground font-bold text-lg leading-tight">
                  {feature.title}
                </div>
                <div className="text-foreground/50 text-sm font-medium">
                  {feature.subtitle}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}

