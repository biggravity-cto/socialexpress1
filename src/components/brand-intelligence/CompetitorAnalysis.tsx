
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Eye, 
  TrendingUp, 
  TrendingDown, 
  BarChart, 
  Activity 
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Re-use existing component from market-intelligence folder
import MarketCompetitors from '@/components/market-intelligence/MarketCompetitors';

const CompetitorAnalysis = () => {
  return <MarketCompetitors />;
};

export default CompetitorAnalysis;
