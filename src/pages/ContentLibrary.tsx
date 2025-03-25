
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Grid, List, Plus, Image, FileText, Video } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ContentLibrary = () => {
  const contentItems = [
    { id: 1, type: 'image', title: 'Beach Resort Overview', date: '2023-05-12', status: 'published' },
    { id: 2, type: 'video', title: 'Spa Services Promo', date: '2023-05-15', status: 'published' },
    { id: 3, type: 'document', title: 'Summer Activities Guide', date: '2023-06-01', status: 'draft' },
    { id: 4, type: 'image', title: 'Dining Experience Gallery', date: '2023-06-10', status: 'published' },
    { id: 5, type: 'document', title: 'Guest Testimonials', date: '2023-06-15', status: 'reviewing' },
    { id: 6, type: 'video', title: 'Resort Tour', date: '2023-06-20', status: 'published' },
    { id: 7, type: 'image', title: 'Room Types Showcase', date: '2023-07-05', status: 'draft' },
    { id: 8, type: 'document', title: 'Event Planning Guide', date: '2023-07-12', status: 'reviewing' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'document':
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">Content Library</h1>
          <p className="text-resort-500">Browse, search, and manage your content assets</p>
        </div>
        <Button className="bg-ocean-600 hover:bg-ocean-700 shadow-sm">
          <Plus className="mr-1.5 h-4 w-4" /> Add Content
        </Button>
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
              variant="outline"
              className="rounded-r-none border-r-0"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contentItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4 flex items-start space-x-4">
                  <div className={`p-2 rounded-md ${
                    item.type === 'image' ? 'bg-blue-50 text-blue-600' :
                    item.type === 'video' ? 'bg-purple-50 text-purple-600' :
                    'bg-amber-50 text-amber-600'
                  }`}>
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-resort-800 truncate">{item.title}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-resort-500">{item.date}</span>
                      <span className="mx-2 text-resort-300">•</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="images">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contentItems.filter(item => item.type === 'image').map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4 flex items-start space-x-4">
                  <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                    <Image className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-resort-800 truncate">{item.title}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-resort-500">{item.date}</span>
                      <span className="mx-2 text-resort-300">•</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="videos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contentItems.filter(item => item.type === 'video').map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4 flex items-start space-x-4">
                  <div className="p-2 rounded-md bg-purple-50 text-purple-600">
                    <Video className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-resort-800 truncate">{item.title}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-resort-500">{item.date}</span>
                      <span className="mx-2 text-resort-300">•</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="documents">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contentItems.filter(item => item.type === 'document').map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4 flex items-start space-x-4">
                  <div className="p-2 rounded-md bg-amber-50 text-amber-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-resort-800 truncate">{item.title}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-resort-500">{item.date}</span>
                      <span className="mx-2 text-resort-300">•</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ContentLibrary;
