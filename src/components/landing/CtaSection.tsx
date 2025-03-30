
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle } from 'lucide-react';

const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-resort-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-5xl mx-auto bg-gradient-to-r from-ocean-600 to-ocean-700 rounded-2xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="p-12 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Transform Your Resort's Social Media Strategy</h2>
                <p className="text-lg text-ocean-100 mb-8">
                  Join hundreds of hospitality brands already using our platform to boost engagement, save time, and increase bookings.
                </p>
                
                <ul className="space-y-3 mb-8">
                  {[
                    'AI-powered content creation',
                    'Multi-channel publishing',
                    'Engagement analytics',
                    'Unified social inbox',
                    'Content approval workflows'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-white">
                      <CheckCircle className="h-5 w-5 mr-2 text-resort-200" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/login">
                    <Button className="bg-white text-ocean-700 hover:bg-ocean-50 px-6 py-5 rounded-lg text-lg w-full sm:w-auto">
                      Start Free Trial <ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button variant="outline" className="border-ocean-300 text-white hover:bg-ocean-500 px-6 py-5 rounded-lg text-lg w-full sm:w-auto">
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="hidden md:block">
                <div className="bg-ocean-500/30 p-6 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-10 w-10 text-white mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">Smart Scheduling</h3>
                      <p className="text-ocean-100">Post at the perfect time to maximize engagement</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4 mb-4">
                    <div className="h-4 w-2/3 bg-white/20 rounded mb-3"></div>
                    <div className="h-4 w-3/4 bg-white/20 rounded mb-3"></div>
                    <div className="h-4 w-1/2 bg-white/20 rounded"></div>
                  </div>
                  
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 6, 7].map(day => (
                      <div key={day} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white text-sm">
                        {day}
                      </div>
                    ))}
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
