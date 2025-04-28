
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';

const FinalCtaSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 font-display leading-tight bg-gradient-to-r from-white via-ocean-200 to-white bg-clip-text text-transparent">
            Ready to fill your rooms and tables with high-value guests?
          </h2>
          
          <Button 
            size="lg"
            className="bg-gradient-to-r from-ocean-600 to-ocean-500 hover:from-ocean-500 hover:to-ocean-400 px-8 py-6 h-auto text-lg group"
          >
            <CalendarIcon className="mr-2 h-5 w-5 group-hover:animate-pulse" />
            Show Me My Growth Plan
          </Button>
          
          <p className="mt-4 text-gray-300">30-min complimentary strategy call</p>
        </motion.div>
        
        {/* World map with campaign footprints */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden border border-ocean-700/30">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
              alt="World map showing BigGravity's global presence"
              className="w-full opacity-40"
            />
            
            {/* Location dots */}
            <div className="absolute top-[30%] left-[22%] h-3 w-3 bg-ocean-400 rounded-full animate-ping"></div>
            <div className="absolute top-[40%] left-[80%] h-3 w-3 bg-ocean-400 rounded-full animate-ping animation-delay-300"></div>
            <div className="absolute top-[35%] left-[50%] h-3 w-3 bg-ocean-400 rounded-full animate-ping animation-delay-700"></div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Our campaigns span 20+ countries with specialized focus on high-yield APAC markets
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
