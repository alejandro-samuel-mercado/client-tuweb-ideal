import Hero from "@/components/Hero";
import { setRequestLocale } from "next-intl/server";
import dynamic from 'next/dynamic';

const Marquee = dynamic(() => import("@/components/Marquee"));
const Importance = dynamic(() => import("@/components/Importance"));
const Plans = dynamic(() => import("@/components/Plans"));
const Reviews = dynamic(() => import("@/components/Reviews"));

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
