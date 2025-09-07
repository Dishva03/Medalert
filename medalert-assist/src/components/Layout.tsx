import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { User, Settings, UserCircle } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WelcomeMessage } from "@/components/WelcomeMessage";

const Layout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex flex-wrap sm:flex-nowrap justify-between items-center">
          <Link to="/" className="text-lg sm:text-xl font-bold">
            MedAlert
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0 w-full sm:w-auto justify-end">
            <ThemeToggle size="sm" />
            {user && (
              <>
                <Button variant="ghost" size="sm" asChild className="text-xs sm:text-sm px-2 sm:px-3">
                  <Link to="/my-account" className="flex items-center gap-1 sm:gap-2">
                    <UserCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden xs:inline">My Account</span>
                    <span className="xs:hidden">Account</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="text-xs sm:text-sm px-2 sm:px-3">
                  <Link to="/profile" className="flex items-center gap-1 sm:gap-2">
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden xs:inline">Profile</span>
                    <span className="xs:hidden">Profile</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="text-xs sm:text-sm px-2 sm:px-3">
                  <Link to="/settings" className="flex items-center gap-1 sm:gap-2">
                    <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden xs:inline">Settings</span>
                    <span className="xs:hidden">Settings</span>
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <Outlet />
      </main>
      <WelcomeMessage />
    </div>
  );
};

export default Layout;