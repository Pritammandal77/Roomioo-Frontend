import FinalCTA from "@/components/landing/FinalCTA";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import WhyChooseUs from "@/components/landing/WhyChooseUs";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <WhyChooseUs />
      <FinalCTA/>
    </main>
  );
}
