
import React from 'react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PostCreatorDialogProps {
  showPostCreator: boolean;
  setShowPostCreator: (show: boolean) => void;
  newPost: {
    title: string;
    date: string;
    time: string;
    platform: string;
    type: string;
    content: string;
    status: string;
  };
  setNewPost: React.Dispatch<React.SetStateAction<{
    title: string;
    date: string;
    time: string;
    platform: string;
    type: string;
    content: string;
    status: string;
  }>>;
  handleCreatePost: () => void;
}

export const PostCreatorDialog: React.FC<PostCreatorDialogProps> = ({
  showPostCreator,
  setShowPostCreator,
  newPost,
  setNewPost,
  handleCreatePost
}) => {
  return (
    <Dialog open={showPostCreator} onOpenChange={setShowPostCreator}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              placeholder="Enter post title" 
              value={newPost.title}
              onChange={(e) => setNewPost({...newPost, title: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select 
                value={newPost.platform}
                onValueChange={(value) => setNewPost({...newPost, platform: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={newPost.status}
                onValueChange={(value) => setNewPost({...newPost, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="pending_approval">Pending Approval</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Input 
              id="content" 
              placeholder="Post content" 
              value={newPost.content || ''}
              onChange={(e) => setNewPost({...newPost, content: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input 
                id="time" 
                type="time"
                value={newPost.time}
                onChange={(e) => setNewPost({...newPost, time: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select 
                value={newPost.type}
                onValueChange={(value) => setNewPost({...newPost, type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="carousel">Carousel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowPostCreator(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePost}>
              Create Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
