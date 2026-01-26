"use client";

import { useChat } from "@/context/ChatContext";
import { useData } from "@/context/DataContext";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { FaCheckCircle, FaInfoCircle, FaRobot } from "react-icons/fa";


export default function Plans() {
  const { openChatWithIntent } = useChat();
  const { plans, loading } = useData();
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const t = useTranslations("Plans");
  const locale = useLocale();



  const getFeatureDescription = (feature: string) => {
    const lower = feature.toLowerCase();
    if (lower.includes("responsive")) return t("features_tooltip.responsive");
    if (lower.includes("hosting")) return t("features_tooltip.hosting");
    if (lower.includes("ssl")) return t("features_tooltip.ssl");
    if (lower.includes("seo")) return t("features_tooltip.seo");
    if (lower.includes("dominio")) return t("features_tooltip.dominio");
    if (lower.includes("soporte")) return t("features_tooltip.soporte");
    return t("features_tooltip.default");
  };

  if (loading) {
    return (
      <section id="planes" className="py-32 px-6 flex justify-center bg-transparent">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="planes" className="py-32 px-6 relative overflow-hidden bg-secondary/5">
      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            {t("title_start")}{" "}
            <span className="gradient-text">
              {t("title_highlight")}
            </span>
          </h2>
          <p className="text-foreground/60 text-xl max-w-2xl mx-auto font-light whitespace-pre-line">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Plans Grid */}
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {plans.filter(plan => locale === 'en' ? !!plan.description_en : !!plan.description).map((plan) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className={`relative flex flex-col bg-background/40 backdrop-blur-xl border rounded-3xl p-8 transition-all duration-300 ${
                plan.popular
                  ? "border-primary/50 shadow-[0_0_50px_-10px_rgba(var(--primary-rgb),0.3)]"
                  : "border-foreground/10 hover:border-foreground/20"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-full text-center">
                  <span className="bg-gradient-to-r from-primary to-secondary px-6 py-1.5 rounded-full text-sm font-bold text-white shadow-lg inline-block">
                    {t("popular_badge")}
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-foreground/60 text-sm mb-6 h-10 line-clamp-2">
                  {locale === 'en' ? (plan.tagline_en || plan.tagline) : plan.tagline}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-foreground tracking-tight">
                    ${plan.price}
                  </span>
                  <span className="text-foreground/40 font-medium">USD</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-foreground/10 mb-8" />

              {/* Features */}
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.slice(0, 6).map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-foreground/80 relative group/feature"
                    onMouseEnter={() => setHoveredFeature(`${plan.id}-${idx}`)}
                    onMouseLeave={() => setHoveredFeature(null)}
                  >
                    <FaCheckCircle className="mt-1 text-primary flex-shrink-0" />
                    <span className="cursor-help border-b border-dashed border-foreground/20 hover:border-primary transition-colors">
                      {feature}
                    </span>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-3 bg-secondary/90 border border-white/10 rounded-xl shadow-xl text-xs text-white opacity-0 group-hover/feature:opacity-100 transition-opacity pointer-events-none z-50 backdrop-blur-md">
                      {getFeatureDescription(feature)}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-secondary/90"></div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href={`/planes/${plan.slug}`}
                className={`w-full block text-center px-6 py-4 rounded-xl font-bold transition-all shadow-md ${
                  plan.popular
                    ? "bg-foreground text-background hover:scale-105"
                    : "bg-foreground/10 text-foreground hover:bg-foreground/20 border border-foreground/10"
                }`}
              >
                {t("view_details")}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA with Chat Trigger */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center bg-background/30 border border-foreground/5 rounded-3xl p-12 max-w-3xl mx-auto backdrop-blur-sm relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <h3 className="text-3xl font-bold text-foreground mb-4 relative z-10">
            {t("cta_section.title")}
          </h3>
          <p className="text-foreground/60 mb-8 text-lg relative z-10">
            {t("cta_section.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <button
              onClick={() => openChatWithIntent("recommendation")}
              className="px-10 py-4 bg-primary text-white rounded-full font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <FaRobot />
              {t("cta_section.chat_btn")}
            </button>
            <Link
              href="/informacion"
              className="px-10 py-4 bg-transparent border border-foreground/20 rounded-full text-foreground font-bold text-lg hover:bg-foreground/5 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <FaInfoCircle />
              {t("cta_section.info_btn")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
