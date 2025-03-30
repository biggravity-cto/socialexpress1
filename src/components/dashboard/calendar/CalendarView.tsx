
import React from 'react';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Post, Campaign } from '@/types/calendar';

interface CalendarViewProps {
  posts: Post[];
  campaigns: Campaign[];
  onCreatePost: (post: Omit<Post, 'id'>) => void;
  onUpdatePost: (id: string, updates: Partial<Post>) => void;
  onDeletePost: (id: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ 
  posts, 
  campaigns, 
  onCreatePost, 
  onUpdatePost, 
  onDeletePost 
}) => {
  const { toast } = useToast();

  return (
    <div className="p-4 text-center">
      <CalendarIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
      <p className="text-lg font-medium text-gray-700">Calendar View Outdated</p>
      <p className="text-gray-500 mb-4">This component has been replaced by CalendarPage</p>
      <Button 
        onClick={() => toast({
          title: "Info",
          description: "Please use CalendarPage instead of CalendarView"
        })}
      >
        Learn More
      </Button>
    </div>
  );
};
