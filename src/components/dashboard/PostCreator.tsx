import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon, Clock, Image as ImageIcon, Link as LinkIcon, Smile, Tag, Instagram, Twitter, Facebook, Globe, Users, Check } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import GlassPanel from '../ui/GlassPanel';
import AnimatedCard from '../ui/AnimatedCard';

// Add the interface for the component's props
interface PostCreatorProps {
  onCancel?: () => void;
}

const platforms = [
  {
    name: 'Instagram',
    icon: <Instagram className="h-5 w-5" />,
    value: 'instagram',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    textColor: 'text-white'
  },
  {
    name: 'Twitter',
    icon: <Twitter className="h-5 w-5" />,
    value: 'twitter',
    color: 'bg-blue-400',
    textColor: 'text-white'
  },
  {
    name: 'Facebook',
    icon: <Facebook className="h-5 w-5" />,
    value: 'facebook',
    color: 'bg-blue-600',
    textColor: 'text-white'
  }
];

const languages = [
  { label: 'English', value: 'en' },
  { label: 'Korean', value: 'ko' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Chinese', value: 'zh' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
];

const templates = [
  { 
    name: 'Room Promotion', 
    content: 'Experience luxury like never before with our special room promotion! Book now through [DATE] and enjoy [DISCOUNT] off our best available rates. Perfect for a weekend getaway or extended stay. #luxuryhotel #roompromotion #specialoffer',
    category: 'accommodation'
  },
  { 
    name: 'Dining Experience', 
    content: 'Indulge in a culinary journey at our award-winning restaurant. Our chef has prepared a special menu featuring seasonal ingredients and signature dishes. Make your reservation today! #finedining #culinaryexperience #chefspecial',
    category: 'dining'
  },
  { 
    name: 'Spa Package', 
    content: 'Relax, rejuvenate, and refresh with our exclusive spa package. Enjoy a [DURATION] treatment designed to melt away stress and leave you feeling renewed. Book your spa escape today. #spaday #relaxation #wellness',
    category: 'wellness'
  },
  { 
    name: 'Special Event', 
    content: 'Join us for a special event at [VENUE] on [DATE]. We\'re hosting [EVENT DESCRIPTION] that you won\'t want to miss. Reserve your spot now! #specialevent #exclusive #hospitality',
    category: 'events'
  },
  { 
    name: 'Local Attraction', 
    content: 'Discover the beauty of [ATTRACTION] just minutes from our property. Our concierge can arrange transportation and tickets for a seamless experience. #localattractions #travel #explore',
    category: 'activities'
  },
];

const PostCreator: React.FC<PostCreatorProps> = ({ onCancel }) => {
  const [content, setContent] = useState('');
  const [date, setDate] = useState<Date>();
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState(['instagram']);
  const [previewPlatform, setPreviewPlatform] = useState('instagram');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showApprovalOptions, setShowApprovalOptions] = useState(false);
  const [approvers, setApprovers] = useState<string[]>([]);
  
  // New states for templates
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [templateCategory, setTemplateCategory] = useState('all');

  const handlePlatformToggle = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleImageAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAttachedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getSelectedPlatform = () => {
    return platforms.find(p => p.value === previewPlatform) || platforms[0];
  };

  const handleApplyTemplate = (templateName: string) => {
    const template = templates.find(t => t.name === templateName);
    if (template) {
      setContent(template.content);
      setSelectedTemplate(templateName);
    }
  };

  const filteredTemplates = templateCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === templateCategory);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8">
        <AnimatedCard className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium text-resort-800">Create New Post</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Save as Draft</Button>
              <Button 
                size="sm" 
                className="bg-ocean-600 hover:bg-ocean-700"
                onClick={() => setShowApprovalOptions(!showApprovalOptions)}
              >
                {showApprovalOptions ? "Schedule Directly" : "Request Approval"}
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Label className="text-resort-600 mb-2 block">Platforms</Label>
              <div className="flex flex-wrap gap-3">
                {platforms.map((platform) => (
                  <Button
                    key={platform.value}
                    variant={selectedPlatforms.includes(platform.value) ? "default" : "outline"}
                    className={cn(
                      "flex items-center transition-all",
                      selectedPlatforms.includes(platform.value) ? `${platform.color} ${platform.textColor}` : ""
                    )}
                    onClick={() => handlePlatformToggle(platform.value)}
                  >
                    {platform.icon}
                    <span className="ml-2">{platform.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-resort-600">Language</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(language => (
                      <SelectItem key={language.value} value={language.value}>
                        {language.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-resort-600">Hospitality Templates</Label>
                <Select value={templateCategory} onValueChange={setTemplateCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Templates</SelectItem>
                    <SelectItem value="accommodation">Accommodation</SelectItem>
                    <SelectItem value="dining">Dining</SelectItem>
                    <SelectItem value="wellness">Wellness & Spa</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="activities">Activities</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex overflow-x-auto gap-2 pb-2 mb-3">
                {filteredTemplates.map(template => (
                  <Button 
                    key={template.name} 
                    variant="outline" 
                    size="sm"
                    className={cn(
                      "whitespace-nowrap",
                      selectedTemplate === template.name ? "border-ocean-500 bg-ocean-50" : ""
                    )}
                    onClick={() => handleApplyTemplate(template.name)}
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-resort-600 mb-2 block">Content</Label>
              <Textarea
                placeholder="Write your post here..."
                className="min-h-32 text-resort-800 resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex justify-between mt-2">
                <div className="flex space-x-3">
                  <label className="cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-colors">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageAttach}
                    />
                    <ImageIcon className="h-5 w-5 text-resort-500" />
                  </label>
                  <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                    <LinkIcon className="h-5 w-5 text-resort-500" />
                  </button>
                  <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                    <Smile className="h-5 w-5 text-resort-500" />
                  </button>
                  <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                    <Tag className="h-5 w-5 text-resort-500" />
                  </button>
                </div>
                <div className="text-sm text-resort-500">
                  {content.length} characters
                </div>
              </div>
            </div>

            {attachedImage && (
              <div className="relative">
                <img 
                  src={attachedImage} 
                  alt="Attached" 
                  className="rounded-lg max-h-72 w-auto object-contain bg-gray-50"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => setAttachedImage(null)}
                >
                  Remove
                </Button>
              </div>
            )}

            {showApprovalOptions && (
              <AnimatedCard className="border border-amber-200 bg-amber-50">
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <Users className="h-5 w-5 text-amber-600 mr-2" />
                    <h4 className="font-medium text-resort-800">Approval Workflow</h4>
                  </div>
                  <p className="text-sm text-resort-600 mb-4">
                    Select team members who need to approve this post before publishing.
                  </p>
                  <div className="space-y-2">
                    {['Content Manager', 'Marketing Director', 'Brand Manager'].map((role) => (
                      <div key={role} className="flex items-center">
                        <Switch 
                          id={`approver-${role}`}
                          checked={approvers.includes(role)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setApprovers([...approvers, role]);
                            } else {
                              setApprovers(approvers.filter(a => a !== role));
                            }
                          }}
                        />
                        <Label htmlFor={`approver-${role}`} className="ml-2">
                          {role}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-resort-600 mb-2 block">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-resort-600 mb-2 block">Time</Label>
                <div className="flex items-center space-x-2">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Hour" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => (
                        <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                          {i.toString().padStart(2, '0')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <span className="text-resort-600">:</span>
                  
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Minute" />
                    </SelectTrigger>
                    <SelectContent>
                      {['00', '15', '30', '45'].map((minute) => (
                        <SelectItem key={minute} value={minute}>
                          {minute}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <div className="flex items-center">
                <Switch id="autoTags" />
                <Label htmlFor="autoTags" className="ml-2 text-sm text-resort-700">
                  Add AI-generated hashtags
                </Label>
              </div>
              
              <div className="flex items-center">
                <Switch id="aiSuggestions" defaultChecked />
                <Label htmlFor="aiSuggestions" className="ml-2 text-sm text-resort-700">
                  Get AI content suggestions
                </Label>
              </div>
            </div>

            {selectedLanguage !== 'en' && (
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center">
                  <Switch id="autoTranslate" defaultChecked />
                  <Label htmlFor="autoTranslate" className="ml-2 text-sm text-resort-700">
                    Auto-translate from English
                  </Label>
                </div>
              </div>
            )}
          </div>
        </AnimatedCard>
      </div>

      <div className="lg:col-span-4">
        <AnimatedCard>
          <div className="mb-4">
            <h3 className="font-medium text-resort-800 mb-2">Post Preview</h3>
            <Tabs value={previewPlatform} onValueChange={setPreviewPlatform} className="w-full">
              <TabsList className="w-full">
                {platforms.map((platform) => (
                  <TabsTrigger 
                    key={platform.value} 
                    value={platform.value}
                    className="flex-1"
                    disabled={!selectedPlatforms.includes(platform.value)}
                  >
                    {platform.icon}
                    <span className="ml-2 hidden sm:inline">{platform.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {platforms.map((platform) => (
                <TabsContent key={platform.value} value={platform.value} className="mt-4">
                  <GlassPanel className="overflow-hidden">
                    <div className="p-3 bg-white border-b border-gray-100 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-resort-100 flex items-center justify-center mr-2">
                        {platform.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-resort-800">Resort Spa & Luxury</p>
                        <div className="flex items-center">
                          <p className="text-xs text-resort-500">{date ? format(date, 'MMM dd') : 'Today'}</p>
                          {selectedLanguage !== 'en' && (
                            <div className="ml-2 flex items-center text-xs text-resort-500">
                              <span className="p-1 rounded-full bg-gray-50 mr-1">
                                <Globe className="h-3 w-3" />
                              </span>
                              {languages.find(l => l.value === selectedLanguage)?.label}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <p className="text-sm text-resort-800 whitespace-pre-wrap mb-3">
                        {content || "Your post will appear here..."}
                      </p>
                      
                      {attachedImage && (
                        <div className="rounded-md overflow-hidden mt-2 bg-gray-50">
                          <img 
                            src={attachedImage} 
                            alt="Preview" 
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </GlassPanel>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-resort-700 mb-2">Post Checklist</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-green-50 rounded-md">
                <span className="text-sm text-green-700">Content added</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <span className="text-sm text-resort-600">Image attached</span>
                {attachedImage ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-resort-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <span className="text-sm text-resort-600">Schedule set</span>
                {date ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-resort-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              {showApprovalOptions && (
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <span className="text-sm text-resort-600">Approvers selected</span>
                  {approvers.length > 0 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-resort-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              )}
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default PostCreator;
