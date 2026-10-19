import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import EngineeringMindset from "@/components/sections/EngineeringMindset";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Dorm2VC from "@/components/sections/Dorm2VC";
import Achievements from "@/components/sections/Achievements";
import CurrentlyBuilding from "@/components/sections/CurrentlyBuilding";
import GithubActivity from "@/components/sections/GithubActivity";
import BeyondTheCode from "@/components/sections/BeyondTheCode";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <EngineeringMindset />
      <Skills />
      <Dorm2VC />
      <Experience />
      <Achievements />
      <CurrentlyBuilding />
      <GithubActivity />
      <BeyondTheCode />
      <Contact />
      <Footer />
    </>
  );
}
