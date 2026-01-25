import About from "@/components/About";
import Navbar from "@/components/Navbar";

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <About />
      </div>
    </main>
  );
}
