
// Types for content management

export interface ContentItem {
  id: number;
  type: 'image' | 'video' | 'document' | 'post';
  title: string;
  date: string;
  status: 'published' | 'draft' | 'reviewing';
  thumbnail?: string;
  platform?: 'instagram' | 'twitter' | 'facebook';
  tags?: string[];
  content?: string;
  size?: string;
  views?: number;
  interactions?: number;
}
