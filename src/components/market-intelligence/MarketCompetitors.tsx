
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

const competitors = [
  { id: 1, name: 'Luxury Resort A', social: 12500, change: 5.3, sentiment: 78 },
  { id: 2, name: 'Korean Spa B', social: 8700, change: -2.1, sentiment: 82 },
  { id: 3, name: 'Island Retreat C', social: 15300, change: 7.6, sentiment: 65 },
  { id: 4, name: 'Executive Hotel D', social: 9200, change: 1.2, sentiment: 71 },
  { id: 5, name: 'Wellness Center E', social: 11500, change: 3.8, sentiment: 88 },
  { id: 6, name: 'Beach Resort F', social: 10800, change: -0.5, sentiment: 69 }
];

const CompetitorCard = ({ competitor }) => {
  return (
    <Card key={competitor.id} className="p-5">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-resort-800">{competitor.name}</h3>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Eye className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-resort-600">Social Following</span>
            <div className="flex items-center">
              <span className="text-sm font-medium">{competitor.social.toLocaleString()}</span>
              <span className={`ml-2 text-xs flex items-center ${
                competitor.change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {competitor.change > 0 ? (
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-0.5" />
                )}
                {Math.abs(competitor.change)}%
              </span>
            </div>
          </div>
          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{ width: `${(competitor.social / 20000) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-resort-600">Sentiment Score</span>
            <span className="text-sm font-medium">{competitor.sentiment}%</span>
          </div>
          <Progress value={competitor.sentiment} className="h-1" />
        </div>
        
        <div className="pt-3 border-t border-gray-100 flex justify-between">
          <Button variant="outline" size="sm">
            <Activity className="mr-1.5 h-3 w-3" /> Activity
          </Button>
          <Button variant="outline" size="sm">
            <BarChart className="mr-1.5 h-3 w-3" /> Compare
          </Button>
        </div>
      </div>
    </Card>
  );
};

const MarketCompetitors = () => {
  return (
    <>
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search competitors..."
              className="pl-9"
            />
          </div>
          <Button variant="outline" className="justify-center sm:w-auto">
            <Eye className="mr-2 h-4 w-4" /> View All
          </Button>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {competitors.map((competitor) => (
          <CompetitorCard key={competitor.id} competitor={competitor} />
        ))}
      </div>
    </>
  );
};

export default MarketCompetitors;
