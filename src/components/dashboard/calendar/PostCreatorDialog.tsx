
import React, { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Post } from '@/types/calendar';

interface PostCreatorDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  addPost: (post: Omit<Post, 'id'>) => void;
  editingPost?: Post | null;
  updatePost: (id: string, post: Partial<Post>) => void;
  deletePost: (postId: string) => void;
}

export const PostCreatorDialog: React.FC<PostCreatorDialogProps> = ({ 
  open, 
  setOpen, 
  addPost, 
  editingPost, 
  updatePost, 
  deletePost 
}) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [platform, setPlatform] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setDate(editingPost.date ? new Date(editingPost.date) : undefined);
      setTime(editingPost.time);
      setPlatform(editingPost.platform);
      setType(editingPost.type);
      setContent(editingPost.content || '');
      setStatus(editingPost.status);
    } else {
      // Reset form if not editing
      setTitle('');
      setDate(undefined);
      setTime('');
      setPlatform('');
      setType('');
      setContent('');
      setStatus('');
    }
  }, [editingPost]);

  const handleSubmit = () => {
    if (!title || !date || !time || !platform || !type || !content || !status) {
      alert('Please fill in all fields.');
      return;
    }

    const newPost = {
      id: editingPost?.id,
      title,
      date: format(date, 'yyyy-MM-dd'),
      time,
      platform,
      type,
      content,
      status,
      campaign_id: editingPost?.campaign_id
    };

    if (editingPost?.id) {
      const { id, ...updates } = newPost;
      if (id) {
        updatePost(id, updates);
      }
    } else {
      const { id, ...postData } = newPost;
      addPost(postData);
    }

    setOpen(false);
  };

  const handleDelete = () => {
    if (editingPost?.id) {
      deletePost(editingPost.id);
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Create Post</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</AlertDialogTitle>
          <AlertDialogDescription>
            {editingPost ? 'Update your post here. Click save when you\'re done.' : 'Create a new post to schedule.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center" side="bottom">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) =>
                    date < new Date()
                  }
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Time
            </Label>
            <Input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="platform" className="text-right">
              Platform
            </Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Facebook">Facebook</SelectItem>
                <SelectItem value="Twitter">Twitter</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="text">Text</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">
              Content
            </Label>
            <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {editingPost && (
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          )}
          <AlertDialogAction onClick={handleSubmit}>{editingPost ? 'Update' : 'Save'}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
