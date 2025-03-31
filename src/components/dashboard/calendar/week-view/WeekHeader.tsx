
import React from 'react';
import { format, isSameDay, isToday } from 'date-fns';

interface WeekHeaderProps {
  weekDays: Date[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const WeekHeader: React.FC<WeekHeaderProps> = ({ 
  weekDays, 
  selectedDate, 
  onSelectDate 
}) => {
  return (
    <div className="grid grid-cols-7 border-b border-gray-200">
      {weekDays.map((day) => (
        <div 
          key={format(day, 'yyyy-MM-dd')} 
          className={`py-2 text-center ${isSameDay(day, selectedDate) ? 'font-bold bg-blue-50' : 'font-medium'}`}
          onClick={() => onSelectDate(day)}
        >
          <div>{format(day, 'EEE')}</div>
          <div className={`text-xl ${isToday(day) ? 'bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto' : ''}`}>
            {format(day, 'd')}
          </div>
          <div className="text-gray-500 text-sm">{format(day, 'MMM')}</div>
        </div>
      ))}
    </div>
  );
};

export default WeekHeader;
