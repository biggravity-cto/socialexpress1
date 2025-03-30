
import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, startOfWeek, endOfWeek, addDays } from 'date-fns';
import { Campaign, Post } from '@/types/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Plus, Filter, Calendar as CalendarIcon, List, LayoutGrid, Twitter, Instagram, Facebook, MoreHorizontal, Search, RefreshCw } from 'lucide-react';
import { PostCreatorDialog } from './PostCreatorDialog';
import { PostsList } from './PostsList';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [showPostCreator, setShowPostCreator] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '12:00',
    platform: 'instagram',
    type: 'image',
    content: '',
    status: 'draft'
  });

  // Filter states
  const [platformFilter, setPlatformFilter] = useState<string | null>(null);
  const [campaignFilter, setCampaignFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

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

  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Refreshed",
        description: "Calendar data has been updated",
      });
    }, 1000);
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

  const filteredPosts = posts.filter(post => {
    if (platformFilter && post.platform !== platformFilter) return false;
    if (statusFilter && post.status !== statusFilter) return false;
    if (campaignFilter && post.campaign_id !== campaignFilter) return false;
    return true;
  });

  const renderCalendarHeader = () => {
    return (
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handleToday}>Today</Button>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold ml-2">{format(currentMonth, 'MMMM yyyy')}</h2>
          <Button variant="ghost" size="icon" onClick={refreshData} className={isRefreshing ? "animate-spin" : ""}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center">
            <Tabs defaultValue={view} onValueChange={(value) => setView(value as any)}>
              <TabsList>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Calendar</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Platform</label>
                  <Select value={platformFilter || ""} onValueChange={(value) => setPlatformFilter(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All platforms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All platforms</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campaign</label>
                  <Select value={campaignFilter || ""} onValueChange={(value) => setCampaignFilter(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All campaigns" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All campaigns</SelectItem>
                      {campaigns.map((campaign) => (
                        <SelectItem key={campaign.id} value={campaign.id}>{campaign.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All statuses</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="pending_approval">Pending Approval</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setPlatformFilter(null);
                      setCampaignFilter(null);
                      setStatusFilter(null);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
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
    let className = "h-full min-h-[120px] p-2 border border-gray-200 transition-colors duration-200 ";
    
    // If not in current month
    if (!isSameMonth(day, currentMonth)) {
      className += "bg-gray-50 text-gray-400 ";
    }
    
    // If selected day
    if (selectedDay && isSameDay(day, selectedDay)) {
      className += "ring-2 ring-blue-500 bg-blue-50 ";
    }
    
    // If today
    if (isSameDay(day, new Date())) {
      className += "bg-blue-50 font-bold ";
    }

    // Interactive hover
    className += "hover:bg-gray-50 cursor-pointer ";
    
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
    return filteredPosts.filter(post => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'pending_approval':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const renderMonthView = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    
    // Start from the beginning of the week containing the first day of the month
    const calendarStart = startOfWeek(monthStart);
    // End at the end of the week containing the last day of the month
    const calendarEnd = endOfWeek(monthEnd);
    
    const dateRange = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    
    return (
      <div className="bg-white rounded-md shadow-sm">
        <div className="grid grid-cols-7 text-center py-2 border-b bg-gray-50">
          {days.map(day => (
            <div key={day} className="font-medium text-sm text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {dateRange.map((day, i) => {
            const dayPosts = getPostsForDate(day);
            const campaign = getCampaignForDate(day);
            
            return (
              <div 
                key={i} 
                className={getDayClassName(day)}
                onClick={() => setSelectedDay(day)}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-sm font-medium ${isSameDay(day, new Date()) ? 'text-blue-600' : ''}`}>
                    {format(day, 'd')}
                  </span>
                  
                  {campaign && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div 
                            className="px-1.5 py-0.5 text-xs rounded-sm truncate max-w-[80px]" 
                            style={{ backgroundColor: campaign.color || '#e5e7eb', color: '#1f2937' }}>
                            {campaign.name}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{campaign.name}</p>
                          <p className="text-xs text-gray-500">{format(new Date(campaign.startdate), 'MMM d')} - {format(new Date(campaign.enddate), 'MMM d, yyyy')}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                
                <div className="mt-1 space-y-1">
                  {dayPosts.slice(0, 3).map((post, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center justify-between text-xs p-1 rounded border ${getStatusColor(post.status)}`}
                    >
                      <div className="flex items-center truncate">
                        {getPlatformIcon(post.platform)}
                        <span className="ml-1 truncate">{post.title}</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem onClick={() => {
                            setNewPost({...post, date: format(day, 'yyyy-MM-dd')});
                            setShowPostCreator(true);
                          }}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onDeletePost(post.id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                  
                  {dayPosts.length > 3 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-gray-500 p-0 h-auto w-full"
                      onClick={() => setSelectedDay(day)}
                    >
                      +{dayPosts.length - 3} more
                    </Button>
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
    const weekStart = startOfWeek(selectedDay || new Date());
    const weekDays = Array.from({length: 7}, (_, i) => addDays(weekStart, i));
    
    return (
      <div className="bg-white p-4 rounded-md shadow">
        <div className="space-y-4">
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-sm font-medium">{format(day, 'EEE')}</div>
                <div className={`text-lg p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto ${
                  isSameDay(day, new Date()) 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-100 cursor-pointer'
                }`} onClick={() => setSelectedDay(day)}>
                  {format(day, 'd')}
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            {Array.from({length: 12}, (_, i) => i + 8).map((hour) => (
              <div key={hour} className="grid grid-cols-7 gap-2">
                <div className="text-right pr-2 text-sm text-gray-500">
                  {hour}:00
                </div>
                {weekDays.map((day, index) => {
                  const hoursEvents = filteredPosts.filter(post => {
                    const postDate = new Date(post.date);
                    const postHour = parseInt(post.time.split(':')[0]);
                    return isSameDay(postDate, day) && postHour === hour;
                  });
                  
                  return (
                    <div key={index} className="col-span-1 min-h-[60px] border-t border-l border-r border-gray-200 relative">
                      {hoursEvents.map((event, idx) => (
                        <div 
                          key={idx} 
                          className={`absolute top-0 left-0 right-0 p-1 text-xs truncate ${getStatusColor(event.status)}`}
                          style={{top: `${(parseInt(event.time.split(':')[1]) / 60) * 100}%`}}
                        >
                          <div className="flex items-center">
                            {getPlatformIcon(event.platform)}
                            <span className="ml-1 truncate">{event.title}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const selectedDate = selectedDay || new Date();
    const dayPosts = getPostsForDate(selectedDate);
    
    // Group posts by hour
    const postsByHour: {[key: number]: Post[]} = {};
    for (let i = 0; i < 24; i++) {
      postsByHour[i] = [];
    }
    
    dayPosts.forEach(post => {
      const hour = parseInt(post.time.split(':')[0]);
      if (postsByHour[hour]) {
        postsByHour[hour].push(post);
      }
    });
    
    return (
      <div className="bg-white p-4 rounded-md shadow">
        <h3 className="text-xl font-medium mb-4">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</h3>
        
        <div className="space-y-2">
          {Array.from({length: 12}, (_, i) => i + 8).map((hour) => (
            <div key={hour} className="flex border-t border-gray-200 py-2">
              <div className="w-16 text-right pr-4 text-sm text-gray-500">
                {hour}:00
              </div>
              <div className="flex-1 min-h-[60px]">
                {postsByHour[hour].map((post, idx) => (
                  <div 
                    key={idx} 
                    className={`mb-2 p-2 rounded ${getStatusColor(post.status)}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        {getPlatformIcon(post.platform)}
                        <span className="ml-2 font-medium">{post.title}</span>
                      </div>
                      <span className="text-sm">{post.time}</span>
                    </div>
                    {post.content && (
                      <p className="text-sm mt-1">{post.content}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
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
          posts={filteredPosts}
          campaigns={campaigns}
          setShowPostCreator={setShowPostCreator}
          onUpdatePost={onUpdatePost}
          onDeletePost={onDeletePost}
        />
      )}

      <PostCreatorDialog 
        showPostCreator={showPostCreator}
        setShowPostCreator={setShowPostCreator}
        newPost={newPost}
        setNewPost={setNewPost}
        handleCreatePost={handleCreatePost}
        campaigns={campaigns}
      />
    </div>
  );
};
