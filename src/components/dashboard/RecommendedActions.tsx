
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const RecommendedActions: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="mb-8 p-4 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-medium text-resort-800">Recommended Actions</h3>
          <p className="text-sm text-resort-500">AI-powered suggestions to optimize your marketing</p>
        </div>
        <Button variant="outline" className="mt-2 md:mt-0 bg-white">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          {
            title: "Create a wellness campaign",
            description: "Your audience shows high interest in wellness content",
            path: "/campaigns",
            color: "border-purple-100 bg-white"
          },
          {
            title: "Optimize posting schedule",
            description: "Your audience is most active between 6-8 PM",
            path: "/calendar",
            color: "border-blue-100 bg-white"
          },
          {
            title: "Respond to trending topic",
            description: "Eco-friendly amenities are trending in your industry",
            path: "/content",
            color: "border-green-100 bg-white"
          }
        ].map((action, index) => (
          <Link key={index} to={action.path} className="block">
            <div className={`p-4 rounded-lg border ${action.color} hover:shadow-md transition-shadow duration-200`}>
              <h4 className="font-medium text-resort-800">{action.title}</h4>
              <p className="text-sm text-resort-500 mt-1">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default RecommendedActions;
