
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FinalCtaSection: React.FC = () => {
  const navigate = useNavigate();

  const handleBookCallClick = () => {
    navigate('/book-call');
  };

  return (
    <section className="py-20 lg:py-28 bg-space-dark text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 font-display leading-tight text-gradient-space">
            Ready to transform your digital strategy?
          </h2>
          
          <Button 
            size="lg"
            className="bg-gradient-to-r from-brand-green to-brand-primary hover:opacity-90 text-space-dark px-8 py-6 h-auto text-lg shadow-glow group"
            onClick={handleBookCallClick}
          >
            <CalendarIcon className="mr-2 h-5 w-5 group-hover:animate-pulse" />
            Book a Strategy Call
          </Button>
          
          <p className="mt-4 text-gray-400">30-min complimentary strategy call</p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
