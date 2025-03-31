
import React from 'react';
import { Post, Campaign } from '@/types/calendar';
import WeekHeader from './WeekHeader';
import DayContent from './DayContent';
import { getWeekDays, groupPostsByDate } from './helpers';

interface WeekViewProps {
  posts: Post[];
  campaigns: Campaign[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onEditPost?: (post: Post) => void;
  onDeletePost?: (id: string) => void;
  onCreatePost?: (date: Date) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ 
  posts, 
  campaigns, 
  selectedDate, 
  onSelectDate, 
  onEditPost, 
  onDeletePost, 
  onCreatePost 
}) => {
  const weekDays = getWeekDays(selectedDate);
  const postsByDate = groupPostsByDate(posts);
  
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Week header with day names */}
        <WeekHeader 
          weekDays={weekDays} 
          selectedDate={selectedDate} 
          onSelectDate={onSelectDate} 
        />
        
        {/* Week content with posts for each day */}
        <div className="grid grid-cols-7 divide-x divide-gray-200">
          {weekDays.map((day) => {
            const dateStr = day.toISOString().split('T')[0];
            const dayPosts = postsByDate[dateStr] || [];
            
            return (
              <DayContent
                key={dateStr}
                day={day}
                selectedDate={selectedDate}
                onSelectDate={onSelectDate}
                dayPosts={dayPosts}
                campaigns={campaigns}
                onEditPost={onEditPost}
                onDeletePost={onDeletePost}
                onCreatePost={onCreatePost}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
