import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Heart, 
  Award, 
  Users, 
  Shield, 
  Lightbulb,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { useState } from "react";
import AuthDialog from "./AuthDialog";

const About = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<"login" | "signup">("signup");
  const stats = [
    { number: "10K+", label: "Active Users", icon: <Users className="h-5 w-5" /> },
    { number: "95%", label: "Adherence Rate", icon: <Target className="h-5 w-5" /> },
    { number: "24/7", label: "Support Available", icon: <Shield className="h-5 w-5" /> },
    { number: "99.9%", label: "Uptime Guarantee", icon: <Award className="h-5 w-5" /> }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      expertise: "Internal Medicine & Digital Health",
      description: "15+ years of clinical experience in medication management"
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer", 
      expertise: "Healthcare Technology & Security",
      description: "Former lead engineer at major healthcare tech companies"
    },
    {
      name: "Emma Rodriguez",
      role: "Head of User Experience",
      expertise: "Healthcare UX & Accessibility",
      description: "Specialized in designing for elderly and disabled patients"
    }
  ];

  const values = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Patient-First",
      description: "Every decision is made with patient safety and wellbeing as our top priority"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy & Security",
      description: "Your health data is protected with military-grade encryption and HIPAA compliance"
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Innovation",
      description: "Continuously improving through cutting-edge technology and user feedback"
    }
  ];

  return (
    <section id="about" className="py-12 md:py-20 bg-gradient-to-b from-accent/5 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-primary/5 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-20 right-0 w-56 sm:w-80 h-56 sm:h-80 bg-secondary/5 rounded-full blur-3xl animate-float-medium"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl animate-float-fast opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
            About
            <span className="text-primary"> Medalert</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
            We're on a mission to eliminate medication errors and improve health outcomes 
            through intelligent technology and compassionate design.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-10 md:mb-16 border border-primary/20 shadow-lg relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 sm:w-60 h-40 sm:h-60 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 sm:w-60 h-40 sm:h-60 bg-secondary/10 rounded-full blur-3xl"></div>
          
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center relative z-10">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3 md:mb-4">
                <Heart className="h-3 w-3 mr-1 animate-pulse" />
                OUR PURPOSE
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 md:mb-6">Our Mission</h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 md:mb-6">
                Founded by healthcare professionals and technology experts, Medalert was created 
                to address the critical challenge of medication adherence. With over 125,000 
                medication-related deaths annually in the US alone, we believe technology can 
                save lives through better medication management.
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20 transition-colors duration-300">
                  Est. 2023
                </Badge>
                <Badge variant="outline" className="border-primary/20 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300">
                  Healthcare Technology
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 mt-6 lg:mt-0">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center bg-card/50 border border-primary/10 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex justify-center mb-2 sm:mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="text-primary group-hover:text-secondary transition-colors duration-300">
                          {stat.icon}
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-1 sm:mb-2">{stat.number}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-10 md:mb-16">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3 md:mb-4">
              <Shield className="h-3 w-3 mr-1" />
              GUIDING PRINCIPLES
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-3 md:mb-4">Our Core Values</h3>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              These core principles guide everything we do at MedAlert, from product development 
              to customer support.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-card/50 border border-primary/10 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-2 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:shadow-md transition-all duration-300 mx-auto mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-300">{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-10 md:mb-16">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium mb-3 md:mb-4">
              <Users className="h-3 w-3 mr-1" />
              LEADERSHIP
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-3 md:mb-4">Our Team</h3>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Led by experts in healthcare and technology, our team is dedicated to creating 
              solutions that make medication management simple, safe, and effective.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-card/50 border border-primary/10 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-2 relative z-10">
                  <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-4"></div>
                  <CardTitle className="text-xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-300">{member.name}</CardTitle>
                  <Badge variant="secondary" className="mt-2 w-fit bg-secondary/10 text-secondary border-secondary/20 group-hover:bg-secondary/20 transition-colors duration-300">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-sm font-medium text-primary mb-3">{member.expertise}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-card rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-primary/10 hover:shadow-xl hover:border-primary/20 transition-all duration-300">
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium mb-3 md:mb-4">
              <Mail className="h-3 w-3 mr-1" />
              GET IN TOUCH
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-3 md:mb-4">Contact Us</h3>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Have questions about MedAlert or need support? Our team is here to help 
              you every step of the way.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="flex flex-col items-center text-center p-3 sm:p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-primary mb-3 sm:mb-4 hover:scale-110 hover:shadow-md transition-all duration-300">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <h4 className="font-medium text-base sm:text-lg mb-1 sm:mb-2">Email Support</h4>
              <p className="text-muted-foreground text-sm sm:text-base">support@medalert.com</p>
              <Button variant="ghost" size="sm" className="mt-3 sm:mt-4 text-primary hover:bg-primary/10 hover:text-primary transition-all duration-300">
                Send Message
              </Button>
            </div>
            
            <div className="flex flex-col items-center text-center p-3 sm:p-4 rounded-xl bg-secondary/5 hover:bg-secondary/10 transition-colors duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-secondary mb-3 sm:mb-4 hover:scale-110 hover:shadow-md transition-all duration-300">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <h4 className="font-medium text-base sm:text-lg mb-1 sm:mb-2">24/7 Hotline</h4>
              <p className="text-muted-foreground text-sm sm:text-base">1-800-MEDALERT</p>
              <Button variant="ghost" size="sm" className="mt-3 sm:mt-4 text-secondary hover:bg-secondary/10 hover:text-secondary transition-all duration-300">
                Call Now
              </Button>
            </div>
            
            <div className="flex flex-col items-center text-center p-3 sm:p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-primary mb-3 sm:mb-4 hover:scale-110 hover:shadow-md transition-all duration-300">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <h4 className="font-medium text-base sm:text-lg mb-1 sm:mb-2">Headquarters</h4>
              <p className="text-muted-foreground text-sm sm:text-base">San Francisco, CA</p>
              <Button variant="ghost" size="sm" className="mt-3 sm:mt-4 text-primary hover:bg-primary/10 hover:text-primary transition-all duration-300">
                Get Directions
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Ready to Get Started?</h4>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 px-2">
              Join our community and take control of your medication management today.
            </p>
            <Button 
              onClick={() => {
                setAuthDialogTab("signup");
                setAuthDialogOpen(true);
              }}
              size="default"
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-hover transition-all duration-300 text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6"
            >
              Try MedAlert Now
            </Button>
            
            {/* Auth Dialog */}
            <AuthDialog 
              isOpen={authDialogOpen} 
              onClose={() => setAuthDialogOpen(false)} 
              defaultTab={authDialogTab}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;