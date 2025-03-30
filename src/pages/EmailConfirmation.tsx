
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Mail } from 'lucide-react';

const EmailConfirmation = () => {
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
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Mail className="h-10 w-10 text-green-600" />
            </div>
            
            <h2 className="text-xl font-semibold text-resort-800">
              Check your email
            </h2>
            
            <p className="text-resort-500">
              We've sent a confirmation link to your email address. Please check your inbox and click the link to activate your account.
            </p>
            
            <div className="w-full pt-4 border-t border-gray-100 mt-4">
              <div className="flex items-center justify-center gap-2 text-sm text-resort-500">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>A confirmation email has been sent</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-resort-500 mb-4 text-center">
              Didn't receive an email? Check your spam folder or request a new confirmation link.
            </p>
            <Link to="/auth" className="w-full">
              <Button variant="outline" className="w-full">
                Back to Login
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default EmailConfirmation;
