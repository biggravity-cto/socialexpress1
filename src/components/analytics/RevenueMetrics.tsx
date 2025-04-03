
import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revPAR: 120, adr: 180, revenue: 240000 },
  { month: 'Feb', revPAR: 125, adr: 185, revenue: 250000 },
  { month: 'Mar', revPAR: 135, adr: 190, revenue: 270000 },
  { month: 'Apr', revPAR: 145, adr: 195, revenue: 290000 },
  { month: 'May', revPAR: 155, adr: 200, revenue: 310000 },
  { month: 'Jun', revPAR: 165, adr: 205, revenue: 330000 },
];

const RevenueMetrics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 flex flex-col justify-between">
          <div className="text-sm text-muted-foreground">Average RevPAR</div>
          <div className="text-2xl font-bold mt-2">$149.00</div>
          <div className="text-xs text-green-600 mt-1">+8.2% from last year</div>
        </Card>
        <Card className="p-4 flex flex-col justify-between">
          <div className="text-sm text-muted-foreground">Average ADR</div>
          <div className="text-2xl font-bold mt-2">$192.50</div>
          <div className="text-xs text-green-600 mt-1">+5.7% from last year</div>
        </Card>
        <Card className="p-4 flex flex-col justify-between">
          <div className="text-sm text-muted-foreground">Total Revenue YTD</div>
          <div className="text-2xl font-bold mt-2">$1.69M</div>
          <div className="text-xs text-green-600 mt-1">+12.4% from last year</div>
        </Card>
      </div>
      
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis 
              yAxisId="left"
              orientation="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
            />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'revenue') return [`$${(value as number).toLocaleString()}`, 'Revenue'];
                return [`$${value}`, name === 'revPAR' ? 'RevPAR' : 'ADR'];
              }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="revPAR" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="RevPAR" />
            <Bar yAxisId="left" dataKey="adr" fill="#14b8a6" radius={[4, 4, 0, 0]} name="ADR" />
            <Bar yAxisId="right" dataKey="revenue" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueMetrics;
