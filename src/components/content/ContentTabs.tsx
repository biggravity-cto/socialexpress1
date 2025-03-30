
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, FolderTree } from 'lucide-react';
import ContentGridItem from './ContentGridItem';
import ContentListItem from './ContentListItem';
import { ContentItem } from '@/types/content';

interface ContentTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  contentItems: ContentItem[];
  filteredItems: ContentItem[];
  loading: boolean;
  selectedItems: number[];
  setSelectedItems: (items: number[]) => void;
  viewMode: 'grid' | 'list';
  handleSelectAll: () => void;
  searchQuery: string;
  toggleItemSelection: (id: number) => void;
  setContentType: (type: 'post' | 'image' | 'video' | 'document') => void;
  setShowCreateContentDialog: (show: boolean) => void;
  setContentItems: React.Dispatch<React.SetStateAction<ContentItem[]>>;
  toast: any;
}

const ContentTabs: React.FC<ContentTabsProps> = ({
  activeTab,
  setActiveTab,
  contentItems,
  filteredItems,
  loading,
  selectedItems,
  setSelectedItems,
  viewMode,
  handleSelectAll,
  searchQuery,
  toggleItemSelection,
  setContentType,
  setShowCreateContentDialog,
  setContentItems,
  toast
}) => {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="all" className="relative">
            All
            {contentItems.length > 0 && (
              <Badge variant="secondary" className="ml-2">{contentItems.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="image" className="relative">
            Images
            {contentItems.filter(i => i.type === 'image').length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {contentItems.filter(i => i.type === 'image').length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="video" className="relative">
            Videos
            {contentItems.filter(i => i.type === 'video').length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {contentItems.filter(i => i.type === 'video').length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="post" className="relative">
            Posts
            {contentItems.filter(i => i.type === 'post').length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {contentItems.filter(i => i.type === 'post').length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="document" className="relative">
            Documents
            {contentItems.filter(i => i.type === 'document').length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {contentItems.filter(i => i.type === 'document').length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleSelectAll}
          className="hidden sm:flex"
        >
          {selectedItems.length === filteredItems.length && filteredItems.length > 0 
            ? "Deselect All" 
            : "Select All"}
        </Button>
      </div>

      <TabsContent value="all" className="mt-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 animate-spin text-primary" />
              <span>Loading content...</span>
            </div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <FolderTree className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No content found</h3>
            <p className="text-muted-foreground mt-1 mb-4">
              {searchQuery ? `No results for "${searchQuery}"` : "Your content library is empty"}
            </p>
            <Button onClick={() => setShowCreateContentDialog(true)}>Create Content</Button>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' 
            : 'space-y-3'
          }>
            {filteredItems.map((item) => (
              viewMode === 'grid' ? (
                <ContentGridItem 
                  key={item.id}
                  item={item}
                  selectedItems={selectedItems}
                  toggleItemSelection={toggleItemSelection}
                  setContentItems={setContentItems}
                  toast={toast}
                />
              ) : (
                <ContentListItem 
                  key={item.id}
                  item={item}
                  selectedItems={selectedItems}
                  toggleItemSelection={toggleItemSelection}
                  setContentItems={setContentItems}
                  toast={toast}
                />
              )
            ))}
          </div>
        )}
      </TabsContent>
      
      {/* Similar setup for other tabs */}
      {['image', 'video', 'post', 'document'].map(tabValue => (
        <TabsContent key={tabValue} value={tabValue} className="mt-4">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <FolderTree className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No {tabValue}s found</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                {searchQuery ? `No results for "${searchQuery}"` : `You don't have any ${tabValue}s yet`}
              </p>
              <Button onClick={() => {
                setContentType(tabValue as any);
                setShowCreateContentDialog(true);
              }}>
                Create {tabValue.charAt(0).toUpperCase() + tabValue.slice(1)}
              </Button>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' 
              : 'space-y-3'
            }>
              {/* Content is rendered by the filtered items, which are already filtered by tab */}
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ContentTabs;
