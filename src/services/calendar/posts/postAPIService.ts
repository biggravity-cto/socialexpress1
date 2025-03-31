
import { supabase } from '../supabaseClient';
import { Post, PostCreationData } from '@/types/calendar';

// Posts API operations
export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const createPost = async (postData: PostCreationData): Promise<Post | null> => {
  try {
    // Add current user ID as author_id if not provided
    let newPostData = { ...postData };
    if (!newPostData.author_id) {
      const { user } = (await supabase.auth.getSession()).data.session || {};
      if (user) {
        newPostData.author_id = user.id;
      }
    }
    
    const { data, error } = await supabase
      .from('posts')
      .insert([newPostData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
};

export const updatePost = async (id: string, updates: Partial<Post>): Promise<Post | null> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
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
