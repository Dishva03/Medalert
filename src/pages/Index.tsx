import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MedicationDashboard from "@/components/MedicationDashboard";
import Features from "@/components/Features";
import About from "@/components/About";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <Header />
      <main>
        <Hero />
        <MedicationDashboard />
        <Features />
        <About />
      </main>
      <Toaster />
    </div>
  );
};

export default Index;
