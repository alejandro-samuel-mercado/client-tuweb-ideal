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
    const t = useTranslations("Plans");
    const locale = useLocale();

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
        <section id="planes" className="py-32 px-8 md:px-20 sm:px-20  relative overflow-hidden bg-secondary/10 ">
            <div className="container mx-auto relative z-10 max-w-full">
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 justify-center max-w-6xl mx-auto"
                >
                    {plans.filter(plan => locale === 'en' ? !!plan.description_en : !!plan.description).map((plan) => (
                        <motion.div
                            key={plan.id}
                            variants={itemVariants}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className={`relative flex flex-col bg-background/30 backdrop-blur-2xl border rounded-[2.5rem] p-6 transition-all duration-500 group ${plan.popular
                                ? "border-primary/40 shadow-[0_0_80px_-20px_rgba(var(--primary-rgb),0.25)]"
                                : "border-foreground/5 hover:border-foreground/15"
                                }`}
                        >
                            {/* Premium Glow Effect */}
                            {plan.popular && (
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-[2.5rem] pointer-events-none" />
                            )}

                            {/* Popular/Featured Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                    <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient-x px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-xl inline-block border border-white/20">
                                        {t("popular_badge")}
                                    </span>
                                </div>
                            )}

                            {/* Plan Header */}
                            <div className="mb-8 relative">
                                <h3 className="text-xl font-black text-foreground mb-1 group-hover:gradient-text transition-all duration-500">
                                    {plan.name}
                                </h3>
                                <p className="text-foreground/40 text-[11px] font-medium tracking-wide uppercase mb-6 line-clamp-1">
                                    {locale === 'en' ? (plan.tagline_en || plan.tagline) : plan.tagline}
                                </p>

                                <div className="flex flex-col items-center gap-1 bg-foreground/5 rounded-3xl py-6 border border-foreground/5 group-hover:bg-foreground/10 transition-colors">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-sm font-bold text-foreground/40">$</span>
                                        <span className="text-5xl font-black text-foreground tracking-tighter">
                                            {plan.setupPrice || plan.price}
                                        </span>
                                        <span className="text-xs font-bold text-foreground/30 ml-1">USD</span>
                                    </div>
                                    <div className="text-[10px] font-bold text-primary uppercase tracking-widest opacity-80">
                                        {t("setup_fee_label") || "Pago Inicial"}
                                    </div>
                                </div>
                                
                                {plan.monthlyPrice !== null && plan.monthlyPrice !== undefined && (
                                <div className="mt-4 flex items-center justify-center gap-2 mb-6">
                                    <div className="h-px flex-1 bg-foreground/5"></div>
                                    <div className="text-[18px] font-bold text-primary  whitespace-nowrap bg-background/50 px-3 py-1 rounded-full border border-foreground/10">
                                        + ${plan.monthlyPrice}/mes
                                    </div>
                                    <div className="h-px flex-1 bg-foreground/5"></div>
                                </div>
                                )}

                                {/* Ideal For Tags */}
                                {plan.useCases && plan.useCases.length > 0 && (
                                    <div className="mb-6">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-2">Ideal Para:</div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {plan.useCases.slice(0, 3).map((uc: string, i: number) => (
                                                <span key={i} className="px-2 py-1 bg-secondary/10 text-secondary border border-secondary/20 text-[10px] font-bold rounded-lg truncate max-w-[120px]" title={uc}>
                                                    {uc}
                                                </span>
                                            ))}
                                            {plan.useCases.length > 3 && (
                                                <span className="px-2 py-1 bg-foreground/5 text-foreground/50 text-[10px] font-bold rounded-lg">
                                                    +{plan.useCases.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Delivery Time */}
                            {(locale === 'en' ? (plan.deliveryTime_en || plan.deliveryTime) : plan.deliveryTime) && (
                                <div className="text-center mb-6 text-sm font-semibold text-primary/80 bg-primary/10 py-2 rounded-lg">
                                ⏳ {t("delivery_time") || "Entrega / Delivery"}: {locale === 'en' ? (plan.deliveryTime_en || plan.deliveryTime) : plan.deliveryTime}
                                </div>
                            )}

                            {/* Features List */}
                            <ul className="space-y-3.5 mb-8 flex-grow">
                                {plan.features.slice(0, 8).map((feature: string, idx: number) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-3 text-[13px] text-foreground/70 relative leading-snug group/feature"
                                        onMouseEnter={() => setHoveredFeature(`${plan.id}-${idx}`)}
                                        onMouseLeave={() => setHoveredFeature(null)}
                                    >
                                        <div className="mt-1 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 transition-colors">
                                            <FaCheckCircle className="text-[10px] text-primary" />
                                        </div>
                                        <span className="cursor-help border-b border-dashed border-foreground/20 hover:border-primary transition-colors">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <Link
                                href={`/planes/${plan.slug}`}
                                className={`w-full block text-center px-6 py-4 rounded-2xl font-black text-sm tracking-widest uppercase transition-all duration-300 shadow-lg ${plan.popular
                                    ? "bg-foreground text-background hover:shadow-primary/25 hover:-translate-y-1"
                                    : "bg-foreground/5 text-foreground hover:bg-foreground/10 border border-foreground/10 hover:-translate-y-1"
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
