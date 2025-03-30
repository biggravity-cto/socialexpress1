
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, MessageSquare, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Messages = () => {
  const messages = [
    {
      id: 1,
      platform: 'instagram',
      sender: 'Jane Smith',
      avatar: 'https://i.pravatar.cc/150?img=1',
      message: 'I love your resort! Do you have availability for next weekend?',
      time: '10m ago',
      unread: true,
    },
    {
      id: 2,
      platform: 'twitter',
      sender: 'Mike Johnson',
      avatar: 'https://i.pravatar.cc/150?img=2',
      message: 'Thanks for the quick response! Will book soon.',
      time: '32m ago',
      unread: false,
    },
    {
      id: 3,
      platform: 'facebook',
      sender: 'Sarah Williams',
      avatar: 'https://i.pravatar.cc/150?img=3',
      message: 'Are pets allowed at your resort?',
      time: '1h ago',
      unread: true,
    },
    {
      id: 4,
      platform: 'instagram',
      sender: 'Alex Brown',
      avatar: 'https://i.pravatar.cc/150?img=4',
      message: 'Great content! Looking forward to my stay next month.',
      time: '3h ago',
      unread: false,
    },
    {
      id: 5,
      platform: 'youtube',
      sender: 'Chris Davis',
      avatar: 'https://i.pravatar.cc/150?img=5',
      message: 'Your video tour was amazing! I have a question about the spa services.',
      time: '5h ago',
      unread: true,
    },
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case 'twitter':
        return <Twitter className="h-4 w-4 text-blue-400" />;
      case 'facebook':
        return <Facebook className="h-4 w-4 text-blue-600" />;
      case 'youtube':
        return <Youtube className="h-4 w-4 text-red-600" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-400" />;
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
          <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">Unified Social Inbox</h1>
          <p className="text-resort-500">Manage all your social media conversations in one place</p>
        </div>
        <Button className="bg-ocean-600 hover:bg-ocean-700 shadow-sm">
          <MessageSquare className="mr-1.5 h-4 w-4" /> Compose
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search messages..."
              className="pl-9"
            />
          </div>
          <Button variant="outline" className="justify-center sm:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Tabs defaultValue="all">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
              <TabsTrigger value="flagged" className="flex-1">Flagged</TabsTrigger>
            </TabsList>
            
            <Card className="overflow-hidden h-[calc(100vh-280px)]">
              <div className="overflow-y-auto h-full">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex items-start p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      message.unread ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="relative mr-3">
                      <img 
                        src={message.avatar} 
                        alt={message.sender} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="absolute -right-1 -bottom-1 p-0.5 rounded-full bg-white">
                        {getPlatformIcon(message.platform)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium text-resort-800">{message.sender}</h3>
                        <span className="text-xs text-resort-500">{message.time}</span>
                      </div>
                      <p className="text-sm text-resort-600 truncate">{message.message}</p>
                    </div>
                    {message.unread && (
                      <div className="ml-2 h-2 w-2 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </Tabs>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="h-[calc(100vh-280px)] flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center">
              <div className="relative mr-3">
                <img 
                  src="https://i.pravatar.cc/150?img=1" 
                  alt="Jane Smith" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="absolute -right-1 -bottom-1 p-0.5 rounded-full bg-white">
                  <Instagram className="h-4 w-4 text-pink-500" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-resort-800">Jane Smith</h3>
                <p className="text-xs text-resort-500">@janesmith • Instagram</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex items-start">
                <img 
                  src="https://i.pravatar.cc/150?img=1" 
                  alt="Jane Smith" 
                  className="w-8 h-8 rounded-full mr-2 mt-1"
                />
                <div className="bg-gray-100 rounded-lg py-2 px-3 max-w-[80%]">
                  <p className="text-sm">Hello! I've been looking at your resort for my upcoming vacation!</p>
                  <span className="text-xs text-gray-500 mt-1">10:23 AM</span>
                </div>
              </div>
              
              <div className="flex items-start flex-row-reverse">
                <img 
                  src="https://i.pravatar.cc/150?img=8" 
                  alt="You" 
                  className="w-8 h-8 rounded-full ml-2 mt-1"
                />
                <div className="bg-ocean-100 rounded-lg py-2 px-3 max-w-[80%]">
                  <p className="text-sm">Thank you for your interest! How can I help you with your booking?</p>
                  <span className="text-xs text-gray-500 mt-1">10:25 AM</span>
                </div>
              </div>
              
              <div className="flex items-start">
                <img 
                  src="https://i.pravatar.cc/150?img=1" 
                  alt="Jane Smith" 
                  className="w-8 h-8 rounded-full mr-2 mt-1"
                />
                <div className="bg-gray-100 rounded-lg py-2 px-3 max-w-[80%]">
                  <p className="text-sm">I love your resort! Do you have availability for next weekend?</p>
                  <span className="text-xs text-gray-500 mt-1">10:30 AM</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100">
              <div className="flex">
                <Input 
                  placeholder="Type your message..." 
                  className="rounded-r-none"
                />
                <Button className="rounded-l-none bg-ocean-600 hover:bg-ocean-700">
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Messages;
