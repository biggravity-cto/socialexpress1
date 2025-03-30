
import React from 'react';
import { ActivitySquare, ChevronRight, Calendar, Image, BarChart3, MessageSquare, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Activity {
  id: number;
  type: 'post' | 'calendar' | 'analytics' | 'comment' | 'system';
  title: string;
  description: string;
  time: string;
}

// Sample data
const recentActivities: Activity[] = [
  {
    id: 1,
    type: 'post',
    title: 'New post published',
    description: 'Your post "Summer Beach Vibes" was published on Instagram.',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'calendar',
    title: 'Event scheduled',
    description: 'Added 3 new posts to the content calendar for next week.',
    time: '4 hours ago'
  },
  {
    id: 3,
    type: 'analytics',
    title: 'Analytics report',
    description: 'Weekly analytics report is ready to view.',
    time: 'Yesterday'
  },
  {
    id: 4,
    type: 'comment',
    title: 'New comments',
    description: 'You have 12 new comments across your social platforms.',
    time: 'Yesterday'
  },
  {
    id: 5,
    type: 'post',
    title: 'Post draft created',
    description: 'A new draft "New Spa Package" was created.',
    time: '2 days ago'
  }
];

const ActivityIcon = ({ type }: { type: Activity['type'] }) => {
  const iconClasses = "h-5 w-5";
  
  switch (type) {
    case 'post':
      return <Image className={iconClasses} />;
    case 'calendar':
      return <Calendar className={iconClasses} />;
    case 'analytics':
      return <BarChart3 className={iconClasses} />;
    case 'comment':
      return <MessageSquare className={iconClasses} />;
    case 'system':
      return <User className={iconClasses} />;
    default:
      return <ActivitySquare className={iconClasses} />;
  }
};

const getActivityColor = (type: Activity['type']) => {
  switch (type) {
    case 'post':
      return 'bg-blue-100 text-blue-600';
    case 'calendar':
      return 'bg-purple-100 text-purple-600';
    case 'analytics':
      return 'bg-green-100 text-green-600';
    case 'comment':
      return 'bg-amber-100 text-amber-600';
    case 'system':
      return 'bg-gray-100 text-gray-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

interface RecentActivityProps {
  compact?: boolean;
}

const RecentActivity = ({ compact = false }: RecentActivityProps) => {
  return (
    <div className={cn(compact ? "p-0" : "p-6")}>
      {!compact && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-medium text-resort-800">Recent Activity</h3>
          <Button variant="ghost" size="sm" className="text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50 font-normal">
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="space-y-1">
        {recentActivities.map((activity) => (
          <div 
            key={activity.id}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className={cn(
              "p-2 rounded-full mt-0.5", 
              getActivityColor(activity.type)
            )}>
              <ActivityIcon type={activity.type} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-resort-800 truncate">{activity.title}</h4>
                <span className="text-xs text-resort-500 whitespace-nowrap ml-2">{activity.time}</span>
              </div>
              {!compact && (
                <p className="text-sm text-resort-600 mt-1">{activity.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {compact && (
        <div className="p-3 border-t border-gray-100">
          <Button variant="ghost" size="sm" className="w-full text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50">
            View All Activity
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
