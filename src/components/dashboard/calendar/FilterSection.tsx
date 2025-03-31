
import React from 'react';
import { Button } from '@/components/ui/button';
import { ListFilter } from 'lucide-react';
import { FilterPopover } from '@/components/dashboard/calendar/FilterPopover';
import { Campaign } from '@/types/calendar';

interface FilterSectionProps {
  campaigns: Campaign[];
  filteredPlatforms: string[];
  togglePlatformFilter: (platform: string) => void;
  filteredCampaigns: string[];
  toggleCampaignFilter: (campaignId: string) => void;
  filteredStatus: string[];
  toggleStatusFilter: (status: string) => void;
  clearAllFilters: () => void;
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
  totalFilterCount: number;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  campaigns,
  filteredPlatforms,
  togglePlatformFilter,
  filteredCampaigns,
  toggleCampaignFilter,
  filteredStatus,
  toggleStatusFilter,
  clearAllFilters,
  filterOpen,
  setFilterOpen,
  totalFilterCount
}) => {
  return (
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
  );
};
