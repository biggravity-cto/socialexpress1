
import React, { useState } from 'react';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatDistanceToNow } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotificationSubscription } from '@/hooks/useNotificationSubscription';
import { deleteNotification, markAllNotificationsAsRead } from '@/services/notificationService';
import { useAuth } from '@/contexts/AuthContext';

const NotificationButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { 
    notifications, 
    unreadCount, 
    handleMarkAsRead,
    refreshNotifications 
  } = useNotificationSubscription();

  const handleMarkAllAsRead = async () => {
    if (!user) return;
    
    await markAllNotificationsAsRead(user.id);
    refreshNotifications();
  };

  const handleDelete = async (id: string) => {
    await deleteNotification(id);
    refreshNotifications();
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative mr-2">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white">{unreadCount}</Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-medium text-resort-800">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead} className="h-8 text-xs">
              <CheckCheck className="h-3.5 w-3.5 mr-1" />
              Mark all as read
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-3 ${!notification.is_read ? 'bg-gray-50' : ''} hover:bg-gray-50 transition-colors`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-xs px-1.5 py-0.5 rounded ${getTypeStyles(notification.type)}`}>
                      {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                    </span>
                    <div className="flex items-center">
                      {!notification.is_read && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="h-6 w-6 p-0"
                        >
                          <CheckCheck className="h-3.5 w-3.5" />
                          <span className="sr-only">Mark as read</span>
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(notification.id)}
                        className="h-6 w-6 p-0 ml-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-resort-800 mb-1">{notification.title}</h4>
                  <p className="text-xs text-resort-600 mb-1">{notification.message}</p>
                  <p className="text-xs text-resort-400">
                    {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationButton;
