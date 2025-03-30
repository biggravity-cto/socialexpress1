
import React from 'react';
import { isSameDay } from 'date-fns';
import { Campaign, Post } from '@/types/calendar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Twitter, Instagram, Facebook } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PostsListProps {
  selectedDay: Date | undefined;
  posts: Post[];
  campaigns: Campaign[];
  setShowPostCreator: (show: boolean) => void;
  onUpdatePost?: (id: string, updates: Partial<Post>) => void;
  onDeletePost?: (id: string) => void;
}

export const PostsList: React.FC<PostsListProps> = ({ 
  selectedDay, 
  posts, 
  campaigns,
  setShowPostCreator,
  onUpdatePost,
  onDeletePost
}) => {
  const { toast } = useToast();

  // Helper functions
  const getPostsForDate = (date: Date) => {
    if (!date) return [];
    return posts.filter(post => {
      const postDate = new Date(post.date);
      return isSameDay(postDate, date);
    });
  };

  const getCampaignById = (id?: string) => {
    if (!id) return null;
    return campaigns.find(campaign => campaign.id === id);
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

  return (
    <div className="space-y-3">
      {postsForSelectedDay.length > 0 ? (
        postsForSelectedDay.map(post => {
          const postCampaign = getCampaignById(post.campaign_id);
          
          return (
            <div key={post.id} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium flex items-center">
                  {getPlatformIcon(post.platform)}
                  <span className="ml-2">{post.title}</span>
                </h4>
                <span className="text-sm text-gray-500">{post.time}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Badge className={getStatusClass(post.status)}>
                  {post.status}
                </Badge>
                <Badge variant="outline">
                  {post.type}
                </Badge>
                {postCampaign && (
                  <Badge variant="outline" style={{ backgroundColor: postCampaign.color || '#e5e7eb', color: '#1f2937' }}>
                    {postCampaign.name}
                  </Badge>
                )}
              </div>
              {post.content && (
                <p className="mt-2 text-sm text-gray-700">{post.content}</p>
              )}
              
              <div className="flex justify-end mt-2 space-x-2">
                <Button variant="ghost" size="sm" onClick={() => onUpdatePost && onUpdatePost(post.id, post)}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500" onClick={() => onDeletePost && onDeletePost(post.id)}>
                  Delete
                </Button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-6 text-gray-500">
          <CalendarIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
          <p>No posts scheduled for this day</p>
          <Button 
            className="mt-3"
            onClick={() => setShowPostCreator(true)}
          >
            Create Post
          </Button>
        </div>
      )}
    </div>
  );
};
