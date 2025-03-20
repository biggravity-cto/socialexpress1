
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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
          <div className="p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Resort's Social Media Strategy?</h2>
            <p className="text-lg text-ocean-100 mb-10 max-w-3xl mx-auto">
              Join hundreds of hospitality brands already using our platform to boost engagement, save time, and increase bookings.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/dashboard">
                <Button className="bg-white text-ocean-700 hover:bg-ocean-50 px-8 py-6 rounded-lg text-lg">
                  Start Free Trial
                </Button>
              </Link>
              <Button variant="outline" className="border-ocean-300 text-white hover:bg-ocean-500 px-8 py-6 rounded-lg text-lg">
                Schedule Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
