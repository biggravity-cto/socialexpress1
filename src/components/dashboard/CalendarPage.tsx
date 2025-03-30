
import React, { useEffect, useState } from 'react';
import { CalendarView } from '@/components/dashboard/CalendarView';
import { fetchCampaigns, fetchPosts, createPost, updatePost, deletePost, createCampaign } from '@/services/calendarService';
import { Campaign, Post } from '@/types/calendar';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, PlusCircle } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const CalendarPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCampaignCreator, setShowCampaignCreator] = useState(false);
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Content Calendar</h1>
          <p className="text-gray-500">Plan and schedule your content across platforms</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <Dialog open={showCampaignCreator} onOpenChange={setShowCampaignCreator}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center">
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
        <CalendarView 
          posts={posts}
          campaigns={campaigns}
          onCreatePost={handleCreatePost}
          onUpdatePost={handleUpdatePost}
          onDeletePost={handleDeletePost}
        />
      )}
    </div>
  );
};

export default CalendarPage;
