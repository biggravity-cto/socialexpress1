
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { Campaign, Post } from '@/types/calendar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CalendarIcon, Plus, Twitter, Instagram, Facebook } from 'lucide-react';

interface PostsListProps {
  selectedDay: Date | undefined;
  posts: Post[];
  campaigns: Campaign[];
  setShowPostCreator: (show: boolean) => void;
}

export const PostsList: React.FC<PostsListProps> = ({ 
  selectedDay, 
  posts, 
  campaigns,
  setShowPostCreator 
}) => {
  // Helper functions
  const getPostsForDate = (date: Date) => {
    if (!date) return [];
    
    return posts.filter(post => {
      const postDate = new Date(post.date);
      return isSameDay(postDate, date);
    });
  };

  const getCampaignForDate = (date: Date) => {
    if (!date) return null;
    
    return campaigns.find(campaign => {
      const start = new Date(campaign.startdate);
      const end = new Date(campaign.enddate);
      return date >= start && date <= end;
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className="h-4 w-4 text-blue-400" />;
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case 'facebook':
        return <Facebook className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'pending_approval':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!selectedDay) return null;

  const postsForSelectedDay = getPostsForDate(selectedDay);
  const campaign = getCampaignForDate(selectedDay);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-2">
        {format(selectedDay, 'EEEE, MMMM d, yyyy')}
      </h3>
      
      {campaign && (
        <div 
          className="inline-block px-2 py-1 rounded text-sm font-medium mb-4"
          style={{ backgroundColor: campaign.color || '#e5e7eb' }}
        >
          {campaign.name}
        </div>
      )}
      
      <div className="space-y-3">
        {postsForSelectedDay.length > 0 ? (
          postsForSelectedDay.map(post => (
            <div key={post.id} className="p-3 border rounded-lg">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium flex items-center">
                  {getPlatformIcon(post.platform)}
                  <span className="ml-2">{post.title}</span>
                </h4>
                <span className="text-sm text-gray-500">{post.time}</span>
              </div>
              <div className="flex items-center mt-1">
                <Badge className={getStatusClass(post.status)}>
                  {post.status}
                </Badge>
                <Badge variant="outline" className="ml-2">
                  {post.type}
                </Badge>
              </div>
              {post.content && (
                <p className="mt-2 text-sm text-gray-700">{post.content}</p>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            <CalendarIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p>No posts scheduled for this day</p>
            <Button 
              className="mt-3"
              onClick={() => setShowPostCreator(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
