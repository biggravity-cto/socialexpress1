
// This file is now a re-export of all calendar services for backward compatibility
// to ensure we don't break existing code that imports from this file

export {
  // Campaign operations
  fetchCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  getMockCampaigns,
  
  // Post operations
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  getMockPosts,
  
  // Approval operations
  requestApproval,
  approvePost,
  rejectPost,
  fetchApprovalRequests
} from './calendar';
