
import React from 'react';
import { motion } from 'framer-motion';
import PostCreator from '@/components/dashboard/PostCreator';

const Posts = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">Create Post</h1>
        <p className="text-resort-500">Draft and schedule your social media content</p>
      </div>
      
      <PostCreator />
    </motion.div>
  );
};

export default Posts;
