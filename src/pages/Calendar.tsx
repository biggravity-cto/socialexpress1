
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, ListFilter, Plus, ChevronLeft, ChevronRight, Settings2, Instagram, Twitter, Facebook } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Define campaign type
interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  color: string;
}

// Define post type
interface Post {
  id: string;
  title: string;
  date: Date;
  platform: 'instagram' | 'twitter' | 'facebook';
  type: string;
  campaign?: string;
}

// Sample campaigns
const campaigns: Campaign[] = [
  { 
    id: '1', 
    name: 'Spring Campaign', 
    startDate: '2023-02-05', 
    endDate: '2023-02-11', 
    color: 'bg-blue-100 border-blue-300' 
  },
  { 
    id: '2', 
    name: 'Early Summer Promo', 
    startDate: '2023-02-12', 
    endDate: '2023-02-18', 
    color: 'bg-amber-100 border-amber-300'
  },
  { 
    id: '3', 
    name: 'No Promo', 
    startDate: '2023-02-19', 
    endDate: '2023-02-25', 
    color: 'bg-red-100 border-red-300'
  }
];

// Sample posts for the calendar
const posts: Post[] = [
  { 
    id: '1', 
    title: 'Weekly Update', 
    date: new Date(2023, 1, 30), // Feb 30th 2023
    platform: 'twitter', 
    type: 'Weekly Update',
    campaign: '1'
  },
  { 
    id: '2', 
    title: 'Instagram Post', 
    date: new Date(2023, 1, 2), // Feb 2nd 2023
    platform: 'instagram', 
    type: 'Post',
    campaign: '1'
  },
  { 
    id: '3', 
    title: 'Twitter Post', 
    date: new Date(2023, 1, 2), // Feb 2nd 2023
    platform: 'twitter', 
    type: 'Post',
    campaign: '1'
  },
  // More posts for the first campaign week
  { 
    id: '4', 
    title: 'Weekly Update', 
    date: new Date(2023, 1, 6), // Feb 6th 2023
    platform: 'twitter', 
    type: 'Weekly Update',
    campaign: '1'
  },
  { 
    id: '5', 
    title: 'Instagram Post', 
    date: new Date(2023, 1, 6), // Feb 6th 2023
    platform: 'instagram', 
    type: 'Post',
    campaign: '1'
  },
  { 
    id: '6', 
    title: 'Facebook Post', 
    date: new Date(2023, 1, 6), // Feb 6th 2023
    platform: 'facebook', 
    type: 'Post',
    campaign: '1'
  },
  { 
    id: '7', 
    title: 'Twitter Post', 
    date: new Date(2023, 1, 7), // Feb 7th 2023
    platform: 'twitter', 
    type: 'Post',
    campaign: '1'
  },
  { 
    id: '8', 
    title: 'Instagram Post', 
    date: new Date(2023, 1, 8), // Feb 8th 2023
    platform: 'instagram', 
    type: 'Post',
    campaign: '1'
  },
  { 
    id: '9', 
    title: 'Weekly Update', 
    date: new Date(2023, 1, 13), // Feb 13th 2023
    platform: 'twitter', 
    type: 'Weekly Update',
    campaign: '2'
  },
  { 
    id: '10', 
    title: 'Facebook Post', 
    date: new Date(2023, 1, 13), // Feb 13th 2023
    platform: 'facebook', 
    type: 'Post',
    campaign: '2'
  },
  { 
    id: '11', 
    title: 'Instagram Post', 
    date: new Date(2023, 1, 14), // Feb 14th 2023
    platform: 'instagram', 
    type: 'Post',
    campaign: '2'
  },
  { 
    id: '12', 
    title: 'Weekly Update', 
    date: new Date(2023, 1, 20), // Feb 20th 2023
    platform: 'twitter', 
    type: 'Weekly Update',
    campaign: '3'
  }
];

// Function to get platform icon
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

