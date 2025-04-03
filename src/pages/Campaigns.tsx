
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  SendHorizontal, 
  Plus,
  Target, 
  BrainCircuit, 
  FileText, 
  LineChart, 
  MessageSquare,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  CalendarDays
} from 'lucide-react';

// Define campaign step types
type CampaignStep = {
  id: number;
  title: string;
  icon: React.ReactNode;
  completed: boolean;
};

// Define message types
type MessageType = 'user' | 'ai';

type Message = {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
};

// Define artifact types
type ArtifactType = 'goal' | 'strategy' | 'audience' | 'channels' | 'calendar';

type Artifact = {
  id: string;
  type: ArtifactType;
  title: string;
  content: React.ReactNode;
  timestamp: Date;
};

const Campaigns = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi there! I'm your AI Marketing Assistant. I'll help you create a new campaign. Let's start by defining your campaign goals. What's the main objective of this campaign?",
      timestamp: new Date()
    }
  ]);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Campaign steps
  const steps: CampaignStep[] = [
    { id: 1, title: 'Define Goals', icon: <Target className="h-5 w-5 text-blue-600" />, completed: false },
    { id: 2, title: 'AI Strategy', icon: <BrainCircuit className="h-5 w-5 text-purple-600" />, completed: false },
    { id: 3, title: 'Content Outline', icon: <FileText className="h-5 w-5 text-green-600" />, completed: false },
    { id: 4, title: 'Performance Forecast', icon: <LineChart className="h-5 w-5 text-amber-600" />, completed: false },
    { id: 5, title: 'Campaign Brief', icon: <MessageSquare className="h-5 w-5 text-pink-600" />, completed: false },
  ];
  
  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: userInput,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');

    // Simulate AI response based on current step
    setTimeout(() => {
      let aiResponse = '';
      let newArtifact: Artifact | null = null;
      
      switch(currentStep) {
        case 1:
          aiResponse = "Great! I've noted your campaign objective. Now, let's identify your target audience. Who are you trying to reach with this campaign?";
          newArtifact = {
            id: Date.now().toString(),
            type: 'goal',
            title: 'Campaign Objective',
            content: (
              <div className="p-4">
                <h3 className="text-sm font-medium text-resort-800 mb-2">Primary Goal</h3>
                <p className="text-sm text-resort-600">{userInput}</p>
              </div>
            ),
            timestamp: new Date()
          };
          setCurrentStep(2);
          break;
        case 2:
          aiResponse = "Perfect! Based on your target audience, I recommend focusing on these channels and content types. What specific messaging would resonate with this audience?";
          newArtifact = {
            id: Date.now().toString(),
            type: 'audience',
            title: 'Target Audience',
            content: (
              <div className="p-4">
                <h3 className="text-sm font-medium text-resort-800 mb-2">Audience Segments</h3>
                <p className="text-sm text-resort-600">{userInput}</p>
              </div>
            ),
            timestamp: new Date()
          };
          setCurrentStep(3);
          break;
        case 3:
          aiResponse = "I've created a content outline based on your input. When would you like to schedule this campaign?";
          newArtifact = {
            id: Date.now().toString(),
            type: 'strategy',
            title: 'Content Strategy',
            content: (
              <div className="p-4">
                <h3 className="text-sm font-medium text-resort-800 mb-2">Key Messages</h3>
                <p className="text-sm text-resort-600">{userInput}</p>
                <h3 className="text-sm font-medium text-resort-800 mt-3 mb-2">Recommended Content Types</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-ocean-50 text-ocean-700 text-xs font-medium py-1 px-2 rounded">Blog Posts</div>
                  <div className="bg-purple-50 text-purple-700 text-xs font-medium py-1 px-2 rounded">Social Media</div>
                  <div className="bg-amber-50 text-amber-700 text-xs font-medium py-1 px-2 rounded">Email</div>
                  <div className="bg-green-50 text-green-700 text-xs font-medium py-1 px-2 rounded">Video</div>
                </div>
              </div>
            ),
            timestamp: new Date()
          };
          setCurrentStep(4);
          break;
        case 4:
          aiResponse = "Based on historical data and your campaign parameters, here's a performance forecast. Would you like to finalize this campaign brief or make any adjustments?";
          newArtifact = {
            id: Date.now().toString(),
            type: 'calendar',
            title: 'Campaign Schedule',
            content: (
              <div className="p-4">
                <h3 className="text-sm font-medium text-resort-800 mb-2">Timeline</h3>
                <div className="flex items-center space-x-2 mb-3">
                  <CalendarDays className="h-4 w-4 text-resort-500" />
                  <p className="text-sm text-resort-600">{userInput}</p>
                </div>
                <h3 className="text-sm font-medium text-resort-800 mb-2">Estimated Performance</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-resort-600">Reach</span>
                    <span className="text-xs font-medium text-resort-800">25,000-30,000</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-ocean-500 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-resort-600">Engagement</span>
                    <span className="text-xs font-medium text-resort-800">3.5-4.2%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-resort-600">Conversion</span>
                    <span className="text-xs font-medium text-resort-800">1.8-2.5%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
              </div>
            ),
            timestamp: new Date()
          };
          setCurrentStep(5);
          break;
        case 5:
          aiResponse = "Great! I've finalized your campaign brief. You can now submit it for approval or make further edits. Would you like me to explain any part of the campaign in more detail?";
          newArtifact = {
            id: Date.now().toString(),
            type: 'strategy',
            title: 'Campaign Brief',
            content: (
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-sm font-medium text-resort-800">Campaign Summary</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                    Ready for Approval
                  </span>
                </div>
                <p className="text-sm text-resort-600 mb-3">This campaign targets specific audience segments with tailored messaging across multiple channels to achieve the primary objective.</p>
                <Button size="sm" className="w-full bg-ocean-600 hover:bg-ocean-700">
                  <CheckCircle2 className="mr-1.5 h-4 w-4" /> Submit for Approval
                </Button>
              </div>
            ),
            timestamp: new Date()
          };
          break;
        default:
          aiResponse = "Is there anything else I can help you with for your campaign?";
      }

      // Add AI response message
      const newAiMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAiMessage]);
      
      // Add new artifact if available
      if (newArtifact) {
        setArtifacts(prev => [...prev, newArtifact]);
      }
    }, 1000);
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Generate quick replies based on current step
  const getQuickReplies = () => {
    switch(currentStep) {
      case 1:
        return [
          "Increase brand awareness",
          "Generate leads",
          "Drive bookings",
          "Promote a new service"
        ];
      case 2:
        return [
          "Luxury travelers",
          "Families with children",
          "Business travelers",
          "Local residents"
        ];
      case 3:
        return [
          "Exclusive experiences",
          "Family-friendly activities",
          "Value and convenience",
          "Local culture and attractions"
        ];
      case 4:
        return [
          "Next month",
          "Q3 2023",
          "Holiday season",
          "Summer 2023"
        ];
      case 5:
        return [
          "Submit for approval",
          "Edit target audience",
          "Refine messaging",
          "Adjust timeline"
        ];
      default:
        return [];
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
          <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">Campaigns</h1>
          <p className="text-resort-500">Create and manage data-driven marketing campaigns</p>
        </div>
      </div>

      <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="chat">AI Campaign Planner</TabsTrigger>
          <TabsTrigger value="briefs">Campaign Briefs</TabsTrigger>
          <TabsTrigger value="active">Active Campaigns</TabsTrigger>
          <TabsTrigger value="repository">Campaign Repository</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="space-y-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-240px)]">
            {/* Chat Interface - Left Side */}
            <div className="lg:col-span-2 flex flex-col h-full">
              <Card className="flex-1 flex flex-col overflow-hidden">
                {/* Campaign Progress Indicator */}
                <div className="px-4 py-3 border-b border-gray-100 bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-resort-800">Campaign Progress</h3>
                    <span className="text-xs text-resort-500">Step {currentStep} of 5</span>
                  </div>
                  <div className="flex space-x-2">
                    {steps.map((step) => (
                      <div 
                        key={step.id} 
                        className={`flex-1 h-1.5 rounded-full ${
                          step.id < currentStep ? 'bg-ocean-500' : 
                          step.id === currentStep ? 'bg-ocean-200' : 'bg-gray-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Chat Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className="flex-shrink-0">
                            <Avatar className={`h-8 w-8 ${message.type === 'user' ? 'bg-ocean-100 text-ocean-600' : 'bg-purple-100 text-purple-600'}`}>
                              {message.type === 'user' ? 'U' : 'AI'}
                            </Avatar>
                          </div>
                          <div 
                            className={`mx-2 p-3 rounded-lg ${
                              message.type === 'user' 
                                ? 'bg-ocean-50 text-resort-800' 
                                : 'bg-white border border-gray-100 text-resort-800'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <span className="text-xs text-gray-400 mt-1 block">
                              {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                {/* Quick Replies */}
                <div className="px-4 py-2 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {getQuickReplies().map((reply, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => {
                          setUserInput(reply);
                          setTimeout(() => handleSendMessage(), 100);
                        }}
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Chat Input */}
                <div className="p-4 border-t border-gray-100">
                  <div className="flex space-x-2">
                    <Textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your message..."
                      className="min-h-[60px] flex-1 resize-none"
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      className="h-[60px] w-[60px] bg-ocean-600 hover:bg-ocean-700"
                    >
                      <SendHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Artifacts Panel - Right Side */}
            <div className="hidden lg:block lg:col-span-1">
              <Card className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-resort-800">Campaign Artifacts</h3>
                  <div className="flex items-center">
                    <span className="text-xs text-resort-500">{artifacts.length} items</span>
                  </div>
                </div>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {artifacts.length > 0 ? (
                      artifacts.map((artifact) => (
                        <Card key={artifact.id} className="overflow-hidden hover:shadow-sm transition-shadow">
                          <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
                            <div className="flex items-center">
                              {artifact.type === 'goal' && <Target className="h-4 w-4 text-blue-600 mr-2" />}
                              {artifact.type === 'strategy' && <BrainCircuit className="h-4 w-4 text-purple-600 mr-2" />}
                              {artifact.type === 'audience' && <MessageSquare className="h-4 w-4 text-green-600 mr-2" />}
                              {artifact.type === 'channels' && <FileText className="h-4 w-4 text-pink-600 mr-2" />}
                              {artifact.type === 'calendar' && <CalendarDays className="h-4 w-4 text-amber-600 mr-2" />}
                              <h4 className="text-xs font-medium text-resort-800">{artifact.title}</h4>
                            </div>
                          </div>
                          {artifact.content}
                        </Card>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="bg-gray-50 p-3 rounded-full mb-3">
                          <Sparkles className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="text-sm font-medium text-resort-800 mb-1">No artifacts yet</h3>
                        <p className="text-xs text-resort-500">Campaign artifacts will appear here as you chat with the AI assistant.</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                
                {artifacts.length > 0 && (
                  <div className="p-4 border-t border-gray-100">
                    <Button className="w-full bg-ocean-600 hover:bg-ocean-700">
                      <FileText className="mr-1.5 h-4 w-4" /> Export Campaign Brief
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="briefs">
          <Card className="p-6">
            <div className="space-y-1 mb-6">
              <h2 className="text-xl font-medium text-resort-800">Campaign Briefs</h2>
              <p className="text-sm text-resort-500">Generate, refine and manage approval status of your campaign briefs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: 1, title: 'Summer Promotion', status: 'Pending Approval', date: '2023-06-01', target: 'Families' },
                { id: 2, title: 'Korean Wellness Retreat', status: 'Draft', date: '2023-07-15', target: 'Korean Market' },
                { id: 3, title: 'Business Conference Package', status: 'Approved', date: '2023-05-10', target: 'Business Travelers' }
              ].map((brief) => (
                <Card key={brief.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-medium text-resort-800">{brief.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        brief.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        brief.status === 'Draft' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {brief.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-resort-600">{brief.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-resort-600">{brief.target}</span>
                      </div>
                    </div>
                    
                    <div className="flex mt-4 pt-3 border-t border-gray-100">
                      <Button variant="ghost" size="sm" className="text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50 mr-2">
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50">
                        Edit
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="active">
          <Card className="p-6">
            <div className="space-y-1 mb-6">
              <h2 className="text-xl font-medium text-resort-800">Active Campaigns Overview</h2>
              <p className="text-sm text-resort-500">Track status and performance of your active campaigns</p>
            </div>
            
            <div className="space-y-6">
              {[
                { 
                  id: 1, 
                  title: 'Summer Family Getaway', 
                  status: 'Active', 
                  progress: 75, 
                  startDate: '2023-06-01', 
                  endDate: '2023-08-31',
                  metrics: { impressions: '125K', engagement: '4.8%', conversions: '321' }
                },
                { 
                  id: 2, 
                  title: 'Korean Wellness Retreat', 
                  status: 'Active', 
                  progress: 40, 
                  startDate: '2023-07-15', 
                  endDate: '2023-10-15',
                  metrics: { impressions: '82K', engagement: '5.2%', conversions: '168' }
                }
              ].map((campaign) => (
                <Card key={campaign.id} className="p-5 border-l-4 border-green-500">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-resort-800">{campaign.title}</h3>
                      <div className="flex items-center text-sm text-resort-500 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {campaign.startDate} to {campaign.endDate}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800 mr-3">
                        {campaign.status}
                      </span>
                      <span className="text-sm font-medium text-resort-800">{campaign.progress}% Complete</span>
                    </div>
                  </div>
                  
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-4">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-md text-center">
                      <p className="text-xs text-resort-500 mb-1">Impressions</p>
                      <p className="text-sm font-medium text-resort-800">{campaign.metrics.impressions}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md text-center">
                      <p className="text-xs text-resort-500 mb-1">Engagement</p>
                      <p className="text-sm font-medium text-resort-800">{campaign.metrics.engagement}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md text-center">
                      <p className="text-xs text-resort-500 mb-1">Conversions</p>
                      <p className="text-sm font-medium text-resort-800">{campaign.metrics.conversions}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Calendar className="h-3 w-3 mr-1" /> View in Calendar
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <BarChart className="h-3 w-3 mr-1" /> Analytics Report
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <LayoutDashboard className="h-3 w-3 mr-1" /> Campaign Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="repository">
          <Card className="p-6">
            <div className="space-y-1 mb-6">
              <h2 className="text-xl font-medium text-resort-800">Campaign Repository</h2>
              <p className="text-sm text-resort-500">Browse and manage your saved campaign plans</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: 1, title: 'Summer Promotion 2022', status: 'Completed', date: '2022-06-01', target: 'Families', roi: '+12%' },
                { id: 2, title: 'Korean Wellness Launch', status: 'Completed', date: '2022-11-15', target: 'Korean Market', roi: '+28%' },
                { id: 3, title: 'Business Conference', status: 'Completed', date: '2023-01-10', target: 'Business Travelers', roi: '+8%' }
              ].map((campaign) => (
                <Card key={campaign.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-medium text-resort-800">{campaign.title}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                        {campaign.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-resort-600">{campaign.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-resort-600">{campaign.target}</span>
                      </div>
                      <div className="flex items-center">
                        <BarChart className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-green-600 font-medium">ROI: {campaign.roi}</span>
                      </div>
                    </div>
                    
                    <div className="flex mt-4 pt-3 border-t border-gray-100">
                      <Button variant="ghost" size="sm" className="text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50 mr-2">
                        View Report
                      </Button>
                      <Button variant="ghost" size="sm" className="text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50">
                        <Archive className="h-4 w-4 mr-1" /> Clone
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Campaigns;
