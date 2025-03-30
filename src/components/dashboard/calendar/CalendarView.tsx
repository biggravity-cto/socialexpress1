
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths } from 'date-fns';
import { Campaign, Post } from '@/types/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Plus, Filter, CalendarIcon, List, LayoutGrid, Twitter, Instagram, Facebook } from 'lucide-react';
import { PostCreatorDialog } from './PostCreatorDialog';
import { PostsList } from './PostsList';

interface CalendarViewProps {
  posts: Post[];
  campaigns: Campaign[];
  onCreatePost: (post: any) => void;
  onUpdatePost: (id: string, post: any) => void;
  onDeletePost: (id: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  posts,
  campaigns,
  onCreatePost,
  onUpdatePost,
  onDeletePost
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [showPostCreator, setShowPostCreator] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '12:00',
    platform: 'instagram',
    type: 'image',
    content: '',
    status: 'draft'
  });

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleToday = () => {
    setCurrentMonth(new Date());
    setSelectedDay(new Date());
  };

  const handleCreatePost = () => {
    const postData = {
      ...newPost,
      date: selectedDay ? format(selectedDay, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')
    };
    onCreatePost(postData);
    setShowPostCreator(false);
    setNewPost({
      title: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '12:00',
      platform: 'instagram',
      type: 'image',
      content: '',
      status: 'draft'
    });
  };

  const renderCalendarHeader = () => {
    return (
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handleToday}>Today</Button>
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
            <Filter className="h-4 w-4 mr-2" />
            Filters
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

  const getDayClassName = (day: Date) => {
    let className = "h-full min-h-[100px] p-1 border border-gray-200 ";
    
    // If not in current month
    if (!isSameMonth(day, currentMonth)) {
      className += "bg-gray-50 text-gray-400 ";
    }
    
    // If selected day
    if (selectedDay && isSameDay(day, selectedDay)) {
      className += "ring-2 ring-blue-500 ";
    }
    
    // If today
    if (isSameDay(day, new Date())) {
      className += "bg-blue-50 ";
    }
    
    return className;
  };

  const getCampaignForDate = (date: Date) => {
    return campaigns.find(campaign => {
      const start = new Date(campaign.startdate);
      const end = new Date(campaign.enddate);
      return date >= start && date <= end;
    });
  };

  const getPostsForDate = (date: Date) => {
    return posts.filter(post => {
      const postDate = new Date(post.date);
      return isSameDay(postDate, date);
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className="h-4 w-4 text-blue-400" />;
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case 'facebook':
        return <Facebook className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const renderMonthView = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const dateRange = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Add days from previous month to start from Sunday
    const startDay = monthStart.getDay();
    let prevMonthDays = [];
    for (let i = startDay; i > 0; i--) {
      const date = new Date(monthStart);
      date.setDate(monthStart.getDate() - i);
      prevMonthDays.push(date);
    }
    
    // Add days from next month to end on Saturday
    const endDay = monthEnd.getDay();
    let nextMonthDays = [];
    for (let i = 1; i < 7 - endDay; i++) {
      const date = new Date(monthEnd);
      date.setDate(monthEnd.getDate() + i);
      nextMonthDays.push(date);
    }
    
    const allDays = [...prevMonthDays, ...dateRange, ...nextMonthDays];
    
    return (
      <div className="bg-white rounded-md shadow-sm">
        <div className="grid grid-cols-7 text-center py-2 border-b">
          {days.map(day => (
            <div key={day} className="font-medium text-sm text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {allDays.map((day, i) => {
            const dayPosts = getPostsForDate(day);
            const campaign = getCampaignForDate(day);
            
            return (
              <div 
                key={i} 
                className={getDayClassName(day)}
                onClick={() => setSelectedDay(day)}
              >
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium">{format(day, 'd')}</span>
                  
                  {campaign && (
                    <div className="px-1.5 py-0.5 text-xs rounded-sm" 
                      style={{ backgroundColor: campaign.color || '#e5e7eb' }}>
                      {campaign.name}
                    </div>
                  )}
                </div>
                
                <div className="mt-1 space-y-1">
                  {dayPosts.slice(0, 3).map((post, idx) => (
                    <div key={idx} className="flex items-center text-xs p-1 bg-gray-50 rounded">
                      {getPlatformIcon(post.platform)}
                      <span className="ml-1 truncate">{post.title}</span>
                    </div>
                  ))}
                  
                  {dayPosts.length > 3 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{dayPosts.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    // Week view implementation would go here
    return (
      <div className="bg-white p-4 rounded-md shadow">
        <div className="text-center py-12">
          <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">Week view coming soon</h3>
          <p className="text-gray-500">This feature is under development</p>
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    // Day view implementation would go here
    return (
      <div className="bg-white p-4 rounded-md shadow">
        <div className="text-center py-12">
          <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">Day view coming soon</h3>
          <p className="text-gray-500">This feature is under development</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        {renderCalendarHeader()}
        
        {view === 'month' && renderMonthView()}
        {view === 'week' && renderWeekView()}
        {view === 'day' && renderDayView()}
      </Card>

      {selectedDay && (
        <PostsList 
          selectedDay={selectedDay}
          posts={posts}
          campaigns={campaigns}
          setShowPostCreator={setShowPostCreator}
        />
      )}

      <PostCreatorDialog 
        showPostCreator={showPostCreator}
        setShowPostCreator={setShowPostCreator}
        newPost={newPost}
        setNewPost={setNewPost}
        handleCreatePost={handleCreatePost}
      />
    </div>
  );
};
