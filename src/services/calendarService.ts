
import { supabase } from '@/integrations/supabase/client';
import { Campaign, Post, PostCreationData } from '@/types/calendar';

// Campaigns
export const fetchCampaigns = async (): Promise<Campaign[]> => {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('startDate', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return [];
  }
};

export const createCampaign = async (campaignData: Omit<Campaign, 'id'>): Promise<Campaign | null> => {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .insert([campaignData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating campaign:', error);
    return null;
  }
};

export const updateCampaign = async (id: string, updates: Partial<Campaign>): Promise<Campaign | null> => {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating campaign:', error);
    return null;
  }
};

export const deleteCampaign = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('campaigns')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting campaign:', error);
    return false;
  }
};

// Posts
export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) throw error;
    
    // Convert string dates to Date objects
    return (data || []).map(post => ({
      ...post,
      date: new Date(post.date)
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const createPost = async (postData: PostCreationData): Promise<Post | null> => {
  try {
    // Convert Date to ISO string for storage
    const formattedPostData = {
      ...postData,
      date: postData.date.toISOString().split('T')[0]
    };
    
    const { data, error } = await supabase
      .from('posts')
      .insert([formattedPostData])
      .select()
      .single();
    
    if (error) throw error;
    
    // Convert back to Date for frontend use
    return {
      ...data,
      date: new Date(data.date)
    };
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
};

export const updatePost = async (id: string, updates: Partial<Post>): Promise<Post | null> => {
  try {
    // If date is included in updates, convert it to ISO string
    const formattedUpdates = { ...updates };
    if (updates.date) {
      formattedUpdates.date = updates.date.toISOString().split('T')[0];
    }
    
    const { data, error } = await supabase
      .from('posts')
      .update(formattedUpdates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    // Convert back to Date for frontend use
    return {
      ...data,
      date: new Date(data.date)
    };
  } catch (error) {
    console.error('Error updating post:', error);
    return null;
  }
};

export const deletePost = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
};
