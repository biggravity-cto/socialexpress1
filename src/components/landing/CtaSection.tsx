
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="bg-gradient-to-r from-ocean-50 to-resort-50 py-20 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-resort-900 mb-4">
          Ready to Transform Your Resort's Marketing?
        </h2>
        <p className="text-lg text-resort-700 mb-8 max-w-2xl mx-auto">
          Join the growing community of luxury properties leveraging our AI-powered platform to attract high-value guests and maximize revenue.
        </p>
        <Link to="/auth">
          <Button size="lg" className="px-8 py-6 rounded-lg text-lg">
            Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CtaSection;
