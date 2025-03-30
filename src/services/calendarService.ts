
import { supabase } from '@/integrations/supabase/client';
import { Campaign, Post, PostCreationData, isPlatform, isStatus } from '@/types/calendar';

// Mock campaigns data
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sale',
    startdate: '2023-06-01',
    enddate: '2023-08-31',
    color: '#FFE5CC',
    description: 'Promotion for summer products and vacation packages'
  },
  {
    id: '2',
    name: 'Back to School',
    startdate: '2023-08-15',
    enddate: '2023-09-15',
    color: '#CCE5FF',
    description: 'Special discounts for students and educational products'
  },
  {
    id: '3',
    name: 'Fall Collection',
    startdate: '2023-09-20',
    enddate: '2023-11-10',
    color: '#D4C2A8',
    description: 'Launching our new fall products lineup'
  },
  {
    id: '4',
    name: 'Holiday Season',
    startdate: '2023-11-20',
    enddate: '2023-12-31',
    color: '#FFCCCC',
    description: 'Christmas and New Year special offers'
  }
];

// Mock posts data - spanning around current date
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'New Product Launch',
    date: new Date().toISOString().split('T')[0], // Today
    time: '10:00',
    platform: 'instagram',
    type: 'image',
    status: 'scheduled',
    campaign_id: '3',
    content: 'Check out our brand new product line! Limited time offer - 20% off for early birds.'
  },
  {
    id: '2',
    title: 'Customer Testimonial',
    date: new Date().toISOString().split('T')[0], // Today
    time: '14:30',
    platform: 'facebook',
    type: 'video',
    status: 'published',
    content: 'Hear what our satisfied customers have to say about their experiences.'
  },
  {
    id: '3',
    title: 'Flash Sale Announcement',
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], // Tomorrow
    time: '09:00',
    platform: 'twitter',
    type: 'text',
    status: 'draft',
    campaign_id: '1',
    content: '24-hour flash sale coming tomorrow! Stay tuned for exclusive deals.'
  },
  {
    id: '4',
    title: 'How-to Tutorial',
    date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0], // Day after tomorrow
    time: '16:00',
    platform: 'instagram',
    type: 'video',
    status: 'pending_approval',
    content: 'Learn how to get the most out of our products with this step-by-step tutorial.'
  },
  {
    id: '5',
    title: 'Product Showcase',
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0], // Yesterday
    time: '11:30',
    platform: 'instagram',
    type: 'carousel',
    status: 'published',
    campaign_id: '2',
    content: 'Swipe through to see our latest collection in action!'
  },
  {
    id: '6',
    title: 'Industry News Update',
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0], // Two days ago
    time: '13:15',
    platform: 'twitter',
    type: 'text',
    status: 'published',
    content: 'Stay updated with the latest trends and developments in our industry.'
  },
  {
    id: '7',
    title: 'Weekly Newsletter',
    date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0], // Five days ahead
    time: '08:00',
    platform: 'facebook',
    type: 'text',
    status: 'scheduled',
    campaign_id: '4',
    content: 'Our weekly newsletter is packed with updates, tips, and special offers.'
  },
  {
    id: '8',
    title: 'Behind the Scenes',
    date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0], // Three days ahead
    time: '15:45',
    platform: 'instagram',
    type: 'image',
    status: 'draft',
    content: 'Get an exclusive look behind the scenes of our creative process.'
  }
];

// Campaigns
export const fetchCampaigns = async (): Promise<Campaign[]> => {
  try {
    // In a real app, we would fetch from Supabase
    // const { data, error } = await supabase
    //   .from('campaigns')
    //   .select('*')
    //   .order('startdate', { ascending: true });
    
    // if (error) throw error;
    // return data || [];
    
    // For now, return mock data
    return mockCampaigns;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return [];
  }
};

export const createCampaign = async (campaignData: Omit<Campaign, 'id'>): Promise<Campaign | null> => {
  try {
    // Simulate API call
    const newCampaign: Campaign = {
      ...campaignData,
      id: Math.random().toString(36).substring(2, 9),
    };
    
    mockCampaigns.push(newCampaign);
    return newCampaign;
  } catch (error) {
    console.error('Error creating campaign:', error);
    return null;
  }
};

export const updateCampaign = async (id: string, updates: Partial<Campaign>): Promise<Campaign | null> => {
  try {
    // Simulate API call
    const index = mockCampaigns.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Campaign not found');
    
    mockCampaigns[index] = { ...mockCampaigns[index], ...updates };
    return mockCampaigns[index];
  } catch (error) {
    console.error('Error updating campaign:', error);
    return null;
  }
};

export const deleteCampaign = async (id: string): Promise<boolean> => {
  try {
    // Simulate API call
    const initialLength = mockCampaigns.length;
    const filteredCampaigns = mockCampaigns.filter(c => c.id !== id);
    
    // Update the array
    mockCampaigns.length = 0;
    mockCampaigns.push(...filteredCampaigns);
    
    return initialLength > mockCampaigns.length;
  } catch (error) {
    console.error('Error deleting campaign:', error);
    return false;
  }
};

// Posts
export const fetchPosts = async (): Promise<Post[]> => {
  try {
    // In a real app, we would fetch from Supabase
    // const { data, error } = await supabase
    //   .from('posts')
    //   .select('*')
    //   .order('date', { ascending: true });
    
    // if (error) throw error;
    // return data || [];
    
    // For now, return mock data
    return mockPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const createPost = async (postData: PostCreationData): Promise<Post | null> => {
  try {
    // Simulate API call
    const newPost: Post = {
      ...postData,
      id: Math.random().toString(36).substring(2, 9),
    };
    
    mockPosts.push(newPost);
    return newPost;
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
};

export const updatePost = async (id: string, updates: Partial<Post>): Promise<Post | null> => {
  try {
    // Simulate API call
    const index = mockPosts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Post not found');
    
    mockPosts[index] = { ...mockPosts[index], ...updates };
    return mockPosts[index];
  } catch (error) {
    console.error('Error updating post:', error);
    return null;
  }
};

export const deletePost = async (id: string): Promise<boolean> => {
  try {
    // Simulate API call
    const initialLength = mockPosts.length;
    const filteredPosts = mockPosts.filter(p => p.id !== id);
    
    // Update the array
    mockPosts.length = 0;
    mockPosts.push(...filteredPosts);
    
    return initialLength > mockPosts.length;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
};
