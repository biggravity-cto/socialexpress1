
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ArrowDown, ArrowUp, Info } from 'lucide-react';

// Updated sentiment data based on the new report
const sentimentData = [
  { name: 'Positive', value: 75, color: '#a3f7bf', lastQuarter: 82.37 },
  { name: 'Negative', value: 20, color: '#ff8c8c', lastQuarter: 11.44 },
  { name: 'Neutral', value: 5, color: '#94a3b8', lastQuarter: 6.19 },
];

const sentimentTrendData = [
  { name: 'Positive', current: 75, previous: 82.37, change: -7.37, trend: 'down' },
  { name: 'Negative', current: 20, previous: 11.44, change: 8.56, trend: 'up' },
  { name: 'Neutral', current: 5, previous: 6.19, change: -1.19, trend: 'down' },
];

const COLORS = ['#a3f7bf', '#ff8c8c', '#94a3b8'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SentimentDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-[#6ad4e0]/10 to-[#91e6c8]/10 border-[#6ad4e0]/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1d9cc8] flex items-center justify-center gap-1">
                7.7
                <span className="text-base text-[#6ad4e0] font-normal">/ 10</span>
              </div>
              <div className="text-sm font-medium text-[#333]">BSA Score</div>
              <div className="text-xs text-[#555] mt-1 flex items-center justify-center">
                <ArrowDown className="h-3 w-3 mr-1 text-[#ff8c8c]" />
                <span>From 7.9 in Q4 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-[#91e6c8]/10 to-[#a3f7bf]/10 border-[#91e6c8]/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#228b22]">43</div>
              <div className="text-sm font-medium text-[#333]">Blog Posts Analyzed</div>
              <div className="text-xs text-[#555] mt-1 flex items-center justify-center">
                <ArrowDown className="h-3 w-3 mr-1 text-[#ff8c8c]" />
                <span>Vs. 953 in Q4 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-[#6ad4e0]/20">
        <CardHeader className="bg-gradient-to-r from-[#a3f7bf]/10 to-[#6ad4e0]/10">
          <CardTitle className="text-[#333]">Sentiment Distribution</CardTitle>
          <CardDescription>
            Q1 2025 vs Q4 2024 Comparison
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="pt-4">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-xs text-[#555] mt-2">
              Based on analysis of 43 blog posts in Q1 2025
            </div>
          </div>
          
          <div className="col-span-2 pl-4 border-l border-gray-100">
            <div className="space-y-4">
              <div className="text-sm font-medium mb-2">Quarter-over-Quarter Trend</div>
              
              {sentimentTrendData.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{item.name} Sentiment</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${
                        (item.name === 'Positive' && item.trend === 'down') || 
                        (item.name === 'Negative' && item.trend === 'up') 
                          ? 'text-[#ff8c8c]' 
                          : 'text-[#a3f7bf]'
                      }`}>
                        {item.current}%
                      </span>
                      <div className={`flex items-center text-xs ${
                        (item.name === 'Positive' && item.trend === 'down') || 
                        (item.name === 'Negative' && item.trend === 'up') 
                          ? 'text-[#ff8c8c]' 
                          : 'text-[#a3f7bf]'
                      }`}>
                        {item.trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        <span>{Math.abs(item.change).toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`${
                        item.name === 'Positive' ? 'bg-[#a3f7bf]' : 
                        item.name === 'Negative' ? 'bg-[#ff8c8c]' : 'bg-gray-400'
                      }`}
                      style={{ width: `${item.current}%` }}
                    />
                    <div 
                      className={`${
                        item.name === 'Positive' ? 'bg-[#a3f7bf]/50' : 
                        item.name === 'Negative' ? 'bg-[#ff8c8c]/50' : 'bg-gray-300'
                      }`}
                      style={{ width: `${item.name === 'Positive' ? (item.previous - item.current) : 0}%` }}
                    />
                  </div>
                  
                  <div className="text-xs text-[#555]">
                    {item.previous}% in Q4 2024
                  </div>
                </div>
              ))}
              
              <div className="pt-2 mt-2 border-t border-gray-100">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-[#6ad4e0] mt-0.5" />
                  <p className="text-xs text-[#555]">
                    <span className="font-medium">Sample Size Note:</span> Q1 2025 analysis based on 43 blog posts compared to 953 posts in Q4 2024. Exercise caution when interpreting trends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentimentDashboard;
