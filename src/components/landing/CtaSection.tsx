
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-ocean-600 to-ocean-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Hotel's Marketing?
          </h2>
          <p className="text-xl text-ocean-50 mb-8 max-w-2xl mx-auto">
            Join hundreds of hotels and resorts already using GuestFlow to increase direct bookings, improve guest engagement, and maximize revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-ocean-700 hover:bg-ocean-50"
            >
              <Link to="/auth" className="w-full">
                Get Early Access
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-ocean-700 hover:text-white group"
            >
              <Link to="/calendar" className="flex items-center w-full">
                See Live Demo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-ocean-100">
            Limited early access spots available. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
