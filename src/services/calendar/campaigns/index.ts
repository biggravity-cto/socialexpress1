
export * from './campaignAPIService';
export * from './mockCampaignsData';

// Export the mock campaigns getter function
export const getMockCampaigns = () => {
  // Import the mock campaigns from the mockCampaignsData file
  const { mockCampaigns } = require('./mockCampaignsData');
  return mockCampaigns;
};
