
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RecentActivity from './RecentActivity';

const RecentActivityCard: React.FC = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-medium text-resort-800">Recent Activity</h3>
        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">3 new</Badge>
      </div>
      <RecentActivity compact={true} />
    </Card>
  );
};

export default RecentActivityCard;
