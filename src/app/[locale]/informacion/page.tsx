import Education from "@/components/Education";
import Navbar from "@/components/Navbar";

export default function InformacionPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <Education />
      </div>
    </main>
  );
}
