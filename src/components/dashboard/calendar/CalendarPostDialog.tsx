
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PostCreatorDialog } from '@/components/dashboard/calendar/post-creator';
import { Post, Campaign } from '@/types/calendar';

interface CalendarPostDialogProps {
  showPostCreator: boolean;
  setShowPostCreator: (show: boolean) => void;
  selectedDate: Date;
  campaigns: Campaign[];
  editingPost: Post | null;
  handleCreatePost: (postData: Omit<Post, 'id'>) => Promise<void>;
  handleUpdatePost: (id: string, updates: Partial<Post>) => Promise<void>;
}

export const CalendarPostDialog: React.FC<CalendarPostDialogProps> = ({
  showPostCreator,
  setShowPostCreator,
  selectedDate,
  campaigns,
  editingPost,
  handleCreatePost,
  handleUpdatePost
}) => {
  return (
    <Dialog open={showPostCreator} onOpenChange={setShowPostCreator}>
      <DialogContent className="sm:max-w-[600px]">
        <PostCreatorDialog
          selectedDate={selectedDate}
          campaigns={campaigns}
          onSavePost={editingPost ? 
            (postData) => handleUpdatePost(editingPost.id, postData) : 
            handleCreatePost
          }
          onCancel={() => {
            setShowPostCreator(false);
          }}
          editingPost={editingPost}
        />
      </DialogContent>
    </Dialog>
  );
};
