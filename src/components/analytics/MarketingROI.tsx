
import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Legend 
} from 'recharts';

const roiData = [
  { channel: 'Social Media', spent: 25000, revenue: 85000, roi: 3.4 },
  { channel: 'Email Marketing', spent: 12000, revenue: 63000, roi: 5.25 },
  { channel: 'PPC', spent: 30000, revenue: 72000, roi: 2.4 },
  { channel: 'Content Marketing', spent: 18000, revenue: 54000, roi: 3.0 },
  { channel: 'SEO', spent: 15000, revenue: 68000, roi: 4.53 },
  { channel: 'Influencer', spent: 20000, revenue: 48000, roi: 2.4 },
];

const trendData = [
  { month: 'Jan', roi: 2.8 },
  { month: 'Feb', roi: 3.1 },
  { month: 'Mar', roi: 3.4 },
  { month: 'Apr', roi: 3.2 },
  { month: 'May', roi: 3.7 },
  { month: 'Jun', roi: 4.1 },
];

const MarketingROI = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 flex flex-col justify-between">
          <div className="text-sm text-muted-foreground">Total Marketing Spend</div>
          <div className="text-2xl font-bold mt-2">$120,000</div>
          <div className="text-xs text-amber-600 mt-1">+15.2% from last year</div>
        </Card>
        <Card className="p-4 flex flex-col justify-between">
          <div className="text-sm text-muted-foreground">Marketing Revenue</div>
          <div className="text-2xl font-bold mt-2">$390,000</div>
          <div className="text-xs text-green-600 mt-1">+22.7% from last year</div>
        </Card>
        <Card className="p-4 flex flex-col justify-between">
          <div className="text-sm text-muted-foreground">Overall Marketing ROI</div>
          <div className="text-2xl font-bold mt-2">3.25x</div>
          <div className="text-xs text-green-600 mt-1">+0.4x from last year</div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium mb-3">ROI by Channel</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={roiData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis 
                  type="number" 
                  axisLine={false} 
                  tickLine={false} 
                  domain={[0, 6]}
                  tickFormatter={(value) => `${value}x`}
                />
                <YAxis 
                  type="category" 
                  dataKey="channel" 
                  width={110}
                  axisLine={false} 
                  tickLine={false} 
                />
                <Tooltip 
                  formatter={(value) => [`${value}x`, 'ROI']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar 
                  dataKey="roi" 
                  fill="#10b981" 
                  name="ROI" 
                  radius={[0, 4, 4, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-3">ROI Trend</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tickFormatter={(value) => `${value}x`}
                  domain={[2, 5]}
                />
                <Tooltip 
                  formatter={(value) => [`${value}x`, 'ROI']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="roi" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  dot={{ stroke: '#0ea5e9', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingROI;
