
import React, { useState } from 'react';
import { format, addMonths, subMonths, isSameDay } from 'date-fns';
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
import { Calendar } from '@/components/ui/calendar';

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

  // Helper functions
  const getPostsForDate = (date: Date) => {
    if (!date) return [];
    
    return posts.filter(post => {
      const postDate = new Date(post.date);
      return isSameDay(postDate, date);
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
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
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

  // Helper function to determine if a date should be highlighted
  const isDayHighlighted = (day: Date) => {
    return posts.some(post => {
      const postDate = new Date(post.date);
      return isSameDay(postDate, day);
    });
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => setSelectedDay(new Date())}>Today</Button>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold ml-2">{format(currentMonth, 'MMMM yyyy')}</h2>
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
                    <Badge className="mr-2">{post.platform}</Badge>
                    <Badge variant="outline">{post.status}</Badge>
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
              <Input 
                id="title" 
                placeholder="Enter post title" 
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select 
                  value={newPost.platform}
                  onValueChange={(value) => setNewPost({...newPost, platform: value})}
                >
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
                <Select 
                  value={newPost.status}
                  onValueChange={(value) => setNewPost({...newPost, status: value})}
                >
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
              <Input 
                id="content" 
                placeholder="Post content" 
                value={newPost.content || ''}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input 
                  id="time" 
                  type="time"
                  value={newPost.time}
                  onChange={(e) => setNewPost({...newPost, time: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select 
                  value={newPost.type}
                  onValueChange={(value) => setNewPost({...newPost, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="carousel">Carousel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowPostCreator(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePost}>
                Create Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
