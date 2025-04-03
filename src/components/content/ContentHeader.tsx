
import React from 'react';
import { motion } from 'framer-motion';

const ContentHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Content Studio</h1>
        <p className="text-muted-foreground">Create, manage, and publish your digital assets</p>
      </div>
    </div>
  );
};

export default ContentHeader;
