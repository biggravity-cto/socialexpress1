
import React from 'react';
import { motion } from 'framer-motion';
import CalendarView from '@/components/dashboard/CalendarView';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, ListFilter, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import PostCreator from '@/components/dashboard/PostCreator';

const Calendar = () => {
  const isMobile = useIsMobile();
  const [showPostCreator, setShowPostCreator] = React.useState(false);
  
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
          <Button 
            variant="outline" 
            className="flex items-center"
          >
            <ListFilter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button 
            className="bg-ocean-600 hover:bg-ocean-700 text-white"
            onClick={() => setShowPostCreator(!showPostCreator)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Content
          </Button>
        </div>
      </div>
      
      {showPostCreator && (
        <Card className="p-4 mb-4">
          <PostCreator onCancel={() => setShowPostCreator(false)} />
        </Card>
      )}
      
      <Tabs defaultValue="calendar">
        <TabsList className="mb-4">
          <TabsTrigger value="calendar" className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Calendar View
          </TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="space-y-4">
          <div className={`w-full ${isMobile ? 'overflow-x-auto' : 'overflow-hidden'}`}>
            <div className="min-w-[800px] lg:min-w-0">
              <CalendarView />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="list">
          <Card className="p-6">
            <h3 className="text-lg font-medium text-resort-800 mb-4">Upcoming Content</h3>
            <p className="text-resort-500">List view coming soon...</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="grid">
          <Card className="p-6">
            <h3 className="text-lg font-medium text-resort-800 mb-4">Content Grid</h3>
            <p className="text-resort-500">Grid view coming soon...</p>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Calendar;
