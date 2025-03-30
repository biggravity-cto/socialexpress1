
import React, { useState, useEffect } from 'react';
import { fetchCampaigns, fetchPosts, createPost, updatePost, deletePost } from '@/services/calendarService';
import { Campaign, Post } from '@/types/calendar';
import { useToast } from "@/hooks/use-toast";
import { CalendarContainer } from '@/components/dashboard/calendar/CalendarContainer';

const Calendar = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
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
    </div>
  );
};

export default Calendar;
