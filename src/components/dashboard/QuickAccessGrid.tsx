
import React from 'react';
import { Calendar, MessageSquare, Library, ClipboardCheck } from 'lucide-react';
import QuickAccessCard from './QuickAccessCard';

const QuickAccessGrid: React.FC = () => {
  const quickAccessItems = [
    {
      title: "AI Marketing Calendar",
      description: "View and manage your upcoming content schedule",
      icon: <Calendar className="h-6 w-6 text-purple-600" />,
      path: "/calendar",
      color: "from-purple-50 to-white",
      delay: 0
    },
    {
      title: "Content Studio",
      description: "Browse and manage your content assets",
      icon: <Library className="h-6 w-6 text-blue-600" />,
      path: "/content",
      color: "from-blue-50 to-white",
      delay: 1
    },
    {
      title: "Approvals",
      description: "Review pending content approvals and workflows",
      icon: <ClipboardCheck className="h-6 w-6 text-green-600" />,
      path: "/approvals",
      color: "from-green-50 to-white",
      delay: 2
    },
    {
      title: "Unified Social Inbox",
      description: "Manage comments and direct messages",
      icon: <MessageSquare className="h-6 w-6 text-amber-600" />,
      path: "/messages",
      color: "from-amber-50 to-white",
      delay: 3
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
        />
      ))}
    </div>
  );
};

export default QuickAccessGrid;
