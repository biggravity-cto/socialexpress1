
import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Campaign, Post } from '@/types/calendar';
import { useToast } from "@/hooks/use-toast";
import { CalendarView } from '@/components/dashboard/calendar/CalendarView';
import { PostCreatorDialog } from '@/components/dashboard/calendar/PostCreatorDialog';
import { CalendarHeader } from '@/components/dashboard/calendar/CalendarHeader';
import { FilterPopover } from '@/components/dashboard/calendar/FilterPopover';
import { Button } from '@/components/ui/button';
import { ListFilter } from 'lucide-react';

interface CalendarContainerProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  campaigns: Campaign[];
  fetchCampaigns: () => Promise<Campaign[]>;
  fetchPosts: () => Promise<Post[]>;
  createPost: (postData: Omit<Post, 'id'>) => Promise<Post | null>;
  updatePost: (id: string, updates: Partial<Post>) => Promise<Post | null>;
  deletePost: (id: string) => Promise<boolean>;
}

export const CalendarContainer: React.FC<CalendarContainerProps> = ({
  posts,
  setPosts,
  campaigns,
  createPost,
  updatePost,
  deletePost
}) => {
  const [loading, setLoading] = useState(false);
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
  
  const clearAllFilters = () => {
    setFilteredPlatforms([]);
    setFilteredCampaigns([]);
    setFilteredStatus([]);
  };
  
  const openPostCreator = () => {
    setEditingPost(null);
    setShowPostCreator(true);
  };
  
  const totalFilterCount = filteredPlatforms.length + filteredCampaigns.length + filteredStatus.length;

  return (
    <Card className="overflow-hidden border-gray-200">
      <CalendarHeader 
        currentMonth={currentMonth}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
        handleToday={handleToday}
        viewMode={viewMode}
        setViewMode={setViewMode}
        filteredCount={totalFilterCount}
        setFilterOpen={setFilterOpen}
        filterOpen={filterOpen}
        openPostCreator={openPostCreator}
      />
      
      <FilterPopover
        open={filterOpen}
        setOpen={setFilterOpen}
        campaigns={campaigns}
        filteredPlatforms={filteredPlatforms}
        togglePlatformFilter={togglePlatformFilter}
        filteredCampaigns={filteredCampaigns}
        toggleCampaignFilter={toggleCampaignFilter}
        filteredStatus={filteredStatus}
        toggleStatusFilter={toggleStatusFilter}
        clearAllFilters={clearAllFilters}
      >
        <Button variant="outline" size="sm">
          <ListFilter className="h-4 w-4 mr-1" />
          Filters {totalFilterCount > 0 && `(${totalFilterCount})`}
        </Button>
      </FilterPopover>
      
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
    </Card>
  );
};
