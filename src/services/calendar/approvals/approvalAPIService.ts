
import { supabase } from '../supabaseClient';

// Request approval for a post
export const requestApproval = async (postId: string): Promise<boolean> => {
  try {
    const { user } = (await supabase.auth.getSession()).data.session || {};
    if (!user) throw new Error('Not authenticated');
    
    // Update post status to pending_approval
    await supabase
      .from('posts')
      .update({ status: 'pending_approval' })
      .eq('id', postId);
    
    // Create approval request
    const { error } = await supabase
      .from('approvals')
      .insert([{
        post_id: postId,
        requested_by: user.id,
        status: 'pending'
      }]);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error requesting approval:', error);
    return false;
  }
};

// Fetch all approval requests
export const fetchApprovalRequests = async (): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('approvals')
      .select(`
        *,
        posts (*),
        requested_by:profiles!approvals_requested_by_fkey (first_name, last_name),
        approved_by:profiles!approvals_approved_by_fkey (first_name, last_name)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching approval requests:', error);
    return [];
  }
};
