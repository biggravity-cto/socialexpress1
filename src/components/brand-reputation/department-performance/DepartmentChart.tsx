
import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from './utils';
import { departmentData, DepartmentDataType } from './departmentData';

const DepartmentChart = () => {
  // Reversed data for better visualization in the vertical chart
  const chartData = [...departmentData].reverse();

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={chartData} 
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
          <XAxis 
            type="number" 
            domain={[0, 'dataMax + 1']} 
            tickFormatter={(value) => `${value}%`}
            tick={{ fill: '#666', fontSize: 12 }}
            axisLine={{ stroke: '#e0e0e0' }}
            tickLine={{ stroke: '#e0e0e0' }}
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            tick={{ fill: '#333', fontSize: 13, fontWeight: 500 }}
            width={100}
            axisLine={{ stroke: '#e0e0e0' }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36}
            wrapperStyle={{
              paddingBottom: '15px',
            }}
          />
          <Bar 
            dataKey="q1Negative" 
            name="Q1 2025 Negative %" 
            fill="#6ad4e0"
            radius={[0, 4, 4, 0]}
            barSize={20}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-q1-${index}`} fill={entry.color} />
            ))}
          </Bar>
          <Bar 
            dataKey="q4Negative" 
            name="Q4 2024 Negative %" 
            fill="#91e6c8" 
            radius={[0, 4, 4, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentChart;
