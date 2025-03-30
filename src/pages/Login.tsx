
import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';

const Login = () => {
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
          <p className="text-resort-500 mt-2">Sign in to access your account</p>
        </div>
        
        <Card className="p-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-ocean-600 hover:text-ocean-700">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm text-resort-600">Remember me</Label>
            </div>
            
            <Button type="submit" className="w-full bg-ocean-600 hover:bg-ocean-700">
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-resort-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-ocean-600 hover:text-ocean-700">
                Create an account
              </Link>
            </p>
          </div>
        </Card>
        
        <div className="text-center mt-8">
          <p className="text-xs text-resort-500">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-ocean-600 hover:text-ocean-700">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-ocean-600 hover:text-ocean-700">
              Privacy Policy
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