const Calendar = () => {
  const isMobile = useIsMobile();
  const [currentMonth, setCurrentMonth] = useState(new Date(2023, 1)); // February 2023
  const [activeView, setActiveView] = useState('month');
  const [showPostCreator, setShowPostCreator] = useState(false);
  
  // Generate calendar days for the month view
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
    
    // Get the last day of the previous month
    const lastDayPrevMonth = new Date(year, month, 0).getDate();
    
    const days = [];
    
    // Add days from previous month to fill the first week
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, lastDayPrevMonth - i),
        isCurrentMonth: false
      });
    }
    
    // Add days of current month
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Add days from next month to complete the grid (6 rows x 7 columns = 42 cells)
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };
  
  // Group days into weeks for the month view
  const calendarWeeks = () => {
    const days = generateCalendarDays();
    const weeks = [];
    
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    
    return weeks;
  };
  
  // Get posts for a specific date
  const getPostsForDate = (date: Date) => {
    return posts.filter(post => 
      post.date.getDate() === date.getDate() &&
      post.date.getMonth() === date.getMonth() &&
      post.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Get campaign for a specific date
  const getCampaignForDate = (date: Date) => {
    return campaigns.find(campaign => {
      const start = new Date(campaign.startDate);
      const end = new Date(campaign.endDate);
      return date >= start && date <= end;
    });
  };
  
  // Navigate to previous month
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  
  // Set to current month
  const goToToday = () => {
    setCurrentMonth(new Date(2023, 1)); // February 2023 for the example
  };
  
  // Format month and year
  const formatMonthYear = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">Content Calendar</h1>
          <p className="text-resort-500">Plan and schedule your content across platforms</p>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="flex items-center"
          >
            <ListFilter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button 
            className="bg-ocean-600 hover:bg-ocean-700 text-white"
            onClick={() => setShowPostCreator(!showPostCreator)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Content
          </Button>
        </div>
      </div>
      
      {/* Calendar Navigation and Tools */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-3 justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold ml-2">{formatMonthYear(currentMonth)}</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <Tabs defaultValue="month" onValueChange={setActiveView} className="w-auto">
              <TabsList>
                <TabsTrigger value="list">List</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Share Calendar</DropdownMenuItem>
                <DropdownMenuItem>Export Schedule</DropdownMenuItem>
                <DropdownMenuItem>Calendar Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>
      
      {/* Campaign Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">Sources:</span>
          {[
            { platform: 'twitter', count: 2, color: 'bg-blue-100 text-blue-800' },
            { platform: 'facebook', count: 1, color: 'bg-indigo-100 text-indigo-800' },
            { platform: 'instagram', count: 1, color: 'bg-pink-100 text-pink-800' }
          ].map((source) => (
            <Badge key={source.platform} className={`mr-1 ${source.color}`}>
              {getPlatformIcon(source.platform)} {source.count}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">Message Types:</span>
          {[
            { type: 'Update', count: 3, color: 'bg-green-100 text-green-800' },
            { type: 'Promo', count: 5, color: 'bg-purple-100 text-purple-800' },
            { type: 'Post', count: 2, color: 'bg-amber-100 text-amber-800' }
          ].map((type) => (
            <Badge key={type.type} className={`mr-1 ${type.color}`}>
              {type.count} {type.type}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center ml-auto">
          <Button variant="ghost" size="sm" className="text-resort-500">
            Reset filters
          </Button>
        </div>
      </div>
      
      {/* Calendar View */}
      <div className={`w-full ${isMobile ? 'overflow-x-auto' : ''}`}>
        <div className={`min-w-[900px] lg:min-w-0 border rounded-lg bg-white overflow-hidden`}>
          {/* Month View */}
          <Table>
            <TableHeader>
              <TableRow>
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                  <TableHead key={day} className="text-center font-medium p-2">
                    {day}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {calendarWeeks().map((week, weekIndex) => {
                // Find campaign for this week
                const weekDate = week[0].date;
                const campaign = getCampaignForDate(weekDate);
                
                return (
                  <React.Fragment key={weekIndex}>
                    {/* Campaign Banner - only show at the start of a campaign */}
                    {campaign && week[0].date.getDate() === new Date(campaign.startDate).getDate() && (
                      <TableRow className="h-8">
                        <TableCell colSpan={7} className={`${campaign.color} p-1 border`}>
                          <div className="text-xs font-medium">
                            {campaign.name} {new Date(campaign.startDate).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })} – {new Date(campaign.endDate).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                    
                    {/* Calendar Week */}
                    <TableRow className="h-24">
                      {week.map((day, dayIndex) => {
                        const dayPosts = getPostsForDate(day.date);
                        const isCurrentDay = day.date.getDate() === 1; // For highlighting
                        
                        return (
                          <TableCell 
                            key={dayIndex} 
                            className={`relative border p-1 align-top ${day.isCurrentMonth ? '' : 'bg-gray-50 text-gray-400'} ${isCurrentDay ? 'font-bold' : ''}`}
                          >
                            <div className="mb-1 p-1">{day.date.getDate()}</div>
                            
                            {/* Day Posts */}
                            <div className="space-y-1">
                              {dayPosts.map(post => (
                                <div 
                                  key={post.id}
                                  className="flex items-center p-1 rounded text-xs bg-white border border-gray-200 cursor-pointer hover:bg-gray-50"
                                >
                                  {post.type === 'Weekly Update' ? (
                                    <Badge className="bg-green-100 text-green-800 text-xs py-0 px-2">
                                      Weekly Update
                                    </Badge>
                                  ) : (
                                    <div className="flex items-center">
                                      {getPlatformIcon(post.platform)}
                                      <span className="ml-1">{post.platform === 'instagram' ? '1' : post.platform === 'twitter' ? '2' : '1'}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
};

export default Calendar;
