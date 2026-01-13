"use client";

import { navItems } from "@/data";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import BestFit from "@/components/BestFit";
import ContactModal from "@/components/ContactModal";
import { useState } from "react";

import GlobeSection from "@/components/GlobeSection";
import Certifications from "@/components/Certifications";

const Home = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <GlobeSection />
        <RecentProjects />
        <Certifications />
        <Clients />
        <Experience />
        <Approach />
        <BestFit />
        <Footer onContactPress={() => setIsContactOpen(true)} />
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      </div>
    </main>
  );
};

export default Home;
