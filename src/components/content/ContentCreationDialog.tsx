
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CloudUpload } from 'lucide-react';

interface ContentCreationDialogProps {
  contentType: 'post' | 'image' | 'video' | 'document';
  showCreateContentDialog: boolean;
  setShowCreateContentDialog: (show: boolean) => void;
  handleCreateContent: () => void;
}

const ContentCreationDialog: React.FC<ContentCreationDialogProps> = ({
  contentType,
  showCreateContentDialog,
  setShowCreateContentDialog,
  handleCreateContent
}) => {
  return (
    <Dialog open={showCreateContentDialog} onOpenChange={setShowCreateContentDialog}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New {contentType.charAt(0).toUpperCase() + contentType.slice(1)}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              placeholder="Enter a title..." 
              defaultValue={`New ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`}
            />
          </div>
          
          {contentType === 'post' && (
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                placeholder="Write your post content..." 
                className="h-24"
              />
            </div>
          )}
          
          {(contentType === 'image' || contentType === 'video' || contentType === 'document') && (
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/50">
              <CloudUpload className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-sm mb-2">Drag & drop your file here or click to browse</p>
              <Button variant="outline" size="sm">Select File</Button>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select defaultValue="instagram">
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue="draft">
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="reviewing">In Review</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input 
              id="tags" 
              placeholder="e.g. campaign, summer, product" 
              defaultValue={contentType}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowCreateContentDialog(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateContent}>
            Create {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentCreationDialog;
