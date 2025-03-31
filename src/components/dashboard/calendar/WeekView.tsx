
import React from 'react';
import WeekViewComponent from './week-view';
import { Post, Campaign } from '@/types/calendar';

interface WeekViewProps {
  posts: Post[];
  campaigns: Campaign[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onEditPost?: (post: Post) => void;
  onDeletePost?: (id: string) => void;
  onCreatePost?: (date: Date) => void;
}

const WeekView: React.FC<WeekViewProps> = (props) => {
  return <WeekViewComponent {...props} />;
};

export default WeekView;
