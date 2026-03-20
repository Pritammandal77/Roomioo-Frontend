import FAQ from "@/components/landing/FAQ";
import FeaturedListings from "@/components/landing/featuredListings";
import FinalCTA from "@/components/landing/FinalCTA";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import ProblemSolution from "@/components/landing/ProblemSolution";
import WhyChooseUs from "@/components/landing/WhyChooseUs";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <WhyChooseUs />
      <ProblemSolution />
      <FeaturedListings />
      <FinalCTA />
      <FAQ />
    </main>
  );
}
