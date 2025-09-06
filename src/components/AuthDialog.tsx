import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup";
}

const AuthDialog = ({ isOpen, onClose, defaultTab = "login" }: AuthDialogProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const { toast } = useToast();

  // Generate a random CAPTCHA code
  const generateCaptcha = () => {
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptchaCode(result);
    setCaptchaValue(""); // Reset user input when generating new CAPTCHA
  };

  // Generate CAPTCHA on component mount and tab change
  React.useEffect(() => {
    generateCaptcha();
  }, [activeTab]);

  const handleTabChange = (value: "login" | "signup") => {
    setActiveTab(value);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setCaptchaValue("");
    generateCaptcha();
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const { login } = useAuth();

  const handleLogin = () => {
    // Validate form
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (captchaValue !== captchaCode) {
      toast({
        title: "Error",
        description: "CAPTCHA verification failed",
        variant: "destructive",
      });
      generateCaptcha();
      return;
    }

    // Login user
    login(email);
    toast({
      title: "Success",
      description: "You have successfully logged in",
    });
    onClose();
  };

  const { signup } = useAuth();

  const handleSignup = () => {
    // Validate form
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }

    if (captchaValue !== captchaCode) {
      toast({
        title: "Error",
        description: "CAPTCHA verification failed",
        variant: "destructive",
      });
      generateCaptcha();
      return;
    }

    // Sign up user
    signup(email);
    toast({
      title: "Success",
      description: "Account created successfully",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            {activeTab === "login" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {activeTab === "login"
              ? "Sign in to access your medication dashboard"
              : "Sign up to start managing your medications"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={handleTabChange as (value: string) => void} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-login">Email</Label>
              <Input
                id="email-login"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password-login">Password</Label>
                <Button variant="link" className="p-0 h-auto text-xs">
                  Forgot password?
                </Button>
              </div>
              <Input
                id="password-login"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* CAPTCHA */}
            <div className="space-y-2">
              <Label htmlFor="captcha-login">CAPTCHA Verification</Label>
              <div className="flex items-center space-x-2">
                <div className="bg-accent/50 p-2 rounded-md font-mono text-lg tracking-wider select-none">
                  {captchaCode}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={generateCaptcha}
                  type="button"
                  className="flex-shrink-0"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <Input
                id="captcha-login"
                placeholder="Enter the code above"
                value={captchaValue}
                onChange={(e) => setCaptchaValue(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <label
                htmlFor="remember-me"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>

            <Button className="w-full bg-gradient-to-r from-primary to-secondary" onClick={handleLogin}>
              Sign In
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-signup">Email</Label>
              <Input
                id="email-signup"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-signup">Password</Label>
              <Input
                id="password-signup"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* CAPTCHA */}
            <div className="space-y-2">
              <Label htmlFor="captcha-signup">CAPTCHA Verification</Label>
              <div className="flex items-center space-x-2">
                <div className="bg-accent/50 p-2 rounded-md font-mono text-lg tracking-wider select-none">
                  {captchaCode}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={generateCaptcha}
                  type="button"
                  className="flex-shrink-0"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <Input
                id="captcha-signup"
                placeholder="Enter the code above"
                value={captchaValue}
                onChange={(e) => setCaptchaValue(e.target.value)}
              />
            </div>

            <Button className="w-full bg-gradient-to-r from-primary to-secondary" onClick={handleSignup}>
              Create Account
            </Button>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2">
          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;