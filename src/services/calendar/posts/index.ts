
export * from './postAPIService';
export * from './mockPostsData';

// Export the mock posts getter function without using require
import { mockPosts } from './mockPostsData';
export const getMockPosts = () => mockPosts;
