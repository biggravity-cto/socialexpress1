
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Basic',
    price: '$399',
    period: '/month',
    description: 'Best for teams planning content ahead and handling posting manually.',
    coreBenefit: 'Plan your social calendar & create content efficiently offline.',
    features: [
      'Visual Content Calendar',
      'Content Library for photos & videos',
      'AI assistance for captions & hashtags (basic limits)',
      'Generate ideas/drafts for up to 12 Posts & 2 Video Concepts per month',
      'Includes up to 2 Users',
      'Download content easily to post yourself',
      'Manual posting (no direct social media connection)'
    ],
    cta: 'Start Free Trial',
    variant: 'outline'
  },
  {
    name: 'Pro',
    price: '$699',
    period: '/month',
    description: 'Best for teams wanting to automate publishing across key platforms and track results.',
    coreBenefit: 'Automate your social media workflow & measure performance.',
    features: [
      'Everything in Basic, PLUS:',
      'Link up to 5 Social Accounts (Instagram & Facebook)',
      'Schedule posts to publish automatically',
      'Track key metrics (likes, comments, reach, etc.)',
      'Unified Social Inbox for comments & messages*',
      'Streamline team review workflows',
      'Basic AI help for Korean language content',
      'Higher content generation (60 Posts/Month)',
      'Up to 5 Users'
    ],
    disclaimer: '* Unified Inbox feature activation depends on platform approvals',
    cta: 'Start Free Trial',
    variant: 'default',
    featured: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'Best for larger resorts, groups, or agencies needing strategic tools, advanced AI, and full integration.',
    coreBenefit: 'Unlock strategic planning, advanced insights, and the full power of AI marketing.',
    features: [
      'Everything in Pro, PLUS:',
      'AI-powered campaign planning tools',
      'Competitor tracking & social sentiment analysis',
      'Advanced Analytics & ROI Insights',
      'Advanced AI content generation with image/video',
      'Full Korean Market Features (Naver/Kakao focus)',
      'Integration with PMS/CRM systems',
      'Custom usage limits for posts, AI, users, accounts',
      'Dedicated Account Management'
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
            All plans include a 14-day free trial. No credit card required. A "Post" is defined as a single social media update 
            including caption, image/video, and hashtags. "Video Concept" includes storyboarding and AI-generated text for video content.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
