
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const influencers = [
  { id: 1, name: 'Min-ji Kim', platform: 'Instagram', followers: '850K', category: 'Travel & Lifestyle', image: 'https://i.pravatar.cc/150?img=21' },
  { id: 2, name: 'Daniel Wong', platform: 'YouTube', followers: '1.2M', category: 'Luxury Travel', image: 'https://i.pravatar.cc/150?img=22' },
  { id: 3, name: 'Sarah Johnson', platform: 'Instagram', followers: '620K', category: 'Wellness & Spa', image: 'https://i.pravatar.cc/150?img=23' },
  { id: 4, name: 'Jin-ho Park', platform: 'TikTok', followers: '950K', category: 'Travel & Photography', image: 'https://i.pravatar.cc/150?img=24' },
  { id: 5, name: 'Emma Chen', platform: 'Instagram', followers: '780K', category: 'Food & Travel', image: 'https://i.pravatar.cc/150?img=25' },
  { id: 6, name: 'Kyle Williams', platform: 'YouTube', followers: '550K', category: 'Adventure Travel', image: 'https://i.pravatar.cc/150?img=26' }
];

const InfluencerCard = ({ influencer }) => {
  return (
    <Card key={influencer.id} className="overflow-hidden">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <img 
            src={influencer.image} 
            alt={influencer.name} 
            className="w-12 h-12 rounded-full object-cover mr-3"
          />
          <div>
            <h3 className="text-sm font-medium text-resort-800">{influencer.name}</h3>
            <p className="text-xs text-resort-500">{influencer.platform} • {influencer.followers} followers</p>
          </div>
        </div>
        
        <div className="mb-3">
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
            {influencer.category}
          </span>
        </div>
        
        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
          <Button variant="outline" size="sm" className="flex-1">Profile</Button>
          <Button variant="outline" size="sm" className="flex-1 bg-ocean-50 text-ocean-600 border-ocean-200">Contact</Button>
        </div>
      </div>
    </Card>
  );
};

const MarketInfluencers = () => {
  return (
    <Card className="p-6">
      <div className="space-y-1 mb-6">
        <h2 className="text-xl font-medium text-resort-800">Influencer Hub</h2>
        <p className="text-sm text-resort-500">Discover and manage potential influencer partnerships</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {influencers.map((influencer) => (
          <InfluencerCard key={influencer.id} influencer={influencer} />
        ))}
      </div>
    </Card>
  );
};

export default MarketInfluencers;
