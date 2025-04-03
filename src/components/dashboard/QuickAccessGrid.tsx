
import React from 'react';
import { Calendar, MessageSquare, Sparkles, ClipboardCheck, LineChart, BarChart } from 'lucide-react';
import QuickAccessCard from './QuickAccessCard';

const QuickAccessGrid: React.FC = () => {
  const quickAccessItems = [
    {
      title: "Marketing Calendar",
      description: "Plan seasonal offers, automate promotions, and optimize guest engagement.",
      icon: <Calendar className="h-6 w-6 text-blue-600" />,
      path: "/calendar",
      color: "from-blue-50 to-white",
      delay: 0,
      cta: "Plan Campaigns That Fill Rooms"
    },
    {
      title: "AI Content Studio",
      description: "Effortlessly craft engaging hotel promotions, social content, and email campaigns.",
      icon: <Sparkles className="h-6 w-6 text-purple-600" />,
      path: "/content",
      color: "from-purple-50 to-white",
      delay: 1,
      cta: "Create Offers That Drive Bookings"
    },
    {
      title: "Analytics & Insights",
      description: "Track campaign ROI, guest engagement, and booking trends—all in real time.",
      icon: <BarChart className="h-6 w-6 text-amber-600" />,
      path: "/analytics",
      color: "from-amber-50 to-white",
      delay: 2,
      cta: "Turn Guest Data into Smarter Marketing"
    },
    {
      title: "Brand Intelligence",
      description: "Stay ahead with guest sentiment analysis, competitor benchmarking, and trend tracking.",
      icon: <LineChart className="h-6 w-6 text-green-600" />,
      path: "/brand-intelligence",
      color: "from-green-50 to-white",
      delay: 3,
      cta: "Stay on Top of Guest Sentiment"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {quickAccessItems.map((item, index) => (
        <QuickAccessCard
          key={index}
          title={item.title}
          description={item.description}
          icon={item.icon}
          path={item.path}
          color={item.color}
          delay={item.delay}
          cta={item.cta}
        />
      ))}
    </div>
  );
};

export default QuickAccessGrid;
