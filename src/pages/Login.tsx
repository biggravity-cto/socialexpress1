
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import GlassPanel from '@/components/ui/GlassPanel';
import { ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success!",
      description: "You are now being redirected to the dashboard.",
    });
    // In a real app, we would authenticate here
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-resort-50 to-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="mb-8 text-center">
          <Link to="/" className="inline-block">
            <span className="font-bold text-xl tracking-tight text-resort-800">Resort<span className="text-ocean-600">Flux</span></span>
          </Link>
        </div>
        
        <GlassPanel className="p-8">
          <h1 className="text-2xl font-bold text-resort-800 mb-6 text-center">Welcome Back</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-resort-700 mb-1">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-resort-700 mb-1">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="pt-2">
              <Button className="w-full bg-ocean-600 hover:bg-ocean-700 text-white">
                Log in
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-sm text-center">
            <a href="#" className="text-ocean-600 hover:text-ocean-700">Forgot password?</a>
          </div>
        </GlassPanel>
        
        <div className="mt-8 text-center">
          <Link to="/" className="inline-flex items-center text-resort-600 hover:text-resort-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
