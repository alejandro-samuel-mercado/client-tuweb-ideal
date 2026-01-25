"use client";

import { useTranslations } from "next-intl";

export default function PrivacidadPage() {
  const t = useTranslations("Legal.Privacy");

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 gradient-text">
          {t("title")}
        </h1>
        <div className="space-y-6 text-foreground/80">
          <p>{t("intro")}</p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            {t("sections.collection.title")}
          </h2>
          <p>{t("sections.collection.content")}</p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            {t("sections.usage.title")}
          </h2>
          <p>
            {t("sections.usage.content")}
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>{t("sections.usage.list.1")}</li>
              <li>{t("sections.usage.list.2")}</li>
              <li>{t("sections.usage.list.3")}</li>
            </ul>
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            {t("sections.protection.title")}
          </h2>
          <p>{t("sections.protection.content")}</p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">
            {t("sections.sharing.title")}
          </h2>
          <p>{t("sections.sharing.content")}</p>
        </div>
      </div>
    </div>
  );
}
