
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Plus, 
  Image, 
  FileText, 
  Video, 
  MoreHorizontal, 
  Upload, 
  Download, 
  Clock, 
  CalendarIcon, 
  Layers, 
  Copy, 
  Share2, 
  Trash2, 
  CloudLightning, 
  Sparkles, 
  ChevronRight, 
  CloudUpload, 
  Facebook, 
  Twitter, 
  Instagram, 
  Database,
  MessageSquare,
  Edit,
  Eye,
  Bookmark,
  CheckCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

// Types
interface ContentItem {
  id: number;
  type: 'image' | 'video' | 'document' | 'post';
  title: string;
  date: string;
  status: 'published' | 'draft' | 'reviewing';
  thumbnail?: string;
  platform?: 'instagram' | 'twitter' | 'facebook';
  tags?: string[];
  content?: string;
}

// Mock data
const contentItems: ContentItem[] = [
  { 
    id: 1, 
    type: 'image', 
    title: 'Beach Resort Overview', 
    date: '2023-05-12', 
    status: 'published', 
    thumbnail: '/placeholder.svg',
    platform: 'instagram',
    tags: ['resort', 'beach', 'summer']
  },
  { 
    id: 2, 
    type: 'video', 
    title: 'Spa Services Promo', 
    date: '2023-05-15', 
    status: 'published', 
    thumbnail: '/placeholder.svg',
    platform: 'facebook',
    tags: ['spa', 'wellness', 'promo']
  },
  { 
    id: 3, 
    type: 'document', 
    title: 'Summer Activities Guide', 
    date: '2023-06-01', 
    status: 'draft', 
    thumbnail: '/placeholder.svg',
    tags: ['activities', 'summer', 'guide']
  },
  { 
    id: 4, 
    type: 'image', 
    title: 'Dining Experience Gallery', 
    date: '2023-06-10', 
    status: 'published', 
    thumbnail: '/placeholder.svg',
    platform: 'instagram',
    tags: ['dining', 'restaurant', 'food']
  },
  { 
    id: 5, 
    type: 'post', 
    title: 'New Resort Opening Announcement', 
    date: '2023-06-15', 
    status: 'published', 
    platform: 'twitter',
    content: 'We\'re thrilled to announce the grand opening of our new luxury resort location! Join us for special promotions and events.',
    tags: ['announcement', 'opening', 'news']
  },
  { 
    id: 6, 
    type: 'video', 
    title: 'Resort Tour', 
    date: '2023-06-20', 
    status: 'published', 
    thumbnail: '/placeholder.svg',
    platform: 'instagram',
    tags: ['tour', 'overview', 'resort']
  },
  { 
    id: 7, 
    type: 'post', 
    title: 'Summer Discount Campaign', 
    date: '2023-07-01', 
    status: 'draft', 
    platform: 'facebook',
    content: 'Summer is here! Book your stay now and enjoy 20% off on all our premium suites.',
    tags: ['promotion', 'discount', 'summer']
  },
  { 
    id: 8, 
    type: 'document', 
    title: 'Event Planning Guide', 
    date: '2023-07-12', 
    status: 'reviewing', 
    thumbnail: '/placeholder.svg',
    tags: ['events', 'planning', 'weddings']
  },
  { 
    id: 9, 
    type: 'post', 
    title: 'Customer Testimonial Spotlight', 
    date: '2023-07-18', 
    status: 'published', 
    platform: 'instagram',
    content: 'Hear what our guests are saying about their unforgettable experiences at our resort!',
    tags: ['testimonial', 'review', 'guest']
  }
];

