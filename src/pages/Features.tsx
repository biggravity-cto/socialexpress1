
import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';

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
              Discover our comprehensive suite of tools designed specifically for hospitality brands to thrive in the digital landscape.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature cards */}
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
      
      <Footer />
    </div>
  );
};

// Sample features data
import { Calendar, MessageSquare, Image, BarChart3, Zap, Users } from 'lucide-react';

const featuresData = [
  {
    title: "Content Calendar",
    description: "Plan and schedule your social media content ahead of time with our intuitive calendar interface.",
    icon: Calendar,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500"
  },
  {
    title: "AI Content Generation",
    description: "Create engaging captions, hashtags, and content ideas tailored to your resort brand.",
    icon: MessageSquare,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-500"
  },
  {
    title: "Visual Editor",
    description: "Edit, crop, and enhance your images and videos with our built-in visual editing tools.",
    icon: Image,
    bgColor: "bg-pink-50",
    iconColor: "text-pink-500"
  },
  {
    title: "Advanced Analytics",
    description: "Track performance metrics and gain insights to optimize your social media strategy.",
    icon: BarChart3,
    bgColor: "bg-green-50",
    iconColor: "text-green-500"
  },
  {
    title: "Automation Tools",
    description: "Streamline your workflow with automated posting, engagement, and reporting features.",
    icon: Zap,
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-500"
  },
  {
    title: "Team Collaboration",
    description: "Work seamlessly with your team to review, approve, and publish content efficiently.",
    icon: Users,
    bgColor: "bg-orange-50",
    iconColor: "text-orange-500"
  }
];

export default Features;
