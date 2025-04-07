
import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Updated sentiment data to match the latest report
const sentimentData = [
  { name: 'Positive', value: 80, previousValue: 82.37, change: -2.37, color: '#6ad4e0' },
  { name: 'Neutral', value: 5, previousValue: 6.19, change: -1.19, color: '#91e6c8' },
  { name: 'Negative', value: 15, previousValue: 11.44, change: 3.56, color: '#a3f7bf' }
];

const trendIcon = (change: number) => {
  if (change > 0) {
    return <TrendingUp className="h-4 w-4 text-green-500" />;
  } else if (change < 0) {
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  }
  return <Minus className="h-4 w-4 text-gray-400" />;
};

// Custom tooltip for chart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="font-medium">{data.name} Sentiment</p>
        <p className="text-sm mt-1">Current: {data.value}%</p>
        <p className="text-sm">Previous: {data.previousValue}%</p>
        <p className="text-sm flex items-center gap-1 mt-1">
          Change: 
          <span className={data.change > 0 ? "text-green-500" : data.change < 0 ? "text-red-500" : "text-gray-500"}>
            {data.change > 0 ? '+' : ''}{data.change}%
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const MarketSentiment = () => {
  return (
    <Card className="p-6 border-[#6ad4e0]/30">
      <div className="space-y-1 mb-6">
        <h2 className="text-xl font-display font-medium text-[#333]">Brand Sentiment Analysis</h2>
        <p className="text-sm text-[#555]">Monitor and analyze sentiment across social media and review platforms</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {sentimentData.map((item) => (
          <Card key={item.name} className="p-4 border border-[#e9f7f9] shadow-sm" style={{
            background: `linear-gradient(135deg, ${item.color}15, ${item.color}05)`
          }}>
            <div className="text-center">
              <h3 className="text-sm font-medium text-[#333] mb-1">{item.name} Sentiment</h3>
              <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}%</p>
              <div className="flex items-center justify-center gap-1 mt-1 text-xs">
                {trendIcon(item.change)}
                <span className={item.change > 0 ? "text-green-600" : item.change < 0 ? "text-red-600" : "text-gray-600"}>
                  {item.change > 0 ? '+' : ''}{item.change}% from last quarter
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="h-[300px] mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sentimentData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#666', fontSize: 12 }}
              axisLine={{ stroke: '#e0e0e0' }}
              tickLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis 
              tick={{ fill: '#666', fontSize: 12 }}
              axisLine={{ stroke: '#e0e0e0' }}
              tickLine={{ stroke: '#e0e0e0' }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              name="Current" 
              radius={[4, 4, 0, 0]}
              barSize={50}
            >
              {sentimentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-[#666] italic">Data represents sentiment analysis from 155 blogs and social media mentions in Q1 2025</p>
      </div>
    </Card>
  );
};

export default MarketSentiment;
