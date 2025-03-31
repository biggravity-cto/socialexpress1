
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRedirectIfAuthenticated } from '@/hooks/useAuthCheck';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import EmailConfirmationHandler from '@/components/auth/EmailConfirmationHandler';

const Auth = () => {
  useRedirectIfAuthenticated();
  const [error, setError] = useState<string | null>(null);
  
  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto pt-20 px-4"
    >
      {/* Handle email confirmation redirects */}
      <EmailConfirmationHandler />
      
      <Card className="p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-resort-800">BG Social Express</h1>
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
    </motion.div>
  );
};

export default Auth;
