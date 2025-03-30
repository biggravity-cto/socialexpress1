
import React from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ListFilter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  view: 'month' | 'week' | 'day';
  setView: (view: 'month' | 'week' | 'day') => void;
  setShowPostCreator: (show: boolean) => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  setCurrentMonth,
  view,
  setView,
  setShowPostCreator
}) => {
  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={handlePrevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={() => setCurrentMonth(new Date())}>Today</Button>
        <Button variant="outline" size="icon" onClick={handleNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold ml-2">{format(currentMonth, 'MMMM yyyy')}</h2>
      </div>
      
      <div className="flex items-center space-x-2">
        <Tabs defaultValue={view} onValueChange={(value) => setView(value as any)}>
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button 
          variant="outline" 
          className="flex items-center"
        >
          <ListFilter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setShowPostCreator(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </div>
    </div>
  );
};
