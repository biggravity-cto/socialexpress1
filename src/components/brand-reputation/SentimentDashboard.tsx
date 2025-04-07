
import React from 'react';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const sentimentData = [
  { name: 'Positive', value: 75, color: '#22c55e' },
  { name: 'Negative', value: 20, color: '#ef4444' },
  { name: 'Neutral', value: 5, color: '#f59e0b' },
];

const previousSentimentData = [
  { name: 'Positive', value: 82.37, color: '#22c55e' },
  { name: 'Negative', value: 11.44, color: '#ef4444' },
  { name: 'Neutral', value: 6.19, color: '#f59e0b' },
];

const trendData = [
  { month: 'Aug', q4: 81.2, q1: null },
  { month: 'Sep', q4: 82.1, q1: null },
  { month: 'Oct', q4: 83.5, q1: null },
  { month: 'Nov', q4: 82.9, q1: null },
  { month: 'Dec', q4: 81.8, q1: null },
  { month: 'Jan', q4: null, q1: 78 },
  { month: 'Feb', q4: null, q1: 75 },
  { month: 'Mar', q4: null, q1: 72 },
];

const COLORS = ['#22c55e', '#ef4444', '#f59e0b'];

const SentimentDashboard = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium text-resort-800 mb-4">Sentiment Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-center mb-2">Q1 2025 (43 Blog Posts)</h4>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Sentiment']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-center mb-2">Q4 2024 (953 Blog Posts)</h4>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={previousSentimentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {previousSentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Sentiment']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium text-resort-800 mb-4">Sentiment Trend Analysis</h3>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              q4: {
                label: "Q4 2024 Positive Sentiment",
                color: "#0369a1",
              },
              q1: {
                label: "Q1 2025 Positive Sentiment",
                color: "#10b981",
              },
            }}
          >
            <LineChart
              data={trendData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis 
                domain={[60, 90]} 
                tick={{ fontSize: 12 }} 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip 
                content={<ChartTooltipContent labelFormatter={(label) => `Month: ${label}`} />}
              />
              <Line 
                type="monotone" 
                dataKey="q4" 
                stroke="var(--color-q4)" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
                dot={{ r: 4 }}
                connectNulls
                name="Q4 2024"
              />
              <Line 
                type="monotone" 
                dataKey="q1" 
                stroke="var(--color-q1)" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
                dot={{ r: 4 }}
                connectNulls
                name="Q1 2025"
                strokeDasharray="5 5"
              />
              <Legend />
            </LineChart>
          </ChartContainer>
        </div>
        <div className="text-xs text-resort-500 mt-3 italic text-center">
          Note: Limited sample size (43 posts) for Q1 2025 compared to 953 posts in Q4 2024
        </div>
      </Card>
    </div>
  );
};

export default SentimentDashboard;
