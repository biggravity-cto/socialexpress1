
import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-resort-50">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-ocean-50 text-ocean-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              Simple Pricing
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-resort-900 mb-6">
              Plans for <span className="text-ocean-600">Every Resort's Needs</span>
            </h1>
            <p className="text-lg text-resort-600">
              Choose the perfect plan for your resort's social media management needs. No hidden fees, cancel anytime.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div 
                key={index}
                className={`rounded-xl overflow-hidden ${plan.featured ? 'border-2 border-ocean-500 shadow-lg' : 'border border-gray-100 shadow-sm'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {plan.featured && (
                  <div className="bg-ocean-500 py-2 text-center text-white text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="bg-white p-8">
                  <h3 className="text-xl font-semibold text-resort-800 mb-2">{plan.name}</h3>
                  <p className="text-resort-600 mb-3">{plan.description}</p>
                  <p className="text-sm font-medium text-ocean-600 mb-4">{plan.coreBenefit}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-resort-900">{plan.price}</span>
                    <span className="text-resort-600">{plan.period}</span>
                  </div>
                  <Link to="/dashboard">
                    <Button 
                      className={`w-full mb-6 ${plan.featured ? 'bg-ocean-600 hover:bg-ocean-700' : ''}`}
                      variant={plan.featured ? 'default' : 'outline'}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-resort-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.disclaimer && (
                    <p className="text-xs text-resort-500 italic mt-4">{plan.disclaimer}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="bg-ocean-50 rounded-lg p-8 mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-resort-900 mb-4 text-center">Key Definitions & Notes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg text-resort-800 mb-2">Content Definitions:</h4>
                <ul className="space-y-2">
                  <li className="text-resort-700"><span className="font-medium">Post:</span> A single social media update including caption, image/video, and hashtags.</li>
                  <li className="text-resort-700"><span className="font-medium">Video Concept:</span> Storyboarding and AI-generated text for video content.</li>
                  <li className="text-resort-700"><span className="font-medium">AI Usage:</span> AI credits reset monthly and don't roll over to the next period.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-resort-800 mb-2">Additional Information:</h4>
                <ul className="space-y-2">
                  <li className="text-resort-700">All plans include a 14-day free trial with no credit card required.</li>
                  <li className="text-resort-700">The Unified Social Inbox feature availability is subject to platform API approvals.</li>
                  <li className="text-resort-700">Enterprise plans are customizable based on your specific needs.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// Updated pricing data
const pricingPlans = [
  {
    name: "Basic",
    description: "Best for teams planning content ahead and handling posting manually.",
    coreBenefit: "Plan your social calendar & create content efficiently offline.",
    price: "$399",
    period: "/month",
    buttonText: "Get Started",
    featured: false,
    features: [
      "Visual Content Calendar",
      "Content Library for photos & videos",
      "AI assistance for captions & hashtags (basic limits)",
      "Generate ideas/drafts for up to 12 Posts & 2 Video Concepts per month",
      "Includes up to 2 Users",
      "Download content easily to post yourself",
      "Manual posting (no direct social media connection)"
    ]
  },
  {
    name: "Pro",
    description: "Best for teams wanting to automate publishing across key platforms and track results.",
    coreBenefit: "Automate your social media workflow & measure performance.",
    price: "$699",
    period: "/month",
    buttonText: "Start Free Trial",
    featured: true,
    features: [
      "Everything in Basic, PLUS:",
      "Link up to 5 Social Accounts (Instagram & Facebook)",
      "Schedule posts to publish automatically",
      "Track key metrics (likes, comments, reach, etc.)",
      "Unified Social Inbox for comments & messages*",
      "Streamline team review workflows",
      "Basic AI help for Korean language content",
      "Higher content generation (60 Posts/Month)",
      "Up to 5 Users"
    ],
    disclaimer: "* Unified Inbox feature activation depends on platform approvals"
  },
  {
    name: "Enterprise",
    description: "Best for larger resorts, groups, or agencies needing strategic tools, advanced AI, and full integration.",
    coreBenefit: "Unlock strategic planning, advanced insights, and the full power of AI marketing.",
    price: "Custom",
    period: " pricing",
    buttonText: "Contact Sales",
    featured: false,
    features: [
      "Everything in Pro, PLUS:",
      "AI-powered campaign planning tools",
      "Competitor tracking & social sentiment analysis",
      "Advanced Analytics & ROI Insights",
      "Advanced AI content generation with image/video",
      "Full Korean Market Features (Naver/Kakao focus)",
      "Integration with PMS/CRM systems",
      "Custom usage limits for posts, AI, users, accounts",
      "Dedicated Account Management"
    ]
  }
];

export default Pricing;
