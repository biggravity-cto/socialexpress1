
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Instagram, Twitter, Facebook, DragIcon, Globe, MoreHorizontal } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AnimatedCard from '../ui/AnimatedCard';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  platform: 'instagram' | 'twitter' | 'facebook';
  status: 'scheduled' | 'draft' | 'published' | 'pending_approval';
  language?: string;
}

// Sample data
const dummyEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Beach sunset promotional post',
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    time: '18:30',
    platform: 'instagram',
    status: 'published'
  },
  {
    id: '2',
    title: 'Weekend spa package announcement',
    date: new Date(),
    time: '10:00',
    platform: 'facebook',
    status: 'scheduled'
  },
  {
    id: '3',
    title: 'New luxury suite launch',
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    time: '14:15',
    platform: 'twitter',
    status: 'draft'
  },
  {
    id: '4',
    title: 'Summer cocktail promotion',
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    time: '16:45',
    platform: 'instagram',
    status: 'scheduled'
  },
  {
    id: '5',
    title: '객실 프로모션 안내',
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: '09:30',
    platform: 'instagram',
    status: 'pending_approval',
    language: 'Korean'
  },
  {
    id: '6',
    title: 'Chef\'s special dining experience',
    date: new Date(),
    time: '12:00',
    platform: 'facebook',
    status: 'pending_approval'
  }
];

const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDateEvents, setSelectedDateEvents] = useState<CalendarEvent[]>([]);
  const [draggingEvent, setDraggingEvent] = useState<string | null>(null);

  // Update events when date changes
  React.useEffect(() => {
    if (date) {
      const events = dummyEvents.filter(
        event => 
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear()
      );
      setSelectedDateEvents(events);
    } else {
      setSelectedDateEvents([]);
    }
  }, [date]);

  // Function to generate highlighted dates for the calendar
  const getHighlightedDates = () => {
    const uniqueDates = new Set<string>();
    
    dummyEvents.forEach(event => {
      const dateStr = event.date.toDateString();
      uniqueDates.add(dateStr);
    });
    
    return Array.from(uniqueDates).map(dateStr => new Date(dateStr));
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'pending_approval':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDragStart = (eventId: string) => {
    setDraggingEvent(eventId);
  };

  const handleDragEnd = () => {
    setDraggingEvent(null);
  };

  const handleDrop = (newDate: Date) => {
    if (draggingEvent) {
      // In a real app, this would update the event date in the database
      console.log(`Moving event ${draggingEvent} to ${newDate.toDateString()}`);
      // Reset the dragging state
      setDraggingEvent(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-5 lg:col-span-4">
        <AnimatedCard className="h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-resort-800">Content Calendar</h3>
            <Button variant="outline" size="sm" className="text-xs h-8">
              <CalendarIcon className="mr-1 h-3 w-3" /> Today
            </Button>
          </div>
          
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border pointer-events-auto"
            modifiers={{
              highlighted: getHighlightedDates()
            }}
            modifiersStyles={{
              highlighted: {
                fontWeight: 'bold',
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                color: 'rgb(3, 105, 161)'
              }
            }}
            onDayMouseEnter={(day) => {
              if (draggingEvent) {
                // Show visual feedback that this day is a drop target
                console.log(`Hovering over ${day.toDateString()} with event ${draggingEvent}`);
              }
            }}
            onDayClick={(day) => {
              if (draggingEvent) {
                handleDrop(day);
              }
            }}
          />
          
          <div className="mt-4 text-sm text-resort-500">
            <p>
              {date ? date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}
            </p>
            <div className="flex flex-col space-y-2 mt-3">
              <div className="flex items-center space-x-2">
                <span className="inline-block w-3 h-3 rounded-full bg-blue-100"></span>
                <span>Scheduled</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-100"></span>
                <span>Published</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-3 h-3 rounded-full bg-amber-100"></span>
                <span>Pending Approval</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-3 h-3 rounded-full bg-gray-100"></span>
                <span>Draft</span>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
      
      <div className="md:col-span-7 lg:col-span-8">
        <AnimatedCard className="h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium text-resort-800">
              {date ? date.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              }) : 'Events'}
            </h3>
            <Button size="sm" className="bg-ocean-600 hover:bg-ocean-700 h-8 text-xs">
              + Add Content
            </Button>
          </div>
          
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedDateEvents.map((event) => (
                <div 
                  key={event.id} 
                  className={cn(
                    "group p-3 rounded-lg border border-gray-100 hover:border-ocean-200 hover:bg-ocean-50/30 transition-all duration-300",
                    draggingEvent === event.id ? "opacity-50 border-dashed border-ocean-500" : "",
                    event.status === 'pending_approval' ? "border-l-4 border-l-amber-400" : ""
                  )}
                  draggable={true}
                  onDragStart={() => handleDragStart(event.id)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-1 flex-wrap gap-2">
                        <Badge className={cn("mr-2 px-2 py-0.5 text-xs font-normal", getStatusColor(event.status))}>
                          {event.status.replace('_', ' ')}
                        </Badge>
                        <span className="flex items-center text-resort-500 text-xs">
                          <span className="p-1 rounded-full bg-gray-50 mr-1.5">
                            {getPlatformIcon(event.platform)}
                          </span>
                          {event.platform.charAt(0).toUpperCase() + event.platform.slice(1)}
                        </span>
                        {event.language && (
                          <span className="flex items-center text-resort-500 text-xs">
                            <span className="p-1 rounded-full bg-gray-50 mr-1.5">
                              <Globe className="h-3 w-3" />
                            </span>
                            {event.language}
                          </span>
                        )}
                      </div>
                      <h4 className="font-medium text-resort-800">{event.title}</h4>
                      <div className="flex items-center mt-2 text-resort-500 text-xs">
                        <Clock className="mr-1 h-3 w-3" />
                        {event.time}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="cursor-move text-resort-400 p-1 rounded hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="9" cy="5" r="1" />
                          <circle cx="9" cy="12" r="1" />
                          <circle cx="9" cy="19" r="1" />
                          <circle cx="15" cy="5" r="1" />
                          <circle cx="15" cy="12" r="1" />
                          <circle cx="15" cy="19" r="1" />
                        </svg>
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-resort-500"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Edit Post</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          {event.status === 'pending_approval' && (
                            <DropdownMenuItem>Approve</DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4">
              <div className="text-resort-400 mb-3">
                <CalendarIcon className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-resort-800 mb-2">No events scheduled</h3>
              <p className="text-resort-500 text-sm mb-6">
                There are no posts scheduled for this date. Add a new post to get started.
              </p>
              <Button size="sm" className="bg-ocean-600 hover:bg-ocean-700">
                Create New Post
              </Button>
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-resort-500">
              Tip: You can drag and drop events to reschedule them to different dates.
            </p>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default CalendarView;
