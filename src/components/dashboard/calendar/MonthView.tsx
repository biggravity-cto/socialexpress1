
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addDays, getDay, parseISO } from 'date-fns';
import { Twitter, Instagram, Facebook, Trash2, Edit, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Post, Campaign } from '@/types/calendar';
import { TooltipProvider, TooltipContent, TooltipTrigger, Tooltip } from '@/components/ui/tooltip';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import DayDetailDialog from './DayDetailDialog';

interface MonthViewProps {
  posts: Post[];
  campaigns: Campaign[];
  currentMonth: Date;
  onSelectDate: (date: Date) => void;
  selectedDate: Date;
  onEditPost?: (post: Post) => void;
  onDeletePost?: (id: string) => void;
  onCreatePost?: (date: Date) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ 
  posts, 
  campaigns, 
  currentMonth,
  onSelectDate,
  selectedDate,
  onEditPost,
  onDeletePost,
  onCreatePost
}) => {
  const [dayDetailOpen, setDayDetailOpen] = useState(false);
  
  // Generate calendar days for the current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get day of week for the first day of month (0 = Sunday, 6 = Saturday)
  const startDay = getDay(monthStart);
  
  // Generate previous month days to fill the first row
  const prevMonthDays = [];
  for (let i = 0; i < startDay; i++) {
    prevMonthDays.unshift(addDays(monthStart, -i - 1));
  }
  prevMonthDays.reverse();
  
  // Generate next month days to complete the last row
  const lastWeekDay = getDay(monthEnd);
  const nextMonthDays = [];
  for (let i = 1; i < 7 - lastWeekDay; i++) {
    nextMonthDays.push(addDays(monthEnd, i));
  }
  
  // Combine all days
  const allDays = [...prevMonthDays, ...daysInMonth, ...nextMonthDays];
  
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
  
  // Create weeks array for the calendar grid
  const weeks = [];
  let days = [];
  
  allDays.forEach((day, index) => {
    if (index % 7 === 0 && index > 0) {
      weeks.push(days);
      days = [];
    }
    days.push(day);
    
    if (index === allDays.length - 1) {
      weeks.push(days);
    }
  });
  
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
  
  // Handle day click
  const handleDayClick = (day: Date) => {
    onSelectDate(day);
    setDayDetailOpen(true);
  };
  
  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Calendar header with weekday names */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
              <div key={day} className="py-2 text-center font-medium">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid with weeks and days */}
          <div className="divide-y divide-gray-200">
            {weeks.map((week, weekIndex) => (
              <div key={`week-${weekIndex}`} className="grid grid-cols-7 divide-x divide-gray-200">
                {week.map((day, dayIndex) => {
                  const dateStr = format(day, 'yyyy-MM-dd');
                  const dayPosts = postsByDate[dateStr] || [];
                  const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                  const isSelected = isSameDay(day, selectedDate);
                  const dayIsToday = isToday(day);
                  const activeCampaigns = getActiveCampaignsForDate(day);
                  
                  return (
                    <div 
                      key={`day-${weekIndex}-${dayIndex}`}
                      className={`min-h-[120px] p-1 relative ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'} 
                        ${isSelected ? 'ring-2 ring-blue-500 ring-inset' : ''} 
                        ${dayIsToday ? 'bg-blue-50' : ''} 
                        cursor-pointer transition-colors hover:bg-gray-50 group`}
                      onClick={() => handleDayClick(day)}
                    >
                      {/* Campaign stripes at the top of the day */}
                      {activeCampaigns.length > 0 && (
                        <div className="absolute top-0 left-0 right-0 flex h-1.5 overflow-hidden">
                          {activeCampaigns.map((campaign, idx) => (
                            <div 
                              key={campaign.id}
                              className="h-full flex-1"
                              style={{ backgroundColor: campaign.color || '#e5e7eb' }}
                              title={campaign.name}
                            />
                          ))}
                        </div>
                      )}
                      
                      <div className="flex justify-between items-start mt-1.5">
                        <span className={`text-sm p-1 rounded-full w-6 h-6 flex items-center justify-center
                          ${dayIsToday ? 'bg-blue-500 text-white' : ''} 
                          ${!isCurrentMonth ? 'text-gray-400' : ''}`}
                        >
                          {format(day, 'd')}
                        </span>
                        
                        {/* Show campaign badges */}
                        {activeCampaigns.length > 0 && (
                          <div className="flex flex-wrap gap-1 max-w-[70%] justify-end">
                            {activeCampaigns.slice(0, 2).map((campaign) => (
                              <TooltipProvider key={campaign.id}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Badge 
                                      variant="outline" 
                                      className="text-[0.6rem] px-1 py-0 h-4"
                                      style={{ 
                                        backgroundColor: campaign.color || '#e5e7eb',
                                        borderColor: campaign.color || '#e5e7eb'
                                      }}
                                    >
                                      {campaign.name.length > 10 ? `${campaign.name.substring(0, 10)}...` : campaign.name}
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{campaign.name}</p>
                                    <p className="text-xs">{campaign.startdate} - {campaign.enddate}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                            {activeCampaigns.length > 2 && (
                              <Badge variant="outline" className="text-[0.6rem] px-1 py-0 h-4">
                                +{activeCampaigns.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Posts for this day */}
                      <div className="mt-1 space-y-1">
                        {dayPosts.slice(0, 3).map((post) => {
                          const postCampaign = getCampaignById(post.campaign_id);
                          
                          return (
                            <div 
                              key={post.id} 
                              className="text-xs p-1 rounded bg-gray-50 hover:bg-gray-100 flex items-center gap-1 group border-l-2"
                              style={{
                                borderLeftColor: postCampaign ? postCampaign.color || '#e5e7eb' : '#e5e7eb'
                              }}
                            >
                              {getPlatformIcon(post.platform)}
                              <span className="truncate flex-1">{post.title}</span>
                              
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onEditPost && onEditPost(post);
                                  }}
                                  className="p-0.5 text-gray-400 hover:text-blue-500"
                                >
                                  <Edit className="h-3 w-3" />
                                </button>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onDeletePost && onDeletePost(post.id);
                                  }}
                                  className="p-0.5 text-gray-400 hover:text-red-500"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                        
                        {dayPosts.length > 3 && (
                          <div className="text-xs text-gray-500 pl-1">+{dayPosts.length - 3} more</div>
                        )}
                      </div>
                      
                      {/* "Add" button appears on hover */}
                      <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0 rounded-full bg-blue-50 hover:bg-blue-100"
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
            ))}
          </div>
        </div>
      </div>
      
      {/* Day Detail Dialog */}
      <Dialog open={dayDetailOpen} onOpenChange={setDayDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DayDetailDialog 
            date={selectedDate} 
            posts={posts.filter(post => isSameDay(parseISO(post.date), selectedDate))}
            campaigns={campaigns}
            onEditPost={onEditPost}
            onDeletePost={onDeletePost}
            onCreatePost={() => onCreatePost && onCreatePost(selectedDate)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MonthView;
