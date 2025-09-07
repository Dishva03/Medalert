import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Bell, Pill, Stethoscope, Heart } from "lucide-react";
import heroImage from "@/assets/hero-medication.jpg";
import { useToast } from "@/hooks/use-toast";
import BackgroundAnimation from "./BackgroundAnimation";
import { useState } from "react";
import AuthDialog from "./AuthDialog";

const Hero = () => {
  const { toast } = useToast();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<"login" | "signup">("signup");

  const handleGetStarted = () => {
    setAuthDialogTab("signup");
    setAuthDialogOpen(true);
  };

  const handleLearnMore = () => {
    toast({
      title: "Learn More",
      description: "Detailed information coming soon!",
    });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/30 to-primary/10 overflow-hidden">
      <BackgroundAnimation />
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-xl -z-10"></div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                  Never Miss Your
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">Medication</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary/80">Again</span>
                </h1>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                MedAlert helps patients with complex prescriptions manage and remember their medication schedules with smart reminders and easy tracking.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                size="default" 
                onClick={handleGetStarted}
                className="group bg-gradient-to-r from-primary to-secondary hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-md relative overflow-hidden w-full sm:w-auto text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center">Try MedAlert Now
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button 
                variant="outline" 
                size="default" 
                onClick={handleLearnMore}
                className="border-primary/30 hover:bg-accent/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-md w-full sm:w-auto text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6"
              >
                Learn More
              </Button>
            </div>

            {/* Features */}
            
            {/* Auth Dialog */}
            <AuthDialog 
              isOpen={authDialogOpen} 
              onClose={() => setAuthDialogOpen(false)} 
              defaultTab={authDialogTab}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 pt-4 sm:pt-6 md:pt-8">
              <div className="flex items-center space-x-2 sm:space-x-3 group hover:transform hover:scale-105 transition-all duration-300 p-2 sm:p-3 rounded-xl hover:bg-primary/5">
                <div className="flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-primary/20 to-primary/40 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300 shadow-md group-hover:shadow-lg">
                  <Shield className="h-5 sm:h-6 w-5 sm:w-6 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 text-sm sm:text-base">Secure</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">HIPAA compliant</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-3 group hover:transform hover:scale-105 transition-all duration-300 p-2 sm:p-3 rounded-xl hover:bg-secondary/5">
                <div className="flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-secondary/20 to-secondary/40 rounded-xl flex items-center justify-center group-hover:bg-secondary/30 transition-all duration-300 shadow-md group-hover:shadow-lg">
                  <Clock className="h-5 sm:h-6 w-5 sm:w-6 text-secondary group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors duration-300 text-sm sm:text-base">Scheduled</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Smart timing</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-3 group hover:transform hover:scale-105 transition-all duration-300 p-2 sm:p-3 rounded-xl hover:bg-primary/5">
                <div className="flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-primary/20 to-primary/40 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300 shadow-md group-hover:shadow-lg">
                  <Bell className="h-5 sm:h-6 w-5 sm:w-6 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 text-sm sm:text-base">Reminders</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Never forget</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative mx-auto max-w-md sm:max-w-lg lg:max-w-none mt-8 lg:mt-0">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500 group">
              <img 
                src={heroImage} 
                alt="Medication management dashboard"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl -z-10 animate-pulse"></div>
            
            {/* Floating medical icons - responsive positioning */}
            <div className="absolute -top-4 sm:-top-6 lg:-top-8 right-0 sm:-right-4 lg:-right-8 w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-primary/10 rounded-full flex items-center justify-center animate-float-slow">
              <Pill className="h-5 sm:h-6 lg:h-7 w-5 sm:w-6 lg:w-7 text-primary/60" />
            </div>
            <div className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-8 -left-4 sm:-left-6 lg:-left-8 w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 bg-secondary/10 rounded-full flex items-center justify-center animate-float-medium">
              <Heart className="h-4 sm:h-5 lg:h-6 w-4 sm:w-5 lg:w-6 text-secondary/60" />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6 lg:-right-8 w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-primary/10 rounded-full flex items-center justify-center animate-float-fast">
              <Stethoscope className="h-3 sm:h-4 lg:h-5 w-3 sm:w-4 lg:w-5 text-primary/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;