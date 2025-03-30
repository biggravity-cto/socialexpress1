
import React from 'react';
import NotificationButton from './NotificationButton';

interface DesktopHeaderProps {
  title: string;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({ title }) => {
  return (
    <div className="hidden md:flex items-center h-14 px-4 border-b border-gray-100 justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-resort-800 capitalize">
          {title}
        </h1>
      </div>
      
      {/* Notification Bell */}
      <NotificationButton />
    </div>
  );
};

export default DesktopHeader;
