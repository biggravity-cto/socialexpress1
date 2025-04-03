
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { MessageSquare, Settings, Bot } from 'lucide-react';

const Messages = () => {
  const [aiAgentEnabled, setAiAgentEnabled] = useState(false);

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Unified Social Inbox</h1>
        <p className="text-muted-foreground">Manage all your social media messages in one place</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Messages</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="flagged">Flagged</TabsTrigger>
              <TabsTrigger value="ai-handled">AI Handled</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No messages yet</h3>
                    <p className="text-muted-foreground mb-4">Connect your social media accounts to start managing messages</p>
                    <Button>Connect Accounts</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="unread" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No unread messages</h3>
                    <p className="text-muted-foreground mb-4">All messages have been read</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="flagged" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No flagged messages</h3>
                    <p className="text-muted-foreground mb-4">Flag important messages for follow-up</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ai-handled" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <Bot className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No AI-handled messages</h3>
                    <p className="text-muted-foreground mb-4">Enable the AI Agent to automatically handle routine messages</p>
                    <Button onClick={() => setAiAgentEnabled(true)}>Configure AI Agent</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                AI Agent
              </CardTitle>
              <CardDescription>Configure your AI to handle routine messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="ai-agent" 
                    checked={aiAgentEnabled}
                    onCheckedChange={setAiAgentEnabled}
                  />
                  <Label htmlFor="ai-agent">Enable AI Agent</Label>
                </div>
                
                {aiAgentEnabled && (
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="ai-personality">AI Personality</Label>
                      <select 
                        id="ai-personality" 
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="friendly">Friendly and Helpful</option>
                        <option value="professional">Professional</option>
                        <option value="casual">Casual and Conversational</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="response-time">Response Time</Label>
                      <select 
                        id="response-time" 
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="immediate">Immediate</option>
                        <option value="1min">Within 1 minute</option>
                        <option value="5min">Within 5 minutes</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="escalation-rules">Escalation Rules</Label>
                      <textarea 
                        id="escalation-rules" 
                        placeholder="Define when AI should escalate to human team members..."
                        className="w-full p-2 border border-gray-300 rounded-md h-24"
                      />
                    </div>
                    
                    <Button className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Advanced Configuration
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Social media accounts linked to your inbox</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-muted-foreground mb-4">No accounts connected yet</p>
                <Button variant="outline" className="w-full">Connect Accounts</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
