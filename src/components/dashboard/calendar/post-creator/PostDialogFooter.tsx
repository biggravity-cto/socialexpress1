
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

interface PostDialogFooterProps {
  isEditing: boolean;
  onDelete: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export const PostDialogFooter: React.FC<PostDialogFooterProps> = ({
  isEditing,
  onDelete,
  onCancel,
  onSave
}) => {
  return (
    <DialogFooter className="flex justify-between">
      <div>
        {isEditing && (
          <Button
            variant="destructive"
            onClick={onDelete}
          >
            Delete
          </Button>
        )}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave}>
          {isEditing ? 'Update' : 'Create'}
        </Button>
      </div>
    </DialogFooter>
  );
};
