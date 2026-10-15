import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { BentoArchitecture } from "@/components/landing/bento-architecture";
import { Portability } from "@/components/landing/portability";
import { CapsuleViewer } from "@/components/landing/capsule-viewer";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-200 selection:bg-emerald-500/30">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BentoArchitecture />
        <Portability />
        <CapsuleViewer />
      </main>
      <Footer />
    </div>
  );
}
