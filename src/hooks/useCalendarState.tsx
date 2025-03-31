
import { useState, useEffect } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { Post, Campaign } from '@/types/calendar';
import { useToast } from "@/hooks/use-toast";

interface UseCalendarStateProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  campaigns: Campaign[];
  createPost: (postData: Omit<Post, 'id'>) => Promise<Post | null>;
  updatePost: (id: string, updates: Partial<Post>) => Promise<Post | null>;
  deletePost: (id: string) => Promise<boolean>;
}

export const useCalendarState = ({
  posts,
  setPosts,
  campaigns,
  createPost,
  updatePost,
  deletePost
}: UseCalendarStateProps) => {
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
  
  const handleCreateNewPost = (date: Date) => {
    setSelectedDate(date);
    setEditingPost(null);
    setShowPostCreator(true);
  };

  // Filter functions
  const togglePlatformFilter = (platform: string) => {
    if (filteredPlatforms.includes(platform)) {
      setFilteredPlatforms(filteredPlatforms.filter(p => p !== platform));
    } else {
      setFilteredPlatforms([...filteredPlatforms, platform]);
    }
  };
  
  const toggleCampaignFilter = (campaignId: string) => {
    if (filteredCampaigns.includes(campaignId)) {
      setFilteredCampaigns(filteredCampaigns.filter(c => c !== campaignId));
    } else {
      setFilteredCampaigns([...filteredCampaigns, campaignId]);
    }
  };
  
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
    handleCreateNewPost(selectedDate);
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
  
  const totalFilterCount = filteredPlatforms.length + filteredCampaigns.length + filteredStatus.length;

  return {
    loading,
    setLoading,
    currentMonth,
    selectedDate,
    showPostCreator,
    setShowPostCreator,
    viewMode,
    setViewMode,
    editingPost,
    setEditingPost,
    filterOpen,
    setFilterOpen,
    filteredPlatforms,
    filteredCampaigns,
    filteredStatus,
    filteredPosts,
    totalFilterCount,
    handlePrevMonth,
    handleNextMonth,
    handleToday,
    handleSelectDate,
    handleCreatePost,
    handleUpdatePost,
    handleDeletePost,
    handleEditPost,
    handleCreateNewPost,
    togglePlatformFilter,
    toggleCampaignFilter,
    toggleStatusFilter,
    clearAllFilters,
    openPostCreator
  };
};
