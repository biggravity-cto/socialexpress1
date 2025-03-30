
import React from 'react';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { PostsList } from './PostsList';
import { CalendarIcon } from 'lucide-react';
import { Post, Campaign } from '@/types/calendar';

interface CalendarViewProps {
  posts: Post[];
  campaigns: Campaign[];
  selectedDay: Date;
  onCreatePost: (post: Omit<Post, 'id'>) => void;
  onUpdatePost: (id: string, updates: Partial<Post>) => void;
  onDeletePost: (id: string) => void;
  setShowPostCreator: (show: boolean) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ 
  posts, 
  campaigns, 
  selectedDay,
  onCreatePost, 
  onUpdatePost, 
  onDeletePost,
  setShowPostCreator
}) => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{`Posts for ${format(selectedDay, 'MMMM d, yyyy')}`}</h2>
        <Button onClick={() => setShowPostCreator(true)}>
          Create Post
        </Button>
      </div>
      
      <PostsList 
        selectedDay={selectedDay}
        posts={posts}
        campaigns={campaigns}
        setShowPostCreator={setShowPostCreator}
        onUpdatePost={onUpdatePost}
        onDeletePost={onDeletePost}
      />
    </Card>
  );
};
