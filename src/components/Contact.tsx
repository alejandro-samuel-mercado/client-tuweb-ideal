"use client"
import { API_URL } from "@/config";
import { useData } from "@/context/DataContext";
import Logger from "@/lib/logger";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Contact() {
  const t = useTranslations("Contact");
  const { personalData } = useData();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/email/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          plan: "",
          message: "",
        });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      Logger.error("Error sending email:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-32 px-6 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="bg-background/60 backdrop-blur-md border border-foreground/5 rounded-3xl p-10 shadow-2xl  max-md:px-2 ">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-foreground/80 font-medium mb-2 ml-1">
                  {t("form.name")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t("form.name")}
                  className="w-full px-6 py-4 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-foreground/80 font-medium mb-2 ml-1">
                  {t("form.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t("form.email")}
                  className="w-full px-6 py-4 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-foreground/80 font-medium mb-2 ml-1">
                  {t("form.phone")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+54 11 ..."
                  className="w-full px-6 py-4 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-foreground/80 font-medium mb-2 ml-1">
                  {t("form.message")} ...
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder={t("form.message")}
                  className="w-full px-6 py-4 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-8 py-5 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all border border-white/20 disabled:opacity-50"
              >
                {submitting
                  ? t("form.submitting")
                  : submitted
                  ? t("modal.success_title")
                  : t("form.submit")}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 lg:pt-10">
            {[
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
                title: t("info.email"),
                value: personalData?.email || "Cargando...",
                sub: t("modal.success_desc"), 
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                ),
                title: t("info.whatsapp"),
                value: personalData?.phone || "Cargando...",
                sub: "Lun-Vie 9:00 - 21:00",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
                title: t("info.location"),
                value: personalData?.address || "Cargando...",
                sub: "Trabajamos globalmente",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-6 p-6 rounded-2xl hover:bg-foreground/5 transition-colors group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-foreground text-lg font-bold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-primary font-medium text-lg mb-1">
                    {item.value}
                  </p>
                  <p className="text-foreground/60 text-sm">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
