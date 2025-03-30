
// Define types for the calendar functionality

export interface Campaign {
  id: string;
  name: string;
  startdate: string; // ISO date string - matching the database column name
  enddate: string; // ISO date string - matching the database column name
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
  platform: string; // Changed from enum to string to match database
  type: string;
  content?: string;
  campaign_id?: string;
  status: string; // Changed from enum to string to match database
  author_id?: string;
  author?: string;
  imgurl?: string; // Changed to match database column name
  created_at?: string;
  updated_at?: string;
}

export type PostCreationData = Omit<Post, 'id' | 'created_at' | 'updated_at'>;

// Type guards for platform and status to ensure type safety
export function isPlatform(value: string): value is 'instagram' | 'twitter' | 'facebook' {
  return ['instagram', 'twitter', 'facebook'].includes(value);
}

export function isStatus(value: string): value is 'scheduled' | 'draft' | 'published' | 'pending_approval' {
  return ['scheduled', 'draft', 'published', 'pending_approval'].includes(value);
}
