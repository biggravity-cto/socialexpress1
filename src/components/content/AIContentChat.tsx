
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageIcon, FileText, Video, MessageSquare, Sparkles, Send } from 'lucide-react';

const AIContentChat = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: 'Hello! I can help you create content. What would you like to generate today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const suggestedPrompts = {
    all: [
      "Generate a welcome post for our new hotel guests",
      "Create content about our weekend spa special",
      "Draft a post highlighting our restaurant's new menu",
      "Help me announce our seasonal promotion"
    ],
    text: [
      "Write a catchy caption for our pool area photo",
      "Create a compelling bio for our hotel's social media",
      "Draft a short post about our award-winning breakfast",
      "Write a welcoming message for hotel newsletter"
    ],
    image: [
      "Generate an image of a luxury hotel suite with ocean view",
      "Create a visual for our summer cocktail promotion",
      "Design a graphic for our weekend getaway package",
      "Make an image for our spa services announcement"
    ],
    video: [
      "Script a 30-second video tour of our luxury suites",
      "Create a storyboard for our hotel facilities showcase",
      "Draft a short script for our restaurant promo video",
      "Help me plan a video about our concierge services"
    ]
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const newUserMessage = { role: 'user' as const, content: inputText };
    setMessages([...messages, newUserMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const responseMessage = { 
        role: 'assistant' as const, 
        content: `I'll help you with "${inputText}". Here's my suggestion for your content...` 
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
    
    setInputText('');
  };

  const handlePromptClick = (prompt: string) => {
    setInputText(prompt);
  };

  return (
    <Card className="mb-6 border-blue-100 shadow-sm">
      <CardContent className="p-0">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between border-b p-3">
            <h3 className="text-lg font-medium flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-blue-500" />
              AI Content Assistant
            </h3>
            <TabsList>
              <TabsTrigger value="all" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">All</span>
              </TabsTrigger>
              <TabsTrigger value="text" className="flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Text</span>
              </TabsTrigger>
              <TabsTrigger value="image" className="flex items-center">
                <ImageIcon className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Image</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center">
                <Video className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Video</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="m-0">
            <div className="flex flex-col h-[300px]">
              <ScrollArea className="flex-1 p-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`mb-3 p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-blue-50 ml-12 rounded-tr-none' 
                        : 'bg-gray-50 mr-12 rounded-tl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
              </ScrollArea>
              
              <div className="p-2 flex overflow-x-auto gap-2 border-t border-b bg-gray-50">
                {suggestedPrompts[activeTab as keyof typeof suggestedPrompts].map((prompt, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm"
                    className="whitespace-nowrap flex-shrink-0 bg-white border-blue-200 hover:bg-blue-50"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
              
              <div className="p-3 flex gap-2">
                <Textarea 
                  placeholder="Describe the content you want to create..."
                  className="resize-none"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  className="rounded-full h-full w-12 p-0 flex-shrink-0"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="text" className="m-0">
            <div className="flex flex-col h-[300px]">
              <ScrollArea className="flex-1 p-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`mb-3 p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-blue-50 ml-12 rounded-tr-none' 
                        : 'bg-gray-50 mr-12 rounded-tl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
              </ScrollArea>
              
              <div className="p-2 flex overflow-x-auto gap-2 border-t border-b bg-gray-50">
                {suggestedPrompts.text.map((prompt, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm"
                    className="whitespace-nowrap flex-shrink-0 bg-white border-blue-200 hover:bg-blue-50"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
              
              <div className="p-3 flex gap-2">
                <Textarea 
                  placeholder="Describe the text content you want to create..."
                  className="resize-none"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  className="rounded-full h-full w-12 p-0 flex-shrink-0"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="image" className="m-0">
            <div className="flex flex-col h-[300px]">
              <ScrollArea className="flex-1 p-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`mb-3 p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-blue-50 ml-12 rounded-tr-none' 
                        : 'bg-gray-50 mr-12 rounded-tl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
              </ScrollArea>
              
              <div className="p-2 flex overflow-x-auto gap-2 border-t border-b bg-gray-50">
                {suggestedPrompts.image.map((prompt, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm"
                    className="whitespace-nowrap flex-shrink-0 bg-white border-blue-200 hover:bg-blue-50"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
              
              <div className="p-3 flex gap-2">
                <Textarea 
                  placeholder="Describe the image you want to create..."
                  className="resize-none"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  className="rounded-full h-full w-12 p-0 flex-shrink-0"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="video" className="m-0">
            <div className="flex flex-col h-[300px]">
              <ScrollArea className="flex-1 p-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`mb-3 p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-blue-50 ml-12 rounded-tr-none' 
                        : 'bg-gray-50 mr-12 rounded-tl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
              </ScrollArea>
              
              <div className="p-2 flex overflow-x-auto gap-2 border-t border-b bg-gray-50">
                {suggestedPrompts.video.map((prompt, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm"
                    className="whitespace-nowrap flex-shrink-0 bg-white border-blue-200 hover:bg-blue-50"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
              
              <div className="p-3 flex gap-2">
                <Textarea 
                  placeholder="Describe the video content you want to create..."
                  className="resize-none"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  className="rounded-full h-full w-12 p-0 flex-shrink-0"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIContentChat;
