
import React from 'react';
import { Card } from '@/components/ui/card';

const MarketSentiment = () => {
  return (
    <Card className="p-6">
      <div className="space-y-1 mb-6">
        <h2 className="text-xl font-medium text-resort-800">Brand Sentiment Analysis</h2>
        <p className="text-sm text-resort-500">Monitor and analyze sentiment across social media and review platforms</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="text-center">
            <h3 className="text-sm font-medium text-green-800 mb-1">Positive Sentiment</h3>
            <p className="text-2xl font-bold text-green-700">72%</p>
            <p className="text-xs text-green-600 mt-1">+5% from last month</p>
          </div>
        </Card>
        
        <Card className="p-4 bg-amber-50 border-amber-200">
          <div className="text-center">
            <h3 className="text-sm font-medium text-amber-800 mb-1">Neutral Sentiment</h3>
            <p className="text-2xl font-bold text-amber-700">18%</p>
            <p className="text-xs text-amber-600 mt-1">-2% from last month</p>
          </div>
        </Card>
        
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="text-center">
            <h3 className="text-sm font-medium text-red-800 mb-1">Negative Sentiment</h3>
            <p className="text-2xl font-bold text-red-700">10%</p>
            <p className="text-xs text-red-600 mt-1">-3% from last month</p>
          </div>
        </Card>
      </div>
      
      <div className="text-center py-10">
        <p className="text-resort-500">Sentiment analysis visualization will appear here</p>
      </div>
    </Card>
  );
};

export default MarketSentiment;
