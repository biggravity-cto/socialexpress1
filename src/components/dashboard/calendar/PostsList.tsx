
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { Campaign, Post } from '@/types/calendar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CalendarIcon, Plus, Twitter, Instagram, Facebook, Edit, Trash2, Copy } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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

  const getCampaignForDate = (date: Date) => {
    if (!date) return null;
    
    return campaigns.find(campaign => {
      const start = new Date(campaign.startdate);
      const end = new Date(campaign.enddate);
      return date >= start && date <= end;
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

  const handleCopyPost = (post: Post) => {
    if (onUpdatePost) {
      const newPost = {
        ...post,
        title: `Copy of ${post.title}`,
        id: undefined,
        status: 'draft',
      };
      
      // In a real app, this would be a create operation, but for now we simulate it
      toast({
        title: "Post Copied",
        description: "A copy of the post has been created",
      });
    }
  };

  if (!selectedDay) return null;

  const postsForSelectedDay = getPostsForDate(selectedDay);
  const campaign = getCampaignForDate(selectedDay);

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">
          {format(selectedDay, 'EEEE, MMMM d, yyyy')}
        </h3>
        <Button 
          onClick={() => setShowPostCreator(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Post
        </Button>
      </div>
      
      {campaign && (
        <div 
          className="inline-block px-2 py-1 rounded text-sm font-medium mb-4"
          style={{ backgroundColor: campaign.color || '#e5e7eb' }}
        >
          <span className="mr-1">Campaign:</span> {campaign.name}
          {campaign.description && <p className="text-xs mt-1">{campaign.description}</p>}
        </div>
      )}
      
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
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{post.time}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                            <path d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setShowPostCreator(true)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCopyPost(post)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => onDeletePost && onDeletePost(post.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
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
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
