import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
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
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Post, Campaign } from '@/types/calendar';
import { fetchCampaigns } from '@/services/calendarService';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface PostCreatorDialogProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  addPost?: (post: Omit<Post, 'id'>) => void;
  updatePost?: (id: string, updates: Partial<Post>) => void;
  deletePost?: (id: string) => void;
  editingPost?: Post | null;
  onSavePost?: (post: Omit<Post, 'id'> & { id?: string }) => void;
  onCancel?: () => void;
  selectedDate?: Date; // Added this prop to match usage in Calendar.tsx
  campaigns?: Campaign[]; // Added this prop to match usage in Calendar.tsx
}

export const PostCreatorDialog: React.FC<PostCreatorDialogProps> = ({ 
  open, 
  setOpen, 
  addPost,
  updatePost,
  deletePost,
  editingPost,
  onSavePost,
  onCancel,
  selectedDate: initialSelectedDate,
  campaigns: initialCampaigns = []
}) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [date, setDate] = useState<Date>(initialSelectedDate || new Date());
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Omit<Post, 'id'> & { id?: string }>({
    title: '',
    date: format(date, 'yyyy-MM-dd'),
    time: '09:00',
    platform: 'instagram',
    type: 'image',
    content: '',
    status: 'draft',
    campaign_id: undefined
  });

  useEffect(() => {
    // Only fetch campaigns if they weren't provided as props
    if (initialCampaigns.length === 0) {
      const loadCampaigns = async () => {
        try {
          const campaignsData = await fetchCampaigns();
          setCampaigns(campaignsData);
        } catch (error) {
          console.error('Error loading campaigns:', error);
          toast({
            title: "Error",
            description: "Failed to load campaigns",
            variant: "destructive"
          });
        }
      };
  
      loadCampaigns();
    }
  }, [initialCampaigns, toast]);

  useEffect(() => {
    if (editingPost) {
      // Convert string date to Date object
      const postDate = new Date(editingPost.date);
      setDate(postDate);
      
      setFormData({
        id: editingPost.id,
        title: editingPost.title || '',
        date: editingPost.date,
        time: editingPost.time || '09:00',
        platform: editingPost.platform,
        type: editingPost.type || 'image',
        content: editingPost.content || '',
        status: editingPost.status,
        campaign_id: editingPost.campaign_id
      });
    } else if (initialSelectedDate) {
      // Initialize with the selected date if provided
      setDate(initialSelectedDate);
      setFormData(prev => ({
        ...prev,
        date: format(initialSelectedDate, 'yyyy-MM-dd')
      }));
    } else {
      // Reset form when creating a new post
      setDate(new Date());
      setFormData({
        title: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        time: '09:00',
        platform: 'instagram',
        type: 'image',
        content: '',
        status: 'draft',
        campaign_id: undefined
      });
    }
  }, [editingPost, open, initialSelectedDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const postData = {
      ...formData,
      date: format(date, 'yyyy-MM-dd')
    };
    
    if (onSavePost) {
      onSavePost(postData);
      if (setOpen) setOpen(false);
    } else if (formData.id && updatePost) {
      updatePost(formData.id, postData);
      if (setOpen) setOpen(false);
    } else if (addPost) {
      addPost(postData);
      if (setOpen) setOpen(false);
    }
  };

  const handleDelete = () => {
    if (editingPost && deletePost) {
      deletePost(editingPost.id);
      setShowDeleteDialog(false);
      if (setOpen) setOpen(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (setOpen) {
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Post title"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Date</Label>
              <div className="col-span-3">
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
                      {date ? format(date, "MMMM d, yyyy") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Platform</Label>
              <div className="col-span-3">
                <Select
                  value={formData.platform}
                  onValueChange={(value) => handleSelectChange('platform', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Type</Label>
              <div className="col-span-3">
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="carousel">Carousel</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <div className="col-span-3">
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="pending_approval">Pending Approval</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Campaign</Label>
              <div className="col-span-3">
                <Select
                  value={formData.campaign_id || ""}
                  onValueChange={(value) => handleSelectChange('campaign_id', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No Campaign</SelectItem>
                    {campaigns.map((campaign) => (
                      <SelectItem key={campaign.id} value={campaign.id}>
                        {campaign.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content || ""}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Post content/caption"
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter className="flex justify-between">
            <div>
              {editingPost && (
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  Delete
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {editingPost ? 'Update' : 'Create'}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
