
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Sparkles, 
  Stars, 
  PenLine, 
  FileImage, 
  BookCopy, 
  FlameKindling 
} from 'lucide-react';

const AIGeneratorDialog: React.FC = () => {
  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle className="flex items-center text-xl">
          <Sparkles className="h-5 w-5 mr-2 text-blue-500" />
          AI Content Assistant
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-6 py-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="font-semibold flex items-center mb-2">
            <Stars className="h-4 w-4 mr-2 text-blue-500" />
            What would you like to create?
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="justify-start h-16 p-3">
              <div className="text-left flex flex-col items-start">
                <span className="flex items-center text-sm font-medium">
                  <PenLine className="h-3.5 w-3.5 mr-1.5" />
                  Social Post
                </span>
                <span className="text-xs text-muted-foreground">Engagement focused content</span>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-16 p-3">
              <div className="text-left flex flex-col items-start">
                <span className="flex items-center text-sm font-medium">
                  <FileImage className="h-3.5 w-3.5 mr-1.5" />
                  Image Caption
                </span>
                <span className="text-xs text-muted-foreground">Compelling descriptions</span>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-16 p-3">
              <div className="text-left flex flex-col items-start">
                <span className="flex items-center text-sm font-medium">
                  <BookCopy className="h-3.5 w-3.5 mr-1.5" />
                  Blog Article
                </span>
                <span className="text-xs text-muted-foreground">In-depth content</span>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-16 p-3">
              <div className="text-left flex flex-col items-start">
                <span className="flex items-center text-sm font-medium">
                  <FlameKindling className="h-3.5 w-3.5 mr-1.5" />
                  Trending Topic
                </span>
                <span className="text-xs text-muted-foreground">Timely & relevant</span>
              </div>
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="prompt">Tell me what you want to create</Label>
          <Textarea 
            id="prompt" 
            placeholder="Describe what you want to create. Be specific about tone, audience, and goals..." 
            className="h-24"
          />
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="platform" className="text-sm">Platform</Label>
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
            <div>
              <Label htmlFor="tone" className="text-sm">Tone</Label>
              <Select defaultValue="professional">
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="humorous">Humorous</SelectItem>
                  <SelectItem value="inspirational">Inspirational</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Button className="w-full bg-primary">
          <Sparkles className="mr-2 h-4 w-4" /> Generate Content
        </Button>
      </div>
    </DialogContent>
  );
};

export default AIGeneratorDialog;
