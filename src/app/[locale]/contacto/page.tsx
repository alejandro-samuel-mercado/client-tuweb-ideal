import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <Contact />
      </div>
    </main>
  );
}
