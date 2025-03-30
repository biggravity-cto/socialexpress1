
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Instagram, Twitter, Facebook, Globe, MoreHorizontal } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AnimatedCard from '../ui/AnimatedCard';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Campaign, Post } from '@/types/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { parseISO, format } from 'date-fns';

interface CalendarViewProps {
  posts: Post[];
  campaigns: Campaign[];
  onCreatePost?: (postData: any) => void;
  onUpdatePost?: (id: string, updates: Partial<Post>) => void;
  onDeletePost?: (id: string) => void;
}

export const Calendar: React.FC<CalendarViewProps> = ({ 
  posts = [], 
  campaigns = [],
  onCreatePost,
  onUpdatePost,
  onDeletePost
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDatePosts, setSelectedDatePosts] = useState<Post[]>([]);
  const [draggingPost, setDraggingPost] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // Convert ISO date strings to Date objects
  const convertToDate = (dateStr: string) => {
    return parseISO(dateStr);
  };

  // Update posts when date changes
  React.useEffect(() => {
    if (date) {
      const formattedSelectedDate = format(date, 'yyyy-MM-dd');
      const filteredPosts = posts.filter(post => {
        return post.date === formattedSelectedDate;
      });
      setSelectedDatePosts(filteredPosts);
    } else {
      setSelectedDatePosts([]);
    }
  }, [date, posts]);

  // Function to generate highlighted dates for the calendar
  const getHighlightedDates = () => {
    const uniqueDates = new Set<string>();
    
    posts.forEach(post => {
      uniqueDates.add(post.date);
    });
    
    return Array.from(uniqueDates).map(dateStr => parseISO(dateStr));
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'pending_approval':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDragStart = (postId: string) => {
    setDraggingPost(postId);
  };

  const handleDragEnd = () => {
    setDraggingPost(null);
  };

  const handleDrop = (newDate: Date) => {
    if (draggingPost && onUpdatePost) {
      const formattedNewDate = format(newDate, 'yyyy-MM-dd');
      onUpdatePost(draggingPost, { date: formattedNewDate });
      setDraggingPost(null);
    }
  };

  const handleCreateClick = () => {
    if (onCreatePost && date) {
      onCreatePost({
        title: "New post",
        date: format(date, 'yyyy-MM-dd'),
        time: "12:00",
        platform: "instagram",
        type: "Post",
        status: "draft"
      });
    }
  };

  const handleDeletePost = (postId: string) => {
    if (onDeletePost) {
      onDeletePost(postId);
    }
  };

  return (
    <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'}`}>
      <div className={`${isMobile ? 'mb-4' : 'lg:col-span-4'}`}>
        <AnimatedCard className="h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-resort-800">Select Date</h3>
            <Button variant="outline" size="sm" className="text-xs h-8" onClick={() => setDate(new Date())}>
              <CalendarIcon className="mr-1 h-3 w-3" /> Today
            </Button>
          </div>
          
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border pointer-events-auto w-full"
            modifiers={{
              highlighted: getHighlightedDates()
            }}
            modifiersStyles={{
              highlighted: {
                fontWeight: 'bold',
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                color: 'rgb(3, 105, 161)'
              }
            }}
            onDayMouseEnter={(day) => {
              if (draggingPost) {
                // Show visual feedback that this day is a drop target
                console.log(`Hovering over ${day.toDateString()} with post ${draggingPost}`);
              }
            }}
            onDayClick={(day) => {
              if (draggingPost) {
                handleDrop(day);
              }
            }}
          />
          
          <div className="mt-4 text-sm text-resort-500">
            <p>
              {date ? format(date, 'MMMM yyyy') : ''}
            </p>
            <div className="flex flex-col space-y-2 mt-3">
              <div className="flex items-center space-x-2">
                <span className="inline-block w-3 h-3 rounded-full bg-blue-100"></span>
                <span>Scheduled</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-100"></span>
                <span>Published</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-3 h-3 rounded-full bg-amber-100"></span>
                <span>Pending Approval</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-3 h-3 rounded-full bg-gray-100"></span>
                <span>Draft</span>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
      
      <div className={`${isMobile ? '' : 'lg:col-span-8'}`}>
        <AnimatedCard className="h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium text-resort-800">
              {date ? format(date, 'EEEE, MMMM d') : 'Posts'}
            </h3>
            <Button 
              size="sm" 
              className="bg-ocean-600 hover:bg-ocean-700 h-8 text-xs"
              onClick={handleCreateClick}
            >
              + Add Content
            </Button>
          </div>
          
          {selectedDatePosts.length > 0 ? (
            <div className="space-y-3">
              {selectedDatePosts.map((post) => (
                <div 
                  key={post.id} 
                  className={cn(
                    "group p-3 rounded-lg border border-gray-100 hover:border-ocean-200 hover:bg-ocean-50/30 transition-all duration-300",
                    draggingPost === post.id ? "opacity-50 border-dashed border-ocean-500" : "",
                    post.status === 'pending_approval' ? "border-l-4 border-l-amber-400" : ""
                  )}
                  draggable={true}
                  onDragStart={() => handleDragStart(post.id)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-1 flex-wrap gap-2">
                        <Badge className={cn("mr-2 px-2 py-0.5 text-xs font-normal", getStatusColor(post.status))}>
                          {post.status.replace('_', ' ')}
                        </Badge>
                        <span className="flex items-center text-resort-500 text-xs">
                          <span className="p-1 rounded-full bg-gray-50 mr-1.5">
                            {getPlatformIcon(post.platform)}
                          </span>
                          {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}
                        </span>
                      </div>
                      <h4 className="font-medium text-resort-800">{post.title}</h4>
                      <div className="flex items-center mt-2 text-resort-500 text-xs">
                        <Clock className="mr-1 h-3 w-3" />
                        {post.time}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="cursor-move text-resort-400 p-1 rounded hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="9" cy="5" r="1" />
                          <circle cx="9" cy="12" r="1" />
                          <circle cx="9" cy="19" r="1" />
                          <circle cx="15" cy="5" r="1" />
                          <circle cx="15" cy="12" r="1" />
                          <circle cx="15" cy="19" r="1" />
                        </svg>
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-resort-500"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Edit Post</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          {post.status === 'pending_approval' && (
                            <DropdownMenuItem>Approve</DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4">
              <div className="text-resort-400 mb-3">
                <CalendarIcon className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-resort-800 mb-2">No posts scheduled</h3>
              <p className="text-resort-500 text-sm mb-6">
                There are no posts scheduled for this date. Add a new post to get started.
              </p>
              <Button 
                size="sm" 
                className="bg-ocean-600 hover:bg-ocean-700"
                onClick={handleCreateClick}
              >
                Create New Post
              </Button>
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-resort-500">
              Tip: You can drag and drop posts to reschedule them to different dates.
            </p>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default Calendar;
