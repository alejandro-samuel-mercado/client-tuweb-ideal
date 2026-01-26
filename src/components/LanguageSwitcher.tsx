"use client";

import { usePathname, useRouter } from "@/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const nextLocale = locale === "es" ? "en" : "es";
    
    startTransition(() => {
        router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className={`
        fixed top-6 max-md:top-17 max-md:right-4 right-6 z-50 
        px-4  py-3 max-md:px-2 max-md:py-2 rounded-full 
        font-bold text-lg max-md:text-sm shadow-lg backdrop-blur-md
        transition-all duration-300 hover:scale-110 active:scale-95
        border border-white/10
        ${locale === 'es' ? 'bg-purple-600 text-black' : 'bg-blue-600 text-white'}
      `}
      aria-label="Switch Language"
    >
      {locale === "es" ? "🇪🇸 " : "🇺🇸"}
    </button>
  );
}
