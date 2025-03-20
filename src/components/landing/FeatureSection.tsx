
import React from 'react';
import { Calendar, Image, BarChart3, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';
import BlurredSection from '@/components/ui/BlurredSection';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Calendar className="h-8 w-8 text-ocean-600" />,
    title: "Content Calendar",
    description: "Plan and schedule your content across all platforms with our intuitive drag-and-drop calendar interface.",
    delay: 0.1
  },
  {
    icon: <Image className="h-8 w-8 text-purple-600" />,
    title: "AI Content Generation",
    description: "Create engaging posts with our AI assistant that understands hospitality-specific content needs.",
    delay: 0.2
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-green-600" />,
    title: "Performance Analytics",
    description: "Track the success of your campaigns with detailed analytics and actionable insights.",
    delay: 0.3
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-amber-600" />,
    title: "Engagement Management",
    description: "Manage comments and messages across all platforms from a single inbox.",
    delay: 0.4
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-rose-600" />,
    title: "Brand Consistency",
    description: "Maintain consistent branding across all your content with templated designs and style guides.",
    delay: 0.5
  },
  {
    icon: <ArrowRight className="h-8 w-8 text-blue-600" />,
    title: "Cross-Platform Publishing",
    description: "Publish to Instagram, Facebook, Twitter, and more with a single click.",
    delay: 0.6
  }
];

interface FeatureSectionProps {
  featureRef: React.RefObject<HTMLDivElement>;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ featureRef }) => {
  return (
    <section ref={featureRef} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-resort-50 to-white z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-sand-50 text-sand-600 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Platform Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-resort-900 mb-6">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-resort-600 max-w-3xl mx-auto">
            Our comprehensive suite of tools is designed specifically for hospitality resorts to streamline your digital marketing efforts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <BlurredSection className="h-full p-8 transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:bg-white/70">
                <div className="p-3 bg-white rounded-xl inline-block mb-4 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-resort-800 mb-3">{feature.title}</h3>
                <p className="text-resort-600">{feature.description}</p>
              </BlurredSection>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
