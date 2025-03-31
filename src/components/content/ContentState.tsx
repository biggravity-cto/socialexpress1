
import React from 'react';
import { ContentItem } from '@/types/content';
import ContentEmpty from './ContentEmpty';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import ContentListItem from './ContentListItem';
import ContentGridItem from './ContentGridItem';

interface ContentStateProps {
  loading: boolean;
  filteredItems: ContentItem[];
  searchQuery: string;
  viewMode?: 'grid' | 'list';
  setContentType: (type: 'post' | 'image' | 'video' | 'document') => void;
  setShowCreateContentDialog: (show: boolean) => void;
}

const ContentState: React.FC<ContentStateProps> = ({
  loading,
  filteredItems,
  searchQuery,
  viewMode = 'grid',
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

  if (viewMode === 'list') {
    return (
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <ContentListItem key={item.id} item={item} />
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredItems.map((item) => (
        <ContentGridItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ContentState;
