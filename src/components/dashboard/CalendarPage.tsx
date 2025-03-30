
import React, { useEffect, useState } from 'react';
import { CalendarView } from '@/components/dashboard/calendar/CalendarView';
import { fetchCampaigns, fetchPosts, createPost, updatePost, deletePost } from '@/services/calendarService';
import { Campaign, Post } from '@/types/calendar';
import { useToast } from "@/hooks/use-toast";

const CalendarPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
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

  const handleCreatePost = async (postData: any) => {
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Content Calendar</h1>
      <p className="text-gray-500 mb-6">Plan and schedule your content across platforms</p>
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
