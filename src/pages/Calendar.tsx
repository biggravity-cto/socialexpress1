
import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, parseISO } from 'date-fns';
import { fetchCampaigns, fetchPosts, createPost, updatePost, deletePost } from '@/services/calendarService';
import { Campaign, Post } from '@/types/calendar';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon,
  ListFilter,
  Sliders,
  Share,
  LayoutGrid,
  Columns
} from 'lucide-react';
import { CalendarView } from '@/components/dashboard/calendar/CalendarView';
import { Card } from '@/components/ui/card';
import { PostCreatorDialog } from '@/components/dashboard/calendar/PostCreatorDialog';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const Calendar = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showPostCreator, setShowPostCreator] = useState(false);
  const [viewMode, setViewMode] = useState<string>("month");
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filteredPlatforms, setFilteredPlatforms] = useState<string[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<string[]>([]);
  const [filteredStatus, setFilteredStatus] = useState<string[]>([]);
  
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

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCreatePost = async (postData: Omit<Post, 'id'>) => {
    try {
      const newPost = await createPost(postData);
      if (newPost) {
        setPosts([...posts, newPost]);
        toast({
          title: "Success",
          description: "Post created successfully",
        });
        setShowPostCreator(false);
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
        setEditingPost(null);
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
  
  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setShowPostCreator(true);
  };

  // Filter posts based on selected criteria
  const filteredPosts = posts.filter(post => {
    let matches = true;
    
    if (filteredPlatforms.length > 0) {
      matches = matches && filteredPlatforms.includes(post.platform);
    }
    
    if (filteredCampaigns.length > 0) {
      matches = matches && (post.campaign_id ? filteredCampaigns.includes(post.campaign_id) : false);
    }
    
    if (filteredStatus.length > 0) {
      matches = matches && filteredStatus.includes(post.status);
    }
    
    return matches;
  });
  
  // Toggle filter for platforms
  const togglePlatformFilter = (platform: string) => {
    if (filteredPlatforms.includes(platform)) {
      setFilteredPlatforms(filteredPlatforms.filter(p => p !== platform));
    } else {
      setFilteredPlatforms([...filteredPlatforms, platform]);
    }
  };
  
  // Toggle filter for campaigns
  const toggleCampaignFilter = (campaignId: string) => {
    if (filteredCampaigns.includes(campaignId)) {
      setFilteredCampaigns(filteredCampaigns.filter(c => c !== campaignId));
    } else {
      setFilteredCampaigns([...filteredCampaigns, campaignId]);
    }
  };
  
  // Toggle filter for status
  const toggleStatusFilter = (status: string) => {
    if (filteredStatus.includes(status)) {
      setFilteredStatus(filteredStatus.filter(s => s !== status));
    } else {
      setFilteredStatus([...filteredStatus, status]);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Content Calendar</h1>
        <p className="text-gray-500">Plan and schedule your content across platforms</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <Card className="overflow-hidden border-gray-200">
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
                
                <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <ListFilter className="h-4 w-4 mr-1" />
                      Filters {(filteredPlatforms.length + filteredCampaigns.length + filteredStatus.length) > 0 && 
                        `(${filteredPlatforms.length + filteredCampaigns.length + filteredStatus.length})`}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h3 className="font-medium">Filter Posts</h3>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Platforms</h4>
                        <div className="flex flex-wrap gap-2">
                          {['instagram', 'facebook', 'twitter'].map(platform => (
                            <Label 
                              key={platform}
                              className={`flex items-center p-2 border rounded-md cursor-pointer ${
                                filteredPlatforms.includes(platform) ? 'bg-blue-50 border-blue-200' : ''
                              }`}
                            >
                              <Checkbox 
                                checked={filteredPlatforms.includes(platform)}
                                onCheckedChange={() => togglePlatformFilter(platform)}
                                className="mr-2"
                              />
                              {platform.charAt(0).toUpperCase() + platform.slice(1)}
                            </Label>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Campaigns</h4>
                        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                          {campaigns.map(campaign => (
                            <Label 
                              key={campaign.id}
                              className={`flex items-center p-2 border rounded-md cursor-pointer ${
                                filteredCampaigns.includes(campaign.id) ? 'bg-blue-50 border-blue-200' : ''
                              }`}
                              style={{
                                borderLeft: `4px solid ${campaign.color}`
                              }}
                            >
                              <Checkbox 
                                checked={filteredCampaigns.includes(campaign.id)}
                                onCheckedChange={() => toggleCampaignFilter(campaign.id)}
                                className="mr-2"
                              />
                              {campaign.name}
                            </Label>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Status</h4>
                        <div className="flex flex-wrap gap-2">
                          {['published', 'scheduled', 'draft', 'pending_approval'].map(status => (
                            <Label 
                              key={status}
                              className={`flex items-center p-2 border rounded-md cursor-pointer ${
                                filteredStatus.includes(status) ? 'bg-blue-50 border-blue-200' : ''
                              }`}
                            >
                              <Checkbox 
                                checked={filteredStatus.includes(status)}
                                onCheckedChange={() => toggleStatusFilter(status)}
                                className="mr-2"
                              />
                              {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </Label>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between pt-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setFilteredPlatforms([]);
                            setFilteredCampaigns([]);
                            setFilteredStatus([]);
                          }}
                        >
                          Clear All
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => setFilterOpen(false)}
                        >
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                
                <Button size="sm" onClick={() => {
                  setEditingPost(null);
                  setShowPostCreator(true);
                }}>
                  <Plus className="h-4 w-4 mr-1" />
                  Create Post
                </Button>
              </div>
            </div>
          </div>
          
          <CalendarView
            posts={filteredPosts}
            campaigns={campaigns}
            currentMonth={currentMonth}
            onSelectDate={handleSelectDate}
            selectedDate={selectedDate}
            onEditPost={handleEditPost}
            onDeletePost={handleDeletePost}
            viewMode={viewMode}
          />
        </Card>
      )}
      
      <Dialog open={showPostCreator} onOpenChange={setShowPostCreator}>
        <DialogContent className="sm:max-w-[600px]">
          <PostCreatorDialog
            selectedDate={selectedDate}
            campaigns={campaigns}
            onSavePost={editingPost ? 
              (postData) => handleUpdatePost(editingPost.id, postData) : 
              handleCreatePost
            }
            onCancel={() => {
              setShowPostCreator(false);
              setEditingPost(null);
            }}
            editingPost={editingPost}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
