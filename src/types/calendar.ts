
// Define types for the calendar functionality

export interface Campaign {
  id: string;
  name: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  color: string; // CSS class for styling
  description?: string;
  created_at?: string;
  user_id?: string;
}

export interface Post {
  id: string;
  title: string;
  date: string; // ISO date string format
  time: string;
  platform: 'instagram' | 'twitter' | 'facebook';
  type: string;
  content?: string;
  campaign_id?: string;
  status: 'scheduled' | 'draft' | 'published' | 'pending_approval';
  author_id?: string;
  author?: string;
  imgUrl?: string;
  created_at?: string;
  updated_at?: string;
}

export type PostCreationData = Omit<Post, 'id' | 'created_at' | 'updated_at'>;
