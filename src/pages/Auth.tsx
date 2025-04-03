import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRedirectIfAuthenticated } from '@/hooks/useAuthCheck';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useLocation } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import EmailConfirmationHandler from '@/components/auth/EmailConfirmationHandler';
import { ArrowLeft } from 'lucide-react';

const Auth = () => {
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { isAuthenticated, loading: authCheckLoading } = useRedirectIfAuthenticated();
  
  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  // Check if this is an auth callback URL
  useEffect(() => {
    const hasAuthParams = 
      (location.hash && (location.hash.includes('access_token') || location.hash.includes('error'))) || 
      (location.search && (location.search.includes('access_token') || location.search.includes('error')));
    
    console.log('Checking for auth params:', { 
      hash: location.hash, 
      search: location.search,
      hasAuthParams 
    });
    
    setIsAuthenticating(hasAuthParams);
  }, [location]);

  // If we're handling authentication, don't show the form yet
  if (isAuthenticating) {
    console.log('Showing EmailConfirmationHandler because we detected auth params');
    return <EmailConfirmationHandler />;
  }

  // If already authenticated, the useRedirectIfAuthenticated hook will handle the redirect
  if (isAuthenticated) {
    return null;
  }

  // Show loading state while checking auth
  if (authCheckLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-ocean-600 border-b-ocean-600 border-r-transparent border-l-transparent border-2"></div>
          <p className="mt-4 text-resort-600">Checking authentication status...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto pt-20 px-4 pb-8"
    >
      <Link to="/" className="inline-flex items-center text-resort-600 hover:text-resort-800 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to home
      </Link>
      
      <Card className="p-6 shadow-lg border-resort-100">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-resort-800">Guest<span className="text-ocean-600">Flow AI</span></h1>
          <p className="text-resort-500 mt-1">Access your account</p>
        </div>
        
        <Tabs defaultValue="login">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <LoginForm onError={handleError} />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignupForm onError={handleError} />
          </TabsContent>
        </Tabs>
      </Card>
      
      <p className="text-center text-xs text-resort-500 mt-4">
        By continuing, you agree to GuestFlow AI's{' '}
        <Link to="/terms" className="text-ocean-600 hover:underline">Terms of Service</Link>{' '}
        and{' '}
        <Link to="/privacy" className="text-ocean-600 hover:underline">Privacy Policy</Link>
      </p>
    </motion.div>
  );
};

export default Auth;
