
import React, { RefObject } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { 
  CalendarDays, 
  PencilRuler, 
  BarChart3, 
  MessageSquare, 
  ShieldCheck, 
  Users, 
  Sparkles,
  BrainCircuit,
  LineChart
} from 'lucide-react';

interface FeatureSectionProps {
  featureRef: RefObject<HTMLDivElement>;
}

const features = [
  {
    icon: <BrainCircuit className="h-6 w-6 text-purple-500" />,
    title: 'AI-Powered Content Creation',
    description: 'Generate engaging captions, suggest image ideas, and create entire content plans with our advanced AI assistant.',
    color: 'bg-purple-50 border-purple-100',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    icon: <CalendarDays className="h-6 w-6 text-blue-500" />,
    title: 'Unified Marketing Calendar',
    description: 'Plan, schedule, and automate your posts across all social media platforms from a single, intuitive calendar view.',
    color: 'bg-blue-50 border-blue-100',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    icon: <LineChart className="h-6 w-6 text-green-500" />,
    title: 'Brand Intelligence',
    description: 'Monitor your brand health, track competitor activities, and identify emerging trends with AI-powered insights.',
    color: 'bg-green-50 border-green-100',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    icon: <PencilRuler className="h-6 w-6 text-amber-500" />,
    title: 'Content Library & Templates',
    description: 'Access hospitality-specific templates and a rich library of curated content ideas for your resort or hotel.',
    color: 'bg-amber-50 border-amber-100',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600'
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-pink-500" />,
    title: 'Unified Social Inbox',
    description: 'Respond to guest messages, comments, and reviews across all platforms from a single, streamlined inbox.',
    color: 'bg-pink-50 border-pink-100',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600'
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-indigo-500" />,
    title: 'Advanced Analytics',
    description: 'Track performance metrics, guest engagement, and ROI with comprehensive analytics dashboards.',
    color: 'bg-indigo-50 border-indigo-100',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600'
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-teal-500" />,
    title: 'Content Approval Workflows',
    description: 'Streamline review processes with customizable approval workflows to maintain brand consistency.',
    color: 'bg-teal-50 border-teal-100',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600'
  },
  {
    icon: <Users className="h-6 w-6 text-red-500" />,
    title: 'Team Collaboration',
    description: 'Empower your marketing team with role-based permissions, task assignment, and real-time collaboration.',
    color: 'bg-red-50 border-red-100',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600'
  }
];

const FeatureSection = ({ featureRef }: FeatureSectionProps) => {
  return (
    <section ref={featureRef} className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100 mb-4"
          >
            <Sparkles className="h-4 w-4 mr-1.5 text-blue-500" />
            <span>Powerful Features</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Everything Your Hospitality Brand Needs
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            GuestFlow combines powerful marketing tools with hospitality-specific features to help you delight guests, increase bookings, and drive revenue growth.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Card className={`h-full p-6 border ${feature.color} hover:shadow-lg transition-all duration-300`}>
                <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 ${feature.iconBg}`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-ocean-600 to-ocean-700 text-white text-center shadow-xl"
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold mb-4"
          >
            Custom-Tailored for the Hospitality Industry
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-blue-100 max-w-3xl mx-auto mb-6"
          >
            Unlike generic marketing tools, GuestFlow is built specifically for hotels, resorts, and spas with industry-specific templates, analytics, and AI capabilities.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
            {[
              { stat: '92%', label: 'Time saved on content creation' },
              { stat: '3.5x', label: 'Increase in social engagement' },
              { stat: '64%', label: 'Boost in direct bookings' }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="p-4 bg-white/10 rounded-lg backdrop-blur-sm"
              >
                <p className="text-3xl font-bold text-white">{item.stat}</p>
                <p className="text-blue-100">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
