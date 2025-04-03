
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SuggestedPromptsProps {
  prompts: string[];
  onPromptClick: (prompt: string) => void;
}

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ prompts, onPromptClick }) => {
  return (
    <div className="p-2 border-t border-b bg-gray-50">
      <ScrollArea className="w-full pb-1 horizontal-scroll custom-scrollbar">
        <div className="flex gap-2 min-w-full">
          {prompts.map((prompt, index) => (
            <Button 
              key={index} 
              variant="outline" 
              size="sm"
              className="whitespace-nowrap flex-shrink-0 bg-white border-blue-200 hover:bg-blue-50"
              onClick={() => onPromptClick(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SuggestedPrompts;
