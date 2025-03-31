
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Video, Image } from 'lucide-react';

interface ContentEmptyProps {
  searchQuery: string;
  setContentType: (type: 'post' | 'image' | 'video' | 'document') => void;
  setShowCreateContentDialog: (show: boolean) => void;
}

const ContentEmpty: React.FC<ContentEmptyProps> = ({
  searchQuery,
  setContentType,
  setShowCreateContentDialog
}) => {
  return (
    <Card className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {searchQuery ? (
        <>
          <div className="rounded-full bg-gray-100 p-4 mb-4">
            <FileText className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No content found</h3>
          <p className="text-muted-foreground mb-4">
            We couldn't find any content matching "{searchQuery}"
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Clear filters
          </Button>
        </>
      ) : (
        <>
          <div className="rounded-full bg-gray-100 p-4 mb-4">
            <FileText className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No content yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first content item to get started
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button 
              variant="outline"
              className="flex items-center"
              onClick={() => {
                setContentType('post');
                setShowCreateContentDialog(true);
              }}
            >
              <Plus className="h-4 w-4 mr-1" /> Create Post
            </Button>
            <Button 
              variant="outline"
              className="flex items-center"
              onClick={() => {
                setContentType('image');
                setShowCreateContentDialog(true);
              }}
            >
              <Image className="h-4 w-4 mr-1" /> Upload Image
            </Button>
            <Button 
              variant="outline"
              className="flex items-center"
              onClick={() => {
                setContentType('video');
                setShowCreateContentDialog(true);
              }}
            >
              <Video className="h-4 w-4 mr-1" /> Upload Video
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

export default ContentEmpty;
