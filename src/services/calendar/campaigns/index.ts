
export * from './campaignAPIService';
export * from './mockCampaignsData';

// Export the mock campaigns getter function without using require
import { mockCampaigns } from './mockCampaignsData';
export const getMockCampaigns = () => mockCampaigns;
