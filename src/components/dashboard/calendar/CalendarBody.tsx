
import React from 'react';
import { isSameDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Post } from '@/types/calendar';

interface CalendarBodyProps {
  selectedDay: Date | undefined;
  setSelectedDay: (day: Date | undefined) => void;
  currentMonth: Date;
  posts: Post[];
}

export const CalendarBody: React.FC<CalendarBodyProps> = ({
  selectedDay,
  setSelectedDay,
  currentMonth,
  posts
}) => {
  // Helper function to determine if a date should be highlighted
  const isDayHighlighted = (day: Date) => {
    return posts.some(post => {
      const postDate = new Date(post.date);
      return isSameDay(postDate, day);
    });
  };

  return (
    <Calendar
      mode="single"
      selected={selectedDay}
      onSelect={setSelectedDay}
      month={currentMonth}
      className="rounded-md border shadow-sm"
      modifiers={{
        highlighted: isDayHighlighted
      }}
      modifiersStyles={{
        highlighted: { backgroundColor: '#f0f9ff' }
      }}
    />
  );
};
