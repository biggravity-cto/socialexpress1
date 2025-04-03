
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './ChatMessage';
import SuggestedPrompts from './SuggestedPrompts';
import ChatInput from './ChatInput';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatContainerProps {
  messages: Message[];
  inputText: string;
  setInputText: (text: string) => void;
  handleSendMessage: () => void;
  suggestedPrompts: string[];
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  inputText,
  setInputText,
  handleSendMessage,
  suggestedPrompts
}) => {
  return (
    <div className="mt-3 bg-white rounded-lg border border-blue-100 shadow-sm">
      <ScrollArea className="h-[250px] p-3">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </ScrollArea>
      
      <SuggestedPrompts 
        prompts={suggestedPrompts}
        onPromptClick={(prompt) => setInputText(prompt)}
      />
      
      <ChatInput 
        inputText={inputText} 
        setInputText={setInputText} 
        handleSendMessage={handleSendMessage} 
      />
    </div>
  );
};

export default ChatContainer;
