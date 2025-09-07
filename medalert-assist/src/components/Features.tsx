import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Calendar, 
  Shield, 
  Smartphone, 
  Clock, 
  BarChart3,
  Users,
  CheckCircle,
  AlertTriangle,
  Heart,
  ArrowRight
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Smart Reminders",
      description: "Intelligent notifications that adapt to your schedule and medication timing",
      benefits: ["Customizable alerts", "Snooze functionality", "Emergency contacts"],
      status: "Available"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Schedule Management",
      description: "Comprehensive medication scheduling with complex prescription support",
      benefits: ["Multi-dose tracking", "Refill reminders", "Doctor appointments"],
      status: "Available"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "HIPAA Compliant Security",
      description: "Bank-level encryption ensures your medical data stays private and secure",
      benefits: ["End-to-end encryption", "Secure cloud backup", "Privacy controls"],
      status: "Available"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile & Web Access",
      description: "Access your medication schedule anywhere with cross-platform synchronization",
      benefits: ["Offline mode", "Cloud sync", "Multiple devices"],
      status: "Available"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Health Analytics",
      description: "Track medication adherence and generate reports for healthcare providers",
      benefits: ["Adherence tracking", "Progress reports", "Trend analysis"],
      status: "Coming Soon"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Family Sharing",
      description: "Caregivers can monitor and assist with medication management remotely",
      benefits: ["Caregiver access", "Emergency alerts", "Shared calendars"],
      status: "Coming Soon"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Health Integration",
      description: "Connect with fitness trackers and health apps for comprehensive wellness",
      benefits: ["Device integration", "Vital signs", "Health trends"],
      status: "Coming Soon"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Medication Database",
      description: "Comprehensive drug interaction checker and medication information",
      benefits: ["Drug interactions", "Side effects", "Dosage guidance"],
      status: "Coming Soon"
    }
  ];

  return (
    <section id="features" className="py-12 md:py-20 bg-gradient-to-b from-background to-accent/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-10 -right-10 w-24 sm:w-40 h-24 sm:h-40 bg-primary/20 rounded-full animate-float-slow"></div>
        <div className="absolute top-1/4 -left-20 w-40 sm:w-60 h-40 sm:h-60 bg-secondary/20 rounded-full animate-float-medium"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 sm:w-20 h-16 sm:h-20 bg-primary/20 rounded-full animate-float-fast"></div>
        <div className="absolute -bottom-10 left-1/3 w-24 sm:w-32 h-24 sm:h-32 bg-secondary/20 rounded-full animate-float-medium"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-block mb-3 md:mb-4">
            <div className="px-3 sm:px-4 py-1 bg-primary/10 rounded-full text-primary font-medium text-xs sm:text-sm mb-3 sm:mb-4 animate-pulse-soft">
              POWERFUL FEATURES
            </div>
          </div>
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-xl -z-10"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
              Powerful Features for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Better Health Management</span>
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
            MedAlert combines cutting-edge technology with healthcare expertise to provide 
            a comprehensive medication management solution that grows with your needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-500 border border-primary/10 hover:border-primary/30 bg-card/80 backdrop-blur-sm hover:translate-y-[-5px]"
            >
              <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-md group-hover:shadow-lg">
                    <div className="scale-75 sm:scale-100">{feature.icon}</div>
                  </div>
                  <Badge 
                    variant={feature.status === "Available" ? "secondary" : "outline"}
                    className={feature.status === "Available" ? 
                      "bg-secondary/10 text-secondary border-secondary/20 animate-pulse-soft text-xs" : 
                      "bg-muted/50 text-muted-foreground border-muted/30 text-xs"}
                  >
                    {feature.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg sm:text-xl text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="px-4 sm:px-6 pb-6">
                <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="space-y-1 sm:space-y-2">
                  <h4 className="font-medium text-foreground text-xs sm:text-sm">Key Benefits:</h4>
                  <ul className="space-y-1 sm:space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-xs sm:text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                        <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-r from-primary to-secondary rounded-full mr-1.5 sm:mr-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-12 sm:mt-16 md:mt-20 relative overflow-hidden rounded-2xl sm:rounded-3xl">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 z-0"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-20 sm:w-40 h-20 sm:h-40 bg-primary/10 rounded-full blur-2xl sm:blur-3xl z-0 animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-30 sm:w-60 h-30 sm:h-60 bg-secondary/10 rounded-full blur-2xl sm:blur-3xl z-0 animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 sm:w-80 h-40 sm:h-80 bg-muted/10 rounded-full blur-2xl sm:blur-3xl z-0 animate-pulse-slow"></div>
          
          <div className="relative z-10 p-6 sm:p-8 md:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Ready to Experience MedAlert?
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
              Join thousands of patients who have improved their medication adherence and health outcomes with our intelligent reminder system.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <button 
                onClick={() => {
                  const dashboardSection = document.getElementById('dashboard');
                  if (dashboardSection) {
                    dashboardSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6 rounded-xl hover:scale-105 flex items-center justify-center gap-2 font-medium"
              >
                <span>Try Dashboard Demo</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="border-primary/20 hover:border-primary/40 hover:bg-primary/5 shadow-sm hover:shadow-md transition-all duration-300 text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6 bg-white/80 backdrop-blur-sm border text-primary rounded-xl hover:scale-105 font-medium"
              >
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;