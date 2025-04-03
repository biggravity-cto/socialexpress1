
import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  Users,
  LightbulbIcon,
  Target,
  Sparkles,
  BadgePercent
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const BrandMetricsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-sm font-medium text-blue-800 mb-1">Brand Awareness</h3>
          <p className="text-2xl font-bold text-blue-700">78%</p>
          <p className="text-xs text-blue-600 mt-1">+12% from last quarter</p>
        </div>
      </Card>
      
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <Sparkles className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-sm font-medium text-green-800 mb-1">Brand Loyalty</h3>
          <p className="text-2xl font-bold text-green-700">65%</p>
          <p className="text-xs text-green-600 mt-1">+8% from last quarter</p>
        </div>
      </Card>
      
      <Card className="p-4 bg-purple-50 border-purple-200">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <BadgePercent className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-sm font-medium text-purple-800 mb-1">Brand Value</h3>
          <p className="text-2xl font-bold text-purple-700">$4.2M</p>
          <p className="text-xs text-purple-600 mt-1">+22% from last year</p>
        </div>
      </Card>
    </div>
  );
};

const BrandOpportunities = () => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium text-resort-800 mb-3 flex items-center">
        <LightbulbIcon className="h-4 w-4 mr-2 text-amber-500" />
        Brand Opportunities
      </h3>
      <div className="space-y-3">
        {[
          { id: 1, opportunity: "Expand Korean-inspired wellness retreats", score: 92 },
          { id: 2, opportunity: "Launch eco-friendly amenities line", score: 87 },
          { id: 3, opportunity: "Develop executive workation packages", score: 84 },
          { id: 4, opportunity: "Create luxury family experience bundles", score: 79 }
        ].map((item) => (
          <div key={item.id} className="flex items-center">
            <div className="flex-1">
              <p className="text-sm text-resort-700">{item.opportunity}</p>
            </div>
            <div className="w-1/2">
              <div className="flex items-center">
                <div className="w-full bg-gray-100 rounded-full h-2 mr-2">
                  <div 
                    className="bg-amber-500 h-2 rounded-full" 
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-resort-600">{item.score}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const BrandChallenges = () => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium text-resort-800 mb-3 flex items-center">
        <Target className="h-4 w-4 mr-2 text-red-500" />
        Brand Challenges
      </h3>
      <div className="space-y-3">
        {[
          { id: 1, challenge: "Addressing sustainability concerns", urgency: "High" },
          { id: 2, challenge: "Digital presence needs improvement", urgency: "Medium-High" },
          { id: 3, challenge: "Price perception vs value delivery", urgency: "Medium" },
          { id: 4, challenge: "Staff turnover affecting brand consistency", urgency: "High" }
        ].map((item) => (
          <div key={item.id} className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-resort-800">{item.challenge}</p>
            <div className="flex items-center mt-1">
              <span className="text-xs text-resort-500 mr-2">Urgency:</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                item.urgency === 'High' ? 'bg-red-100 text-red-800' :
                item.urgency === 'Medium-High' ? 'bg-orange-100 text-orange-800' :
                'bg-amber-100 text-amber-800'
              }`}>
                {item.urgency}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const BrandOverview = () => {
  return (
    <Card className="p-6 mb-6">
      <div className="space-y-1 mb-6">
        <h2 className="text-xl font-medium text-resort-800">Brand Health Dashboard</h2>
        <p className="text-sm text-resort-500">Key metrics and insights about your brand's performance</p>
      </div>
      
      <BrandMetricsCards />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BrandOpportunities />
        <BrandChallenges />
      </div>
    </Card>
  );
};

export default BrandOverview;
