
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                  <p className="text-resort-600 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-resort-900">${plan.price}</span>
                    <span className="text-resort-600">/month</span>
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// Sample pricing data
const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for small resorts just getting started",
    price: 49,
    buttonText: "Get Started",
    featured: false,
    features: [
      "1 Social Media Account",
      "30 Scheduled Posts per Month",
      "Basic Analytics Dashboard",
      "5 AI-Generated Caption Options",
      "Email Support"
    ]
  },
  {
    name: "Professional",
    description: "Ideal for growing resort brands",
    price: 99,
    buttonText: "Start Free Trial",
    featured: true,
    features: [
      "5 Social Media Accounts",
      "100 Scheduled Posts per Month",
      "Advanced Analytics & Reports",
      "20 AI-Generated Caption Options",
      "Content Calendar",
      "Priority Support"
    ]
  },
  {
    name: "Enterprise",
    description: "For established hospitality chains",
    price: 199,
    buttonText: "Contact Sales",
    featured: false,
    features: [
      "Unlimited Social Media Accounts",
      "Unlimited Scheduled Posts",
      "Custom Analytics & Reports",
      "Unlimited AI-Generated Content",
      "Team Collaboration Tools",
      "Dedicated Account Manager"
    ]
  }
];

export default Pricing;
