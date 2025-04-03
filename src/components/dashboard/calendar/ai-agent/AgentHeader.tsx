
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  CalendarIcon, 
  MessageSquare, 
  X,
  MinusCircle,
  Maximize2
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface AgentHeaderProps {
  isChatOpen: boolean;
  isMinimized: boolean;
  toggleChat: () => void;
  toggleMinimize: () => void;
}

const AgentHeader: React.FC<AgentHeaderProps> = ({
  isChatOpen,
  isMinimized,
  toggleChat,
  toggleMinimize
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex items-center justify-between mb-1">
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
        {isChatOpen && !isMinimized && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMinimize}
            className="text-blue-700 hover:bg-blue-100"
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
            className="text-blue-700 hover:bg-blue-100"
          >
            <Maximize2 className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Expand</span>
          </Button>
        )}
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
  );
};

export default AgentHeader;
