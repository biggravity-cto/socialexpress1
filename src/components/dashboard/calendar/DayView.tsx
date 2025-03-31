
import React from 'react';
import { format, isSameDay, isToday, parseISO } from 'date-fns';
import { Twitter, Instagram, Facebook, Trash2, Edit, CalendarIcon, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Post, Campaign } from '@/types/calendar';

interface DayViewProps {
  posts: Post[];
  campaigns: Campaign[];
  selectedDate: Date;
  onEditPost?: (post: Post) => void;
  onDeletePost?: (id: string) => void;
  onCreatePost?: (date: Date) => void;
}

const DayView: React.FC<DayViewProps> = ({ 
  posts, 
  campaigns, 
  selectedDate, 
  onEditPost, 
  onDeletePost, 
  onCreatePost 
}) => {
  // Filter posts for the selected date
  const dayPosts = posts.filter(post => {
    return isSameDay(parseISO(post.date), selectedDate);
  });
  
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
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          {format(selectedDate, 'MMMM d, yyyy')}
          {isToday(selectedDate) && <Badge className="ml-2 bg-blue-500">Today</Badge>}
        </h2>
        
        <Button 
          onClick={() => onCreatePost && onCreatePost(selectedDate)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <PlusCircle className="h-4 w-4 mr-1" /> Add Post
        </Button>
      </div>
      
      {dayPosts.length > 0 ? (
        <div className="space-y-3">
          {dayPosts.map(post => {
            const postCampaign = getCampaignById(post.campaign_id);
            
            return (
              <div 
                key={post.id}
                className="border rounded-lg p-3 hover:shadow-sm transition-shadow"
                style={{
                  borderLeft: postCampaign ? `4px solid ${postCampaign.color || '#e5e7eb'}` : undefined
                }}
              >
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium flex items-center gap-2">
                    {getPlatformIcon(post.platform)}
                    {post.title}
                  </h3>
                  <span className="text-sm text-gray-500">{post.time}</span>
                </div>
                
                {post.content && (
                  <p className="text-sm text-gray-700 mb-3">{post.content}</p>
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
                
                <div className="flex justify-end mt-3 space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onEditPost && onEditPost(post)}
                    className="flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onDeletePost && onDeletePost(post.id)} 
                    className="text-red-500 flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 border rounded-lg bg-gray-50">
          <CalendarIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
          <p className="text-gray-500">No posts scheduled for this day</p>
          <Button 
            variant="outline"
            className="mt-4"
            onClick={() => onCreatePost && onCreatePost(selectedDate)}
          >
            <PlusCircle className="h-4 w-4 mr-1" /> Create Post
          </Button>
        </div>
      )}
    </div>
  );
};

export default DayView;
