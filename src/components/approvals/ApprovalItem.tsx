
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Image, FileText, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Creator {
  name: string;
  avatar: string;
  initials: string;
}

export interface ApprovalItemProps {
  id: number;
  title: string;
  contentType: string;
  platform: string;
  dueDate: string;
  creator: Creator;
  priority: 'high' | 'medium' | 'low';
  status?: 'pending' | 'approved' | 'declined';
}

const ApprovalItem: React.FC<ApprovalItemProps> = ({
  id,
  title,
  contentType,
  platform,
  dueDate,
  creator,
  priority,
  status = 'pending'
}) => {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">Low</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  const getContentTypeIcon = (contentType: string) => {
    switch (contentType.toLowerCase()) {
      case 'post':
        return <Image className="h-4 w-4" />;
      case 'story':
        return <Clock className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'video':
        return <Calendar className="h-4 w-4" />;
      default:
        return <Image className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">Approved</Badge>;
      case 'declined':
        return <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">Declined</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card key={id} className="p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 p-2 bg-ocean-50 rounded-md">
            {getContentTypeIcon(contentType)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium text-resort-800">{title}</h3>
              {status !== 'pending' && getStatusBadge(status)}
              {getPriorityBadge(priority)}
            </div>
            <div className="flex flex-wrap items-center mt-1 gap-x-3 gap-y-1 text-sm text-resort-500">
              <span className="flex items-center">
                <span className="font-medium">{contentType}</span>
                <span className="mx-1.5">•</span>
                <span>{platform}</span>
              </span>
              <span className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>Due: {dueDate}</span>
              </span>
              <span className="flex items-center">
                <span>By:</span>
                <Avatar className="h-5 w-5 ml-1.5">
                  <AvatarImage src={creator.avatar} alt={creator.name} />
                  <AvatarFallback className="text-[10px]">{creator.initials}</AvatarFallback>
                </Avatar>
                <span className="ml-1">{creator.name}</span>
              </span>
            </div>
          </div>
        </div>
        {status === 'pending' && (
          <div className="flex items-center justify-end gap-2 mt-4 lg:mt-0">
            <Button variant="outline" size="sm">Decline</Button>
            <Button className="bg-ocean-600 hover:bg-ocean-700" size="sm">Review & Approve</Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ApprovalItem;
