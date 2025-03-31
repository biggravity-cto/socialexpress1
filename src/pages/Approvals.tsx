
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ApprovalsSearch from '@/components/approvals/ApprovalsSearch';
import ApprovalsList from '@/components/approvals/ApprovalsList';
import { ApprovalItemProps } from '@/components/approvals/ApprovalItem';

const Approvals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for approval items
  const approvalItems: ApprovalItemProps[] = [
    {
      id: 1,
      title: "Summer Resort Promotion",
      contentType: "Post",
      platform: "Instagram",
      dueDate: "Jun 24, 2023",
      creator: { name: "Alex Johnson", avatar: "/placeholder.svg", initials: "AJ" },
      priority: "high",
      status: "pending"
    },
    {
      id: 2,
      title: "Weekend Package Deal",
      contentType: "Story",
      platform: "Facebook",
      dueDate: "Jun 26, 2023",
      creator: { name: "Taylor Smith", avatar: "/placeholder.svg", initials: "TS" },
      priority: "medium",
      status: "pending"
    },
    {
      id: 3,
      title: "New Spa Services Guide",
      contentType: "Document",
      platform: "Website",
      dueDate: "Jul 1, 2023",
      creator: { name: "Jamie Lee", avatar: "/placeholder.svg", initials: "JL" },
      priority: "low",
      status: "pending"
    },
    {
      id: 4,
      title: "Beach Event Showcase",
      contentType: "Video",
      platform: "YouTube",
      dueDate: "Jul 3, 2023",
      creator: { name: "Morgan Pierce", avatar: "/placeholder.svg", initials: "MP" },
      priority: "medium",
      status: "pending"
    }
  ];

  // Filter items based on search query
  const filteredItems = searchQuery 
    ? approvalItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.platform.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : approvalItems;

  const pendingItems = filteredItems.filter(item => item.status === 'pending');

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

      <ApprovalsSearch onSearch={setSearchQuery} />

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
          <ApprovalsList items={filteredItems} status="pending" />
          
          <div className="mt-8 text-center">
            <Link to="/calendar">
              <Button variant="outline" className="text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50">
                View Content Calendar <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </TabsContent>
        
        <TabsContent value="approved">
          <ApprovalsList items={filteredItems} status="approved" />
        </TabsContent>
        
        <TabsContent value="declined">
          <ApprovalsList items={filteredItems} status="declined" />
        </TabsContent>
        
        <TabsContent value="all">
          <ApprovalsList items={filteredItems} status="all" />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Approvals;
