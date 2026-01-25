"use client";

import { useTranslations } from "next-intl";

export default function TerminosPage() {
  const t = useTranslations("Legal.Terms");

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 gradient-text">
          {t("title")}
        </h1>
        <div className="space-y-6 text-foreground/80">
          <p>{t("intro")}</p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            {t("sections.services.title")}
          </h2>
          <p>{t("sections.services.content")}</p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            {t("sections.intellectual_property.title")}
          </h2>
          <p>{t("sections.intellectual_property.content")}</p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            {t("sections.payments.title")}
          </h2>
          <p>{t("sections.payments.content")}</p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            {t("sections.liability.title")}
          </h2>
          <p>{t("sections.liability.content")}</p>
        </div>
      </div>
    </div>
  );
}
