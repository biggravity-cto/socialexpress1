
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { Post, Campaign } from '@/types/calendar';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PostItem from './PostItem';
import CampaignIndicators from './CampaignIndicators';
import { getActiveCampaignsForDate } from './helpers';

interface DayContentProps {
  day: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  dayPosts: Post[];
  campaigns: Campaign[];
  onEditPost?: (post: Post) => void;
  onDeletePost?: (id: string) => void;
  onCreatePost?: (date: Date) => void;
}

const DayContent: React.FC<DayContentProps> = ({ 
  day, 
  selectedDate, 
  onSelectDate, 
  dayPosts, 
  campaigns, 
  onEditPost, 
  onDeletePost, 
  onCreatePost 
}) => {
  const dateStr = format(day, 'yyyy-MM-dd');
  const activeCampaigns = getActiveCampaignsForDate(day, campaigns);
  
  return (
    <div 
      key={dateStr}
      className={`min-h-[300px] p-2 relative ${isSameDay(day, selectedDate) ? 'bg-blue-50' : 'bg-white'} cursor-pointer`}
      onClick={() => onSelectDate(day)}
    >
      {/* Campaign indicators */}
      <CampaignIndicators campaigns={activeCampaigns} />
      
      {/* Posts for this day */}
      <div className="space-y-1.5">
        {dayPosts.map((post) => (
          <PostItem 
            key={post.id}
            post={post}
            campaigns={campaigns}
            onEditPost={onEditPost}
            onDeletePost={onDeletePost}
          />
        ))}
        
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
};

export default DayContent;
