import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import MyAccountComponent from '@/components/MyAccount';

const MyAccount = () => {
  const { isAuthenticated } = useAuth();

  // Redirect to home if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <MyAccountComponent />;
};

export default MyAccount;