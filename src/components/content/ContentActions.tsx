
import React from 'react';
import { ContentItem } from '@/types/content';
import { Button } from '@/components/ui/button';
import { Share2, Download, Trash2 } from 'lucide-react';

interface ContentActionsProps {
  selectedItems: number[];
  setSelectedItems: (items: number[]) => void;
  handleBulkDelete: () => void;
}

const ContentActions: React.FC<ContentActionsProps> = ({
  selectedItems,
  setSelectedItems,
  handleBulkDelete
}) => {
  if (selectedItems.length === 0) return null;
  
  return (
    <div className="flex items-center justify-between mt-4 p-2 bg-muted rounded-md">
      <div className="text-sm">
        <span className="font-medium">{selectedItems.length}</span> items selected
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setSelectedItems([])}>
          Cancel
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" /> Download
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-1" /> Share
        </Button>
        <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
          <Trash2 className="h-4 w-4 mr-1" /> Delete
        </Button>
      </div>
    </div>
  );
};

export default ContentActions;
