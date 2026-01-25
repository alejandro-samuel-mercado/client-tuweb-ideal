"use client";

import { useAuth } from "@/context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["planes"];
      let current = "";

      if (window.scrollY < 100) {
        current = "inicio";
      } else {
        const planesElement = document.getElementById("planes");
        if (planesElement) {
          const rect = planesElement.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 300) {
            current = "planes";
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = useTranslations("Navbar");

  const navLinks = [
    { href: "/", label: t("home"), id: "inicio" },
    { href: "/nosotros", label: t("about"), id: null },
    { href: "/ejemplos", label: t("projects"), id: null },
    { href: "/contacto", label: t("contact"), id: null },
  ];

  if (!mounted) return null;

  const isActive = (link: { href: string; id: string | null }) => {
    if (link.id && pathname === "/") {
      return (
        activeSection === link.id ||
        (link.id === "inicio" && activeSection === "")
      );
    }
    if (
      link.href !== "/" &&
      !link.href.startsWith("/#") &&
      pathname.startsWith(link.href)
    ) {
      return true;
    }
    return false;
  };
  
  const glassContainer = "glass shadow-lg backdrop-blur-md border border-[var(--card-border)] bg-[var(--navbar-bg)]";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2 md:py-4" : "py-4 md:py-6"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-lg borderborder-white/10 rounded-full px-6 py-2 shadow-lg" : ""}`}>
            
        {/* Logo - Left */}
        <Link href="/" className="flex items-center gap-2 group relative z-50 shrink-0">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="font-bold text-lg md:text-xl tracking-tight  xs:block text-foreground">
            TuWeb<span className="text-primary">Ideal</span>
          </span>
         
        </Link>

        {/* Centered Pill Menu - Desktop */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {!isScrolled && (
              <div
                className={`flex items-center gap-1 px-2 py-1.5 rounded-full ${glassContainer}`}
              >
                {navLinks.map((link) => {
                  const active = isActive(link);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 ${
                        active
                          ? "bg-primary text-white shadow-md shadow-primary/30"
                          : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
          )}
           {isScrolled && (
                <div className="flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.href} 
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-primary ${isActive(link) ? 'text-primary font-bold' : 'text-foreground/80'}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>

        {/* User / Login - Right */}
        <div className="hidden md:flex items-center gap-3 relative z-50">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`p-2.5 rounded-full text-foreground/80 ${!isScrolled ? glassContainer : 'bg-foreground/5 hover:bg-foreground/10'} transition-all hover:scale-110 active:scale-95`}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>

          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`px-5 py-2.5 rounded-full text-white text-sm font-medium bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2 hover:cursor-pointer hover:scale-105 border-0`}
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="max-w-[100px] truncate">
                    {pathname.includes("/dashboard") ? (user.name ? user.name.split(" ")[0] : "Usuario") : t("dashboard")}
                </span>
              </Link>
              {pathname.includes("/dashboard") && (
                <button
                   onClick={logout}
                   className="p-2.5 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all ml-1 backdrop-blur-sm border border-red-500/20"
                   title={t("logout")}
                >
                  <IoMdLogOut className="w-6 h-6" />
                </button>
              )}
            </>
          ) : (
            <Link
              href="/login"
              className={`px-6 py-2.5 rounded-full text-white text-sm font-medium bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105 transform active:scale-95`}
            >
              {t("login")}
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
            <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`p-2 rounded-full text-foreground/80 ${glassContainer}`}
            >
            {theme === "dark" ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            
            <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`relative z-50 text-foreground p-2 rounded-full transition-colors ${isMobileMenuOpen ? 'bg-foreground/10' : ''}`}
            >
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                    isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
                />
            </svg>
            </button>
        </div>

        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-20 left-4 right-4 p-6 rounded-3xl flex flex-col gap-4 md:hidden bg-[#0a0a0f]/95 backdrop-blur-2xl border border-white/10 shadow-2xl z-40 origin-top`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-medium py-4 px-6 rounded-2xl transition-all flex items-center justify-between group ${
                  isActive(link)
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-foreground/80 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {link.label}
                 {isActive(link) && <div className="w-2 h-2 rounded-full bg-primary" />}
              </Link>
            ))}
            
            <div className="h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-2" />
            
            {user ? (
              <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-3 px-2 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                        <p className="font-bold text-foreground">{user.name}</p>
                        <p className="text-xs text-foreground/50">{user.email}</p>
                    </div>
                 </div>
                <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex justify-center items-center gap-2 py-3.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform"
                >
                    ir al Dashboard
                </Link>
                <button
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="flex justify-center items-center gap-2 py-3.5 rounded-xl bg-red-500/10 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-colors"
                >
                    <IoMdLogOut /> Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform"
              >
                {t("login")}
              </Link>
            )}
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

