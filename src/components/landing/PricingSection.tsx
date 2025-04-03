
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Essentials',
    price: '$149',
    period: '/month',
    description: 'For boutique properties seeking to establish a strategic marketing foundation.',
    coreBenefit: 'Streamline your marketing workflow and create premium content.',
    features: [
      'Intelligent Marketing Calendar',
      'Premium Asset Library for photography & videos',
      'AI-driven content suggestions for engaging positioning',
      'Generate up to 15 premium content pieces monthly',
      'Basic guest persona development',
      'Export-ready content with brand guidelines',
      'Includes 2 team member accounts'
    ],
    cta: 'Start Free Trial',
    variant: 'outline'
  },
  {
    name: 'Premium',
    price: '$399',
    period: '/month',
    description: 'For established properties looking to optimize all marketing channels and increase bookings.',
    coreBenefit: 'Maximize direct bookings and guest engagement across channels.',
    features: [
      'Everything in Essentials, plus:',
      'Integrated multi-channel campaign management',
      'Advanced guest journey mapping and optimization',
      'Revenue attribution analytics',
      'Direct booking conversion optimization',
      'Personalized guest communications',
      'Multi-language content support including Korean',
      'Extended content generation (60 pieces monthly)',
      'Up to 5 team member accounts'
    ],
    disclaimer: '* Advanced integrations may require technical setup assistance',
    cta: 'Start Free Trial',
    variant: 'default',
    featured: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'For hotel groups, resorts, and hospitality management companies.',
    coreBenefit: 'Complete marketing ecosystem with enhanced revenue optimization.',
    features: [
      'Everything in Premium, plus:',
      'Strategic AI-powered revenue forecasting',
      'Competitive market intelligence dashboard',
      'Guest segmentation and targeting',
      'Advanced personalization engine',
      'Complete brand voice customization',
      'PMS/CRM/Revenue Management integration',
      'Custom reporting and white-labeled dashboards',
      'Unlimited content generation and usage',
      'Dedicated success manager'
    ],
    cta: 'Contact Sales',
    variant: 'outline'
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block bg-ocean-50 text-ocean-600 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              Investment Plans
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-resort-900 mb-6">
              Strategic Solutions for Every Property
            </h2>
            <p className="text-lg text-resort-600 max-w-3xl mx-auto">
              Select the perfect plan to elevate your property's marketing presence and drive revenue growth.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative rounded-xl overflow-hidden border ${plan.featured ? 'border-ocean-400 shadow-lg' : 'border-gray-200'}`}
            >
              {plan.featured && (
                <div className="absolute top-0 right-0 bg-ocean-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <div className={`p-8 ${plan.featured ? 'bg-gradient-to-br from-ocean-50 to-white' : 'bg-white'}`}>
                <h3 className="text-2xl font-bold text-resort-800 mb-2">{plan.name}</h3>
                <div className="flex items-end mb-2">
                  <span className="text-4xl font-bold text-resort-900">{plan.price}</span>
                  <span className="text-resort-600 ml-1">{plan.period}</span>
                </div>
                <p className="text-resort-600 mb-2">{plan.description}</p>
                <p className="text-sm font-medium text-ocean-600 mb-6">{plan.coreBenefit}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-ocean-500 flex-shrink-0 mt-0.5" />
                      <span className="text-resort-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.disclaimer && (
                  <p className="text-xs text-resort-500 italic mb-5">{plan.disclaimer}</p>
                )}
                
                <Button 
                  variant={plan.variant as any} 
                  className={`w-full py-6 ${plan.featured ? 'bg-ocean-600 hover:bg-ocean-700' : ''}`}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-sm text-resort-500 max-w-3xl mx-auto">
            All plans include a 14-day free trial. No credit card required. Our platform is designed specifically for hospitality 
            properties to attract high-value guests, optimize operations, and maximize revenue.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
