
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  related_entity_type?: string;
  related_entity_id?: string;
  created_at: string;
}

export const fetchNotifications = async (userId: string): Promise<Notification[]> => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    // Cast the data to ensure it matches the Notification type
    return (data || []).map(item => ({
      ...item,
      type: item.type as 'info' | 'success' | 'warning' | 'error'
    }));
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

export const markNotificationAsRead = async (notificationId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }
};

export const markAllNotificationsAsRead = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return false;
  }
};

export const deleteNotification = async (notificationId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting notification:', error);
    return false;
  }
};

export const createNotification = async (notification: Omit<Notification, 'id' | 'created_at'>): Promise<Notification | null> => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert([notification])
      .select()
      .single();
    
    if (error) throw error;
    // Cast the response to ensure it matches the Notification type
    return data ? {
      ...data,
      type: data.type as 'info' | 'success' | 'warning' | 'error'
    } : null;
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
};

export const useNotifications = (userId: string | undefined) => {
  const { toast } = useToast();
  
  const subscribeToNotifications = (callback: (notification: Notification) => void) => {
    if (!userId) return () => {};
    
    const channel = supabase
      .channel('public:notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const newNotification = {
            ...payload.new,
            type: payload.new.type as 'info' | 'success' | 'warning' | 'error'
          } as Notification;
          
          callback(newNotification);
          
          toast({
            title: newNotification.title,
            description: newNotification.message,
            variant: newNotification.type === 'error' ? 'destructive' : 'default',
          });
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  };
  
  return { subscribeToNotifications };
};
