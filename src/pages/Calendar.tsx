
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
import { RotateCw, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AICalendarAgent from '@/components/dashboard/calendar/AICalendarAgent';
import { useIsMobile } from '@/hooks/use-mobile';
import GlassPanel from '@/components/ui/GlassPanel';

const Calendar = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

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
      <GlassPanel className="p-5 sm:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">AI Marketing Calendar</h1>
            <p className="text-gray-500">Plan and schedule your content across platforms</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 border-gray-200 hover:border-gray-300"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="h-4 w-4" />
              <span>{isMobile ? '' : 'Filters'}</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 text-gray-700 border-gray-200 hover:border-gray-300"
              onClick={refreshData}
            >
              <RotateCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? (isMobile ? '' : 'Refreshing...') : (isMobile ? '' : 'Refresh')}</span>
            </Button>
          </div>
        </div>
      </GlassPanel>
      
      {/* AI Calendar Agent */}
      <AICalendarAgent />
      
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-500 animate-pulse">Loading your calendar data...</p>
        </div>
      ) : (
        <Card className="border-gray-200 shadow-sm overflow-hidden">
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
        </Card>
      )}
      
      {/* Mobile Add Button (Fixed) */}
      {isMobile && (
        <div className="fixed bottom-6 right-6 z-10">
          <Button 
            className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
            onClick={() => {
              const calendarContainer = document.querySelector('.react-calendar');
              if (calendarContainer) {
                const today = new Date();
                toast({
                  title: "Create New Post",
                  description: "Opening post creator...",
                });
              }
            }}
          >
            <CalendarIcon className="h-6 w-6" />
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default Calendar;
