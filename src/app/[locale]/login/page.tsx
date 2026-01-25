"use client";

import { API_URL } from "@/config";
import { useAuth } from "@/context/AuthContext";
import { Link, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const { login, user } = useAuth();
  const router = useRouter();
  const t = useTranslations("Auth.Login");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <main className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-6 pt-32 pb-20">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
            <div
              className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] animate-pulse-slow"
              style={{ animationDelay: "2s" }}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-foreground/[0.02] rounded-full blur-[100px] pointer-events-none" />
          </div>

          <div className="w-full max-w-md bg-background/60 backdrop-blur-2xl border border-foreground/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative z-10 animate-fade-in-up">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-6 shadow-lg shadow-primary/30">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-3">
                {t("welcome_title")}
              </h1>
              <p className="text-foreground/60">
                {t("welcome_subtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-foreground/80 text-sm font-medium ml-1">
                  {t("email_label")}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-foreground/40 group-focus-within:text-primary transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-5 py-4 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="block text-foreground/80 text-sm font-medium">
                    {t("password_label")}
                  </label>
                  <a
                    href="#"
                    className="text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    {t("forgot_password")}
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-foreground/40 group-focus-within:text-primary transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-5 py-4 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all relative overflow-hidden group"
              >
                <span className="relative z-10">{t("submit_btn")}</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px bg-foreground/10 flex-grow" />
              <span className="text-foreground/40 text-sm font-medium">
                {t("or_continue")}
              </span>
              <div className="h-px bg-foreground/10 flex-grow" />
            </div>

            <button
              onClick={() =>
                (window.location.href = `${API_URL}/api/auth/google`)
              }
              className="w-full py-4 bg-foreground/5 text-foreground border border-foreground/10 rounded-xl font-bold hover:bg-foreground/10 transition-all flex items-center justify-center gap-3 group"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:scale-110"
                viewBox="0 0 24 24"
              >
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
              {t("no_account")}{" "}
              <Link
                href="/register"
                className="text-primary hover:text-primary/80 font-medium underline hover:decoration-2 transition-all"
              >
                {t("register_link")}
              </Link>
            </p>
          </div>
        </main>
      )}
    </>
  );
}
