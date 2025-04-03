
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import AIBrandAgent from '@/components/brand-intelligence/AIBrandAgent';
import BrandOverview from '@/components/brand-intelligence/BrandOverview';
import CompetitorAnalysis from '@/components/brand-intelligence/CompetitorAnalysis';
import SentimentAnalysis from '@/components/brand-intelligence/SentimentAnalysis';
import BrandTrends from '@/components/brand-intelligence/BrandTrends';
import InfluencerHub from '@/components/brand-intelligence/InfluencerHub';

const BrandIntelligence = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">Brand Intelligence</h1>
          <p className="text-resort-500">Monitor brand health, track trends, and gather strategic insights</p>
        </div>
        <Button className="bg-ocean-600 hover:bg-ocean-700 shadow-sm">
          <Plus className="mr-1.5 h-4 w-4" /> Add to Watchlist
        </Button>
      </div>

      <AIBrandAgent />

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Brand Overview</TabsTrigger>
          <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
          <TabsTrigger value="trends">Brand Trends</TabsTrigger>
          <TabsTrigger value="influencers">Influencer Hub</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <BrandOverview />
        </TabsContent>
        
        <TabsContent value="competitors">
          <CompetitorAnalysis />
        </TabsContent>
        
        <TabsContent value="sentiment">
          <SentimentAnalysis />
        </TabsContent>
        
        <TabsContent value="trends">
          <BrandTrends />
        </TabsContent>
        
        <TabsContent value="influencers">
          <InfluencerHub />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default BrandIntelligence;
