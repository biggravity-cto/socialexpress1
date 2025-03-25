
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Clock, CheckCircle, XCircle, AlertCircle, Calendar, Image, ArrowRight, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

const Approvals = () => {
  const pendingItems = [
    {
      id: 1,
      title: "Summer Resort Promotion",
      contentType: "Post",
      platform: "Instagram",
      dueDate: "Jun 24, 2023",
      creator: { name: "Alex Johnson", avatar: "/placeholder.svg", initials: "AJ" },
      priority: "high"
    },
    {
      id: 2,
      title: "Weekend Package Deal",
      contentType: "Story",
      platform: "Facebook",
      dueDate: "Jun 26, 2023",
      creator: { name: "Taylor Smith", avatar: "/placeholder.svg", initials: "TS" },
      priority: "medium"
    },
    {
      id: 3,
      title: "New Spa Services Guide",
      contentType: "Document",
      platform: "Website",
      dueDate: "Jul 1, 2023",
      creator: { name: "Jamie Lee", avatar: "/placeholder.svg", initials: "JL" },
      priority: "low"
    },
    {
      id: 4,
      title: "Beach Event Showcase",
      contentType: "Video",
      platform: "YouTube",
      dueDate: "Jul 3, 2023",
      creator: { name: "Morgan Pierce", avatar: "/placeholder.svg", initials: "MP" },
      priority: "medium"
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">Low</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  const getContentTypeIcon = (contentType: string) => {
    switch (contentType.toLowerCase()) {
      case 'post':
        return <Image className="h-4 w-4" />;
      case 'story':
        return <Clock className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'video':
        return <Calendar className="h-4 w-4" />;
      default:
        return <Image className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">Content Approvals</h1>
        <p className="text-resort-500">Review and approve content before publishing</p>
      </div>

      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search approvals..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500"
            />
          </div>
          <Button variant="outline" className="justify-center sm:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </Card>

      <Tabs defaultValue="pending">
        <TabsList className="mb-4">
          <TabsTrigger value="pending" className="flex gap-2">
            <Clock className="h-4 w-4" /> Pending <Badge className="ml-1 bg-amber-500">{pendingItems.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex gap-2">
            <CheckCircle className="h-4 w-4" /> Approved
          </TabsTrigger>
          <TabsTrigger value="declined" className="flex gap-2">
            <XCircle className="h-4 w-4" /> Declined
          </TabsTrigger>
          <TabsTrigger value="all" className="flex gap-2">
            <AlertCircle className="h-4 w-4" /> All Items
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="space-y-4">
            {pendingItems.map((item) => (
              <Card key={item.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-2 bg-ocean-50 rounded-md">
                      {getContentTypeIcon(item.contentType)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium text-resort-800">{item.title}</h3>
                        {getPriorityBadge(item.priority)}
                      </div>
                      <div className="flex flex-wrap items-center mt-1 gap-x-3 gap-y-1 text-sm text-resort-500">
                        <span className="flex items-center">
                          <span className="font-medium">{item.contentType}</span>
                          <span className="mx-1.5">•</span>
                          <span>{item.platform}</span>
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>Due: {item.dueDate}</span>
                        </span>
                        <span className="flex items-center">
                          <span>By:</span>
                          <Avatar className="h-5 w-5 ml-1.5">
                            <AvatarImage src={item.creator.avatar} alt={item.creator.name} />
                            <AvatarFallback className="text-[10px]">{item.creator.initials}</AvatarFallback>
                          </Avatar>
                          <span className="ml-1">{item.creator.name}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-4 lg:mt-0">
                    <Button variant="outline" size="sm">Decline</Button>
                    <Button className="bg-ocean-600 hover:bg-ocean-700" size="sm">Review & Approve</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/calendar">
              <Button variant="outline" className="text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50">
                View Content Calendar <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </TabsContent>
        
        <TabsContent value="approved">
          <div className="text-center py-10">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
            <h3 className="text-lg font-medium text-resort-800 mb-2">No Approved Content</h3>
            <p className="text-resort-500 max-w-md mx-auto">
              All approved content will appear here. Start by reviewing and approving pending content.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="declined">
          <div className="text-center py-10">
            <XCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-resort-800 mb-2">No Declined Content</h3>
            <p className="text-resort-500 max-w-md mx-auto">
              Content that doesn't meet your standards will appear here after being declined.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="all">
          <div className="space-y-4">
            {pendingItems.map((item) => (
              <Card key={item.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-2 bg-ocean-50 rounded-md">
                      {getContentTypeIcon(item.contentType)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium text-resort-800">{item.title}</h3>
                        <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">Pending</Badge>
                        {getPriorityBadge(item.priority)}
                      </div>
                      <div className="flex flex-wrap items-center mt-1 gap-x-3 gap-y-1 text-sm text-resort-500">
                        <span className="flex items-center">
                          <span className="font-medium">{item.contentType}</span>
                          <span className="mx-1.5">•</span>
                          <span>{item.platform}</span>
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>Due: {item.dueDate}</span>
                        </span>
                        <span className="flex items-center">
                          <span>By:</span>
                          <Avatar className="h-5 w-5 ml-1.5">
                            <AvatarImage src={item.creator.avatar} alt={item.creator.name} />
                            <AvatarFallback className="text-[10px]">{item.creator.initials}</AvatarFallback>
                          </Avatar>
                          <span className="ml-1">{item.creator.name}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-4 lg:mt-0">
                    <Button variant="outline" size="sm">Decline</Button>
                    <Button className="bg-ocean-600 hover:bg-ocean-700" size="sm">Review & Approve</Button>
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

export default Approvals;
