
import { supabase } from '@/integrations/supabase/client';

interface NotificationData {
  user_id: string;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  related_entity_type?: string;
  related_entity_id?: string;
}

export const createNotification = async (data: NotificationData): Promise<boolean> => {
  try {
    const { error } = await supabase.functions.invoke('notifications', {
      body: data
    });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error creating notification:', error);
    return false;
  }
};

// Helper functions for common notifications
export const notifyApprovalRequested = async (userId: string, postTitle: string, postId: string): Promise<boolean> => {
  return createNotification({
    user_id: userId,
    title: 'Approval Requested',
    message: `A new post "${postTitle}" requires your approval.`,
    type: 'info',
    related_entity_type: 'post',
    related_entity_id: postId
  });
};

export const notifyApprovalComplete = async (userId: string, postTitle: string, postId: string, approved: boolean): Promise<boolean> => {
  return createNotification({
    user_id: userId,
    title: approved ? 'Post Approved' : 'Post Rejected',
    message: `Your post "${postTitle}" has been ${approved ? 'approved' : 'rejected'}.`,
    type: approved ? 'success' : 'warning',
    related_entity_type: 'post',
    related_entity_id: postId
  });
};

export const notifyTeamInvite = async (userId: string, teamName: string, teamId: string): Promise<boolean> => {
  return createNotification({
    user_id: userId,
    title: 'Team Invitation',
    message: `You have been invited to join the team "${teamName}".`,
    type: 'info',
    related_entity_type: 'team',
    related_entity_id: teamId
  });
};

export const notifyPostScheduled = async (userId: string, postTitle: string, postId: string, scheduledDate: string): Promise<boolean> => {
  return createNotification({
    user_id: userId,
    title: 'Post Scheduled',
    message: `Your post "${postTitle}" has been scheduled for ${scheduledDate}.`,
    type: 'success',
    related_entity_type: 'post',
    related_entity_id: postId
  });
};

export const notifyPostPublished = async (userId: string, postTitle: string, postId: string): Promise<boolean> => {
  return createNotification({
    user_id: userId,
    title: 'Post Published',
    message: `Your post "${postTitle}" has been published successfully.`,
    type: 'success',
    related_entity_type: 'post',
    related_entity_id: postId
  });
};

export const notifyError = async (userId: string, title: string, message: string): Promise<boolean> => {
  return createNotification({
    user_id: userId,
    title,
    message,
    type: 'error'
  });
};
