
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  BrainCircuit, 
  MessageSquare, 
  Send, 
  X,
  MinusCircle,
  Maximize2,
  ChartBar,
  LineChart
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const suggestedPrompts = [
  "Analyze our brand sentiment on social media",
  "Compare our resort to similar competitors",
  "What demographic is engaging with our content?",
  "Identify potential influencer partnerships",
  "How is our wellness focus performing vs luxury?"
];

const AIBrandAgent = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m your AI Brand Intelligence Assistant. How can I help you analyze your brand today?' 
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
      
      if (inputText.includes('sentiment') || inputText.includes('social media')) {
        responseContent = `Your brand sentiment analysis shows 72% positive, 18% neutral, and 10% negative mentions across platforms. This is a 5% improvement in positive sentiment from last month.`;
      } else if (inputText.includes('competitor') || inputText.includes('compare')) {
        responseContent = `Compared to your top 3 competitors, your resort has 15% higher social engagement but 7% lower sentiment scores. Your "Korean beauty treatments" content is outperforming competitors by 23%.`;
      } else if (inputText.includes('demographic') || inputText.includes('audience')) {
        responseContent = `Your content is primarily engaging females (68%) ages 28-45 with high disposable income. Recent wellness posts are attracting a younger audience (25-32) interested in luxury experiences.`;
      } else if (inputText.includes('influencer') || inputText.includes('partnership')) {
        responseContent = `Based on your brand values and audience, I recommend exploring partnerships with Min-ji Kim (850K followers) and Sarah Johnson (620K followers) who specialize in wellness and spa content.`;
      } else if (inputText.includes('wellness') || inputText.includes('luxury')) {
        responseContent = `Your wellness content is generating 42% higher engagement than luxury-focused content. Consider integrating more wellness elements into your luxury messaging for optimal performance.`;
      } else {
        responseContent = `I'll analyze "${inputText}" for you. Based on your recent brand data, I can provide insights on this topic once I've processed more information.`;
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
    if (!isChatOpen) {
      setIsMinimized(false);
    }
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <Card className="mb-6 border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50 shadow-sm overflow-hidden transition-all duration-300">
      <div className="p-4 flex items-start gap-3">
        <div className="bg-purple-100 p-2 rounded-full">
          <BrainCircuit className="h-5 w-5 text-purple-600" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-purple-800">AI Brand Intelligence</h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                <LineChart className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Connect Analytics</span>
                <span className="sm:hidden">Connect</span>
              </Button>
              {isChatOpen && !isMinimized && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMinimize}
                  className="text-purple-700 hover:bg-purple-100"
                >
                  <MinusCircle className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Minimize</span>
                </Button>
              )}
              {isChatOpen && isMinimized && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMinimize}
                  className="text-purple-700 hover:bg-purple-100"
                >
                  <Maximize2 className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Expand</span>
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleChat}
                className="text-purple-700 hover:bg-purple-100"
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
            <p className="text-sm text-purple-700 mt-1">
              Ask me to analyze brand sentiment, identify trends, or compare against competitors.
            </p>
          ) : !isMinimized ? (
            <div className="mt-3 bg-white rounded-lg border border-purple-100 shadow-sm">
              <ScrollArea className="h-[250px] p-3">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`mb-3 p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-purple-50 ml-12 rounded-tr-none' 
                        : 'bg-gray-50 mr-12 rounded-tl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
              </ScrollArea>
              
              <div className="p-2 border-t border-b bg-gray-50">
                <ScrollArea className="w-full pb-1">
                  <div className="flex gap-2 min-w-full">
                    {suggestedPrompts.map((prompt, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        size="sm"
                        className="whitespace-nowrap flex-shrink-0 bg-white border-purple-200 hover:bg-purple-50"
                        onClick={() => handlePromptClick(prompt)}
                      >
                        {prompt}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="p-3 flex gap-2">
                <Input 
                  placeholder="Ask about your brand performance..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="border-purple-200"
                />
                <Button 
                  className="rounded-full h-10 w-10 p-0 flex-shrink-0 bg-purple-600 hover:bg-purple-700"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-purple-700 italic mt-1">
              Chat minimized. Click "Expand" to see your conversation.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AIBrandAgent;
