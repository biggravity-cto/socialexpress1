
import React from 'react';
import { Campaign } from '@/types/calendar';
import { Badge } from '@/components/ui/badge';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface CampaignIndicatorsProps {
  campaigns: Campaign[];
}

const CampaignIndicators: React.FC<CampaignIndicatorsProps> = ({ campaigns }) => {
  if (campaigns.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-1 mb-2">
      {campaigns.map((campaign) => (
        <TooltipProvider key={campaign.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge 
                variant="outline" 
                className="text-xs px-1.5"
                style={{ 
                  backgroundColor: campaign.color || '#e5e7eb',
                  borderColor: campaign.color || '#e5e7eb'
                }}
              >
                {campaign.name.length > 12 ? `${campaign.name.substring(0, 12)}...` : campaign.name}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{campaign.name}</p>
              <p className="text-xs">{campaign.startdate} - {campaign.enddate}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default CampaignIndicators;
