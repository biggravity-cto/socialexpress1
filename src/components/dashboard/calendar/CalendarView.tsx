
import React, { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { CalendarHeader } from './CalendarHeader';
import { CalendarBody } from './CalendarBody';
import { PostsList } from './PostsList';
import { PostCreatorDialog } from './PostCreatorDialog';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Post, Campaign } from '@/types/calendar';

interface CalendarViewProps {
  posts: Post[];
  campaigns: Campaign[];
  onCreatePost: (post: Omit<Post, 'id'>) => void;
  onUpdatePost: (id: string, updates: Partial<Post>) => void;
  onDeletePost: (id: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ 
  posts, 
  campaigns, 
  onCreatePost, 
  onUpdatePost, 
  onDeletePost 
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCreatorDialogOpen, setIsCreatorDialogOpen] = useState(false);

  useEffect(() => {
    // Initialize if no posts provided
    if (!posts.length) {
      console.log('No posts provided, using mock data');
    }
  }, [posts]);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    const postForEditing = {
      id: post.id,
      title: post.title,
      date: post.date,
      time: post.time,
      platform: post.platform,
      type: post.type,
      content: post.content || '', // Ensure content is not undefined
      status: post.status,
      campaign_id: post.campaign_id
    };
    setEditingPost(postForEditing);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
    }
  };

  const handleCreatePost = () => {
    setIsCreatorDialogOpen(true);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setIsCreatorDialogOpen(true);
  };

  const handleDeletePost = (post: Post) => {
    onDeletePost(post.id);
  };

  const handleSavePost = (post: Omit<Post, 'id'> & { id?: string }) => {
    if (post.id) {
      onUpdatePost(post.id, post);
    } else {
      onCreatePost(post);
    }
    setIsCreatorDialogOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        <CalendarBody selectedDay={date} setSelectedDay={handleDateSelect} currentMonth={date} posts={posts} />
      </div>
      <div className="w-full md:w-1/2">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Posts for {date ? format(date, "PPP") : 'Selected Date'}</h2>
          <Button onClick={handleCreatePost}>Create Post</Button>
        </div>
        <PostsList
          selectedDay={date}
          posts={posts}
          campaigns={campaigns}
          setShowPostCreator={setIsCreatorDialogOpen}
          onUpdatePost={onUpdatePost}
          onDeletePost={onDeletePost}
        />
      </div>

      {/* Post Creator Dialog */}
      <PostCreatorDialog
        open={isCreatorDialogOpen}
        setOpen={setIsCreatorDialogOpen}
        addPost={onCreatePost}
        editingPost={editingPost}
        updatePost={onUpdatePost}
        deletePost={onDeletePost}
      />
    </div>
  );
};
