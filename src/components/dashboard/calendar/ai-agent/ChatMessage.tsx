
import React from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div 
      className={`mb-3 p-3 rounded-lg ${
        message.role === 'user' 
          ? 'bg-blue-50 ml-12 rounded-tr-none' 
          : 'bg-gray-50 mr-12 rounded-tl-none'
      }`}
    >
      {message.content}
    </div>
  );
};

export default ChatMessage;
