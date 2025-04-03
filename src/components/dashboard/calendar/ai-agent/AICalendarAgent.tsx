
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import AgentHeader from './AgentHeader';
import ChatContainer from './ChatContainer';

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
  const [isMinimized, setIsMinimized] = useState(false);
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

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setIsMinimized(false);
    }
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <Card className="mb-6 border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm overflow-hidden transition-all duration-300">
      <div className="p-4 flex items-start gap-3">
        <div className="bg-blue-100 p-2 rounded-full">
          <BrainCircuit className="h-5 w-5 text-blue-600" />
        </div>
        
        <div className="flex-1">
          <AgentHeader 
            isChatOpen={isChatOpen}
            isMinimized={isMinimized}
            toggleChat={toggleChat}
            toggleMinimize={toggleMinimize}
          />
          
          {!isChatOpen ? (
            <p className="text-sm text-blue-700 mt-1">
              Ask me to schedule posts, analyze your calendar, or suggest optimal posting times.
            </p>
          ) : !isMinimized ? (
            <ChatContainer 
              messages={messages}
              inputText={inputText}
              setInputText={setInputText}
              handleSendMessage={handleSendMessage}
              suggestedPrompts={suggestedPrompts}
            />
          ) : (
            <p className="text-sm text-blue-700 italic mt-1">
              Chat minimized. Click "Expand" to see your conversation.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AICalendarAgent;
