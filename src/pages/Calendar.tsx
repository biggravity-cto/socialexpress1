
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, ListFilter, Plus, ChevronLeft, ChevronRight, Settings2, Instagram, Twitter, Facebook, Filter, AlignLeft, Search, Download, MoreHorizontal, CircleUser, Clock, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

// Define campaign type
interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  color: string;
}

// Define post type
interface Post {
  id: string;
  title: string;
  date: Date;
  time: string;
  platform: 'instagram' | 'twitter' | 'facebook';
  type: string;
  campaign?: string;
  status: 'scheduled' | 'draft' | 'published' | 'pending_approval';
  author?: string;
  imgUrl?: string;
}

// Sample campaigns
const campaigns: Campaign[] = [
  { 
    id: '1', 
    name: 'Spring Campaign', 
    startDate: '2023-02-01', 
    endDate: '2023-02-10', 
    color: 'bg-blue-100 border-blue-300 text-blue-800' 
  },
  { 
    id: '2', 
    name: 'Early Summer Promo', 
    startDate: '2023-02-11', 
    endDate: '2023-02-20', 
    color: 'bg-amber-100 border-amber-300 text-amber-800'
  },
  { 
    id: '3', 
    name: 'Website Launch', 
    startDate: '2023-02-21', 
    endDate: '2023-02-28', 
    color: 'bg-green-100 border-green-300 text-green-800'
  }
];

// Sample posts for the calendar
const posts: Post[] = [
  { 
    id: '1', 
    title: 'Weekly update for Spring campaign launch',
    date: new Date(2023, 1, 1), 
    time: '09:00',
    platform: 'twitter', 
    type: 'Weekly Update',
    campaign: '1',
    status: 'published',
    author: 'Emily Chen',
    imgUrl: '/placeholder.svg'
  },
  { 
    id: '2', 
    title: 'Beach resort promotional photo', 
    date: new Date(2023, 1, 2), 
    time: '12:00',
    platform: 'instagram', 
    type: 'Post',
    campaign: '1',
    status: 'published',
    author: 'James Wilson',
    imgUrl: '/placeholder.svg'
  },
  { 
    id: '3', 
    title: 'Spring discount announcement', 
    date: new Date(2023, 1, 2), 
    time: '15:30',
    platform: 'twitter', 
    type: 'Announcement',
    campaign: '1',
    status: 'published',
    author: 'Sarah Johnson',
    imgUrl: '/placeholder.svg'
  },
  { 
    id: '4', 
    title: 'Mid-week engagement post', 
    date: new Date(2023, 1, 5), 
    time: '10:15',
    platform: 'facebook', 
    type: 'Engagement',
    campaign: '1',
    status: 'published',
    author: 'David Park',
    imgUrl: '/placeholder.svg'
  },
  { 
    id: '5', 
    title: 'Spring campaign highlight reel', 
    date: new Date(2023, 1, 7), 
    time: '14:00',
    platform: 'instagram', 
    type: 'Video',
    campaign: '1',
    status: 'published',
    author: 'Lisa Rodriguez',
    imgUrl: '/placeholder.svg'
  },
  { 
    id: '6', 
    title: 'Weekend special offers', 
    date: new Date(2023, 1, 10), 
    time: '09:30',
    platform: 'twitter', 
    type: 'Promotion',
    campaign: '1',
    status: 'published',
    author: 'James Wilson',
    imgUrl: '/placeholder.svg'
  },
  { 
    id: '7', 
    title: 'Early summer teaser post', 
    date: new Date(2023, 1, 11), 
    time: '11:00',
    platform: 'instagram', 
    type: 'Teaser',
    campaign: '2',
    status: 'published',
    author: 'Emily Chen',
    imgUrl: '/placeholder.svg'
  },
  { 
    id: '8', 
    title: 'Summer promotion official announcement', 
    date: new Date(2023, 1, 12), 
    time: '10:00',
    platform: 'facebook', 
    type: 'Announcement',
    campaign: '2',
    status: 'published',
    author: 'Sarah Johnson',
    imgUrl: '/placeholder.svg'
  },
  { 
    id: '9', 
    title: 'Limited time offer details', 
    date: new Date(2023, 1, 15), 
    time: '13:45',
    platform: 'twitter', 
    type: 'Promotion',
    campaign: '2',
    status: 'scheduled',
    author: 'David Park',
    imgUrl: '/placeholder.svg'
  },
  { 
    id: '10', 
    title: 'Summer activity highlights', 
    date: new Date(2023, 1, 18), 
    time: '15:00',
    platform: 'instagram', 
    type: 'Carousel',
    campaign: '2',
    status: 'draft',
    author: 'Lisa Rodriguez',
    imgUrl: '/placeholder.svg'
  },
  { 
    id: '11', 
    title: 'Website launch countdown', 
    date: new Date(2023, 1, 21), 
    time: '09:00',
    platform: 'twitter', 
    type: 'Announcement',
    campaign: '3',
    status: 'scheduled',
    author: 'Emily Chen',
    imgUrl: '/placeholder.svg'
  },
  { 
    id: '12', 
    title: 'New website feature preview', 
    date: new Date(2023, 1, 23), 
    time: '14:30',
    platform: 'facebook', 
    type: 'Preview',
    campaign: '3',
    status: 'draft',
    author: 'James Wilson',
    imgUrl: '/placeholder.svg'
  },
  { 
    id: '13', 
    title: 'Website launch day announcement', 
    date: new Date(2023, 1, 28), 
    time: '08:00',
    platform: 'instagram', 
    type: 'Announcement',
    campaign: '3',
    status: 'draft',
    author: 'Sarah Johnson',
    imgUrl: '/placeholder.svg'
  }
];

