"use client";

import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("About");

  const stats = [
    { number: t("stats.sites.number"), label: t("stats.sites.label") },
    { number: t("stats.clients.number"), label: t("stats.clients.label") },
    { number: t("stats.time.number"), label: t("stats.time.label") },
    { number: t("stats.support.number"), label: t("stats.support.label") },
  ];

  const reasons = [
    {
      icon: "🚀",
      title: t("why_us.reasons.delivery.title"),
      description: t("why_us.reasons.delivery.desc"),
    },
    {
      icon: "💎",
      title: t("why_us.reasons.design.title"),
      description: t("why_us.reasons.design.desc"),
    },
    {
      icon: "🔧",
      title: t("why_us.reasons.all_included.title"),
      description: t("why_us.reasons.all_included.desc"),
    },
    {
      icon: "📱",
      title: t("why_us.reasons.mobile.title"),
      description: t("why_us.reasons.mobile.desc"),
    },
    {
      icon: "🎓",
      title: t("why_us.reasons.training.title"),
      description: t("why_us.reasons.training.desc"),
    },
    {
      icon: "💬",
      title: t("why_us.reasons.support.title"),
      description: t("why_us.reasons.support.desc"),
    },
  ];

  return (
    <section id="nosotros" className="py-32 px-6 bg-background relative border-t border-foreground/5">
      {/* Background decorations*/}
      <div className="absolute top-0 left-0 w-[auto] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none bg-red-500" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10 max-w-6xl">
        {/* About Section */}
        <div className="mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground">
            {t("title_start")}{" "}
            <span className="gradient-text">
              {t("title_highlight")}
            </span>
          </h2>
          <p className="text-foreground/70 text-xl mb-6 max-w-4xl mx-auto leading-relaxed font-light">
            {t("description_1")}
          </p>
          <p className="text-foreground/60 text-lg leading-relaxed max-w-4xl mx-auto">
            {t("description_2")}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-background/40 backdrop-blur-lg border border-foreground/10 rounded-2xl p-8 text-center hover:scale-105 transition-all hover:bg-foreground/5"
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-3">
                {stat.number}
              </div>
              <div className="text-foreground/60 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div>
          <h3 className="text-3xl md:text-5xl font-bold text-center mb-16 text-foreground">
            {t("why_us.title_start")}{" "}
            <span className="gradient-text">
              {t("why_us.title_highlight")}
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-background/40 border border-foreground/5 rounded-2xl p-8 hover:border-primary/30 transition-all hover:-translate-y-1 duration-300 shadow-sm"
              >
                <div className="text-5xl mb-6">{reason.icon}</div>
                <h4 className="text-xl font-bold text-foreground mb-3">
                  {reason.title}
                </h4>
                <p className="text-foreground/60 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
