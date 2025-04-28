
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PricingSection: React.FC = () => {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);

  const packages = [
    {
      name: 'Starter',
      perfectFor: 'Boutique Hotels & B&Bs',
      features: [
        'NAVER Blog Setup & Management',
        'Weekly Korean Social Listening',
        'Monthly Content Updates',
        'Basic Translation Services',
        'Quarterly Performance Reports'
      ],
      cta: 'Contact Us',
      variant: 'outline',
      popular: false
    },
    {
      name: 'Professional',
      perfectFor: 'Multi-Property Brands',
      features: [
        'Everything in Starter, plus:',
        'Kakao Channel Management',
        'NAVER Paid Advertising',
        'Weekly Performance Reports',
        'Monthly Strategy Consultation',
        'Expanded Translation Services'
      ],
      cta: 'Most Popular',
      variant: 'default',
      popular: true
    },
    {
      name: 'Enterprise',
      perfectFor: 'Luxury Resorts & Chains',
      features: [
        'Everything in Professional, plus:',
        'Full Korean PR Services',
        'Custom Marketing Campaigns',
        'Dedicated Account Manager',
        'VIP Guest Communication',
        'Quarterly Strategy Sessions'
      ],
      cta: 'Contact Us',
      variant: 'outline',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-gray-50 to-white"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-space-dark/10 to-white"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block bg-brand-primary/10 text-brand-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-brand-primary/30">
              Service Packages
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-space-dark mb-6 font-display leading-tight">
              Tailored Solutions for Your Brand
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our strategic service packages designed to maximize your success in the Korean market
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 border ${
                hoveredTier === index 
                  ? 'border-brand-green shadow-lg' 
                  : pkg.popular 
                    ? 'border-brand-primary shadow-md' 
                    : 'border-gray-200'
              }`}
              onMouseEnter={() => setHoveredTier(index)}
              onMouseLeave={() => setHoveredTier(null)}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-brand-green text-white px-4 py-1 text-sm font-medium rounded-bl-lg z-10">
                  Popular
                </div>
              )}
              
              <div className={`p-8 ${
                pkg.popular 
                  ? 'bg-gradient-to-br from-white via-brand-primary/5 to-white' 
                  : 'bg-white'
              }`}>
                <h3 className="text-2xl font-bold text-space-dark mb-2 font-display">{pkg.name}</h3>
                
                <div className="bg-gray-50 px-4 py-3 rounded-lg mb-6">
                  <p className="text-sm font-medium text-gray-500">Perfect For</p>
                  <p className="text-space-dark font-medium">{pkg.perfectFor}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-brand-green flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={pkg.variant as any} 
                  className={`w-full py-6 ${
                    pkg.popular 
                      ? 'bg-brand-green hover:bg-brand-green/90 text-white' 
                      : 'text-brand-primary border-brand-primary/50 hover:bg-brand-primary/10'
                  }`}
                >
                  {pkg.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 max-w-3xl mx-auto">
            All packages include dedicated account management and ongoing support. 
            Custom packages are available to meet your specific needs. Contact us for details.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
