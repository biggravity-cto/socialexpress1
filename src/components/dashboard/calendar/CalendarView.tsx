
import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addDays, getDay, parseISO } from 'date-fns';
import { Twitter, Instagram, Facebook, Trash2, Edit, Calendar as CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Post, Campaign } from '@/types/calendar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CalendarViewProps {
  posts: Post[];
  campaigns: Campaign[];
  currentMonth: Date;
  onSelectDate: (date: Date) => void;
  selectedDate: Date;
  onEditPost?: (post: Post) => void;
  onDeletePost?: (id: string) => void;
  viewMode: string;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ 
  posts, 
  campaigns, 
  currentMonth,
  onSelectDate,
  selectedDate,
  onEditPost,
  onDeletePost,
  viewMode
}) => {
  // If we're in day view, just show the selected date's posts
  if (viewMode === 'list') {
    return (
      <DayView 
        posts={posts} 
        campaigns={campaigns} 
        selectedDate={selectedDate} 
        onEditPost={onEditPost}
        onDeletePost={onDeletePost}
      />
    );
  }
  
  // If we're in week view, show the current week
  if (viewMode === 'week') {
    return (
      <WeekView 
        posts={posts} 
        campaigns={campaigns} 
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
        onEditPost={onEditPost}
        onDeletePost={onDeletePost}
      />
    );
  }
  
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
  
  return (
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
                      cursor-pointer transition-colors hover:bg-gray-50`}
                    onClick={() => onSelectDate(day)}
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
                            className="text-xs p-1 rounded bg-gray-50 hover:bg-gray-100 flex items-center gap-1 group"
                            style={{
                              borderLeft: postCampaign ? `3px solid ${postCampaign.color || '#e5e7eb'}` : 'none'
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
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Day View Component for the list view
const DayView: React.FC<{
  posts: Post[];
  campaigns: Campaign[];
  selectedDate: Date;
  onEditPost?: (post: Post) => void;
  onDeletePost?: (id: string) => void;
}> = ({ posts, campaigns, selectedDate, onEditPost, onDeletePost }) => {
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
      <h2 className="text-xl font-semibold mb-4">
        {format(selectedDate, 'MMMM d, yyyy')}
        {isToday(selectedDate) && <Badge className="ml-2 bg-blue-500">Today</Badge>}
      </h2>
      
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
        </div>
      )}
    </div>
  );
};

// Week View Component
const WeekView: React.FC<{
  posts: Post[];
  campaigns: Campaign[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onEditPost?: (post: Post) => void;
  onDeletePost?: (id: string) => void;
}> = ({ posts, campaigns, selectedDate, onSelectDate, onEditPost, onDeletePost }) => {
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
                className={`min-h-[300px] p-2 ${isSameDay(day, selectedDate) ? 'bg-blue-50' : 'bg-white'} cursor-pointer`}
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
