
import React from 'react';
import { Card } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', occupancy: 65 },
  { name: 'Feb', occupancy: 70 },
  { name: 'Mar', occupancy: 75 },
  { name: 'Apr', occupancy: 80 },
  { name: 'May', occupancy: 85 },
  { name: 'Jun', occupancy: 90 },
  { name: 'Jul', occupancy: 95 },
  { name: 'Aug', occupancy: 93 },
  { name: 'Sep', occupancy: 88 },
  { name: 'Oct', occupancy: 82 },
  { name: 'Nov', occupancy: 72 },
  { name: 'Dec', occupancy: 78 },
];

const OccupancyChart = () => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis 
            domain={[0, 100]} 
            unit="%" 
            tick={{ fontSize: 12 }} 
            axisLine={false} 
            tickLine={false} 
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            formatter={(value: number) => `${value}%`}
            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
          />
          <Area 
            type="monotone" 
            dataKey="occupancy" 
            stroke="#0ea5e9" 
            fillOpacity={1} 
            fill="url(#colorOccupancy)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OccupancyChart;
