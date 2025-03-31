
import { supabase } from './supabaseClient';

// Approvals
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

export const approvePost = async (approvalId: string, feedback?: string): Promise<boolean> => {
  try {
    const { user } = (await supabase.auth.getSession()).data.session || {};
    if (!user) throw new Error('Not authenticated');
    
    // Get the post ID from the approval
    const { data: approval, error: approvalError } = await supabase
      .from('approvals')
      .select('post_id')
      .eq('id', approvalId)
      .single();
    
    if (approvalError) throw approvalError;
    
    // Update approval status
    const { error: updateError } = await supabase
      .from('approvals')
      .update({
        status: 'approved',
        approved_by: user.id,
        feedback
      })
      .eq('id', approvalId);
    
    if (updateError) throw updateError;
    
    // Update post status
    await supabase
      .from('posts')
      .update({ status: 'scheduled' })
      .eq('id', approval.post_id);
    
    return true;
  } catch (error) {
    console.error('Error approving post:', error);
    return false;
  }
};

export const rejectPost = async (approvalId: string, feedback: string): Promise<boolean> => {
  try {
    const { user } = (await supabase.auth.getSession()).data.session || {};
    if (!user) throw new Error('Not authenticated');
    
    // Get the post ID from the approval
    const { data: approval, error: approvalError } = await supabase
      .from('approvals')
      .select('post_id')
      .eq('id', approvalId)
      .single();
    
    if (approvalError) throw approvalError;
    
    // Update approval status
    const { error: updateError } = await supabase
      .from('approvals')
      .update({
        status: 'rejected',
        approved_by: user.id,
        feedback
      })
      .eq('id', approvalId);
    
    if (updateError) throw updateError;
    
    // Update post status
    await supabase
      .from('posts')
      .update({ status: 'draft' })
      .eq('id', approval.post_id);
    
    return true;
  } catch (error) {
    console.error('Error rejecting post:', error);
    return false;
  }
};

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
