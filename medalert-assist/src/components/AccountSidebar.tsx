import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { User, Settings, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const AccountSidebar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  // Get initials from email for avatar
  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border p-4 w-full">
      <div className="flex flex-col items-center space-y-4 mb-6">
        <Avatar className="h-16 w-16 bg-gradient-to-br from-primary to-secondary text-white">
          <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h3 className="font-medium">{user.name || user.email}</h3>
          {user.name && <p className="text-sm text-muted-foreground">{user.email}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Link to="/profile" className="w-full">
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </Link>
        <Link to="/settings" className="w-full">
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" 
          size="sm"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  );
};

export default AccountSidebar;