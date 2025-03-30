import React, { useEffect, useState } from 'react';
import { fetchCampaigns, fetchPosts, createPost, updatePost, deletePost, createCampaign } from '@/services/calendarService';
import { Campaign, Post } from '@/types/calendar';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, PlusCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format, addMonths, subMonths, startOfMonth, addDays, getDay, isSameDay } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from "@/lib/utils";
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { PostCreatorDialog } from './calendar/PostCreatorDialog';

const CalendarPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCampaignCreator, setShowCampaignCreator] = useState(false);
  const [showPostCreator, setShowPostCreator] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const [newCampaign, setNewCampaign] = useState<Omit<Campaign, 'id'>>({
    name: '',
    startdate: format(new Date(), 'yyyy-MM-dd'),
    enddate: format(new Date(new Date().setMonth(new Date().getMonth() + 1)), 'yyyy-MM-dd'),
    color: '#e5e7eb',
    description: ''
  });
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date(new Date().setMonth(new Date().getMonth() + 1)));
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
  const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const campaignsData = await fetchCampaigns();
        const postsData = await fetchPosts();
        
        setCampaigns(campaignsData);
        setPosts(postsData);
      } catch (error) {
        console.error('Error loading calendar data:', error);
        toast({
          title: "Error",
          description: "Failed to load calendar data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const handleCreatePost = async (postData: Omit<Post, 'id'>) => {
    try {
      const newPost = await createPost(postData);
      if (newPost) {
        setPosts([...posts, newPost]);
        toast({
          title: "Success",
          description: "Post created successfully",
        });
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive"
      });
    }
  };

  const handleUpdatePost = async (id: string, updates: Partial<Post>) => {
    try {
      const updatedPost = await updatePost(id, updates);
      if (updatedPost) {
        setPosts(posts.map(post => post.id === id ? updatedPost : post));
        toast({
          title: "Success",
          description: "Post updated successfully",
        });
      }
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        title: "Error",
        description: "Failed to update post",
        variant: "destructive"
      });
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const success = await deletePost(id);
      if (success) {
        setPosts(posts.filter(post => post.id !== id));
        toast({
          title: "Success",
          description: "Post deleted successfully",
        });
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive"
      });
    }
  };

  const handleCreateCampaign = async () => {
    try {
      const campaignData = {
        ...newCampaign,
        startdate: format(startDate, 'yyyy-MM-dd'),
        enddate: format(endDate, 'yyyy-MM-dd')
      };
      
      const newCampaignData = await createCampaign(campaignData);
      if (newCampaignData) {
        setCampaigns([...campaigns, newCampaignData]);
        setShowCampaignCreator(false);
        setNewCampaign({
          name: '',
          startdate: format(new Date(), 'yyyy-MM-dd'),
          enddate: format(new Date(new Date().setMonth(new Date().getMonth() + 1)), 'yyyy-MM-dd'),
          color: '#e5e7eb',
          description: ''
        });
        toast({
          title: "Success",
          description: "Campaign created successfully",
        });
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: "Error",
        description: "Failed to create campaign",
        variant: "destructive"
      });
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCreateNewPost = () => {
    setEditingPost(null);
    setShowPostCreator(true);
  };

  const handleSavePost = (post: Omit<Post, 'id'> & { id?: string }) => {
    if (post.id) {
      handleUpdatePost(post.id, post);
    } else {
      handleCreatePost(post);
    }
    setShowPostCreator(false);
    setEditingPost(null);
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const daysInMonth = [];
    
    // Get start day of month
    let day = monthStart;
    let startDay = getDay(day);
    
    // Add previous month days
    for (let i = 0; i < startDay; i++) {
      daysInMonth.push(
        <div key={`prev-${i}`} className="h-9 w-9 text-center text-gray-300 py-2">
          {format(addDays(day, i - startDay), 'd')}
        </div>
      );
    }
    
    // Add current month days
    for (let i = 1; i <= 31; i++) {
      const currentDay = addDays(monthStart, i - 1);
      if (currentMonth.getMonth() !== currentDay.getMonth()) break;
      
      const isToday = isSameDay(currentDay, new Date());
      const isSelected = isSameDay(currentDay, selectedDate);
      const hasPosts = posts.some(post => isSameDay(new Date(post.date), currentDay));
      
      daysInMonth.push(
        <button
          key={`current-${i}`}
          className={cn(
            "h-9 w-9 rounded-full flex items-center justify-center",
            isToday && "bg-blue-100 text-blue-800",
            isSelected && "bg-blue-600 text-white",
            !isToday && !isSelected && hasPosts && "bg-blue-50",
            "hover:bg-blue-200 transition-colors"
          )}
          onClick={() => handleDateSelect(currentDay)}
        >
          {format(currentDay, 'd')}
        </button>
      );
    }
    
    // Add next month days to complete the grid
    const totalCells = Math.ceil((startDay + daysInMonth.length - 7) / 7) * 7 + 7;
    const nextMonthDays = totalCells - daysInMonth.length - startDay;
    for (let i = 1; i <= nextMonthDays; i++) {
      daysInMonth.push(
        <div key={`next-${i}`} className="h-9 w-9 text-center text-gray-300 py-2">
          {i}
        </div>
      );
    }
    
    return (
      <div className="mt-2">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-medium">{format(currentMonth, 'MMMM yyyy')}</h2>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
            Today
          </Button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-1">
          {weekdays.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {daysInMonth}
        </div>
      </div>
    );
  };

  const getPostsForSelectedDate = () => {
    return posts.filter(post => isSameDay(new Date(post.date), selectedDate));
  };

  const postsForSelectedDate = getPostsForSelectedDate();

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Content Calendar</h1>
          <p className="text-gray-500">Plan and schedule your content across platforms</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center" onClick={handleCreateNewPost}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Post
          </Button>
          
          <Dialog open={showCampaignCreator} onOpenChange={setShowCampaignCreator}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input 
                    id="name"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                    placeholder="Summer Sale, Product Launch, etc."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startdate">Start Date</Label>
                    <Popover open={showStartDateCalendar} onOpenChange={setShowStartDateCalendar}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(startDate, "PPP")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={(date) => {
                            if (date) {
                              setStartDate(date);
                              setShowStartDateCalendar(false);
                            }
                          }}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="enddate">End Date</Label>
                    <Popover open={showEndDateCalendar} onOpenChange={setShowEndDateCalendar}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(endDate, "PPP")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={(date) => {
                            if (date) {
                              setEndDate(date);
                              setShowEndDateCalendar(false);
                            }
                          }}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="color">Campaign Color</Label>
                  <div className="flex gap-4">
                    <Input 
                      id="color"
                      type="color"
                      value={newCampaign.color}
                      onChange={(e) => setNewCampaign({...newCampaign, color: e.target.value})}
                      className="w-12 h-10 p-1"
                    />
                    <div 
                      className="flex-1 h-10 rounded border border-gray-200"
                      style={{ backgroundColor: newCampaign.color }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea 
                    id="description"
                    value={newCampaign.description || ''}
                    onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                    placeholder="Campaign details, goals, etc."
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setShowCampaignCreator(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleCreateCampaign}
                    disabled={!newCampaign.name}
                  >
                    Create Campaign
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4 h-fit">
            {renderCalendar()}
          </Card>
          
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{`Posts for ${format(selectedDate, 'MMMM d, yyyy')}`}</h2>
              <Button onClick={handleCreateNewPost}>
                Create Post
              </Button>
            </div>
            
            <div className="space-y-3">
              {postsForSelectedDate.length > 0 ? (
                postsForSelectedDate.map(post => {
                  const campaign = campaigns.find(c => c.id === post.campaign_id);
                  
                  return (
                    <div key={post.id} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{post.title}</h3>
                          <div className="flex items-center mt-1 space-x-2">
                            <Badge variant="outline">{post.platform}</Badge>
                            <Badge 
                              className={
                                post.status === 'published' ? 'bg-green-100 text-green-800' :
                                post.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                post.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                                'bg-orange-100 text-orange-800'
                              }
                            >
                              {post.status}
                            </Badge>
                            {campaign && (
                              <Badge style={{ backgroundColor: campaign.color }}>
                                {campaign.name}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">{post.time}</div>
                      </div>
                      
                      {post.content && (
                        <p className="mt-2 text-sm text-gray-600">{post.content}</p>
                      )}
                      
                      <div className="flex justify-end mt-2 space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setEditingPost(post);
                            setShowPostCreator(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                  <p className="text-gray-500">No posts scheduled for this day</p>
                  <Button className="mt-4" onClick={handleCreateNewPost}>Create Post</Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      <PostCreatorDialog
        open={showPostCreator}
        setOpen={setShowPostCreator}
        addPost={handleCreatePost}
        editingPost={editingPost}
        updatePost={handleUpdatePost}
        deletePost={handleDeletePost}
        onSavePost={handleSavePost}
      />
    </div>
  );
};

export default CalendarPage;
