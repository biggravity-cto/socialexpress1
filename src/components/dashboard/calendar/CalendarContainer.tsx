
import React from 'react';
import { Card } from '@/components/ui/card';
import { Campaign, Post } from '@/types/calendar';
import { CalendarView } from '@/components/dashboard/calendar/CalendarView';
import { CalendarHeader } from '@/components/dashboard/calendar/CalendarHeader';
import { FilterPopover } from '@/components/dashboard/calendar/FilterPopover';
import { CalendarPostDialog } from '@/components/dashboard/calendar/CalendarPostDialog';
import { Button } from '@/components/ui/button';
import { ListFilter } from 'lucide-react';
import { useCalendarState } from '@/hooks/useCalendarState';

interface CalendarContainerProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  campaigns: Campaign[];
  fetchCampaigns: () => Promise<Campaign[]>;
  fetchPosts: () => Promise<Post[]>;
  createPost: (postData: Omit<Post, 'id'>) => Promise<Post | null>;
  updatePost: (id: string, updates: Partial<Post>) => Promise<Post | null>;
  deletePost: (id: string) => Promise<boolean>;
}

export const CalendarContainer: React.FC<CalendarContainerProps> = ({
  posts,
  setPosts,
  campaigns,
  createPost,
  updatePost,
  deletePost
}) => {
  const {
    currentMonth,
    selectedDate,
    showPostCreator,
    setShowPostCreator,
    viewMode,
    setViewMode,
    editingPost,
    filterOpen,
    setFilterOpen,
    filteredPlatforms,
    filteredCampaigns,
    filteredStatus,
    filteredPosts,
    totalFilterCount,
    handlePrevMonth,
    handleNextMonth,
    handleToday,
    handleSelectDate,
    handleCreatePost,
    handleUpdatePost,
    handleDeletePost,
    handleEditPost,
    handleCreateNewPost,
    togglePlatformFilter,
    toggleCampaignFilter,
    toggleStatusFilter,
    clearAllFilters,
    openPostCreator
  } = useCalendarState({
    posts,
    setPosts,
    campaigns,
    createPost,
    updatePost,
    deletePost
  });

  return (
    <Card className="overflow-hidden border-gray-200">
      <CalendarHeader 
        currentMonth={currentMonth}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
        handleToday={handleToday}
        viewMode={viewMode}
        setViewMode={setViewMode}
        filteredCount={totalFilterCount}
        setFilterOpen={setFilterOpen}
        filterOpen={filterOpen}
        openPostCreator={openPostCreator}
      />
      
      <FilterPopover
        open={filterOpen}
        setOpen={setFilterOpen}
        campaigns={campaigns}
        filteredPlatforms={filteredPlatforms}
        togglePlatformFilter={togglePlatformFilter}
        filteredCampaigns={filteredCampaigns}
        toggleCampaignFilter={toggleCampaignFilter}
        filteredStatus={filteredStatus}
        toggleStatusFilter={toggleStatusFilter}
        clearAllFilters={clearAllFilters}
      >
        <Button variant="outline" size="sm">
          <ListFilter className="h-4 w-4 mr-1" />
          Filters {totalFilterCount > 0 && `(${totalFilterCount})`}
        </Button>
      </FilterPopover>
      
      <CalendarView
        posts={filteredPosts}
        campaigns={campaigns}
        currentMonth={currentMonth}
        onSelectDate={handleSelectDate}
        selectedDate={selectedDate}
        onEditPost={handleEditPost}
        onDeletePost={handleDeletePost}
        viewMode={viewMode}
        onCreatePost={handleCreateNewPost}
      />
      
      <CalendarPostDialog 
        showPostCreator={showPostCreator}
        setShowPostCreator={setShowPostCreator}
        selectedDate={selectedDate}
        campaigns={campaigns}
        editingPost={editingPost}
        handleCreatePost={handleCreatePost}
        handleUpdatePost={handleUpdatePost}
      />
    </Card>
  );
};
