
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface ChatInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  handleSendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  inputText, 
  setInputText, 
  handleSendMessage 
}) => {
  return (
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
  );
};

export default ChatInput;
