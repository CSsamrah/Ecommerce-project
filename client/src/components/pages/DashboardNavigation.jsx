import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const DashboardNavigation = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
      if (loading) return; // Wait until auth state is loaded
      
      if (!user) {
          navigate('/sign');
          return;
      }
      
      // Redirect based on user role
      switch (user.role?.toLowerCase()) {
          case 'admin':
              navigate('/adminAnalytics');
              break;
          case 'seller':
              navigate('/analytics');
              break;
          case 'buyer':
              navigate('/orderhistory');
              break;
          default:
              navigate('/sign');
      }
  }, [user, loading, navigate]);
  
  return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <h2>Loading dashboard...</h2>
      </div>
  );
};

export default DashboardNavigation;