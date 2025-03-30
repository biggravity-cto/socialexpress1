import React, { useState, useEffect } from 'react';
import { Calendar as ShadCalendar } from "@/components/ui/calendar"
import { CalendarHeader } from './CalendarHeader';
import { CalendarBody } from './CalendarBody';
import { PostsList } from './PostsList';
import { PostCreatorDialog } from './PostCreatorDialog';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';

interface Post {
  id?: string;
  title: string;
  date: string;
  time: string;
  platform: string;
  type: string;
  content: string;
  status: string;
  campaign_id?: string;
}

export const CalendarView = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCreatorDialogOpen, setIsCreatorDialogOpen] = useState(false);

  useEffect(() => {
    // Mock data fetching
    const mockPosts: Post[] = [
      {
        id: '1',
        title: 'Sample Post 1',
        date: format(new Date(), 'yyyy-MM-dd'),
        time: '10:00',
        platform: 'Facebook',
        type: 'image',
        content: 'Check out this awesome image!',
        status: 'scheduled',
        campaign_id: 'campaign1'
      },
      {
        id: '2',
        title: 'Sample Post 2',
        date: format(new Date(), 'yyyy-MM-dd'),
        time: '14:00',
        platform: 'Twitter',
        type: 'text',
        content: 'Just sharing a quick thought.',
        status: 'scheduled',
        campaign_id: 'campaign2'
      },
    ];
    setPosts(mockPosts);
  }, []);

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
  };

  const handleDeletePost = (post: Post) => {
    // Implement delete logic here
    console.log('Delete post', post);
  };

  const handleSavePost = (post: Post) => {
    // Implement save logic here
    console.log('Save post', post);
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
              <ShadCalendar.Icon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <ShadCalendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <CalendarBody selectedDate={date} posts={posts} onPostClick={handlePostClick} />
      </div>
      <div className="w-full md:w-1/2">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Posts for {date ? format(date, "PPP") : 'Selected Date'}</h2>
          <Button onClick={handleCreatePost}>Create Post</Button>
        </div>
        <PostsList
          posts={posts.filter(post => post.date === format(date, 'yyyy-MM-dd'))}
          onEdit={handleEditPost}
          onDelete={handleDeletePost}
        />
      </div>

      {/* Post Creator Dialog */}
      <PostCreatorDialog
        open={isCreatorDialogOpen}
        onOpenChange={setIsCreatorDialogOpen}
        onSave={handleSavePost}
      />
    </div>
  );
};
