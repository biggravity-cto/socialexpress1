
import React, { RefObject } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Sparkles, 
  BarChart, 
  MessageSquare,
  LineChart,
  BellRing
} from 'lucide-react';

interface FeatureSectionProps {
  featureRef: RefObject<HTMLDivElement>;
}

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  bgColor: string;
  iconColor: string;
  borderColor: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ 
  icon, 
  title, 
  description, 
  delay, 
  bgColor, 
  iconColor,
  borderColor 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`bg-white rounded-xl p-6 shadow-sm border ${borderColor} hover:shadow-md transition-shadow duration-300`}
    >
      <div className={`rounded-lg h-12 w-12 flex items-center justify-center ${bgColor} ${iconColor} mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-resort-800 mb-2">{title}</h3>
      <p className="text-resort-600">{description}</p>
    </motion.div>
  );
};

const FeatureSection: React.FC<FeatureSectionProps> = ({ featureRef }) => {
  const features = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Intelligent Content Calendar",
      description: "Plan, schedule, and automate your hotel marketing campaigns with AI-optimized timing based on booking patterns.",
      delay: 0,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-100"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI Content Generation",
      description: "Create compelling hotel offers, email campaigns, and social posts tailored to your property's unique amenities and target audience.",
      delay: 1,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      borderColor: "border-purple-100"
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Revenue Analytics",
      description: "Track campaign performance and see exactly how your marketing efforts translate to bookings, revenue, and ROI.",
      delay: 2,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-green-100"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Guest Engagement Tools",
      description: "Nurture guest relationships before, during, and after their stay with personalized messaging and offers.",
      delay: 3,
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
      borderColor: "border-pink-100"
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Sentiment Analysis",
      description: "Monitor guest reviews and social mentions to identify opportunities to improve your property's reputation.",
      delay: 4,
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      borderColor: "border-amber-100"
    },
    {
      icon: <BellRing className="h-6 w-6" />,
      title: "Marketing Alerts",
      description: "Get notified about significant trends, competitor offers, and booking pattern changes that require immediate attention.",
      delay: 5,
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
      borderColor: "border-teal-100"
    }
  ];

  return (
    <section ref={featureRef} className="py-20 bg-gray-50" id="features">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-resort-900 mb-4">
            Everything Hospitality Marketers Need
          </h2>
          <p className="text-xl text-resort-600">
            GuestFlow combines AI-powered content creation, campaign management, and analytics to help you drive more direct bookings and increase guest lifetime value.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureItem 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
              bgColor={feature.bgColor}
              iconColor={feature.iconColor}
              borderColor={feature.borderColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
