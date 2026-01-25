"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Importance() {
  const t = useTranslations("Importance");

  const benefits = [
    {
      title: t("benefits.credibility.title"),
      desc: t("benefits.credibility.desc"),
      icon: "💎",
    },
    {
      title: t("benefits.sales.title"),
      desc: t("benefits.sales.desc"),
      icon: "🌙",
    },
    {
      title: t("benefits.global.title"),
      desc: t("benefits.global.desc"),
      icon: "🌍",
    },
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      
      <div
        className="container mx-auto relative z-10 max-w-7xl animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-4">
              <span className="text-primary text-sm font-bold uppercase tracking-wider">
                {t("badge")}
              </span>
            </div>

            <div className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground whitespace-pre-line">
              {t.rich("title", {
                br: () => <br />,
                span: (chunks) => <span className="gradient-text drop-shadow-sm">{chunks}</span>
              })}
            </div>

            <p className="text-xl text-foreground/70 leading-relaxed font-light">
              {t("description")}
            </p>

            <div className="flex flex-col gap-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-background/40 border border-foreground/5 backdrop-blur-sm hover:bg-foreground/5 transition-colors shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-2xl">
                  📈
                </div>
                <div>
                  <h4 className="text-foreground font-bold text-lg">
                    {t("cards.revenue.title")}
                  </h4>
                  <p className="text-foreground/60 text-sm">
                    {t("cards.revenue.desc")}
                  </p>
                </div>
              </motion.div>

              <motion.div 
                 whileHover={{ scale: 1.02 }}
                 className="flex items-center gap-4 p-4 rounded-xl bg-background/40 border border-foreground/5 backdrop-blur-sm hover:bg-foreground/5 transition-colors shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl">
                  🎯
                </div>
                <div>
                  <h4 className="text-foreground font-bold text-lg">
                     {t("cards.clients.title")}
                  </h4>
                  <p className="text-foreground/60 text-sm">
                     {t("cards.clients.desc")}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Cards */}
          <div className="relative">
            <div className="grid gap-6 relative z-10">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                  className={`p-8 rounded-2xl bg-background/60 border border-foreground/10 backdrop-blur-xl transition-all duration-300 group shadow-md ${
                    idx === 1 ? "lg:-ml-12" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                      {benefit.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-foreground/60 leading-relaxed">
                    {benefit.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
