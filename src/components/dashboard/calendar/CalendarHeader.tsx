
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Share,
  LayoutGrid,
  Columns,
  CalendarIcon,
  ListFilter
} from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface CalendarHeaderProps {
  currentMonth: Date;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  handleToday: () => void;
  viewMode: string;
  setViewMode: (mode: string) => void;
  filteredCount: number;
  setFilterOpen: (open: boolean) => void;
  filterOpen: boolean;
  openPostCreator: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  handlePrevMonth,
  handleNextMonth,
  handleToday,
  viewMode,
  setViewMode,
  filteredCount,
  setFilterOpen,
  filterOpen,
  openPostCreator
}) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left side controls */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-medium min-w-28 text-center">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <Button variant="outline" size="sm" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleToday}>
            Today
          </Button>
        </div>
        
        {/* Right side controls */}
        <div className="flex flex-wrap items-center gap-2">
          <ToggleGroup type="single" value={viewMode} onValueChange={(val) => val && setViewMode(val)}>
            <ToggleGroupItem value="list" aria-label="List View">
              <CalendarIcon className="h-4 w-4 mr-1" />
              Day
            </ToggleGroupItem>
            <ToggleGroupItem value="week" aria-label="Week View">
              <Columns className="h-4 w-4 mr-1" />
              Week
            </ToggleGroupItem>
            <ToggleGroupItem value="month" aria-label="Month View">
              <LayoutGrid className="h-4 w-4 mr-1" />
              Month
            </ToggleGroupItem>
          </ToggleGroup>
          
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <ListFilter className="h-4 w-4 mr-1" />
            Filters {filteredCount > 0 && `(${filteredCount})`}
          </Button>
          
          <Button size="sm" onClick={openPostCreator}>
            <Plus className="h-4 w-4 mr-1" />
            Create Post
          </Button>
        </div>
      </div>
    </div>
  );
};
