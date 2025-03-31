
import React from 'react';
import { format, isSameDay, isToday } from 'date-fns';
import { Twitter, Instagram, Facebook, Trash2, Edit, CalendarIcon, Clock, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Post, Campaign } from '@/types/calendar';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PlusCircle } from 'lucide-react';

interface DayDetailDialogProps {
  date: Date;
  posts: Post[];
  campaigns: Campaign[];
  onEditPost?: (post: Post) => void;
  onDeletePost?: (id: string) => void;
  onCreatePost?: () => void;
}

const DayDetailDialog: React.FC<DayDetailDialogProps> = ({ 
  date, 
  posts, 
  campaigns, 
  onEditPost, 
  onDeletePost, 
  onCreatePost 
}) => {
  // Helper function to get campaign by ID
  const getCampaignById = (campaignId?: string) => {
    if (!campaignId) return null;
    return campaigns.find(camp => camp.id === campaignId);
  };
  
  // Platform icons
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
  
  // Status classes
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
  
  // Group posts by time
  const postsByTime = posts.reduce((acc, post) => {
    const time = post.time || 'No time';
    if (!acc[time]) {
      acc[time] = [];
    }
    acc[time].push(post);
    return acc;
  }, {} as Record<string, Post[]>);
  
  // Sort times
  const sortedTimes = Object.keys(postsByTime).sort((a, b) => {
    if (a === 'No time') return 1;
    if (b === 'No time') return -1;
    return a.localeCompare(b);
  });
  
  return (
    <>
      <DialogHeader>
        <div className="flex justify-between items-center">
          <DialogTitle className="text-xl flex items-center">
            {format(date, 'EEEE, MMMM d, yyyy')}
            {isToday(date) && <Badge className="ml-2 bg-blue-500">Today</Badge>}
          </DialogTitle>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={onCreatePost}
          >
            <PlusCircle className="h-4 w-4 mr-1" /> Add Post
          </Button>
        </div>
      </DialogHeader>
      
      <div className="max-h-[60vh] overflow-y-auto mt-4">
        {posts.length > 0 ? (
          <div className="space-y-4">
            {sortedTimes.map(time => (
              <div key={time} className="border-b pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-medium text-sm text-gray-500 mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-1" /> {time}
                </h3>
                <div className="space-y-3">
                  {postsByTime[time].map(post => {
                    const postCampaign = getCampaignById(post.campaign_id);
                    
                    return (
                      <div 
                        key={post.id}
                        className="border rounded-lg p-3 hover:shadow-sm transition-shadow"
                        style={{
                          borderLeft: postCampaign ? `4px solid ${postCampaign.color || '#e5e7eb'}` : undefined
                        }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium flex items-center gap-2">
                            {getPlatformIcon(post.platform)}
                            {post.title}
                          </h3>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => onEditPost && onEditPost(post)}>
                                <Edit className="h-4 w-4 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Clock className="h-4 w-4 mr-2" /> Reschedule
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Bookmark className="h-4 w-4 mr-2" /> Add to Campaign
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="h-4 w-4 mr-2" /> Share
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => onDeletePost && onDeletePost(post.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        {post.content && (
                          <p className="text-sm text-gray-700 mb-3">{post.content}</p>
                        )}
                        
                        {post.imgurl && (
                          <div className="mb-3 bg-gray-100 rounded-md p-1">
                            <img 
                              src={post.imgurl} 
                              alt={post.title} 
                              className="w-full h-32 object-cover rounded"
                            />
                          </div>
                        )}
                        
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className={getStatusClass(post.status)}>
                            {post.status.replace('_', ' ')}
                          </Badge>
                          
                          <Badge variant="outline">
                            {post.type}
                          </Badge>
                          
                          {postCampaign && (
                            <Badge 
                              variant="outline" 
                              style={{ 
                                backgroundColor: postCampaign.color || '#e5e7eb',
                                borderColor: postCampaign.color || '#e5e7eb'
                              }}
                            >
                              {postCampaign.name}
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border rounded-lg bg-gray-50">
            <CalendarIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p className="text-gray-500">No posts scheduled for this day</p>
            <Button 
              variant="outline"
              className="mt-4"
              onClick={onCreatePost}
            >
              <PlusCircle className="h-4 w-4 mr-1" /> Create Post
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default DayDetailDialog;
