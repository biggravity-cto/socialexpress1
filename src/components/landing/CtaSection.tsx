
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import EarlyAccessModal from './EarlyAccessModal';

const CtaSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <section className="bg-gradient-to-r from-ocean-50 to-ocean-100 py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 bg-white/80 text-ocean-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" /> Limited Spots Available
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-resort-900 mb-4">
            Ready to Transform Your Resort's Marketing?
          </h2>
          <p className="text-lg text-resort-700 mb-8 max-w-2xl mx-auto">
            Join the growing community of luxury properties leveraging our AI-powered platform to attract high-value guests and maximize revenue.
          </p>
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              size="lg" 
              onClick={() => setIsModalOpen(true)} 
              className="px-8 py-6 rounded-lg text-lg bg-ocean-600 hover:bg-ocean-700 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Request Early Access <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(14, 165, 233, 0.3) 0%, transparent 30%), 
                           radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.3) 0%, transparent 30%)`
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Early Access Modal */}
      <EarlyAccessModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
};

export default CtaSection;
