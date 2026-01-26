import Hero from "@/components/Hero";
import Importance from "@/components/Importance";
import Marquee from "@/components/Marquee";
import Plans from "@/components/Plans";
import Reviews from "@/components/Reviews";

import { setRequestLocale } from "next-intl/server";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <Marquee />
      <Importance />
      <Plans />
      <Reviews />
    </div>
  );
}
