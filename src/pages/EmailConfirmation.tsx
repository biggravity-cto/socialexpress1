
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import EmailConfirmationHeader from '@/components/auth/EmailConfirmationHeader';
import ResendEmailForm from '@/components/auth/ResendEmailForm';

const EmailConfirmation = () => {
  const [error, setError] = useState<string | null>(null);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-resort-800">BG Social<span className="text-ocean-600">Express</span></h1>
          <p className="text-resort-500 mt-2">Thank you for signing up!</p>
        </div>
        
        <Card className="p-6">
          <EmailConfirmationHeader />
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-resort-500 mb-4 text-center">
              Didn't receive an email? Enter your email below to request a new confirmation link.
            </p>
            
            <ResendEmailForm onError={handleError} />
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default EmailConfirmation;
