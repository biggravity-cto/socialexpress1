
import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addDays, getDay } from 'date-fns';
import { Twitter, Instagram, Facebook } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Post, Campaign } from '@/types/calendar';

interface CalendarViewProps {
  posts: Post[];
  campaigns: Campaign[];
  currentMonth: Date;
  onSelectDate: (date: Date) => void;
  selectedDate: Date;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ 
  posts, 
  campaigns, 
  currentMonth,
  onSelectDate,
  selectedDate
}) => {
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
  
  // Helper function to find active campaign for a date
  const getActiveCampaignForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return campaigns.find(campaign => {
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
                const activeCampaign = getActiveCampaignForDate(day);
                
                return (
                  <div 
                    key={`day-${weekIndex}-${dayIndex}`}
                    className={`min-h-[120px] p-1 ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'} 
                      ${isSelected ? 'ring-2 ring-blue-500 ring-inset' : ''} 
                      ${dayIsToday ? 'bg-blue-50' : ''}`}
                    onClick={() => onSelectDate(day)}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-sm p-1 rounded-full w-6 h-6 flex items-center justify-center
                        ${dayIsToday ? 'bg-blue-500 text-white' : ''} 
                        ${!isCurrentMonth ? 'text-gray-400' : ''}`}
                      >
                        {format(day, 'd')}
                      </span>
                      
                      {/* Show campaign if active for this day */}
                      {activeCampaign && (
                        <Badge 
                          variant="outline" 
                          style={{ 
                            backgroundColor: activeCampaign.color || '#e5e7eb',
                            fontSize: '0.65rem',
                            padding: '0 4px'
                          }}
                        >
                          {activeCampaign.name}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Posts for this day */}
                    <div className="mt-1 space-y-1">
                      {dayPosts.slice(0, 3).map((post) => {
                        const postCampaign = getCampaignById(post.campaign_id);
                        
                        return (
                          <div 
                            key={post.id} 
                            className="text-xs p-1 rounded bg-gray-50 flex items-center gap-1"
                            style={{
                              borderLeft: postCampaign ? `3px solid ${postCampaign.color || '#e5e7eb'}` : 'none'
                            }}
                          >
                            {getPlatformIcon(post.platform)}
                            <span className="truncate">{post.title}</span>
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
