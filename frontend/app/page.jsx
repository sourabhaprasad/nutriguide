import HeroSection from "./components/HeroSection";
import ExploreSection from "./components/ExploreSection";

export default function Home() {
  return (
    <main className="text-[#2E2E2E] flex flex-col min-h-screen">
      <HeroSection />
      <ExploreSection />
    </main>
  );
}
