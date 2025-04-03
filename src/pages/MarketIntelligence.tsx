
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import MarketCompetitors from '@/components/market-intelligence/MarketCompetitors';
import MarketSentiment from '@/components/market-intelligence/MarketSentiment';
import MarketTrends from '@/components/market-intelligence/MarketTrends';
import MarketInfluencers from '@/components/market-intelligence/MarketInfluencers';

const MarketIntelligence = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">Market Intelligence</h1>
          <p className="text-resort-500">Monitor competitors, track trends, and gather market insights</p>
        </div>
        <Button className="bg-ocean-600 hover:bg-ocean-700 shadow-sm">
          <Plus className="mr-1.5 h-4 w-4" /> Add to Watchlist
        </Button>
      </div>

      <Tabs defaultValue="competitors">
        <TabsList className="mb-4">
          <TabsTrigger value="competitors">Competitor Watchlist</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
          <TabsTrigger value="influencers">Influencer Hub</TabsTrigger>
        </TabsList>
        
        <TabsContent value="competitors">
          <MarketCompetitors />
        </TabsContent>
        
        <TabsContent value="sentiment">
          <MarketSentiment />
        </TabsContent>
        
        <TabsContent value="trends">
          <MarketTrends />
        </TabsContent>
        
        <TabsContent value="influencers">
          <MarketInfluencers />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default MarketIntelligence;
