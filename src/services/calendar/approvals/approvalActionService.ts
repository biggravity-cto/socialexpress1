
import { supabase } from '../supabaseClient';

// Approve a post approval request
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

// Reject a post approval request
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
