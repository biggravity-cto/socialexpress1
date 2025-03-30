
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Basic',
    price: '$29',
    period: '/month',
    description: 'Perfect for small businesses just getting started with social media.',
    features: [
      'AI content generation (30/mo)',
      'Scheduled posts (50/mo)',
      'Basic analytics',
      'Single user',
      'Connect 3 social accounts'
    ],
    cta: 'Start Free Trial',
    variant: 'outline'
  },
  {
    name: 'Pro',
    price: '$79',
    period: '/month',
    description: 'Ideal for growing businesses with active social presence.',
    features: [
      'AI content generation (100/mo)',
      'Unlimited scheduled posts',
      'Advanced analytics',
      'Up to 5 team members',
      'Connect 10 social accounts',
      'Approval workflows',
      'Content calendar'
    ],
    cta: 'Start Free Trial',
    variant: 'default',
    featured: true
  },
  {
    name: 'Enterprise',
    price: '$199',
    period: '/month',
    description: 'Full-featured solution for large organizations with complex needs.',
    features: [
      'Unlimited AI content generation',
      'Unlimited scheduled posts',
      'Advanced analytics with custom reports',
      'Unlimited team members',
      'Unlimited social accounts',
      'Advanced approval workflows',
      'Content calendar with team collaboration',
      'Custom integrations',
      'Dedicated support manager'
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
              Pricing Plans
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-resort-900 mb-6">
              Choose the Perfect Plan for Your Resort
            </h2>
            <p className="text-lg text-resort-600 max-w-3xl mx-auto">
              Affordable solutions tailored to meet the unique social media needs of hospitality businesses of all sizes.
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
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold text-resort-900">{plan.price}</span>
                  <span className="text-resort-600 ml-1">{plan.period}</span>
                </div>
                <p className="text-resort-600 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-ocean-500 flex-shrink-0 mt-0.5" />
                      <span className="text-resort-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
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
      </div>
    </section>
  );
};

export default PricingSection;
