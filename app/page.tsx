"use client";

import { navItems } from "@/data";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <RecentProjects />
        <Certifications />
        <Testimonials />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
