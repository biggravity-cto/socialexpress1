
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
  Share2, 
  Trash2, 
  CloudUpload, 
  Bot,
  Sparkles,
  BookCopy,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  FlameKindling,
  Folder,
  FolderTree,
  Stars,
  PenLine,
  Copy,
  MessageSquare,
  FileImage
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { fetchPosts } from '@/services/calendarService';
import { Post } from '@/types/calendar';

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
  size?: string;
  views?: number;
  interactions?: number;
}

const Content = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [showCreateContentDialog, setShowCreateContentDialog] = useState(false);
  const [contentType, setContentType] = useState<'post' | 'image' | 'video' | 'document'>('post');

  // Load content data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch actual posts from calendar service
        const postsData = await fetchPosts();
        
        // Convert posts to content items
        const convertedItems: ContentItem[] = postsData.map((post, index) => ({
          id: index + 1,
          type: post.type === 'image' || post.type === 'video' 
            ? post.type as 'image' | 'video' 
            : 'post',
          title: post.title || `Untitled ${post.type}`,
          date: post.date,
          status: post.status === 'published' 
            ? 'published' 
            : post.status === 'draft' 
              ? 'draft' 
              : 'reviewing',
          thumbnail: '/placeholder.svg',
          platform: post.platform as 'instagram' | 'twitter' | 'facebook',
          content: post.content,
          tags: ['content', post.platform, post.type],
          size: Math.floor(Math.random() * 5 + 1) + 'MB',
          views: Math.floor(Math.random() * 1000),
          interactions: Math.floor(Math.random() * 100)
        }));
        
        // Add more mock content items for a fuller experience
        const additionalItems: ContentItem[] = [
          {
            id: postsData.length + 1,
            type: 'image',
            title: 'Product Feature Highlight',
            date: '2023-09-15',
            status: 'published',
            thumbnail: '/placeholder.svg',
            platform: 'instagram',
            tags: ['product', 'feature', 'highlight'],
            size: '2.4MB',
            views: 754,
            interactions: 89
          },
          {
            id: postsData.length + 2,
            type: 'video',
            title: 'How-To Tutorial',
            date: '2023-09-10',
            status: 'published',
            thumbnail: '/placeholder.svg',
            platform: 'instagram',
            tags: ['tutorial', 'howto', 'video'],
            size: '15.7MB',
            views: 1250,
            interactions: 176
          },
          {
            id: postsData.length + 3,
            type: 'document',
            title: 'Brand Guidelines 2023',
            date: '2023-08-22',
            status: 'published',
            tags: ['brand', 'guidelines', 'design'],
            size: '4.2MB',
            views: 48,
            interactions: 5
          },
          {
            id: postsData.length + 4,
            type: 'post',
            title: 'Weekly Update Post',
            date: '2023-09-18',
            status: 'draft',
            platform: 'twitter',
            content: 'We\'re excited to announce our latest features coming next week! Stay tuned for more details.',
            tags: ['update', 'announcement', 'features'],
            views: 0,
            interactions: 0
          }
        ];
        
        const allItems = [...convertedItems, ...additionalItems];
        setContentItems(allItems);
        setFilteredItems(allItems);
      } catch (error) {
        console.error('Error loading content:', error);
        toast({
          title: "Error",
          description: "Failed to load content data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [toast]);

  // Filter content when tab or search changes
  useEffect(() => {
    let filtered = [...contentItems];
    
    // Filter by type (tab)
    if (activeTab !== 'all') {
      filtered = filtered.filter(item => item.type === activeTab);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        item.content?.toLowerCase().includes(query) ||
        item.platform?.toLowerCase().includes(query)
      );
    }
    
    // Sort items
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setFilteredItems(filtered);
  }, [contentItems, activeTab, searchQuery, sortBy]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleItemSelection = (id: number) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return;
    
    setContentItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    toast({
      title: `${selectedItems.length} items deleted`,
      description: "The selected items have been removed"
    });
    setSelectedItems([]);
  };

  const handleCreateContent = () => {
    // Add a new content item
    const newItem: ContentItem = {
      id: contentItems.length + 1,
      type: contentType,
      title: `New ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'draft',
      thumbnail: contentType === 'image' ? '/placeholder.svg' : undefined,
      tags: [contentType],
      size: contentType === 'document' ? '0.1MB' : contentType === 'video' ? '0MB' : undefined,
      views: 0,
      interactions: 0
    };

    setContentItems(prev => [newItem, ...prev]);
    setShowCreateContentDialog(false);
    
    toast({
      title: "Content created",
      description: `Your new ${contentType} has been created as a draft`
    });
  };

  // Helpers for rendering items
  const getIcon = (type: string) => {
    switch (type) {
      case 'image': return <FileImage className="h-5 w-5" />;
      case 'video': return <Video className="h-5 w-5" />;
      case 'document': return <FileText className="h-5 w-5" />;
      case 'post': return <MessageSquare className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getPlatformIcon = (platform?: string) => {
    switch (platform) {
      case 'instagram': return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
      case 'twitter': return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>;
      case 'facebook': return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'reviewing': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Content Studio</h1>
          <p className="text-muted-foreground">Create, manage, and publish your digital assets</p>
        </div>
        
        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-primary text-primary-foreground">
                  <Plus className="mr-2 h-4 w-4" /> Create Content
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-blue-900 p-6 no-underline outline-none focus:shadow-md"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setContentType('post');
                            setShowCreateContentDialog(true);
                          }}
                        >
                          <div className="mt-4 mb-2 text-lg font-medium text-white">
                            Quick Post
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Create and schedule a text post for your social media platforms
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setContentType('image');
                            setShowCreateContentDialog(true);
                          }}
                        >
                          <div className="text-sm font-medium leading-none flex items-center">
                            <Image className="h-4 w-4 mr-2" />
                            Image or Graphic
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Upload or create images for social media posts
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setContentType('video');
                            setShowCreateContentDialog(true);
                          }}
                        >
                          <div className="text-sm font-medium leading-none flex items-center">
                            <Video className="h-4 w-4 mr-2" />
                            Video Content
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Upload video content to your library
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setContentType('document');
                            setShowCreateContentDialog(true);
                          }}
                        >
                          <div className="text-sm font-medium leading-none flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            Document
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Upload documents, PDFs, or other reference materials
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Dialog open={showAIGenerator} onOpenChange={setShowAIGenerator}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="bg-blue-50 hover:bg-blue-100 border-blue-200">
                      <Sparkles className="mr-2 h-4 w-4 text-blue-500" /> AI Assistant
                    </Button>
                  </DialogTrigger>
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
                </Dialog>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Button variant="outline" className="flex items-center">
            <CloudUpload className="mr-2 h-4 w-4" /> Upload Assets
          </Button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search content..."
                className="pl-9"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="popular">Most Viewed</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex rounded-md shadow-sm">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  className={`rounded-r-none ${viewMode === 'grid' ? '' : ''}`}
                  onClick={() => setViewMode('grid')}
                  size="icon"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  className={`rounded-l-none ${viewMode === 'list' ? '' : ''}`}
                  onClick={() => setViewMode('list')}
                  size="icon"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Bulk Actions Bar - shows when items are selected */}
          {selectedItems.length > 0 && (
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
          )}
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all" className="relative">
              All
              {contentItems.length > 0 && (
                <Badge variant="secondary" className="ml-2">{contentItems.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="image" className="relative">
              Images
              {contentItems.filter(i => i.type === 'image').length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {contentItems.filter(i => i.type === 'image').length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="video" className="relative">
              Videos
              {contentItems.filter(i => i.type === 'video').length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {contentItems.filter(i => i.type === 'video').length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="post" className="relative">
              Posts
              {contentItems.filter(i => i.type === 'post').length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {contentItems.filter(i => i.type === 'post').length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="document" className="relative">
              Documents
              {contentItems.filter(i => i.type === 'document').length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {contentItems.filter(i => i.type === 'document').length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSelectAll}
            className="hidden sm:flex"
          >
            {selectedItems.length === filteredItems.length && filteredItems.length > 0 
              ? "Deselect All" 
              : "Select All"}
          </Button>
        </div>

        <TabsContent value="all" className="mt-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 animate-spin text-primary" />
                <span>Loading content...</span>
              </div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <FolderTree className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No content found</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                {searchQuery ? `No results for "${searchQuery}"` : "Your content library is empty"}
              </p>
              <Button onClick={() => setShowCreateContentDialog(true)}>Create Content</Button>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' 
              : 'space-y-3'
            }>
              {filteredItems.map((item) => (
                viewMode === 'grid' ? (
                  <Card 
                    key={item.id} 
                    className={cn(
                      "overflow-hidden border hover:shadow-md transition-shadow",
                      selectedItems.includes(item.id) && "ring-2 ring-primary"
                    )}
                  >
                    <div className="relative h-40 bg-muted">
                      {/* Selection checkbox */}
                      <div className="absolute top-2 left-2 z-20">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className={cn(
                            "h-7 w-7 rounded-full bg-background/80 backdrop-blur-sm",
                            selectedItems.includes(item.id) && "bg-primary text-primary-foreground"
                          )}
                          onClick={() => toggleItemSelection(item.id)}
                        >
                          {selectedItems.includes(item.id) 
                            ? <CheckCircle2 className="h-4 w-4" /> 
                            : <div className="h-4 w-4 rounded-full border-2" />
                          }
                        </Button>
                      </div>
                      
                      <div className="absolute top-2 right-2 flex space-x-1 z-10">
                        <Badge className={getStatusColor(item.status)} variant="outline">{item.status}</Badge>
                        {item.platform && (
                          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
                            {getPlatformIcon(item.platform)}
                          </Badge>
                        )}
                      </div>
                      
                      {item.type === 'image' && item.thumbnail && (
                        <img 
                          src={item.thumbnail} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/20">
                          <Video className="h-10 w-10 text-white" />
                          {item.thumbnail && (
                            <img 
                              src={item.thumbnail} 
                              alt={item.title}
                              className="w-full h-full object-cover opacity-80"
                            />
                          )}
                        </div>
                      )}
                      
                      {item.type === 'document' && (
                        <div className="h-full flex items-center justify-center bg-blue-50">
                          <FileText className="h-12 w-12 text-blue-300" />
                        </div>
                      )}
                      
                      {item.type === 'post' && (
                        <div className="absolute inset-0 flex items-center justify-center p-4 bg-purple-50">
                          <p className="text-sm text-gray-600 line-clamp-4">{item.content || 'No content'}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-3 space-y-2">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-sm truncate">{item.title}</h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" /> Copy
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="mr-2 h-4 w-4" /> Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" /> Download
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => {
                                setContentItems(prev => prev.filter(i => i.id !== item.id));
                                toast({
                                  title: "Item deleted",
                                  description: "The content has been removed"
                                });
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <div>{item.date}</div>
                        {item.size && <div>{item.size}</div>}
                      </div>
                      
                      {(item.views !== undefined || item.interactions !== undefined) && (
                        <div className="flex gap-3 text-xs text-muted-foreground pt-1">
                          {item.views !== undefined && (
                            <div className="flex items-center">
                              <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              {item.views}
                            </div>
                          )}
                          {item.interactions !== undefined && (
                            <div className="flex items-center">
                              <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                              </svg>
                              {item.interactions}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                ) : (
                  <Card 
                    key={item.id} 
                    className={cn(
                      "flex overflow-hidden hover:shadow-md transition-shadow",
                      selectedItems.includes(item.id) && "ring-2 ring-primary"
                    )}
                  >
                    <div className="flex items-center pl-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={cn(
                          "h-8 w-8 rounded-full",
                          selectedItems.includes(item.id) && "bg-primary text-primary-foreground"
                        )}
                        onClick={() => toggleItemSelection(item.id)}
                      >
                        {selectedItems.includes(item.id) 
                          ? <CheckCircle2 className="h-4 w-4" /> 
                          : <div className="h-4 w-4 rounded-full border-2" />
                        }
                      </Button>
                    </div>
                    
                    <div className="w-12 h-12 flex items-center justify-center shrink-0 bg-muted">
                      {getIcon(item.type)}
                    </div>
                    
                    <div className="p-3 flex-grow flex flex-col sm:flex-row sm:items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-sm">{item.title}</h3>
                          <div className="flex ml-2 space-x-1">
                            <Badge className={getStatusColor(item.status)} variant="outline">{item.status}</Badge>
                            {item.platform && (
                              <Badge variant="outline" className="bg-white/80">
                                {getPlatformIcon(item.platform)}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                          <div>{item.date}</div>
                          {item.size && <div>{item.size}</div>}
                          {item.views !== undefined && (
                            <div className="flex items-center">
                              <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              {item.views}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-2 sm:mt-0">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" /> Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="mr-2 h-4 w-4" /> Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" /> Download
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => {
                                setContentItems(prev => prev.filter(i => i.id !== item.id));
                                toast({
                                  title: "Item deleted",
                                  description: "The content has been removed"
                                });
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </Card>
                )
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Similar setup for other tabs */}
        {['image', 'video', 'post', 'document'].map(tabValue => (
          <TabsContent key={tabValue} value={tabValue} className="mt-4">
            {filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <FolderTree className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No {tabValue}s found</h3>
                <p className="text-muted-foreground mt-1 mb-4">
                  {searchQuery ? `No results for "${searchQuery}"` : `You don't have any ${tabValue}s yet`}
                </p>
                <Button onClick={() => {
                  setContentType(tabValue as any);
                  setShowCreateContentDialog(true);
                }}>
                  Create {tabValue.charAt(0).toUpperCase() + tabValue.slice(1)}
                </Button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' 
                : 'space-y-3'
              }>
                {/* Content is rendered by the filtered items, which are already filtered by tab */}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Create Content Dialog */}
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
    </motion.div>
  );
};

export default Content;
