import FAQ from "@/components/landing/FAQ";
import FeaturedListings from "@/components/landing/featuredListings";
import FinalCTA from "@/components/landing/FinalCTA";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import ProblemSolution from "@/components/landing/ProblemSolution";
import Testimonials from "@/components/landing/Testimonials";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import Footer from "@/components/shared/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* <ProblemSolution />  */}
      <HowItWorks /> 
      <WhyChooseUs /> 
      <Testimonials /> 
      <FeaturedListings /> 
      <FAQ /> 
      <FinalCTA /> 
      <Footer />
    </main>
  );
}
