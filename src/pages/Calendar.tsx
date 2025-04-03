
import React, { useState, useEffect } from 'react';
import { 
  fetchCampaigns, 
  fetchPosts, 
  createPost, 
  updatePost, 
  deletePost, 
  getMockCampaigns, 
  getMockPosts 
} from '@/services/calendar';
import { Campaign, Post } from '@/types/calendar';
import { useToast } from "@/hooks/use-toast";
import { CalendarContainer } from '@/components/dashboard/calendar/CalendarContainer';
import { motion } from 'framer-motion';
import { RotateCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AICalendarAgent from '@/components/dashboard/calendar/AICalendarAgent';

const Calendar = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Try to fetch from API first
        let campaignsData = await fetchCampaigns();
        let postsData = await fetchPosts();
        
        // If no data returned, use mock data
        if (campaignsData.length === 0) {
          campaignsData = getMockCampaigns();
        }
        
        if (postsData.length === 0) {
          postsData = getMockPosts();
        }
        
        setCampaigns(campaignsData);
        setPosts(postsData);
      } catch (error) {
        console.error('Error loading calendar data:', error);
        
        // Fallback to mock data if API fails
        setCampaigns(getMockCampaigns());
        setPosts(getMockPosts());
        
        toast({
          title: "Using sample data",
          description: "Connected to sample calendar data for demonstration",
          variant: "default"
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const refreshData = async () => {
    setLoading(true);
    try {
      // Try to fetch from API first
      let campaignsData = await fetchCampaigns();
      let postsData = await fetchPosts();
      
      // If no data returned, use mock data
      if (campaignsData.length === 0) {
        campaignsData = getMockCampaigns();
      }
      
      if (postsData.length === 0) {
        postsData = getMockPosts();
      }
      
      setCampaigns(campaignsData);
      setPosts(postsData);
      
      toast({
        title: "Refreshed",
        description: "Calendar data has been updated",
      });
    } catch (error) {
      console.error('Error refreshing calendar data:', error);
      toast({
        title: "Error",
        description: "Failed to refresh data. Using cached data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">AI Marketing Calendar</h1>
          <p className="text-gray-500">Plan and schedule your content across platforms</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={refreshData}
          >
            <RotateCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Refreshing...' : 'Refresh Data'}</span>
          </Button>
        </div>
      </div>
      
      {/* AI Calendar Agent replaces the static optimization card */}
      <AICalendarAgent />
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <CalendarContainer
          posts={posts}
          setPosts={setPosts}
          campaigns={campaigns}
          fetchCampaigns={fetchCampaigns}
          fetchPosts={fetchPosts}
          createPost={createPost}
          updatePost={updatePost}
          deletePost={deletePost}
        />
      )}
    </motion.div>
  );
};

export default Calendar;