// Function to get platform icon
const getPlatformIcon = (platform: string) => {
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

// Function to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case 'published':
      return 'bg-green-100 text-green-800';
    case 'scheduled':
      return 'bg-blue-100 text-blue-800';
    case 'draft':
      return 'bg-gray-100 text-gray-800';
    case 'pending_approval':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Calendar = () => {
  const isMobile = useIsMobile();
  const [currentMonth, setCurrentMonth] = useState(new Date(2023, 1)); // February 2023
  const [activeView, setActiveView] = useState('month');
  const [showPostCreator, setShowPostCreator] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2023, 1, 1));
  const [draggingPost, setDraggingPost] = useState<string | null>(null);
  
  // Generate calendar days for the month view
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
    
    // Get the last day of the previous month
    const lastDayPrevMonth = new Date(year, month, 0).getDate();
    
    const days = [];
    
    // Add days from previous month to fill the first week
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, lastDayPrevMonth - i),
        isCurrentMonth: false
      });
    }
    
    // Add days of current month
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Add days from next month to complete the grid (6 rows x 7 columns = 42 cells)
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };
  
  // Group days into weeks for the month view
  const calendarWeeks = () => {
    const days = generateCalendarDays();
    const weeks = [];
    
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    
    return weeks;
  };
  
  // Get posts for a specific date
  const getPostsForDate = (date: Date) => {
    return posts.filter(post => 
      post.date.getDate() === date.getDate() &&
      post.date.getMonth() === date.getMonth() &&
      post.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Get campaign for a specific date
  const getCampaignForDate = (date: Date) => {
    return campaigns.find(campaign => {
      const start = new Date(campaign.startDate);
      const end = new Date(campaign.endDate);
      return date >= start && date <= end;
    });
  };
  
  // Navigate to previous month
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  
  // Set to current month
  const goToToday = () => {
    setCurrentMonth(new Date(2023, 1)); // February 2023 for the example
    setSelectedDate(new Date(2023, 1, 1));
  };
  
  // Format month and year
  const formatMonthYear = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // Handle start dragging a post
  const handleDragStart = (postId: string, event: React.DragEvent) => {
    setDraggingPost(postId);
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', postId);
      event.dataTransfer.effectAllowed = 'move';
    }
  };

  // Handle dropping a post on a date
  const handleDrop = (date: Date, event: React.DragEvent) => {
    event.preventDefault();
    if (draggingPost) {
      // In a real app, this would update the post date in a database
      console.log(`Moving post ${draggingPost} to ${date.toDateString()}`);
      // Reset dragging state
      setDraggingPost(null);
    }
  };

  // Handle drag over a date cell
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  };
  
  // Handle clicking a day
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  // Get the day detail dialog component to display selected day's posts
  const DayDetailDialog = ({ date }: { date: Date }) => {
    const datePosts = getPostsForDate(date);
    const campaign = getCampaignForDate(date);
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full mt-2">View Posts</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </DialogTitle>
          </DialogHeader>
          
          {campaign && (
            <div className={`p-2 rounded-md mb-4 ${campaign.color}`}>
              <span className="font-medium">{campaign.name}</span>
            </div>
          )}
          
          {datePosts.length > 0 ? (
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
              {datePosts.map(post => (
                <div 
                  key={post.id}
                  className="p-3 border rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`mr-2 p-1 rounded-full ${
                          post.platform === 'instagram' ? 'bg-pink-50 text-pink-600' :
                          post.platform === 'twitter' ? 'bg-blue-50 text-blue-600' :
                          'bg-indigo-50 text-indigo-600'
                        }`}>
                          {getPlatformIcon(post.platform)}
                        </span>
                        <Badge className={getStatusColor(post.status)}>
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </Badge>
                        <span className="text-xs text-resort-500 ml-2 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.time}
                        </span>
                      </div>
                      <h3 className="font-medium text-resort-800">{post.title}</h3>
                      <div className="flex items-center mt-2 text-xs text-resort-500">
                        <CircleUser className="h-3 w-3 mr-1" />
                        {post.author}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Change Date</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarIcon className="h-12 w-12 text-resort-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-resort-800 mb-1">No Posts Scheduled</h3>
              <p className="text-resort-500 text-sm mb-4">There are no posts scheduled for this date.</p>
              <Button 
                className="bg-ocean-600 hover:bg-ocean-700 shadow-sm"
                onClick={() => setShowPostCreator(true)}
              >
                <Plus className="mr-1.5 h-4 w-4" /> Create Content
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">Content Calendar</h1>
          <p className="text-resort-500">Plan and schedule your content across platforms</p>
        </div>
        
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Calendar</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Platforms</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Instagram className="h-4 w-4 mr-2" /> Instagram
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Twitter className="h-4 w-4 mr-2" /> Twitter
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Facebook className="h-4 w-4 mr-2" /> Facebook
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">Published</Button>
                    <Button variant="outline" size="sm">Scheduled</Button>
                    <Button variant="outline" size="sm">Draft</Button>
                    <Button variant="outline" size="sm">Pending Approval</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Campaigns</Label>
                  <div className="flex flex-wrap gap-2">
                    {campaigns.map(campaign => (
                      <Button 
                        key={campaign.id} 
                        variant="outline" 
                        size="sm"
                        className={campaign.color.replace('bg-', 'hover:bg-').replace('text-', 'hover:text-')}
                      >
                        {campaign.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <div className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">Start Date</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={new Date(2023, 1, 1)}
                          onSelect={() => {}}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <span>to</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">End Date</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={new Date(2023, 1, 28)}
                          onSelect={() => {}}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline">Reset</Button>
                <Button className="bg-ocean-600 hover:bg-ocean-700">Apply Filters</Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={showPostCreator} onOpenChange={setShowPostCreator}>
            <DialogTrigger asChild>
              <Button 
                className="bg-ocean-600 hover:bg-ocean-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Content
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Content</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter content title" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform">Platform</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content-type">Content Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="post">Post</SelectItem>
                        <SelectItem value="carousel">Carousel</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="story">Story</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate.toLocaleDateString()}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => date && setSelectedDate(date)}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" defaultValue="12:00" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="campaign">Campaign</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign" />
                    </SelectTrigger>
                    <SelectContent>
                      {campaigns.map(campaign => (
                        <SelectItem key={campaign.id} value={campaign.id}>
                          {campaign.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="none">No Campaign</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <div className="border rounded-md p-2 min-h-[100px] flex items-center justify-center bg-gray-50">
                    <Button variant="outline" className="flex items-center">
                      <Plus className="h-4 w-4 mr-2" /> Add Content
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setShowPostCreator(false)}>Cancel</Button>
                <div className="space-x-2">
                  <Button variant="outline">Save as Draft</Button>
                  <Button className="bg-ocean-600 hover:bg-ocean-700">Schedule</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Calendar Navigation and Tools */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-3 justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold ml-2">{formatMonthYear(currentMonth)}</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search content..."
                className="pl-9 w-[200px] h-9"
              />
            </div>
            <Tabs defaultValue="month" onValueChange={setActiveView} className="w-auto">
              <TabsList>
                <TabsTrigger value="list">List</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="flex items-center">
                  <Download className="h-4 w-4 mr-2" /> Export Calendar
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center">
                  <AlignLeft className="h-4 w-4 mr-2" /> View as List
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center">
                  <Settings2 className="h-4 w-4 mr-2" /> Calendar Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>
      
      {/* Campaign Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">Platforms:</span>
          <Badge className="bg-pink-100 text-pink-800 mr-1">
            <Instagram className="h-3 w-3 mr-1" /> 5
          </Badge>
          <Badge className="bg-blue-100 text-blue-800 mr-1">
            <Twitter className="h-3 w-3 mr-1" /> 4
          </Badge>
          <Badge className="bg-indigo-100 text-indigo-800 mr-1">
            <Facebook className="h-3 w-3 mr-1" /> 4
          </Badge>
        </div>
        
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">Campaigns:</span>
          {campaigns.map(campaign => (
            <Badge key={campaign.id} className={`mr-1 ${campaign.color}`}>
              {campaign.name}
            </Badge>
          ))}
        </div>
        
        <div className="ml-auto">
          <Button variant="ghost" size="sm" className="text-resort-500">
            Reset filters
          </Button>
        </div>
      </div>
      
      {/* Calendar View */}
      <div className={`w-full ${isMobile ? 'overflow-x-auto' : ''}`}>
        <div className={`min-w-[900px] lg:min-w-0 border rounded-lg bg-white overflow-hidden`}>
          {/* Month View */}
          <Table>
            <TableHeader>
              <TableRow>
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                  <TableHead key={day} className="text-center font-medium p-2">
                    {day}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {calendarWeeks().map((week, weekIndex) => {
                // Find campaigns that span this week
                const campaigns = week.map(day => getCampaignForDate(day.date)).filter(Boolean);
                const uniqueCampaigns = campaigns.filter((campaign, index, self) => 
                  index === self.findIndex((c) => c?.id === campaign?.id)
                );
                
                return (
                  <React.Fragment key={weekIndex}>
                    {/* Campaign Banners */}
                    {uniqueCampaigns.map(campaign => {
                      if (!campaign) return null;
                      
                      // Find where the campaign starts and ends in this week
                      const startDate = new Date(campaign.startDate);
                      const endDate = new Date(campaign.endDate);
                      
                      // Calculate which days of the week this campaign covers
                      const startDayIndex = week.findIndex(day => 
                        day.date.getTime() >= startDate.getTime() && 
                        day.date.getTime() <= endDate.getTime()
                      );
                      
                      const endDayIndex = week.findIndex((day, i) => 
                        i >= startDayIndex && 
                        (day.date.getTime() > endDate.getTime() || i === week.length - 1)
                      );
                      
                      const span = endDayIndex === -1 ? 
                        week.length - startDayIndex : 
                        endDayIndex - startDayIndex;
                      
                      return startDayIndex !== -1 ? (
                        <TableRow key={campaign.id} className="h-6">
                          {startDayIndex > 0 && <TableCell colSpan={startDayIndex}></TableCell>}
                          <TableCell 
                            colSpan={span} 
                            className={`${campaign.color} p-1 border text-xs font-medium`}
                          >
                            {campaign.name}
                          </TableCell>
                          {endDayIndex !== -1 && endDayIndex < week.length - 1 && (
                            <TableCell colSpan={week.length - endDayIndex}></TableCell>
                          )}
                        </TableRow>
                      ) : null;
                    })}
                    
                    {/* Calendar Days */}
                    <TableRow className="h-24">
                      {week.map((day, dayIndex) => {
                        const dayPosts = getPostsForDate(day.date);
                        const isCurrentDay = day.date.getDate() === 1;
                        
                        return (
                          <TableCell 
                            key={dayIndex} 
                            className={`relative border p-1 align-top ${
                              day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
                            } ${isCurrentDay ? 'font-bold' : ''}`}
                            onDrop={(e) => handleDrop(day.date, e)}
                            onDragOver={handleDragOver}
                            onClick={() => handleDayClick(day.date)}
                          >
                            <div className="mb-1 p-1">{day.date.getDate()}</div>
                            
                            {/* Day Posts */}
                            <div className="space-y-1 max-h-[80px] overflow-y-auto">
                              {dayPosts.slice(0, 3).map(post => (
                                <div 
                                  key={post.id}
                                  className="flex items-center p-1 rounded text-xs bg-white border border-gray-200 cursor-pointer hover:bg-gray-50"
                                  draggable
                                  onDragStart={(e) => handleDragStart(post.id, e)}
                                >
                                  <div className={`p-1 rounded-full mr-1 ${
                                    post.platform === 'instagram' ? 'bg-pink-50 text-pink-600' :
                                    post.platform === 'twitter' ? 'bg-blue-50 text-blue-600' :
                                    'bg-indigo-50 text-indigo-600'
                                  }`}>
                                    {getPlatformIcon(post.platform)}
                                  </div>
                                  <span className="truncate flex-1">{post.title}</span>
                                </div>
                              ))}
                              
                              {dayPosts.length > 3 && (
                                <div className="text-xs text-center text-resort-500 p-1">
                                  +{dayPosts.length - 3} more
                                </div>
                              )}
                            </div>
                            
                            {dayPosts.length > 0 && (
                              <DayDetailDialog date={day.date} />
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
          
          {activeView === 'list' && (
            <div className="p-4">
              <h3 className="text-lg font-medium text-resort-800 mb-4">Content List</h3>
              <div className="space-y-3">
                {posts.map(post => (
                  <Card key={post.id} className="p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center mb-1">
                          <span className={`mr-2 p-1 rounded-full ${
                            post.platform === 'instagram' ? 'bg-pink-50 text-pink-600' :
                            post.platform === 'twitter' ? 'bg-blue-50 text-blue-600' :
                            'bg-indigo-50 text-indigo-600'
                          }`}>
                            {getPlatformIcon(post.platform)}
                          </span>
                          <Badge className={getStatusColor(post.status)}>
                            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                          </Badge>
                          <span className="ml-2 text-xs text-resort-500">
                            {post.date.toLocaleDateString()} at {post.time}
                          </span>
                        </div>
                        <h4 className="font-medium text-resort-800">{post.title}</h4>
                        <div className="flex items-center mt-1 text-xs text-resort-500">
                          <CircleUser className="h-3 w-3 mr-1" />
                          {post.author}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem>Change Date</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-xs text-resort-500">
        <div className="flex items-center">
          <AlertTriangle className="h-3 w-3 mr-1 text-amber-500" />
          <span>Tip: You can drag and drop posts to reschedule them to different dates.</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Calendar;
