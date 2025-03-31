
import React from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@/components/ui/dialog';
import ContentHeader from '@/components/content/ContentHeader';
import ContentSearch from '@/components/content/ContentSearch';
import ContentTabs from '@/components/content/ContentTabs';
import ContentCreationDialog from '@/components/content/ContentCreationDialog';
import AIGeneratorDialog from '@/components/content/AIGeneratorDialog';
import ContentState from '@/components/content/ContentState';
import ContentActions from '@/components/content/ContentActions';
import { useContentManagement } from '@/hooks/useContentManagement';

const Content = () => {
  const {
    contentItems,
    setContentItems,
    filteredItems,
    loading,
    selectedItems,
    setSelectedItems,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    showAIGenerator,
    setShowAIGenerator,
    showCreateContentDialog,
    setShowCreateContentDialog,
    contentType,
    setContentType,
    toggleItemSelection,
    handleSelectAll,
    handleBulkDelete,
    handleCreateContent,
    toast
  } = useContentManagement();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header Section */}
      <ContentHeader 
        setContentType={setContentType}
        setShowCreateContentDialog={setShowCreateContentDialog}
        setShowAIGenerator={setShowAIGenerator}
        showAIGenerator={showAIGenerator}
      />

      {/* Search and Filter Bar */}
      <ContentSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortBy={sortBy}
        setSortBy={setSortBy}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        handleBulkDelete={handleBulkDelete}
        filteredItems={filteredItems}
      >
        <ContentActions 
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          handleBulkDelete={handleBulkDelete}
        />
      </ContentSearch>

      {/* Content Status: Loading or Empty state */}
      <ContentState
        loading={loading}
        filteredItems={filteredItems}
        searchQuery={searchQuery}
        setContentType={setContentType}
        setShowCreateContentDialog={setShowCreateContentDialog}
      />

      {/* Content Tabs */}
      {!loading && filteredItems.length > 0 && (
        <ContentTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          contentItems={contentItems}
          filteredItems={filteredItems}
          loading={loading}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          viewMode={viewMode}
          handleSelectAll={handleSelectAll}
          searchQuery={searchQuery}
          toggleItemSelection={toggleItemSelection}
          setContentType={setContentType}
          setShowCreateContentDialog={setShowCreateContentDialog}
          setContentItems={setContentItems}
          toast={toast}
        />
      )}
      
      {/* Create Content Dialog */}
      <ContentCreationDialog 
        contentType={contentType}
        showCreateContentDialog={showCreateContentDialog}
        setShowCreateContentDialog={setShowCreateContentDialog}
        handleCreateContent={handleCreateContent}
      />

      {/* AI Generator Dialog */}
      <Dialog open={showAIGenerator} onOpenChange={setShowAIGenerator}>
        <AIGeneratorDialog />
      </Dialog>
    </motion.div>
  );
};

export default Content;
