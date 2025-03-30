
import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { fetchCampaigns, fetchPosts } from '@/services/calendarService';
import { Campaign, Post } from '@/types/calendar';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon,
  Filter,
  ListFilter,
  Sliders,
  Share
} from 'lucide-react';
import { CalendarView } from '@/components/dashboard/calendar/CalendarView';
import { Card } from '@/components/ui/card';
import { PostCreatorDialog } from '@/components/dashboard/calendar/PostCreatorDialog';
import { createPost, updatePost, deletePost } from '@/services/calendarService';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const Calendar = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showPostCreator, setShowPostCreator] = useState(false);
  const [viewMode, setViewMode] = useState<string>("month");
  
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
                    List
                  </ToggleGroupItem>
                  <ToggleGroupItem value="week" aria-label="Week View">
                    Week
                  </ToggleGroupItem>
                  <ToggleGroupItem value="month" aria-label="Month View">
                    Month
                  </ToggleGroupItem>
                </ToggleGroup>
                
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-1" />
                  Share
                </Button>
                
                <Button variant="outline" size="sm">
                  <Sliders className="h-4 w-4 mr-1" />
                  Filters
                </Button>
                
                <Dialog open={showPostCreator} onOpenChange={setShowPostCreator}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Create Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <PostCreatorDialog
                      selectedDate={selectedDate}
                      campaigns={campaigns}
                      onSavePost={handleCreatePost}
                      onCancel={() => setShowPostCreator(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          
          <CalendarView
            posts={posts}
            campaigns={campaigns}
            currentMonth={currentMonth}
            onSelectDate={handleSelectDate}
            selectedDate={selectedDate}
          />
        </Card>
      )}
    </div>
  );
};

export default Calendar;
