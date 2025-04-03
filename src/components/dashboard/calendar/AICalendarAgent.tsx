
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  BrainCircuit, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  Send, 
  X,
  AlignLeft,
  ExternalLink
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const suggestedPrompts = [
  "Schedule a team meeting next Tuesday at 2pm",
  "What's my busiest day this week?",
  "Move my Instagram post to tomorrow morning",
  "When is the best time to post on LinkedIn?",
  "Show me all campaign deadlines this month"
];

const AICalendarAgent = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m your AI Calendar Agent. How can I assist with your marketing calendar today?' 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const newUserMessage: Message = { role: 'user', content: inputText };
    setMessages([...messages, newUserMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      let responseContent = '';
      
      if (inputText.includes('schedule') || inputText.includes('meeting')) {
        responseContent = `I've added that to your calendar. Would you like me to send invitations to your team members?`;
      } else if (inputText.includes('busiest')) {
        responseContent = `Based on your current schedule, Thursday seems to be your busiest day with 5 posts scheduled and 2 meetings.`;
      } else if (inputText.includes('move') || inputText.includes('reschedule')) {
        responseContent = `I've rescheduled your post to tomorrow morning at 9:00 AM. This time has historically shown good engagement for your audience.`;
      } else if (inputText.includes('best time') || inputText.includes('when')) {
        responseContent = `For your audience on LinkedIn, data shows that Tuesday and Wednesday between 8-10 AM and 4-6 PM show the highest engagement rates.`;
      } else if (inputText.includes('campaign') || inputText.includes('deadline')) {
        responseContent = `You have 3 campaign deadlines this month: "Summer Sale" on the 15th, "Product Launch" on the 22nd, and "Back to School" on the 30th.`;
      } else {
        responseContent = `I understand you want to know about "${inputText}". Let me analyze your calendar data and get back to you with insights.`;
      }
      
      const responseMessage: Message = { role: 'assistant', content: responseContent };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
    
    setInputText('');
  };

  const handlePromptClick = (prompt: string) => {
    setInputText(prompt);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <Card className="mb-6 border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm overflow-hidden transition-all duration-300">
      <div className="p-4 flex items-start gap-3">
        <div className="bg-blue-100 p-2 rounded-full">
          <BrainCircuit className="h-5 w-5 text-blue-600" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-blue-800">AI Calendar Agent</h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Connect Google Calendar</span>
                <span className="sm:hidden">Connect</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleChat}
                className="text-blue-700 hover:bg-blue-100"
              >
                {isChatOpen ? (
                  <>
                    <X className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Close Chat</span>
                    <span className="sm:hidden">Close</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Open Chat</span>
                    <span className="sm:hidden">Chat</span>
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {!isChatOpen ? (
            <p className="text-sm text-blue-700 mt-1">
              Ask me to schedule posts, analyze your calendar, or suggest optimal posting times.
            </p>
          ) : (
            <div className="mt-3 bg-white rounded-lg border border-blue-100 shadow-sm">
              <ScrollArea className="h-[250px] p-3">
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
                {suggestedPrompts.map((prompt, index) => (
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
                <Input 
                  placeholder="Ask about your calendar or schedule..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="border-blue-200"
                />
                <Button 
                  className="rounded-full h-10 w-10 p-0 flex-shrink-0 bg-blue-600 hover:bg-blue-700"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AICalendarAgent;
