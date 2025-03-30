
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Campaign } from '@/types/calendar';

interface FilterPopoverProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  campaigns: Campaign[];
  filteredPlatforms: string[];
  togglePlatformFilter: (platform: string) => void;
  filteredCampaigns: string[];
  toggleCampaignFilter: (campaignId: string) => void;
  filteredStatus: string[];
  toggleStatusFilter: (status: string) => void;
  clearAllFilters: () => void;
  children: React.ReactNode;
}

export const FilterPopover: React.FC<FilterPopoverProps> = ({
  open,
  setOpen,
  campaigns,
  filteredPlatforms,
  togglePlatformFilter,
  filteredCampaigns,
  toggleCampaignFilter,
  filteredStatus,
  toggleStatusFilter,
  clearAllFilters,
  children
}) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h3 className="font-medium">Filter Posts</h3>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Platforms</h4>
            <div className="flex flex-wrap gap-2">
              {['instagram', 'facebook', 'twitter'].map(platform => (
                <Label 
                  key={platform}
                  className={`flex items-center p-2 border rounded-md cursor-pointer ${
                    filteredPlatforms.includes(platform) ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <Checkbox 
                    checked={filteredPlatforms.includes(platform)}
                    onCheckedChange={() => togglePlatformFilter(platform)}
                    className="mr-2"
                  />
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </Label>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Campaigns</h4>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {campaigns.map(campaign => (
                <Label 
                  key={campaign.id}
                  className={`flex items-center p-2 border rounded-md cursor-pointer ${
                    filteredCampaigns.includes(campaign.id) ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                  style={{
                    borderLeft: `4px solid ${campaign.color}`
                  }}
                >
                  <Checkbox 
                    checked={filteredCampaigns.includes(campaign.id)}
                    onCheckedChange={() => toggleCampaignFilter(campaign.id)}
                    className="mr-2"
                  />
                  {campaign.name}
                </Label>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Status</h4>
            <div className="flex flex-wrap gap-2">
              {['published', 'scheduled', 'draft', 'pending_approval'].map(status => (
                <Label 
                  key={status}
                  className={`flex items-center p-2 border rounded-md cursor-pointer ${
                    filteredStatus.includes(status) ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <Checkbox 
                    checked={filteredStatus.includes(status)}
                    onCheckedChange={() => toggleStatusFilter(status)}
                    className="mr-2"
                  />
                  {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Label>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between pt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearAllFilters}
            >
              Clear All
            </Button>
            <Button 
              size="sm"
              onClick={() => setOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
