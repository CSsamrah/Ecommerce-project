import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3">Loading...</p>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/sign" replace />;
  }

  // If role is specified and user's role doesn't match, redirect
  if (role && user.role !== role.toLowerCase()) {
    // Redirect based on user's actual role
    switch (user.role) {
      case 'admin':
        return <Navigate to="/adminAnalytics" replace />;
      case 'seller':
        return <Navigate to="/analytics" replace />;
      case 'buyer':
        return <Navigate to="/rentalAgreements" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // User is authenticated and has the correct role
  return children;
};

export default ProtectedRoute;