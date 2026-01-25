"use client";

import { API_URL } from "@/config";
import { useAuth } from "@/context/AuthContext";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "",
    city: "",
  });
  const { register } = useAuth();
  const t = useTranslations("Auth.Register");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert(t("passwords_mismatch"));
      return;
    }
    await register(formData);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-6 py-20">
      {/* Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      <div className="w-full max-w-2xl bg-background/60 backdrop-blur-xl border border-foreground/10 rounded-3xl p-8 md:p-12 shadow-2xl relative z-10 animate-fade-in-up">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h1>
          <p className="text-foreground/60">
            {t("subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-foreground/80 text-sm font-medium mb-2 ml-1">
                {t("name_label")}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder={t("name_label")}
                required
              />
            </div>
            <div>
              <label className="block text-foreground/80 text-sm font-medium mb-2 ml-1">
                {t("email_label")}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-foreground/80 text-sm font-medium mb-2 ml-1">
                {t("phone_label")}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="+54 9 11..."
              />
            </div>
            <div>
              <label className="block text-foreground/80 text-sm font-medium mb-2 ml-1">
                {t("country_label")}
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="Argentina"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-foreground/80 text-sm font-medium mb-2 ml-1">
                {t("password_label")}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label className="block text-foreground/80 text-sm font-medium mb-2 ml-1">
                {t("confirm_password_label")}
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all mt-4"
          >
            {t("submit_btn")}
          </button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px bg-foreground/10 flex-grow" />
          <span className="text-foreground/40 text-sm">{t("or_register")}</span>
          <div className="h-px bg-foreground/10 flex-grow" />
        </div>

        <button
          onClick={() =>
            (window.location.href = `${API_URL}/api/auth/google`)
          }
          className="w-full py-3.5 bg-foreground/5 text-foreground border border-foreground/10 rounded-xl font-bold hover:bg-foreground/10 transition-all flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>

        <p className="mt-8 text-center text-foreground/60 text-sm">
          {t("have_account")}{" "}
          <Link
            href="/login"
            className="text-primary hover:text-primary/80 font-medium underline"
          >
            {t("login_link")}
          </Link>
        </p>
      </div>
    </main>
  );
}
