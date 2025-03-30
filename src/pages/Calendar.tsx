
import React, { useState, useEffect } from 'react';
import { fetchCampaigns, fetchPosts, createPost, updatePost, deletePost } from '@/services/calendarService';
import { Campaign, Post } from '@/types/calendar';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarView } from '@/components/dashboard/CalendarView';

const CalendarPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [campaignsData, postsData] = await Promise.all([
          fetchCampaigns(),
          fetchPosts()
        ]);
        
        setCampaigns(campaignsData);
        setPosts(postsData);
      } catch (error) {
        console.error('Error loading calendar data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load calendar data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [toast]);

  const handleCreatePost = async (postData: any) => {
    try {
      const newPost = await createPost(postData);
      if (newPost) {
        setPosts(prev => [...prev, newPost]);
        toast({
          title: 'Success',
          description: 'Post created successfully',
        });
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: 'Error',
        description: 'Failed to create post',
        variant: 'destructive',
      });
    }
  };

  const handleUpdatePost = async (id: string, updates: Partial<Post>) => {
    try {
      const updatedPost = await updatePost(id, updates);
      if (updatedPost) {
        setPosts(prev => prev.map(post => post.id === id ? updatedPost : post));
        toast({
          title: 'Success',
          description: 'Post updated successfully',
        });
      }
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        title: 'Error',
        description: 'Failed to update post',
        variant: 'destructive',
      });
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const success = await deletePost(id);
      if (success) {
        setPosts(prev => prev.filter(post => post.id !== id));
        toast({
          title: 'Success',
          description: 'Post deleted successfully',
        });
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete post',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Content Calendar</h1>
        <p className="text-gray-500">Plan and schedule your content across platforms</p>
      </div>

      <CalendarView
        posts={posts}
        campaigns={campaigns}
        onCreatePost={handleCreatePost}
        onUpdatePost={handleUpdatePost}
        onDeletePost={handleDeletePost}
      />
    </div>
  );
};

export default CalendarPage;
