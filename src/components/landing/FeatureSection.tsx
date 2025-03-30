
import React from 'react';
import { Calendar, Image, BarChart3, MessageSquare, CheckCircle, ArrowRight, Users, Shield, BrainCircuit } from 'lucide-react';
import BlurredSection from '@/components/ui/BlurredSection';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Calendar className="h-8 w-8 text-ocean-600" />,
    title: "Content Calendar",
    description: "Plan and schedule your content across all platforms with our intuitive drag-and-drop calendar interface.",
    delay: 0.1,
    gradient: "from-ocean-50 to-ocean-100/50"
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-purple-600" />,
    title: "AI Content Generation",
    description: "Create engaging posts with our AI assistant that understands hospitality-specific content needs.",
    delay: 0.2,
    gradient: "from-purple-50 to-purple-100/50"
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-green-600" />,
    title: "Performance Analytics",
    description: "Track the success of your campaigns with detailed analytics and actionable insights for optimizing your strategy.",
    delay: 0.3,
    gradient: "from-green-50 to-green-100/50"
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-amber-600" />,
    title: "Unified Social Inbox",
    description: "Manage comments and messages across all platforms from a single inbox to improve response times.",
    delay: 0.4,
    gradient: "from-amber-50 to-amber-100/50"
  },
  {
    icon: <Users className="h-8 w-8 text-rose-600" />,
    title: "Team Collaboration",
    description: "Work seamlessly with your team with role-based permissions, content assignments, and approval workflows.",
    delay: 0.5,
    gradient: "from-rose-50 to-rose-100/50"
  },
  {
    icon: <Shield className="h-8 w-8 text-blue-600" />,
    title: "Brand Safety",
    description: "Maintain consistent branding across all your content with templated designs and AI-powered style guides.",
    delay: 0.6,
    gradient: "from-blue-50 to-blue-100/50"
  }
];

interface FeatureSectionProps {
  featureRef: React.RefObject<HTMLDivElement>;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ featureRef }) => {
  return (
    <section id="features" ref={featureRef} className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block bg-sand-50 text-sand-600 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              Powerful Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-resort-900 mb-6">
              Everything You Need to Excel on Social Media
            </h2>
            <p className="text-lg text-resort-600 max-w-3xl mx-auto">
              Our comprehensive suite of tools is designed specifically for hospitality businesses to streamline your digital marketing efforts.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true, margin: "-100px" }}
              className="h-full"
            >
              <div className={`h-full p-8 rounded-xl bg-gradient-to-br ${feature.gradient} border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-4px]`}>
                <div className="p-3 bg-white rounded-xl inline-block mb-4 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-resort-800 mb-3">{feature.title}</h3>
                <p className="text-resort-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-lg text-resort-700 mb-6 max-w-2xl mx-auto">
              And many more features designed to help hospitality businesses succeed in the digital space
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
