
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "AI-Powered Content Creation",
      description: "Generate engaging social media content tailored to your resort's unique amenities and experiences.",
      icon: "✨"
    },
    {
      title: "Multi-Platform Management",
      description: "Manage all your social media accounts from a single, intuitive dashboard.",
      icon: "🔄"
    },
    {
      title: "Guest Engagement Analytics",
      description: "Track engagement metrics and understand what content resonates with your audience.",
      icon: "📊"
    },
    {
      title: "Automated Scheduling",
      description: "Plan and schedule posts weeks in advance to maintain a consistent online presence.",
      icon: "🗓️"
    },
    {
      title: "Guest Review Integration",
      description: "Automatically collect and showcase positive guest reviews across your platforms.",
      icon: "⭐"
    },
    {
      title: "Custom Branding Tools",
      description: "Ensure all content aligns with your resort's brand guidelines and visual identity.",
      icon: "🎨"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 bg-gradient-to-b from-white to-resort-50 min-h-screen"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-resort-800 mb-4">
            Powerful Features for Resort Social Media
          </h1>
          <p className="text-xl text-resort-600 max-w-3xl mx-auto">
            Everything you need to captivate guests and showcase your resort's unique experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-resort-800 mb-3">{feature.title}</h3>
              <p className="text-resort-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-ocean-50 rounded-2xl p-8 md:p-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-ocean-800 mb-6">Compare Plans</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Starter Plan */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Starter</h3>
                <div className="text-3xl font-bold text-resort-800 mb-4">$99<span className="text-base font-normal text-resort-600">/month</span></div>
                <div className="space-y-3 mb-6">
                  {[
                    "AI post generation (10/month)",
                    "2 social platforms",
                    "Basic analytics",
                    "Email support"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ocean-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-resort-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to="/dashboard">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
              
              {/* Professional Plan */}
              <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-ocean-400 relative">
                <div className="absolute -top-3 left-0 right-0 mx-auto w-max bg-ocean-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional</h3>
                <div className="text-3xl font-bold text-resort-800 mb-4">$199<span className="text-base font-normal text-resort-600">/month</span></div>
                <div className="space-y-3 mb-6">
                  {[
                    "AI post generation (50/month)",
                    "5 social platforms",
                    "Advanced analytics",
                    "Priority support",
                    "Content calendar",
                    "Guest review integration"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ocean-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-resort-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to="/dashboard">
                  <Button className="w-full bg-ocean-600 hover:bg-ocean-700">Get Started</Button>
                </Link>
              </div>
              
              {/* Enterprise Plan */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                <div className="text-3xl font-bold text-resort-800 mb-4">$399<span className="text-base font-normal text-resort-600">/month</span></div>
                <div className="space-y-3 mb-6">
                  {[
                    "Unlimited AI post generation",
                    "Unlimited social platforms",
                    "Custom analytics dashboard",
                    "Dedicated account manager",
                    "Custom API integrations",
                    "White-labeled reports",
                    "Team collaboration tools"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ocean-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-resort-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to="/dashboard">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link to="/pricing">
            <Button size="lg" className="bg-ocean-600 hover:bg-ocean-700">
              View Full Pricing Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Features;
