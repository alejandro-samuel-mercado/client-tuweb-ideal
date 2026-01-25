"use client";

import { useTranslations } from "next-intl";

export default function CookiesPage() {
  const t = useTranslations("Legal.Cookies");

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 gradient-text">
          {t("title")}
        </h1>
        <div className="space-y-6 text-foreground/80">
          <p>{t("intro")}</p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            {t("sections.what_are.title")}
          </h2>
          <p>{t("sections.what_are.content")}</p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            {t("sections.what_use.title")}
          </h2>
          <p>{t("sections.what_use.content_1")}</p>
          <p>{t("sections.what_use.content_2")}</p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            {t("sections.control.title")}
          </h2>
          <p>{t("sections.control.content")}</p>
        </div>
      </div>
    </div>
  );
}
