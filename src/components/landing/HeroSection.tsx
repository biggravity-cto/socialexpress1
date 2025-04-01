
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, BrainCircuit, Calendar, MessageSquare, BarChart3, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  scrollToFeatures: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToFeatures }) => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Here you would typically submit to your backend
    toast.success('Thank you for your interest! We\'ll be in touch soon.');
    setEmail('');
  };

  return (
    <div className="relative pt-28 pb-20 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-ocean-50/50 to-white">
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-ocean-100 text-ocean-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              AI Marketing Automation for Luxury Hospitality
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight">
              The AI Marketing & Sales Platform for Hospitality Resorts
            </h1>
            <p className="text-xl text-slate-600 mb-6">
              Delight Guests • Increase Revenue • Enhance Efficiency
            </p>
            <p className="text-lg text-slate-600 mb-8 mx-auto max-w-2xl">
              Our comprehensive AI-powered marketing platform helps premium resorts attract high-value guests while streamlining operations across all channels.
            </p>
            
            <div className="max-w-md mx-auto mb-10">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="h-12 rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Link to="/auth">
                  <Button 
                    type="button" 
                    size="lg" 
                    className="bg-ocean-600 hover:bg-ocean-700 h-12 px-6 rounded-lg w-full sm:w-auto"
                  >
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </form>
            </div>
            
            <Button variant="outline" size="lg" onClick={scrollToFeatures} className="py-6 rounded-xl mb-12">
              Explore Features
            </Button>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="flex flex-col items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                <div className="bg-ocean-50 p-2 rounded-md">
                  <BrainCircuit className="h-5 w-5 text-ocean-600" />
                </div>
                <span className="text-slate-700 font-medium text-center">AI Strategy & Content</span>
              </div>
              <div className="flex flex-col items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                <div className="bg-purple-50 p-2 rounded-md">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-slate-700 font-medium text-center">Omnichannel Marketing</span>
              </div>
              <div className="flex flex-col items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                <div className="bg-amber-50 p-2 rounded-md">
                  <MessageSquare className="h-5 w-5 text-amber-600" />
                </div>
                <span className="text-slate-700 font-medium text-center">Premium Guest Acquisition</span>
              </div>
              <div className="flex flex-col items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                <div className="bg-green-50 p-2 rounded-md">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-slate-700 font-medium text-center">Revenue Optimization</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/3 bg-gradient-to-bl from-ocean-100 to-transparent opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-gradient-to-tr from-resort-100 to-transparent opacity-30 blur-3xl"></div>
    </div>
  );
};

export default HeroSection;
