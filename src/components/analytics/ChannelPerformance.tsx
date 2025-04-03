
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { channel: 'Direct', bookings: 450, revenue: 112500 },
  { channel: 'OTA', bookings: 380, revenue: 85500 },
  { channel: 'GDS', bookings: 120, revenue: 39000 },
  { channel: 'Phone', bookings: 85, revenue: 25500 },
  { channel: 'Travel Agent', bookings: 65, revenue: 22750 },
];

const ChannelPerformance = () => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis 
            type="number" 
            axisLine={false} 
            tickLine={false} 
          />
          <YAxis 
            type="category" 
            dataKey="channel" 
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'revenue') return [`$${(value as number).toLocaleString()}`, 'Revenue'];
              return [value, 'Bookings'];
            }}
            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
          />
          <Legend />
          <Bar 
            dataKey="bookings" 
            fill="#0ea5e9" 
            name="Bookings" 
            radius={[0, 4, 4, 0]} 
          />
          <Bar 
            dataKey="revenue" 
            fill="#f59e0b" 
            name="Revenue ($)" 
            radius={[0, 4, 4, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChannelPerformance;
