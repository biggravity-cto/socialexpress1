
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle, BrainCircuit, MessageSquare } from 'lucide-react';

const CtaSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-6xl mx-auto bg-gradient-to-r from-ocean-600 to-ocean-700 rounded-3xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="p-12 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Ready to Transform Your Resort's Social Media Strategy?
                </h2>
                <p className="text-lg text-ocean-100 mb-8">
                  Join hundreds of hospitality brands already using our platform to boost engagement, save time, and increase bookings directly from social media.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    'AI-powered content creation and ideas',
                    'Time-saving scheduling and automation',
                    'Comprehensive engagement analytics',
                    'Centralized social inbox for better service',
                    'Team collaboration and approvals'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-white">
                      <CheckCircle className="h-5 w-5 mr-3 text-resort-200 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/login">
                    <Button className="bg-white text-ocean-700 hover:bg-ocean-50 px-6 py-5 rounded-xl text-lg w-full sm:w-auto shadow-lg">
                      Start Free Trial <ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="border-ocean-300 text-white hover:bg-ocean-500 px-6 py-5 rounded-xl text-lg w-full sm:w-auto">
                      Schedule Demo
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="hidden md:block">
                <div className="bg-ocean-500/30 p-8 rounded-2xl backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 p-5 rounded-xl backdrop-blur-sm">
                      <BrainCircuit className="h-10 w-10 text-white mb-3" />
                      <h3 className="text-xl font-semibold text-white mb-1">AI Content</h3>
                      <p className="text-ocean-100">Generate captivating posts with just a few clicks</p>
                    </div>
                    
                    <div className="bg-white/10 p-5 rounded-xl backdrop-blur-sm">
                      <Calendar className="h-10 w-10 text-white mb-3" />
                      <h3 className="text-xl font-semibold text-white mb-1">Smart Scheduler</h3>
                      <p className="text-ocean-100">Post at optimal times for maximum engagement</p>
                    </div>
                    
                    <div className="bg-white/10 p-5 rounded-xl backdrop-blur-sm">
                      <MessageSquare className="h-10 w-10 text-white mb-3" />
                      <h3 className="text-xl font-semibold text-white mb-1">Unified Inbox</h3>
                      <p className="text-ocean-100">Respond to all messages from one place</p>
                    </div>
                    
                    <div className="bg-white/10 p-5 rounded-xl backdrop-blur-sm">
                      <div className="h-10 w-10 flex items-center justify-center bg-white/20 rounded-lg mb-3">
                        <span className="text-white font-bold text-lg">+8</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-1">More Features</h3>
                      <p className="text-ocean-100">Discover all our powerful tools</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
