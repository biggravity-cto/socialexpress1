
import React from 'react';
import { Card } from '@/components/ui/card';

const trends = [
  { id: 1, topic: 'Wellness Retreats', score: 92 },
  { id: 2, topic: 'Sustainable Tourism', score: 87 },
  { id: 3, topic: 'Digital Nomad Packages', score: 84 },
  { id: 4, topic: 'Luxury Family Experiences', score: 79 },
  { id: 5, topic: 'Korean Beauty Treatments', score: 76 }
];

const predictions = [
  { id: 1, prediction: 'Increased Korean tourist interest in Q3', probability: 'High' },
  { id: 2, prediction: 'Rising demand for exclusive wellness packages', probability: 'Very High' },
  { id: 3, prediction: 'Growth in business retreat bookings', probability: 'Medium' },
  { id: 4, prediction: 'Trend toward longer average stays', probability: 'Medium-High' }
];

const MarketTrends = () => {
  return (
    <Card className="p-6">
      <div className="space-y-1 mb-6">
        <h2 className="text-xl font-medium text-resort-800">Market Trends & Predictions</h2>
        <p className="text-sm text-resort-500">Discover emerging trends and AI-powered market predictions</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-resort-800 mb-3">Trending Topics in Hospitality</h3>
          <div className="space-y-3">
            {trends.map((trend) => (
              <div key={trend.id} className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm text-resort-700">{trend.topic}</p>
                </div>
                <div className="w-1/2">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-100 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${trend.score}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-resort-600">{trend.score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium text-resort-800 mb-3">AI Market Predictions</h3>
          <div className="space-y-3">
            {predictions.map((prediction) => (
              <div key={prediction.id} className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-resort-800">{prediction.prediction}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-resort-500 mr-2">Probability:</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    prediction.probability === 'Very High' ? 'bg-green-100 text-green-800' :
                    prediction.probability === 'High' ? 'bg-blue-100 text-blue-800' :
                    prediction.probability === 'Medium-High' ? 'bg-teal-100 text-teal-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {prediction.probability}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default MarketTrends;
