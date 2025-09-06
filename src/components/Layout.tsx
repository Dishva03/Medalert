import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { User, Settings, UserCircle } from "lucide-react";

const Layout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            MedAlert Assist
          </Link>
          <nav className="flex items-center gap-4">
            {user && (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/my-account" className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4" />
                    My Account
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;