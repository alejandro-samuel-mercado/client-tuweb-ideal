"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Education() {
  const [activeTab, setActiveTab] = useState(0);
  const t = useTranslations("Education");

  const steps = [
    {
      title: t("steps.planning.title"),
      icon: "📋",
      desc: t("steps.planning.desc"),
    },
    {
      title: t("steps.development.title"),
      icon: "💻",
      desc: t("steps.development.desc"),
    },
    {
      title: t("steps.review.title"),
      icon: "👀",
      desc: t("steps.review.desc"),
    },
    {
      title: t("steps.launch.title"),
      icon: "🚀",
      desc: t("steps.launch.desc"),
    },
  ];

  const concepts = [
    {
      title: t("concepts.hosting.title"),
      icon: "🏠",
      desc: t("concepts.hosting.desc"),
    },
    {
      title: t("concepts.domain.title"),
      icon: "www",
      desc: t("concepts.domain.desc"),
    },
    {
      title: t("concepts.ssl.title"),
      icon: "🔒",
      desc: t("concepts.ssl.desc"),
    },
    {
      title: t("concepts.responsive.title"),
      icon: "📱",
      desc: t("concepts.responsive.desc"),
    },
  ];

  return (
    <section className="py-32 px-6 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      <div
        className="container mx-auto relative z-10 max-w-6xl animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            {t("title_start")}{" "}
            <span className="gradient-text">
              {t("title_highlight")}
            </span>
          </h2>
          <p className="text-foreground/70 text-xl max-w-2xl mx-auto font-light">
            {t("subtitle")}
          </p>
        </div>

        {/* Process Timeline */}
        <div className="mb-32">
          <h3 className="text-3xl font-bold text-foreground text-center mb-16">
            {t("process_title")}
          </h3>
          <div className="relative">
            {/* Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 transform -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step, idx) => (
                <div key={idx} className="relative group">
                  <div className="bg-background/60 border border-foreground/10 p-8 rounded-2xl relative z-10 hover:-translate-y-2 transition-transform duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 backdrop-blur-sm">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform text-white">
                      {step.icon}
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-3">
                      {step.title}
                    </h4>
                    <p className="text-foreground/60 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Concepts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-8">
              {t("concepts_title")}
            </h3>
            <div className="space-y-4">
              {concepts.map((concept, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    activeTab === idx
                      ? "bg-foreground/5 border-primary/50 shadow-lg"
                      : "bg-transparent border-transparent hover:bg-foreground/5"
                  }`}
                  onClick={() => setActiveTab(idx)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{concept.icon}</span>
                    <h4
                      className={`text-xl font-bold ${
                        activeTab === idx ? "text-primary" : "text-foreground/60"
                      }`}
                    >
                      {concept.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[400px] bg-background/40 border border-foreground/10 rounded-3xl p-10 flex items-center justify-center text-center overflow-hidden backdrop-blur-md shadow-inner">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

            <div key={activeTab} className="relative z-10 animate-fade-in">
              <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-5xl mb-8 mx-auto shadow-lg shadow-primary/30 animate-bounce-subtle text-white">
                {concepts[activeTab].icon}
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">
                {concepts[activeTab].title}
              </h3>
              <p className="text-xl text-foreground/70 leading-relaxed max-w-md">
                {concepts[activeTab].desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
