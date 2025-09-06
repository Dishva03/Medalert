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
  Heart
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
    <section id="features" className="py-20 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Powerful Features for
            <span className="block text-primary">Better Health Management</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Medalert combines cutting-edge technology with healthcare expertise to provide 
            a comprehensive medication management solution that grows with your needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-hover transition-all duration-300 border-2 hover:border-primary/20 bg-card"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <Badge 
                    variant={feature.status === "Available" ? "secondary" : "outline"}
                    className={feature.status === "Available" ? "bg-secondary/10 text-secondary border-secondary/20" : ""}
                  >
                    {feature.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground text-sm">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Your Medication Management?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of patients who have improved their medication adherence and health outcomes with Medalert.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  const dashboardSection = document.getElementById('dashboard');
                  if (dashboardSection) {
                    dashboardSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-hover transition-all duration-300 font-medium"
              >
                Try Dashboard Demo
              </button>
              <button 
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-3 border border-primary/20 text-primary rounded-lg hover:bg-accent transition-all duration-300 font-medium"
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