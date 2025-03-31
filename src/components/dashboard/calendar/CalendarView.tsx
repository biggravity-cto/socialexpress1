
import React from 'react';
import { Post, Campaign } from '@/types/calendar';
import DayView from './DayView';
import WeekView from './WeekView';
import MonthView from './MonthView';

interface CalendarViewProps {
  posts: Post[];
  campaigns: Campaign[];
  currentMonth: Date;
  onSelectDate: (date: Date) => void;
  selectedDate: Date;
  onEditPost?: (post: Post) => void;
  onDeletePost?: (id: string) => void;
  viewMode: string;
  onCreatePost?: (date: Date) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ 
  posts, 
  campaigns, 
  currentMonth,
  onSelectDate,
  selectedDate,
  onEditPost,
  onDeletePost,
  viewMode,
  onCreatePost
}) => {
  // If we're in day view, just show the selected date's posts
  if (viewMode === 'list') {
    return (
      <DayView 
        posts={posts} 
        campaigns={campaigns} 
        selectedDate={selectedDate} 
        onEditPost={onEditPost}
        onDeletePost={onDeletePost}
        onCreatePost={onCreatePost}
      />
    );
  }
  
  // If we're in week view, show the current week
  if (viewMode === 'week') {
    return (
      <WeekView 
        posts={posts} 
        campaigns={campaigns} 
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
        onEditPost={onEditPost}
        onDeletePost={onDeletePost}
        onCreatePost={onCreatePost}
      />
    );
  }
  
  // Default to month view
  return (
    <MonthView
      posts={posts}
      campaigns={campaigns}
      currentMonth={currentMonth}
      onSelectDate={onSelectDate}
      selectedDate={selectedDate}
      onEditPost={onEditPost}
      onDeletePost={onDeletePost}
      onCreatePost={onCreatePost}
    />
  );
};
