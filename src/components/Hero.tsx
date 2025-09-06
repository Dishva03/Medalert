import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Bell } from "lucide-react";
import heroImage from "@/assets/hero-medication.jpg";
import { useToast } from "@/hooks/use-toast";

const Hero = () => {
  const { toast } = useToast();

  const handleGetStarted = () => {
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection) {
      dashboardSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = () => {
    toast({
      title: "Learn More",
      description: "Detailed information coming soon!",
    });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/30 to-primary/10">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Never Miss Your
                <span className="block text-primary">Medication</span>
                <span className="block text-secondary">Again</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Medalert helps patients with complex prescriptions manage and remember their medication schedules with smart reminders and easy tracking.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="group bg-gradient-to-r from-primary to-secondary hover:shadow-hover transition-all duration-300 shadow-md"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleLearnMore}
                className="border-primary/30 hover:bg-accent/50 hover:border-primary/50 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3 group hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300 shadow-sm">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">Secure</h3>
                  <p className="text-sm text-muted-foreground">HIPAA compliant</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center group-hover:bg-secondary/30 transition-colors duration-300 shadow-sm">
                  <Clock className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors duration-300">Scheduled</h3>
                  <p className="text-sm text-muted-foreground">Smart timing</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300 shadow-sm">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">Reminders</h3>
                  <p className="text-sm text-muted-foreground">Never forget</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Medication management dashboard"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;