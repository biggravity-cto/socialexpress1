
export * from './postAPIService';
export * from './mockPostsData';

// Export the mock posts getter function
export const getMockPosts = () => {
  // Import the mock posts from the mockPostsData file
  const { mockPosts } = require('./mockPostsData');
  return mockPosts;
};
