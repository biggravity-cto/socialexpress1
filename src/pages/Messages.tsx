import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, Filter, MessageSquare, Instagram, Twitter, Facebook, Youtube, 
  BrainCircuit, Settings, Toggle
} from 'lucide-react';
import { 
  Sheet, 
  SheetTrigger, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const Messages = () => {
  const [messages, setMessages] = useState([
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
  ]);
  
  const [aiAgentEnabled, setAiAgentEnabled] = useState(false);
  const [responseStyle, setResponseStyle] = useState("professional");
  const [responseSpeed, setResponseSpeed] = useState(50);

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
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="bg-ocean-50 text-ocean-600 border-ocean-200 hover:bg-ocean-100">
                <BrainCircuit className="mr-1.5 h-4 w-4" /> AI Agent
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>AI Agent Configuration</SheetTitle>
                <SheetDescription>
                  Configure your AI agent to automatically respond to messages based on your preferences.
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ai-agent-toggle">Enable AI Agent</Label>
                    <p className="text-sm text-muted-foreground">Let AI respond to messages automatically</p>
                  </div>
                  <Switch 
                    id="ai-agent-toggle" 
                    checked={aiAgentEnabled} 
                    onCheckedChange={setAiAgentEnabled}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="response-style">Response Style</Label>
                  <Select 
                    defaultValue={responseStyle} 
                    onValueChange={setResponseStyle}
                  >
                    <SelectTrigger id="response-style">
                      <SelectValue placeholder="Select a response style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label htmlFor="response-speed">Response Speed</Label>
                    <span className="text-sm text-muted-foreground">{responseSpeed}%</span>
                  </div>
                  <Slider 
                    id="response-speed" 
                    value={[responseSpeed]} 
                    min={0} 
                    max={100} 
                    step={10}
                    onValueChange={(value) => setResponseSpeed(value[0])} 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Slower (more thoughtful)</span>
                    <span>Faster (more responsive)</span>
                  </div>
                </div>
                
                <div className="space-y-3 pt-3 border-t">
                  <Label>Platform Settings</Label>
                  <div className="space-y-2">
                    {['Instagram', 'Twitter', 'Facebook', 'YouTube'].map((platform) => (
                      <div key={platform} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {platform === 'Instagram' && <Instagram className="h-4 w-4 text-pink-500" />}
                          {platform === 'Twitter' && <Twitter className="h-4 w-4 text-blue-400" />}
                          {platform === 'Facebook' && <Facebook className="h-4 w-4 text-blue-600" />}
                          {platform === 'YouTube' && <Youtube className="h-4 w-4 text-red-600" />}
                          <span>{platform}</span>
                        </div>
                        <Switch defaultChecked={platform !== 'YouTube'} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <SheetFooter>
                <Button className="w-full bg-ocean-600 hover:bg-ocean-700">
                  Save Configuration
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
          <Button className="bg-ocean-600 hover:bg-ocean-700 shadow-sm">
            <MessageSquare className="mr-1.5 h-4 w-4" /> Compose
          </Button>
        </div>
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

      {aiAgentEnabled && (
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <BrainCircuit className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-800">AI Agent Active</h3>
              <p className="text-sm text-green-700">
                Your AI agent is actively monitoring incoming messages and will respond based on your configuration.
              </p>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto text-green-700 hover:text-green-800 hover:bg-green-100">
              <Settings className="h-4 w-4 mr-1" /> Adjust Settings
            </Button>
          </div>
        </Card>
      )}

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
              
              {aiAgentEnabled && (
                <div className="ml-auto flex items-center gap-1 px-2 py-1 bg-green-50 rounded-full text-xs text-green-600">
                  <BrainCircuit className="h-3 w-3" />
                  <span>AI Enabled</span>
                </div>
              )}
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
