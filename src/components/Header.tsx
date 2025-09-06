import { Button } from "@/components/ui/button";
import { Pill, Menu, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import AuthDialog from "@/components/AuthDialog";
import { useAuth } from "@/contexts/AuthContext";
import ProfileDropdown from "@/components/ProfileDropdown";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<"login" | "signup">("login");
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setIsMenuOpen(false);
    }
  };

  const handleSignIn = () => {
    setAuthDialogTab("login");
    setAuthDialogOpen(true);
  };

  const handleGetStarted = () => {
    setAuthDialogTab("signup");
    setAuthDialogOpen(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-md">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Medalert</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-foreground hover:text-primary transition-colors relative group"
              >
                Home
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </button>
              <button 
                onClick={() => scrollToSection('dashboard')} 
                className="text-foreground hover:text-primary transition-colors relative group"
              >
                Dashboard
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </button>
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-foreground hover:text-primary transition-colors relative group"
              >
                Features
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-foreground hover:text-primary transition-colors relative group"
              >
                About
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </button>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <ProfileDropdown />
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={handleSignIn}
                    className="text-foreground hover:text-primary transition-all duration-300 hover:bg-primary/10 border border-transparent hover:border-primary/20"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={handleGetStarted}
                    className="bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('home')} 
                  className="text-foreground hover:text-primary transition-colors text-left px-3 py-2 rounded-md hover:bg-primary/10"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('dashboard')} 
                  className="text-foreground hover:text-primary transition-colors text-left px-3 py-2 rounded-md hover:bg-primary/10"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="text-foreground hover:text-primary transition-colors text-left px-3 py-2 rounded-md hover:bg-primary/10"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-foreground hover:text-primary transition-colors text-left px-3 py-2 rounded-md hover:bg-primary/10"
                >
                  About
                </button>
                <div className="flex flex-col space-y-2 pt-4">
                  {isAuthenticated ? (
                    <div className="px-3">
                      <ProfileDropdown />
                    </div>
                  ) : (
                    <>
                      <Button 
                        variant="ghost" 
                        onClick={handleSignIn}
                        className="justify-start hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-300"
                      >
                        Sign In
                      </Button>
                      <Button 
                        onClick={handleGetStarted}
                        className="bg-gradient-to-r from-primary to-secondary shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Auth Dialog */}
      <AuthDialog 
        isOpen={authDialogOpen} 
        onClose={() => setAuthDialogOpen(false)} 
        defaultTab={authDialogTab}
      />
    </>
  );
};

export default Header;