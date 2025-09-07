import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { User, Settings, LogOut, Bell, Shield, Moon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MyAccount = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  // Get initials from email for avatar
  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">My Account</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4 mb-6">
                  <Avatar className="h-20 w-20 bg-gradient-to-br from-primary to-secondary text-white">
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Quick Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Moon className="h-4 w-4" />
                      <span>Dark Mode</span>
                    </div>
                    <Button variant="outline" size="sm">Toggle</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>Privacy</span>
                    </div>
                    <Button variant="outline" size="sm">Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Welcome to Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Manage your profile, preferences, and account settings from this dashboard.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-primary/5 border-primary/10 hover:bg-primary/10 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <User className="h-8 w-8 mb-4 text-primary" />
                    <h3 className="font-medium mb-2">Update Profile</h3>
                    <p className="text-sm text-muted-foreground">Edit your personal information and contact details</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-primary/5 border-primary/10 hover:bg-primary/10 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <Settings className="h-8 w-8 mb-4 text-primary" />
                    <h3 className="font-medium mb-2">Preferences</h3>
                    <p className="text-sm text-muted-foreground">Customize your app experience and notification settings</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-primary/5 border-primary/10 hover:bg-primary/10 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <Shield className="h-8 w-8 mb-4 text-primary" />
                    <h3 className="font-medium mb-2">Privacy & Security</h3>
                    <p className="text-sm text-muted-foreground">Manage your account security and privacy settings</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-primary/5 border-primary/10 hover:bg-primary/10 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <Bell className="h-8 w-8 mb-4 text-primary" />
                    <h3 className="font-medium mb-2">Notifications</h3>
                    <p className="text-sm text-muted-foreground">Configure how and when you receive alerts</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;