// Helper functions
const getIcon = (type: string) => {
  switch (type) {
    case 'image':
      return <Image className="h-5 w-5" />;
    case 'video':
      return <Video className="h-5 w-5" />;
    case 'document':
      return <FileText className="h-5 w-5" />;
    case 'post':
      return <MessageSquare className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

const getPlatformIcon = (platform?: string) => {
  switch (platform) {
    case 'instagram':
      return <Instagram className="h-4 w-4" />;
    case 'twitter':
      return <Twitter className="h-4 w-4" />;
    case 'facebook':
      return <Facebook className="h-4 w-4" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'published':
      return 'bg-green-100 text-green-800';
    case 'draft':
      return 'bg-gray-100 text-gray-800';
    case 'reviewing':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Library = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [generationType, setGenerationType] = useState<'image' | 'video' | 'text'>('image');
  const [showGoogleDriveConnect, setShowGoogleDriveConnect] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [showItemDetail, setShowItemDetail] = useState(false);
  const [showItemEditor, setShowItemEditor] = useState(false);
  const [showCampaignDialog, setShowCampaignDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const { toast } = useToast();

  // AI Generator form state
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  // Handle content item click
  const handleItemClick = (item: ContentItem) => {
    setSelectedItem(item);
    setShowItemDetail(true);
  };
  
  // Handle edit item
  const handleEditItem = (item: ContentItem) => {
    setSelectedItem(item);
    setShowItemEditor(true);
  };
  
  // Handle delete item
  const handleDeleteItem = (itemId: number) => {
    // In a real app, this would delete the item from the database
    toast({
      title: "Success",
      description: "Item deleted successfully"
    });
  };
  
  // Handle add to campaign
  const handleAddToCampaign = (item: ContentItem) => {
    setSelectedItem(item);
    setShowCampaignDialog(true);
  };
  
  // Handle schedule post
  const handleSchedulePost = (item: ContentItem) => {
    setSelectedItem(item);
    setShowScheduleDialog(true);
  };
  
  // Handle duplicate
  const handleDuplicate = (item: ContentItem) => {
    toast({
      title: "Duplicated",
      description: `${item.title} has been duplicated`
    });
  };

  // Would connect to Supabase or API in a real application
  const handleGenerateContent = async () => {
    if (!prompt.trim()) return;
    
    setGenerating(true);
    
    try {
      // Simulate API call to AI service
      setTimeout(() => {
        setGeneratedContent('/placeholder.svg');
        setGenerating(false);
      }, 2000);
      
      // In a real app, we'd call our API:
      // const { data, error } = await supabase.functions.invoke('generate-content', {
      //   body: { prompt, type: generationType }
      // });
      // 
      // if (error) throw error;
      // setGeneratedContent(data.url);
      
    } catch (error) {
      console.error('Error generating content:', error);
      setGenerating(false);
    }
  };

  // Connect to Google Drive (mock implementation)
  const handleConnectGoogleDrive = () => {
    // In a real app, we'd implement OAuth flow here
    setShowGoogleDriveConnect(false);
    alert('Google Drive connected successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 container mx-auto p-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Content Library</h1>
          <p className="text-gray-500">Create, manage and publish your digital assets</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog open={showGoogleDriveConnect} onOpenChange={setShowGoogleDriveConnect}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Database className="mr-1.5 h-4 w-4" /> Connect Storage
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connect External Storage</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Select Storage Provider</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Card className="p-4 cursor-pointer border-blue-200 bg-blue-50">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <svg className="h-5 w-5 text-blue-600" viewBox="0 0 87 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.5 22.5L43.5 0L59.5 22.5H27.5Z" fill="#4285F4"/>
                            <path d="M69.5 32.5L86.5 55.5L76.5 77.5H36.5L27.5 55.5L43.5 32.5H69.5Z" fill="#4285F4"/>
                            <path d="M0.5 55.5L17.5 32.5L43.5 32.5L27.5 55.5L36.5 77.5H10.5L0.5 55.5Z" fill="#4285F4"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">Google Drive</h3>
                          <p className="text-xs text-gray-500">Connect your Google Drive account</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4 cursor-pointer opacity-60">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5.5C13.9891 5.5 15.8968 6.29018 17.3033 7.6967C18.7098 9.10322 19.5 11.0109 19.5 13C19.5 14.9891 18.7098 16.8968 17.3033 18.3033C15.8968 19.7098 13.9891 20.5 12 20.5C10.0109 20.5 8.10322 19.7098 6.6967 18.3033C5.29018 16.8968 4.5 14.9891 4.5 13C4.5 11.0109 5.29018 9.10322 6.6967 7.6967C8.10322 6.29018 10.0109 5.5 12 5.5Z" fill="#0072C6"/>
                            <path d="M15.9058 3.5H8.09422C7.79922 3.5 7.54422 3.755 7.54422 4.05V8.5H4.87922C4.58422 8.5 4.32922 8.755 4.32922 9.05V16.95C4.32922 17.245 4.58422 17.5 4.87922 17.5H7.54422V21.95C7.54422 22.245 7.79922 22.5 8.09422 22.5H15.9058C16.2008 22.5 16.4558 22.245 16.4558 21.95V17.5H19.1208C19.4158 17.5 19.6708 17.245 19.6708 16.95V9.05C19.6708 8.755 19.4158 8.5 19.1208 8.5H16.4558V4.05C16.4558 3.755 16.2008 3.5 15.9058 3.5Z" fill="#0072C6"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">Dropbox</h3>
                          <p className="text-xs text-gray-500">Coming soon</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4 cursor-pointer opacity-60">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.5 8C6.5 7.17157 7.17157 6.5 8 6.5H16C16.8284 6.5 17.5 7.17157 17.5 8V16C17.5 16.8284 16.8284 17.5 16 17.5H8C7.17157 17.5 6.5 16.8284 6.5 16V8Z" fill="#00A2ED"/>
                            <path d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5Z" fill="#00A2ED"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">OneDrive</h3>
                          <p className="text-xs text-gray-500">Coming soon</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4 cursor-pointer opacity-60">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-full">
                          <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="3" fill="#24292E"/>
                            <path d="M12 2.25C6.62391 2.25 2.25 6.62391 2.25 12C2.25 17.3761 6.62391 21.75 12 21.75C17.3761 21.75 21.75 17.3761 21.75 12C21.75 6.62391 17.3761 2.25 12 2.25Z" fill="#24292E"/>
                            <path d="M12 2.25C6.62391 2.25 2.25 6.62391 2.25 12C2.25 17.3761 6.62391 21.75 12 21.75C17.3761 21.75 21.75 17.3761 21.75 12C21.75 6.62391 17.3761 2.25 12 2.25Z" fill="#24292E"/>
                            <path d="M9.75 18.1875C9.75 18.0056 9.66937 17.8413 9.53033 17.7303C9.39129 17.6194 9.20245 17.5781 9.02094 17.6157C6.72187 18.1204 5.625 16.8799 5.625 16.875C5.49187 16.6781 5.27812 16.5615 5.04844 16.5615C4.81875 16.5615 4.605 16.6781 4.47187 16.875C4.33875 17.0719 4.32 17.325 4.43437 17.5406C4.96687 18.4406 5.91562 21 9.02094 20.2594C9.20245 20.222 9.39129 20.1806 9.53033 20.0697C9.66937 19.9587 9.75 19.7944 9.75 19.6125V18.1875Z" fill="white"/>
                            <path d="M18.2344 15.8906C18.3938 15.8906 18.5391 15.975 18.6094 16.1156C18.9844 16.95 18.3844 18.3938 16.9172 18.3938C16.7719 18.3938 16.6453 18.3281 16.5562 18.2156C16.4672 18.1031 16.4297 17.9578 16.4578 17.8172C16.6781 16.5 16.2984 15.8906 16.2984 15.8906C16.1953 15.7688 16.1672 15.6 16.2141 15.45C16.2609 15.3 16.3734 15.1828 16.5187 15.1312C17.0016 14.9766 17.85 14.9625 18.2344 15.8906Z" fill="white"/>
                            <path d="M18.375 11.0625C18.375 11.8088 18.0563 12.5484 17.5592 13.0455C17.0622 13.5425 16.3226 13.8612 15.5763 13.8612C14.83 13.8612 14.0903 13.5425 13.5933 13.0455C13.0963 12.5484 12.7775 11.8088 12.7775 11.0625C12.7775 10.3162 13.0963 9.57656 13.5933 9.07954C14.0903 8.58252 14.83 8.26375 15.5763 8.26375C16.3226 8.26375 17.0622 8.58252 17.5592 9.07954C18.0563 9.57656 18.375 10.3162 18.375 11.0625Z" fill="white"/>
                            <path d="M11.2122 8.58188C11.2122 9.60563 10.8084 10.5875 10.0884 11.3075C9.36844 12.0275 8.38656 12.4312 7.36281 12.4312C6.33906 12.4312 5.35719 12.0275 4.63719 11.3075C3.91719 10.5875 3.51344 9.60563 3.51344 8.58188C3.51344 7.55813 3.91719 6.57626 4.63719 5.85626C5.35719 5.13626 6.33906 4.73251 7.36281 4.73251C8.38656 4.73251 9.36844 5.13626 10.0884 5.85626C10.8084 6.57626 11.2122 7.55813 11.2122 8.58188Z" fill="white"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">Custom SFTP</h3>
                          <p className="text-xs text-gray-500">Coming soon</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handleConnectGoogleDrive}
                  >
                    Connect Google Drive
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={showAIGenerator} onOpenChange={setShowAIGenerator}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                <Sparkles className="mr-1.5 h-4 w-4" /> AI Generator
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>AI Content Generator</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>What would you like to create?</Label>
                  <RadioGroup 
                    defaultValue="image" 
                    className="flex space-x-2"
                    value={generationType}
                    onValueChange={(value) => setGenerationType(value as any)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="image" id="image" />
                      <Label htmlFor="image" className="cursor-pointer">Image</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="video" id="video" />
                      <Label htmlFor="video" className="cursor-pointer">Video</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="text" id="text" />
                      <Label htmlFor="text" className="cursor-pointer">Text</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="prompt">Describe what you want</Label>
                  <Textarea 
                    id="prompt" 
                    placeholder={`Describe the ${generationType} you want to generate...`} 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                
                {generationType === 'image' && (
                  <div className="space-y-2">
                    <Label>Image Style</Label>
                    <Select defaultValue="realistic">
                      <SelectTrigger>
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realistic">Realistic</SelectItem>
                        <SelectItem value="cartoon">Cartoon</SelectItem>
                        <SelectItem value="abstract">Abstract</SelectItem>
                        <SelectItem value="painting">Painting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {generationType === 'video' && (
                  <div className="space-y-2">
                    <Label>Video Length</Label>
                    <Select defaultValue="15">
                      <SelectTrigger>
                        <SelectValue placeholder="Select length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 seconds</SelectItem>
                        <SelectItem value="30">30 seconds</SelectItem>
                        <SelectItem value="60">1 minute</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {generationType === 'text' && (
                  <div className="space-y-2">
                    <Label>Text Type</Label>
                    <Select defaultValue="post">
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="post">Social Media Post</SelectItem>
                        <SelectItem value="caption">Caption</SelectItem>
                        <SelectItem value="article">Article</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label>Platform Intent</Label>
                  <Select defaultValue="instagram">
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="multi">Multi-platform</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleGenerateContent}
                  disabled={generating || !prompt.trim()}
                >
                  {generating ? (
                    <>Generating... <CloudLightning className="ml-2 h-4 w-4 animate-pulse" /></>
                  ) : (
                    <>Generate {generationType.charAt(0).toUpperCase() + generationType.slice(1)}</>
                  )}
                </Button>
                
                {generatedContent && (
                  <div className="mt-4 border rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">Generated Content</h4>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" /> Save
                      </Button>
                    </div>
                    {generationType === 'image' && (
                      <img 
                        src={generatedContent} 
                        alt="AI generated" 
                        className="w-full h-48 object-cover rounded-md"
                      />
                    )}
                    {generationType === 'video' && (
                      <div className="bg-gray-100 w-full h-48 flex items-center justify-center rounded-md">
                        <Video className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    {generationType === 'text' && (
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                          Nullam at justo vel eros faucibus lacinia. Praesent 
                          egestas diam in eros tincidunt, nec gravida ex pulvinar.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
            <Plus className="mr-1.5 h-4 w-4" /> Add Content
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search content..."
              className="pl-9"
            />
          </div>
          <Button variant="outline" className="justify-center sm:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <div className="flex rounded-md shadow-sm">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              className={`rounded-r-none border-r-0 ${viewMode === 'grid' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              className={`rounded-l-none ${viewMode === 'list' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Content</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-3'}>
            {contentItems.map((item) => (
              viewMode === 'grid' ? (
                <Card key={item.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow group">
                  <div className="relative h-40 bg-gray-100 cursor-pointer" onClick={() => handleItemClick(item)}>
                    <div className="absolute top-2 right-2 flex space-x-1 z-10">
                      <Badge className={getStatusColor(item.status)} variant="outline">{item.status}</Badge>
                      {item.platform && (
                        <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
                          {getPlatformIcon(item.platform)}
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm p-1 rounded-md z-10">
                      {getIcon(item.type)}
                    </div>
                    {item.thumbnail && (
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {item.type === 'post' && (
                      <div className="absolute inset-0 flex items-center justify-center p-4 bg-gray-50">
                        <p className="text-sm text-gray-600 line-clamp-4">{item.content || 'No content'}</p>
                      </div>
                    )}
                    
                    {/* Hover actions overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="sm" variant="secondary" className="h-8 w-8 p-0" onClick={(e) => {
                              e.stopPropagation();
                              handleEditItem(item);
                            }}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="sm" variant="secondary" className="h-8 w-8 p-0" onClick={(e) => {
                              e.stopPropagation();
                              handleSchedulePost(item);
                            }}>
                              <Clock className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Schedule</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="sm" variant="secondary" className="h-8 w-8 p-0" onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCampaign(item);
                            }}>
                              <Bookmark className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Add to Campaign</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm mb-1 truncate">{item.title}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">{item.date}</p>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleItemClick(item)}>
                            <Eye className="mr-2 h-4 w-4" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditItem(item)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSchedulePost(item)}>
                            <Clock className="mr-2 h-4 w-4" /> Schedule
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAddToCampaign(item)}>
                            <Bookmark className="mr-2 h-4 w-4" /> Add to Campaign
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(item)}>
                            <Copy className="mr-2 h-4 w-4" /> Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" /> Share
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" /> Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete this item from your library.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteItem(item.id)} className="bg-red-600 hover:bg-red-700">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card key={item.id} className="flex overflow-hidden border border-gray-200 hover:shadow-md transition-shadow group">
                  <div className="w-16 h-16 bg-gray-100 flex items-center justify-center shrink-0" onClick={() => handleItemClick(item)}>
                    {getIcon(item.type)}
                  </div>
                  <div className="p-3 flex-grow cursor-pointer" onClick={() => handleItemClick(item)}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                      <div className="flex space-x-1">
                        <Badge className={getStatusColor(item.status)} variant="outline">{item.status}</Badge>
                        {item.platform && (
                          <Badge variant="outline" className="bg-white/80">
                            {getPlatformIcon(item.platform)}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {item.type === 'post' && item.content && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{item.content}</p>
                    )}
                  </div>
                  <div className="p-2 flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity" 
                      onClick={() => handleEditItem(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleSchedulePost(item)}>
                      <Clock className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleItemClick(item)}>
                          <Eye className="mr-2 h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditItem(item)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSchedulePost(item)}>
                          <Clock className="mr-2 h-4 w-4" /> Schedule
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAddToCampaign(item)}>
                          <Bookmark className="mr-2 h-4 w-4" /> Add to Campaign
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(item)}>
                          <Copy className="mr-2 h-4 w-4" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" /> Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" /> Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this item from your library.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteItem(item.id)} className="bg-red-600 hover:bg-red-700">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              )
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="posts">
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-3'}>
            {contentItems.filter(item => item.type === 'post').map(item => (
              <Card key={item.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                <div className="relative h-40 bg-gray-50 flex items-center justify-center p-4">
                  <div className="absolute top-2 right-2 flex space-x-1 z-10">
                    <Badge className={getStatusColor(item.status)} variant="outline">{item.status}</Badge>
                    {item.platform && (
                      <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
                        {getPlatformIcon(item.platform)}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-5">{item.content || 'No content'}</p>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-1 truncate">{item.title}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">{item.date}</p>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="images">
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-3'}>
            {contentItems.filter(item => item.type === 'image').map(item => (
              <Card key={item.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                <div className="relative h-40 bg-gray-100">
                  <div className="absolute top-2 right-2 flex space-x-1 z-10">
                    <Badge className={getStatusColor(item.status)} variant="outline">{item.status}</Badge>
                    {item.platform && (
                      <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
                        {getPlatformIcon(item.platform)}
                      </Badge>
                    )}
                  </div>
                  {item.thumbnail && (
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-1 truncate">{item.title}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">{item.date}</p>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="videos">
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-3'}>
            {contentItems.filter(item => item.type === 'video').map(item => (
              <Card key={item.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                <div className="relative h-40 bg-gray-100">
                  <div className="absolute top-2 right-2 flex space-x-1 z-10">
                    <Badge className={getStatusColor(item.status)} variant="outline">{item.status}</Badge>
                    {item.platform && (
                      <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
                        {getPlatformIcon(item.platform)}
                      </Badge>
                    )}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-10 w-10 text-gray-400" />
                  </div>
                  {item.thumbnail && (
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-full object-cover opacity-70"
                    />
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-1 truncate">{item.title}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">{item.date}</p>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="documents">
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-3'}>
            {contentItems.filter(item => item.type === 'document').map(item => (
              <Card key={item.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                <div className="relative h-40 bg-gray-50 flex items-center justify-center">
                  <div className="absolute top-2 right-2 flex space-x-1 z-10">
                    <Badge className={getStatusColor(item.status)} variant="outline">{item.status}</Badge>
                  </div>
                  <FileText className="h-16 w-16 text-gray-300" />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-1 truncate">{item.title}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">{item.date}</p>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Item Detail Dialog */}
      <Dialog open={showItemDetail} onOpenChange={setShowItemDetail}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getIcon(selectedItem.type)}
                  {selectedItem.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <Badge className={getStatusColor(selectedItem.status)}>
                      {selectedItem.status}
                    </Badge>
                    {selectedItem.platform && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getPlatformIcon(selectedItem.platform)}
                        <span className="capitalize">{selectedItem.platform}</span>
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{selectedItem.date}</span>
                </div>
                
                {selectedItem.type === 'post' && selectedItem.content && (
                  <div className="p-4 border rounded-md bg-gray-50">
                    <p className="text-sm">{selectedItem.content}</p>
                  </div>
                )}
                
                {(selectedItem.type === 'image' || selectedItem.thumbnail) && (
                  <div className="border p-2 rounded-md bg-gray-50">
                    <img 
                      src={selectedItem.thumbnail || '/placeholder.svg'} 
                      alt={selectedItem.title}
                      className="w-full h-48 object-contain rounded"
                    />
                  </div>
                )}
                
                {selectedItem.type === 'video' && (
                  <div className="border p-2 rounded-md bg-gray-50 flex items-center justify-center h-48">
                    <Video className="h-10 w-10 text-gray-400" />
                  </div>
                )}
                
                {selectedItem.type === 'document' && (
                  <div className="border p-2 rounded-md bg-gray-50 flex items-center justify-center h-48">
                    <FileText className="h-10 w-10 text-gray-400" />
                  </div>
                )}
                
                {selectedItem.tags && selectedItem.tags.length > 0 && (
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-1">
                      {selectedItem.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="bg-gray-100">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <DialogFooter className="sm:justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => {
                    setShowItemDetail(false);
                    handleEditItem(selectedItem);
                  }}>
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {
                    setShowItemDetail(false);
                    handleSchedulePost(selectedItem);
                  }}>
                    <Clock className="h-4 w-4 mr-1" /> Schedule
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-1" /> Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Item Editor Dialog */}
      <Dialog open={showItemEditor} onOpenChange={setShowItemEditor}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle>Edit {selectedItem.type}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" defaultValue={selectedItem.title} />
                </div>
                
                {selectedItem.type === 'post' && (
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" defaultValue={selectedItem.content} className="min-h-[100px]" />
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform">Platform</Label>
                    <Select defaultValue={selectedItem.platform}>
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue={selectedItem.status}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="reviewing">Reviewing</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" defaultValue={selectedItem.tags?.join(', ')} placeholder="Enter tags separated by commas" />
                </div>
              </div>
              
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setShowItemEditor(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  setShowItemEditor(false);
                  toast({
                    title: "Success",
                    description: `${selectedItem.title} has been updated`,
                  });
                }}>
                  Save changes
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Add to Campaign Dialog */}
      <Dialog open={showCampaignDialog} onOpenChange={setShowCampaignDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add to Campaign</DialogTitle>
            <DialogDescription>
              Select a campaign to add this item to or create a new one.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select Campaign</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a campaign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summer-2023">Summer 2023 Collection</SelectItem>
                  <SelectItem value="fall-promo">Fall Promotion</SelectItem>
                  <SelectItem value="holiday">Holiday Campaign</SelectItem>
                  <SelectItem value="new-year">New Year 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="p-3 border rounded-md bg-blue-50 border-blue-200 mb-2">
              <h3 className="font-medium text-blue-800 mb-1">Create New Campaign</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="campaign-name" className="text-sm text-blue-700">Campaign Name</Label>
                  <Input id="campaign-name" placeholder="Enter campaign name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="campaign-dates" className="text-sm text-blue-700">Date Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="date" id="start-date" />
                    <Input type="date" id="end-date" />
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-1" /> Create Campaign
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowCampaignDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowCampaignDialog(false);
              toast({
                title: "Added to Campaign",
                description: selectedItem ? `${selectedItem.title} added to campaign` : "Item added to campaign"
              });
            }}>
              Add to Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule Post</DialogTitle>
            <DialogDescription>
              Choose when to publish this post on selected platforms.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Date and Time</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="date" />
                <Input type="time" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Platforms</Label>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="flex items-center gap-1 bg-blue-50 border-blue-200">
                  <Facebook className="h-4 w-4 text-blue-600" /> 
                  <span>Facebook</span>
                  <CheckCircle className="h-3.5 w-3.5 ml-1 text-blue-600" />
                </Button>
                <Button variant="outline" className="flex items-center gap-1 bg-pink-50 border-pink-200">
                  <Instagram className="h-4 w-4 text-pink-600" /> 
                  <span>Instagram</span>
                  <CheckCircle className="h-3.5 w-3.5 ml-1 text-pink-600" />
                </Button>
                <Button variant="outline" className="flex items-center gap-1">
                  <Twitter className="h-4 w-4 text-blue-400" /> 
                  <span>Twitter</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Caption Adjustments</Label>
                <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">AI Suggested</Badge>
              </div>
              <Textarea className="min-h-[80px]" defaultValue={selectedItem?.content} />
            </div>
            
            <div className="p-3 border rounded-md bg-blue-50 border-blue-200">
              <h3 className="font-medium text-blue-800 flex items-center gap-1">
                <Sparkles className="h-4 w-4" /> AI Recommendation
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Based on your audience analysis, Tuesday at 6:30 PM KST is the optimal posting time for 28% higher engagement.
              </p>
              <Button variant="link" className="text-blue-700 p-0 h-auto text-sm">
                Apply recommended time
              </Button>
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowScheduleDialog(false);
              toast({
                title: "Post Scheduled",
                description: selectedItem ? `${selectedItem.title} has been scheduled` : "Post has been scheduled"
              });
            }}>
              Schedule Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Library;
