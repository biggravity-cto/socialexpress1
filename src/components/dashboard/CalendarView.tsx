
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Instagram, Twitter, Facebook } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AnimatedCard from '../ui/AnimatedCard';
import { cn } from '@/lib/utils';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  platform: 'instagram' | 'twitter' | 'facebook';
  status: 'scheduled' | 'draft' | 'published';
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
    title: 'Weekend event announcement',
    date: new Date(),
    time: '10:00',
    platform: 'facebook',
    status: 'scheduled'
  },
  {
    id: '3',
    title: 'New spa package launch',
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
  }
];

const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDateEvents, setSelectedDateEvents] = useState<CalendarEvent[]>([]);

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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-5 lg:col-span-4">
        <AnimatedCard className="h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-resort-800">Calendar</h3>
            <Button variant="outline" size="sm" className="text-xs h-8">
              <CalendarIcon className="mr-1 h-3 w-3" /> Today
            </Button>
          </div>
          
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
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
          />
          
          <div className="mt-4 flex items-center justify-between text-sm text-resort-500">
            <p>
              {date ? date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}
            </p>
            <div className="flex items-center space-x-2">
              <span className="inline-block w-3 h-3 rounded-full bg-ocean-100"></span>
              <span>Events scheduled</span>
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
                  className="group p-3 rounded-lg border border-gray-100 hover:border-ocean-200 hover:bg-ocean-50/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <Badge className={cn("mr-2 px-2 py-0.5 text-xs font-normal", getStatusColor(event.status))}>
                          {event.status}
                        </Badge>
                        <span className="flex items-center text-resort-500 text-xs">
                          <span className="p-1 rounded-full bg-gray-50 mr-1.5">
                            {getPlatformIcon(event.platform)}
                          </span>
                          {event.platform.charAt(0).toUpperCase() + event.platform.slice(1)}
                        </span>
                      </div>
                      <h4 className="font-medium text-resort-800">{event.title}</h4>
                      <div className="flex items-center mt-2 text-resort-500 text-xs">
                        <Clock className="mr-1 h-3 w-3" />
                        {event.time}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50"
                    >
                      Edit
                    </Button>
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
        </AnimatedCard>
      </div>
    </div>
  );
};

export default CalendarView;
