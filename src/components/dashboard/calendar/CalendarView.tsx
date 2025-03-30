
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Campaign, Post } from '@/types/calendar';
import { Card } from '@/components/ui/card';
import { CalendarHeader } from './CalendarHeader';
import { CalendarBody } from './CalendarBody';
import { PostsList } from './PostsList';
import { PostCreatorDialog } from './PostCreatorDialog';

interface CalendarViewProps {
  posts: Post[];
  campaigns: Campaign[];
  onCreatePost: (post: any) => void;
  onUpdatePost: (id: string, post: any) => void;
  onDeletePost: (id: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  posts,
  campaigns,
  onCreatePost,
  onUpdatePost,
  onDeletePost
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [showPostCreator, setShowPostCreator] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '12:00',
    platform: 'instagram',
    type: 'image',
    content: '',
    status: 'draft'
  });

  const handleCreatePost = () => {
    const postData = {
      ...newPost,
      date: selectedDay ? format(selectedDay, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')
    };
    onCreatePost(postData);
    setShowPostCreator(false);
    setNewPost({
      title: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '12:00',
      platform: 'instagram',
      type: 'image',
      content: '',
      status: 'draft'
    });
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <CalendarHeader 
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          view={view}
          setView={setView}
          setShowPostCreator={setShowPostCreator}
        />
        
        <CalendarBody 
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          currentMonth={currentMonth}
          posts={posts}
        />
      </Card>

      {selectedDay && (
        <PostsList 
          selectedDay={selectedDay}
          posts={posts}
          campaigns={campaigns}
          setShowPostCreator={setShowPostCreator}
        />
      )}

      <PostCreatorDialog 
        showPostCreator={showPostCreator}
        setShowPostCreator={setShowPostCreator}
        newPost={newPost}
        setNewPost={setNewPost}
        handleCreatePost={handleCreatePost}
      />
    </div>
  );
};
