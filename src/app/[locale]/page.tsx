import Hero from "@/components/Hero";
import Importance from "@/components/Importance";
import Marquee from "@/components/Marquee";
import Plans from "@/components/Plans";
import Reviews from "@/components/Reviews";

export default function Home() {
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
