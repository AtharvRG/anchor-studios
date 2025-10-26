import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import WhyAnchorSection from "@/components/WhyAnchorSection";
import HireMeSection from "@/components/HireMeSection";
import SocialsSection from "@/components/SocialsSection";
import SectionObserver from "@/components/SectionObserver";

export default function Home() {
  return (
    <>
      <SectionObserver sectionId="home">
        <HeroSection />
      </SectionObserver>

      {/* This component now handles its own hash */}
      <ProjectsSection />

      <div className="h-[50vh]" />

      {/* This component also handles its own hash */}
      <WhyAnchorSection />
      
      {/* And this one too */}
      <HireMeSection />
      
      {/* The observer is still great for the final, simple section */}
      <SectionObserver sectionId="socials">
        <SocialsSection />
      </SectionObserver>
    </>
  );
}