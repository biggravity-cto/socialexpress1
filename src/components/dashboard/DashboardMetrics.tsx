
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, BarChart3, LineChart } from 'lucide-react';

const DashboardMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[
        { 
          title: 'Content Engagement', 
          value: '78%', 
          change: '+12%', 
          icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
          color: 'bg-emerald-50 border-emerald-100'
        },
        { 
          title: 'Audience Growth', 
          value: '2,456', 
          change: '+256', 
          icon: <Users className="h-5 w-5 text-blue-500" />,
          color: 'bg-blue-50 border-blue-100'
        },
        { 
          title: 'Campaign ROI', 
          value: '182%', 
          change: '+24%', 
          icon: <BarChart3 className="h-5 w-5 text-purple-500" />,
          color: 'bg-purple-50 border-purple-100'
        },
        { 
          title: 'Brand Sentiment', 
          value: '92%', 
          change: '+7%', 
          icon: <LineChart className="h-5 w-5 text-amber-500" />,
          color: 'bg-amber-50 border-amber-100'
        }
      ].map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`rounded-xl p-4 border shadow-sm ${metric.color}`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
            <div className="p-2 rounded-full bg-white shadow-sm">
              {metric.icon}
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold mr-2">{metric.value}</span>
            <span className="text-xs font-medium text-emerald-600">{metric.change}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardMetrics;
