
import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';
import { Calendar, MessageSquare, Image, BarChart3, Zap, Users, Globe, Check, Shield, Smartphone } from 'lucide-react';

const Features = () => {
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
              Platform Features
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-resort-900 mb-6">
              Everything You Need to <span className="text-ocean-600">Elevate Your Resort's Presence</span>
            </h1>
            <p className="text-lg text-resort-600">
              Our AI-powered platform streamlines social media management for hospitality businesses with intelligent content generation and scheduling tools.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.bgColor}`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-resort-800 mb-3">{feature.title}</h3>
                <p className="text-resort-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gradient-to-r from-ocean-50 to-resort-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-resort-900 mb-6">Created Specifically for Hospitality Businesses</h2>
            <p className="text-lg text-resort-600">
              Our platform understands the unique social media needs of hotels, resorts, and hospitality brands.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {hospitalityFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className={`p-3 rounded-full ${feature.bgColor} mr-4 flex-shrink-0`}>
                  <Check className={`w-5 h-5 ${feature.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-resort-800 mb-2">{feature.title}</h3>
                  <p className="text-resort-600">{feature.description}</p>
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

// Updated features data
const featuresData = [
  {
    title: "Interactive Content Calendar",
    description: "Plan and schedule your content with an intuitive drag-and-drop calendar interface across multiple social platforms.",
    icon: Calendar,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500"
  },
  {
    title: "AI Content Generation",
    description: "Create engaging captions, hashtags, and content ideas tailored to your hospitality brand with multilingual support.",
    icon: MessageSquare,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-500"
  },
  {
    title: "Visual Editor",
    description: "Edit, crop, and enhance your images and videos with our built-in visual editing tools optimized for hospitality imagery.",
    icon: Image,
    bgColor: "bg-pink-50",
    iconColor: "text-pink-500"
  },
  {
    title: "Performance Analytics",
    description: "Track engagement metrics and gain insights to optimize your social media strategy for your hospitality business.",
    icon: BarChart3,
    bgColor: "bg-green-50",
    iconColor: "text-green-500"
  },
  {
    title: "Approval Workflows",
    description: "Streamline content approval with role-based workflows that keep stakeholders in the loop on mobile and desktop.",
    icon: Users,
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-500"
  },
  {
    title: "Mobile Optimization",
    description: "Access all features on the go with our responsive design that works seamlessly across all devices.",
    icon: Smartphone,
    bgColor: "bg-orange-50",
    iconColor: "text-orange-500"
  }
];

// Hospitality-specific features
const hospitalityFeatures = [
  {
    title: "Multilingual Support",
    description: "Create content in multiple languages including Korean to reach your international guests and clientele.",
    bgColor: "bg-ocean-100",
    iconColor: "text-ocean-600"
  },
  {
    title: "Hospitality Templates",
    description: "Access pre-designed templates for room promotions, dining experiences, spa packages, and special events.",
    bgColor: "bg-ocean-100",
    iconColor: "text-ocean-600"
  },
  {
    title: "Seasonal Campaigns",
    description: "Plan and schedule content around peak seasons, holidays, and local events relevant to your hospitality business.",
    bgColor: "bg-ocean-100",
    iconColor: "text-ocean-600"
  },
  {
    title: "Brand Consistency",
    description: "Maintain your resort's visual identity and tone of voice across all social platforms and content types.",
    bgColor: "bg-ocean-100", 
    iconColor: "text-ocean-600"
  }
];

export default Features;
