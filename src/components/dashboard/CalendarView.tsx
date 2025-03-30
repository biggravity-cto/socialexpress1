
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { Campaign, Post } from '@/types/calendar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, Plus, ListFilter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

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
  const [hoveredDay, setHoveredDay] = useState<Date | undefined>(undefined);
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [showPostCreator, setShowPostCreator] = useState(false);

  // Helper functions
  const getPostsForDate = (date: Date) => {
    if (!date) return [];
    
    return posts.filter(post => {
      const postDate = new Date(post.date);
      return (
        postDate.getDate() === date.getDate() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const getCampaignForDate = (date: Date) => {
    if (!date) return null;
    
    return campaigns.find(campaign => {
      const start = new Date(campaign.startdate);
      const end = new Date(campaign.enddate);
      return date >= start && date <= end;
    });
  };

  // Event handlers
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
  };

  const formatMonthYear = (date: Date) => {
    return format(date, 'MMMM yyyy');
  };

  // Get highlighted days (days with posts)
  const highlightedDays = posts.map(post => new Date(post.date));

  // Render day cell content
  const renderDayContents = (day: Date) => {
    const postsForDay = getPostsForDate(day);
    const campaign = getCampaignForDate(day);
    
    return (
      <div className="h-full">
        <div className="text-center mb-1">
          {day.getDate()}
        </div>
        {campaign && (
          <div 
            className={`text-xs py-0.5 px-1 mb-1 rounded ${campaign.color}`}
          >
            {campaign.name}
          </div>
        )}
        {postsForDay.slice(0, 2).map((post, i) => (
          <div 
            key={post.id} 
            className="text-xs truncate mb-0.5 p-0.5 bg-gray-50 rounded"
          >
            {post.title}
          </div>
        ))}
        {postsForDay.length > 2 && (
          <div className="text-xs text-gray-500">
            +{postsForDay.length - 2} more
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline">Today</Button>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold ml-2">{formatMonthYear(currentMonth)}</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <Tabs defaultValue="month" onValueChange={(value) => setView(value as any)}>
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
        
        <DayPicker
          selected={selectedDay}
          onSelect={setSelectedDay}
          className="p-3 pointer-events-auto"
          modifiers={{ highlighted: highlightedDays }}
          modifiersStyles={{
            highlighted: { backgroundColor: '#f0f9ff' }
          }}
          onDayMouseEnter={setHoveredDay}
          onDayClick={handleDayClick}
          month={currentMonth}
          mode="single"
        />
      </Card>

      {/* Selected day details */}
      {selectedDay && (
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">
            {format(selectedDay, 'EEEE, MMMM d, yyyy')}
          </h3>
          
          {getCampaignForDate(selectedDay) && (
            <Badge className="mb-4">
              {getCampaignForDate(selectedDay)?.name}
            </Badge>
          )}
          
          <div className="space-y-3">
            {getPostsForDate(selectedDay).length > 0 ? (
              getPostsForDate(selectedDay).map(post => (
                <div key={post.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{post.title}</h4>
                    <span className="text-sm text-gray-500">{post.time}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Badge>{post.platform}</Badge>
                    <Badge className="ml-2">{post.status}</Badge>
                  </div>
                  {post.content && (
                    <p className="mt-2 text-sm text-gray-700">{post.content}</p>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <CalendarIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No posts scheduled for this day</p>
                <Button 
                  className="mt-3"
                  onClick={() => setShowPostCreator(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Post Creator Dialog */}
      <Dialog open={showPostCreator} onOpenChange={setShowPostCreator}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter post title" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="pending_approval">Pending Approval</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Input id="content" placeholder="Post content" />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowPostCreator(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                // Here would be the logic to create a post
                setShowPostCreator(false);
              }}>
                Create Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
