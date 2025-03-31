
import { supabase } from './supabaseClient';
import { Post, PostCreationData } from '@/types/calendar';
import { mockCampaigns } from './campaignService';

// Posts
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

// Generate dates for the past 14 days and future 14 days
const getDatesRange = () => {
  const dates = [];
  const today = new Date();
  
  // Past 14 days
  for (let i = 14; i >= 1; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  // Today
  dates.push(today.toISOString().split('T')[0]);
  
  // Future 14 days
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
};

// Mock posts data - spanning across past, present and future dates
const generateMockPosts = (): Post[] => {
  const dates = getDatesRange();
  const platforms = ['instagram', 'twitter', 'facebook'];
  const types = ['image', 'video', 'carousel', 'text'];
  const statuses = ['published', 'scheduled', 'draft', 'pending_approval'];
  
  const posts: Post[] = [
    // Today's posts (more detailed examples)
    {
      id: '1',
      title: 'New Product Launch',
      date: new Date().toISOString().split('T')[0], // Today
      time: '10:00',
      platform: 'instagram',
      type: 'image',
      status: 'scheduled',
      campaign_id: '6',
      content: 'Check out our brand new product line! Limited time offer - 20% off for early birds.',
      imgurl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D'
    },
    {
      id: '2',
      title: 'Customer Testimonial',
      date: new Date().toISOString().split('T')[0], // Today
      time: '14:30',
      platform: 'facebook',
      type: 'video',
      status: 'published',
      campaign_id: '5',
      content: 'Hear what our satisfied customers have to say about their experiences.'
    },
    {
      id: '3',
      title: 'Behind the Scenes',
      date: new Date().toISOString().split('T')[0], // Today
      time: '16:45',
      platform: 'instagram',
      type: 'carousel',
      status: 'scheduled',
      campaign_id: '5',
      content: 'Take a peek behind the curtain at our creative process.'
    }
  ];
  
  // Generate random posts for each date
  let idCounter = 4;
  dates.forEach(date => {
    // Skip today as we've already added detailed posts
    if (date === new Date().toISOString().split('T')[0]) return;
    
    // Generate between 0-4 posts for each date
    const postCount = Math.floor(Math.random() * 5);
    
    for (let i = 0; i < postCount; i++) {
      const platform = platforms[Math.floor(Math.random() * platforms.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      // For past dates, make most posts published
      const actualStatus = new Date(date) < new Date() ? 
        (Math.random() > 0.2 ? 'published' : status) : status;
      
      // Randomly assign to a campaign (or no campaign)
      const campaignId = Math.random() > 0.3 ? 
        mockCampaigns[Math.floor(Math.random() * mockCampaigns.length)].id : undefined;
      
      // Generate a post title based on platform and type
      let title = '';
      if (platform === 'instagram') title = type === 'carousel' ? 'Instagram Carousel' : 'Instagram Post';
      if (platform === 'twitter') title = 'Tweet Update';
      if (platform === 'facebook') title = type === 'video' ? 'Facebook Video' : 'Facebook Post';
      
      // Add some variety to titles
      const titleVariations = [
        'Weekly ', 'Monthly ', 'Product ', 'Brand ', 'Customer ', 'Promotion ',
        'Feature ', 'Spotlight ', 'Trending ', 'Popular '
      ];
      
      title = titleVariations[Math.floor(Math.random() * titleVariations.length)] + title;
      
      // Generate a random time
      const hours = Math.floor(Math.random() * 12) + 8; // Between 8 AM and 8 PM
      const minutes = ['00', '15', '30', '45'][Math.floor(Math.random() * 4)];
      const time = `${hours}:${minutes}`;
      
      posts.push({
        id: (idCounter++).toString(),
        title,
        date,
        time,
        platform,
        type,
        status: actualStatus,
        campaign_id: campaignId,
        content: `This is a ${type} post for ${platform} scheduled for ${date}.`
      });
    }
  });
  
  // Add some specific posts for known campaigns
  const today = new Date();
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();
  
  // Add posts for next 3 days with Product Launch campaign
  for (let i = 1; i <= 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    posts.push({
      id: (idCounter++).toString(),
      title: `Product Launch Day ${i}`,
      date: date.toISOString().split('T')[0],
      time: '12:00',
      platform: i % 3 === 0 ? 'twitter' : i % 2 === 0 ? 'facebook' : 'instagram',
      type: i % 2 === 0 ? 'video' : 'image',
      status: 'scheduled',
      campaign_id: '6',
      content: `Day ${i} of our exciting new product launch! Stay tuned for more details.`
    });
  }
  
  // Add posts for Brand Awareness campaign
  for (let i = -3; i <= 3; i++) {
    if (i === 0) continue; // Skip today as we already have detailed posts
    
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    posts.push({
      id: (idCounter++).toString(),
      title: `Brand Story Part ${i < 0 ? Math.abs(i) : i + 3}`,
      date: date.toISOString().split('T')[0],
      time: '09:30',
      platform: 'instagram',
      type: 'carousel',
      status: i < 0 ? 'published' : 'scheduled',
      campaign_id: '5',
      content: `Exploring our brand heritage and values. Part ${i < 0 ? Math.abs(i) : i + 3} of our brand story series.`
    });
  }
  
  return posts;
};

const mockPosts = generateMockPosts();

export const getMockPosts = () => mockPosts;
