
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';

const FinalCtaSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-gray-50 text-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 font-display leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Ready to transform your digital strategy?
          </h2>
          
          <Button 
            size="lg"
            className="bg-gradient-to-r from-brand-green to-brand-secondary hover:opacity-90 text-gray-900 px-8 py-6 h-auto text-lg shadow-md group"
          >
            <CalendarIcon className="mr-2 h-5 w-5 group-hover:animate-pulse" />
            Book a Strategy Call
          </Button>
          
          <p className="mt-4 text-gray-600">30-min complimentary strategy call</p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
