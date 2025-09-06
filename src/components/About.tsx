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

const About = () => {
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
    <section id="about" className="py-20 bg-gradient-to-b from-accent/5 to-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About
            <span className="text-primary"> Medalert</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're on a mission to eliminate medication errors and improve health outcomes 
            through intelligent technology and compassionate design.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12 mb-16 border border-primary/10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">Our Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Founded by healthcare professionals and technology experts, Medalert was created 
                to address the critical challenge of medication adherence. With over 125,000 
                medication-related deaths annually in the US alone, we believe technology can 
                save lives through better medication management.
              </p>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
                  Est. 2023
                </Badge>
                <Badge variant="outline" className="border-primary/20">
                  Healthcare Technology
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center bg-card/50 border border-primary/10">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-2 text-primary">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">Our Core Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-hover transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">Leadership Team</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="hover:shadow-hover transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <CardTitle className="text-xl text-center">{member.name}</CardTitle>
                  <p className="text-primary text-center font-medium">{member.role}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="outline" className="mb-3 border-primary/20">
                    {member.expertise}
                  </Badge>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-card rounded-2xl p-8 border border-primary/10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">Get in Touch</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Have questions about Medalert or need support? Our team is here to help 
                you every step of the way.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Email Support</div>
                    <div className="text-muted-foreground">support@medalert.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">24/7 Hotline</div>
                    <div className="text-muted-foreground">1-800-MEDALERT</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Headquarters</div>
                    <div className="text-muted-foreground">San Francisco, CA</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="text-xl font-bold text-foreground mb-4">Ready to Get Started?</h4>
              <p className="text-muted-foreground mb-6">
                Join our community and take control of your medication management today.
              </p>
              <Button 
                onClick={() => {
                  const dashboardSection = document.getElementById('dashboard');
                  if (dashboardSection) {
                    dashboardSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:shadow-hover transition-all duration-300"
              >
                Try Medalert Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;