
import React from 'react';
import { format, isSameDay, isToday, parseISO } from 'date-fns';
import { Twitter, Instagram, Facebook, Trash2, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Post, Campaign } from '@/types/calendar';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface WeekViewProps {
  posts: Post[];
  campaigns: Campaign[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onEditPost?: (post: Post) => void;
  onDeletePost?: (id: string) => void;
  onCreatePost?: (date: Date) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ 
  posts, 
  campaigns, 
  selectedDate, 
  onSelectDate, 
  onEditPost, 
  onDeletePost, 
  onCreatePost 
}) => {
  // Get the start of the week (Sunday)
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
  
  // Generate days for the week
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    weekDays.push(day);
  }
  
  // Group posts by date
  const postsByDate = posts.reduce((acc, post) => {
    const dateStr = post.date;
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(post);
    return acc;
  }, {} as Record<string, Post[]>);
  
  // Helper function to get campaign by ID
  const getCampaignById = (campaignId?: string) => {
    if (!campaignId) return null;
    return campaigns.find(camp => camp.id === campaignId);
  };
  
  // Helper function to find active campaigns for a date
  const getActiveCampaignsForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return campaigns.filter(campaign => {
      return dateStr >= campaign.startdate && dateStr <= campaign.enddate;
    });
  };
  
  // Platform icons
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className="h-3 w-3 text-blue-400" />;
      case 'instagram':
        return <Instagram className="h-3 w-3 text-pink-500" />;
      case 'facebook':
        return <Facebook className="h-3 w-3 text-blue-600" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Week header with day names */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {weekDays.map((day) => (
            <div 
              key={format(day, 'yyyy-MM-dd')} 
              className={`py-2 text-center ${isSameDay(day, selectedDate) ? 'font-bold bg-blue-50' : 'font-medium'}`}
              onClick={() => onSelectDate(day)}
            >
              <div>{format(day, 'EEE')}</div>
              <div className={`text-xl ${isToday(day) ? 'bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto' : ''}`}>
                {format(day, 'd')}
              </div>
              <div className="text-gray-500 text-sm">{format(day, 'MMM')}</div>
            </div>
          ))}
        </div>
        
        {/* Week content with posts for each day */}
        <div className="grid grid-cols-7 divide-x divide-gray-200">
          {weekDays.map((day) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const dayPosts = postsByDate[dateStr] || [];
            const activeCampaigns = getActiveCampaignsForDate(day);
            
            return (
              <div 
                key={dateStr}
                className={`min-h-[300px] p-2 relative ${isSameDay(day, selectedDate) ? 'bg-blue-50' : 'bg-white'} cursor-pointer`}
                onClick={() => onSelectDate(day)}
              >
                {/* Campaign indicators */}
                {activeCampaigns.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {activeCampaigns.map((campaign) => (
                      <TooltipProvider key={campaign.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge 
                              variant="outline" 
                              className="text-xs px-1.5"
                              style={{ 
                                backgroundColor: campaign.color || '#e5e7eb',
                                borderColor: campaign.color || '#e5e7eb'
                              }}
                            >
                              {campaign.name.length > 12 ? `${campaign.name.substring(0, 12)}...` : campaign.name}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{campaign.name}</p>
                            <p className="text-xs">{campaign.startdate} - {campaign.enddate}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                )}
                
                {/* Posts for this day */}
                <div className="space-y-1.5">
                  {dayPosts.map((post) => {
                    const postCampaign = getCampaignById(post.campaign_id);
                    
                    return (
                      <div 
                        key={post.id} 
                        className="text-xs p-2 rounded bg-white border hover:shadow transition-shadow flex items-center gap-1 group"
                        style={{
                          borderLeft: postCampaign ? `3px solid ${postCampaign.color || '#e5e7eb'}` : 'none'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditPost && onEditPost(post);
                        }}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-1">
                            {getPlatformIcon(post.platform)}
                            <span className="font-medium">{post.title}</span>
                          </div>
                          <div className="text-gray-500 mt-0.5">{post.time}</div>
                        </div>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeletePost && onDeletePost(post.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })}
                  
                  {dayPosts.length === 0 && (
                    <div className="text-xs text-gray-400 text-center py-2">No posts</div>
                  )}
                </div>
                
                {/* "Add" button appears on hover */}
                <div className="absolute bottom-2 right-2 opacity-0 hover:opacity-100 group-hover:opacity-100">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 w-7 p-0 rounded-full bg-blue-50 hover:bg-blue-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCreatePost && onCreatePost(day);
                    }}
                  >
                    <PlusCircle className="h-4 w-4 text-blue-600" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
