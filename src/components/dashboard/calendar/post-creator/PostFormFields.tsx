
import React from 'react';
import { format } from 'date-fns';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Campaign, Post } from '@/types/calendar';

interface PostFormFieldsProps {
  formData: Omit<Post, 'id'> & { id?: string };
  date: Date;
  setDate: (date: Date) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  campaigns: Campaign[];
}

export const PostFormFields: React.FC<PostFormFieldsProps> = ({
  formData,
  date,
  setDate,
  handleChange,
  handleSelectChange,
  campaigns
}) => {
  return (
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
  );
};
