import { Button } from "@/components/ui/button";
import { 
  Pill, 
  Menu, 
  X,
  Home,
  LayoutDashboard,
  Sparkles,
  Info 
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import AuthDialog from "@/components/AuthDialog";
import { useAuth } from "@/contexts/AuthContext";
import ProfileDropdown from "@/components/ProfileDropdown";
import NotificationBell from "@/components/NotificationBell";

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-primary/10 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">MedAlert</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-foreground hover:text-primary transition-colors relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
              </button>
              <button 
                onClick={() => scrollToSection('dashboard')} 
                className="text-foreground hover:text-primary transition-colors relative group"
              >
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
              </button>
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-foreground hover:text-primary transition-colors relative group"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-foreground hover:text-primary transition-colors relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
              </button>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <NotificationBell />
                  <ProfileDropdown />
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={handleSignIn}
                    className="text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300 rounded-lg"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={handleGetStarted}
                    className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-lg relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/80 to-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10">Try MedAlert Now</span>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300 border border-transparent hover:border-primary/20"
              >
                {isMenuOpen ? 
                  <X className="h-6 w-6 text-primary" /> : 
                  <Menu className="h-6 w-6 hover:scale-110 transition-transform duration-300" />
                }
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-md border-b border-primary/10 shadow-lg z-50">
              <div className="container mx-auto px-6 py-6 flex flex-col space-y-5">
                <button 
                  onClick={() => {
                    scrollToSection('home');
                    setIsMenuOpen(false);
                  }} 
                  className="text-foreground hover:text-primary transition-all duration-300 py-2 px-4 rounded-lg hover:bg-primary/5 flex items-center space-x-3"
                >
                  <Home className="h-5 w-5 text-primary" />
                  <span>Home</span>
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('dashboard');
                    setIsMenuOpen(false);
                  }} 
                  className="text-foreground hover:text-primary transition-all duration-300 py-2 px-4 rounded-lg hover:bg-primary/5 flex items-center space-x-3"
                >
                  <LayoutDashboard className="h-5 w-5 text-primary" />
                  <span>Dashboard</span>
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('features');
                    setIsMenuOpen(false);
                  }} 
                  className="text-foreground hover:text-primary transition-all duration-300 py-2 px-4 rounded-lg hover:bg-primary/5 flex items-center space-x-3"
                >
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>Features</span>
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('about');
                    setIsMenuOpen(false);
                  }} 
                  className="text-foreground hover:text-primary transition-all duration-300 py-2 px-4 rounded-lg hover:bg-primary/5 flex items-center space-x-3"
                >
                  <Info className="h-5 w-5 text-primary" />
                  <span>About</span>
                </button>
                
                {/* Mobile Actions */}
                <div className="pt-5 mt-2 border-t border-primary/10 flex flex-col space-y-4">
                  {isAuthenticated ? (
                    <div className="flex items-center justify-between">
                      <NotificationBell />
                      <ProfileDropdown />
                    </div>
                  ) : (
                    <>
                      <Button 
                        variant="ghost" 
                        onClick={() => {
                          handleSignIn();
                          setIsMenuOpen(false);
                        }}
                        className="w-full justify-center text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300 rounded-lg border border-transparent hover:border-primary/20"
                      >
                        Sign In
                      </Button>
                      <Button 
                        onClick={() => {
                          handleGetStarted();
                          setIsMenuOpen(false);
                        }}
                        className="w-full justify-center bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl transition-all duration-300 rounded-lg relative overflow-hidden group"
                      >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/80 to-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative z-10">Try MedAlert Now</span>
                      </Button>
                    </>
                  )}
                </div>
              </div>
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