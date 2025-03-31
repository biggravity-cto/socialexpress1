
import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Post, Campaign } from '@/types/calendar';
import { fetchCampaigns } from '@/services/calendarService';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { PostFormFields } from './PostFormFields';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { PostDialogFooter } from './PostDialogFooter';

interface PostCreatorDialogProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  addPost?: (post: Omit<Post, 'id'>) => void;
  updatePost?: (id: string, updates: Partial<Post>) => void;
  deletePost?: (id: string) => void;
  editingPost?: Post | null;
  onSavePost?: (post: Omit<Post, 'id'> & { id?: string }) => void;
  onCancel?: () => void;
  selectedDate?: Date; 
  campaigns?: Campaign[];
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
          
          <PostFormFields
            formData={formData}
            date={date}
            setDate={setDate}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            campaigns={campaigns}
          />
          
          <PostDialogFooter
            isEditing={!!editingPost}
            onDelete={() => setShowDeleteDialog(true)}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        </DialogContent>
      </Dialog>
      
      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirmDelete={handleDelete}
      />
    </>
  );
};
