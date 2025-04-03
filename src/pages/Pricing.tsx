
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
              Investment Plans
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-resort-900 mb-6">
              Strategic Solutions for <span className="text-ocean-600">Hotels & Resorts</span>
            </h1>
            <p className="text-lg text-resort-600">
              Select the perfect plan to elevate your property's marketing presence, attract guests, and drive revenue growth.
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
            <h3 className="text-2xl font-bold text-resort-900 mb-4 text-center">Plan Details & Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg text-resort-800 mb-2">Strategic Solution Components:</h4>
                <ul className="space-y-2">
                  <li className="text-resort-700"><span className="font-medium">Premium Content:</span> High-quality, branded content pieces tailored for hospitality.</li>
                  <li className="text-resort-700"><span className="font-medium">Guest Journey Optimization:</span> Comprehensive analysis and enhancement of the complete booking funnel.</li>
                  <li className="text-resort-700"><span className="font-medium">Revenue Optimization:</span> AI-driven tools to maximize RevPAR and occupancy with optimal pricing.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-resort-800 mb-2">Additional Information:</h4>
                <ul className="space-y-2">
                  <li className="text-resort-700">All plans include a 14-day free trial with no credit card required.</li>
                  <li className="text-resort-700">Dedicated onboarding support included with all plans.</li>
                  <li className="text-resort-700">Enterprise plans include quarterly strategy sessions and full implementation support.</li>
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
    name: "Essentials",
    description: "For boutique properties seeking to establish a strategic marketing foundation.",
    coreBenefit: "Streamline your marketing workflow and create premium content.",
    price: "$149",
    period: "/month",
    buttonText: "Get Started",
    featured: false,
    features: [
      "Intelligent Marketing Calendar",
      "Premium Asset Library for photography & videos",
      "AI-driven content suggestions for engaging positioning",
      "Generate up to 15 premium content pieces monthly",
      "Basic guest persona development",
      "Export-ready content with brand guidelines",
      "Includes 2 team member accounts"
    ]
  },
  {
    name: "Premium",
    description: "For established properties looking to optimize all marketing channels and increase bookings.",
    coreBenefit: "Maximize direct bookings and guest engagement across channels.",
    price: "$399",
    period: "/month",
    buttonText: "Start Free Trial",
    featured: true,
    features: [
      "Everything in Essentials, plus:",
      "Integrated multi-channel campaign management",
      "Advanced guest journey mapping and optimization",
      "Revenue attribution analytics",
      "Direct booking conversion optimization",
      "Personalized guest communications",
      "Multi-language content support including Korean",
      "Extended content generation (60 pieces monthly)",
      "Up to 5 team member accounts"
    ],
    disclaimer: "* Advanced integrations may require technical setup assistance"
  },
  {
    name: "Enterprise",
    description: "For hotel groups, resorts, and hospitality management companies.",
    coreBenefit: "Complete marketing ecosystem with enhanced revenue optimization.",
    price: "Custom",
    period: " pricing",
    buttonText: "Contact Sales",
    featured: false,
    features: [
      "Everything in Premium, plus:",
      "Strategic AI-powered revenue forecasting",
      "Competitive market intelligence dashboard",
      "Guest segmentation and targeting",
      "Advanced personalization engine",
      "Complete brand voice customization",
      "PMS/CRM/Revenue Management integration",
      "Custom reporting and white-labeled dashboards",
      "Unlimited content generation and usage",
      "Dedicated success manager"
    ]
  }
];

export default Pricing;
