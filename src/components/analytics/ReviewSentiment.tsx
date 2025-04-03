
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', score: 4.2 },
  { month: 'Feb', score: 4.3 },
  { month: 'Mar', score: 4.5 },
  { month: 'Apr', score: 4.3 },
  { month: 'May', score: 4.6 },
  { month: 'Jun', score: 4.7 },
  { month: 'Jul', score: 4.8 },
  { month: 'Aug', score: 4.7 },
  { month: 'Sep', score: 4.6 },
];

const sentimentData = [
  { category: 'Positive', value: 68 },
  { category: 'Neutral', value: 22 },
  { category: 'Negative', value: 10 },
];

const keywordData = [
  { keyword: 'Staff', mentions: 256, sentiment: 4.7 },
  { keyword: 'Cleanliness', mentions: 218, sentiment: 4.3 },
  { keyword: 'Location', mentions: 192, sentiment: 4.8 },
  { keyword: 'Breakfast', mentions: 165, sentiment: 4.5 },
  { keyword: 'Comfort', mentions: 140, sentiment: 4.2 },
];

const ReviewSentiment = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 col-span-1 flex flex-col justify-between">
          <div className="text-sm text-muted-foreground">Average Rating</div>
          <div className="text-3xl font-bold mt-2">4.6 / 5.0</div>
          <div className="text-xs text-green-600 mt-1">+0.3 from last year</div>
        </Card>
        
        <div className="col-span-3">
          <div className="h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <YAxis 
                  domain={[3, 5]} 
                  tick={{ fontSize: 12 }} 
                  axisLine={false} 
                  tickLine={false}
                />
                <Tooltip 
                  formatter={(value) => [`${value}/5.0`, 'Rating']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ stroke: '#10b981', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Sentiment Analysis</h3>
          
          {sentimentData.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{item.category}</span>
                <span>{item.value}%</span>
              </div>
              <Progress 
                value={item.value} 
                className="h-2" 
                style={{ 
                  backgroundColor: '#f1f5f9',
                  '--tw-progress-color': index === 0 ? '#10b981' : index === 1 ? '#f59e0b' : '#ef4444'
                } as React.CSSProperties}
              />
            </div>
          ))}
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-3">Top Mentioned Topics</h3>
          <div className="space-y-3">
            {keywordData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-medium">{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-medium">{item.keyword}</div>
                    <div className="text-xs text-muted-foreground">{item.mentions} mentions</div>
                  </div>
                </div>
                <div className="flex items-center bg-green-50 px-2 py-1 rounded">
                  <span className="text-sm font-medium text-green-700">{item.sentiment}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSentiment;
