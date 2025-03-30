
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const useAuthCheck = (redirectTo: string = '/login') => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate(redirectTo);
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [user, loading, navigate, redirectTo]);

  return { isAuthenticated, loading };
};

export const useRedirectIfAuthenticated = (redirectTo: string = '/dashboard') => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate(redirectTo);
    }
  }, [user, loading, navigate, redirectTo]);

  return { isAuthenticated: !!user, loading };
};
