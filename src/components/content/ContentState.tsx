
import React from 'react';
import { ContentItem } from '@/types/content';
import ContentEmpty from './ContentEmpty';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface ContentStateProps {
  loading: boolean;
  filteredItems: ContentItem[];
  searchQuery: string;
  setContentType: (type: 'post' | 'image' | 'video' | 'document') => void;
  setShowCreateContentDialog: (show: boolean) => void;
}

const ContentState: React.FC<ContentStateProps> = ({
  loading,
  filteredItems,
  searchQuery,
  setContentType,
  setShowCreateContentDialog
}) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <ContentEmpty 
        searchQuery={searchQuery}
        setContentType={setContentType}
        setShowCreateContentDialog={setShowCreateContentDialog}
      />
    );
  }

  return null;
};

export default ContentState;
