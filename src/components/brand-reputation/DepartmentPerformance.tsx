
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Info } from 'lucide-react';

const departmentData = [
  { 
    name: 'Location', 
    q1Negative: 10, 
    q4Negative: 3.88,
    keyThemes: 'Distance from Nha Trang city center'
  },
  { 
    name: 'Food & Beverage', 
    q1Negative: 5, 
    q4Negative: 2.94,
    keyThemes: 'Breakfast quality/variety, comparison to other hotels'
  },
  { 
    name: 'Room Conditions', 
    q1Negative: 3, 
    q4Negative: 1.89,
    keyThemes: 'Water quality (filters needed), AC issues'
  },
  { 
    name: 'Service', 
    q1Negative: 1, 
    q4Negative: 0,
    keyThemes: 'Buggy service speed'
  },
  { 
    name: 'Pool Services', 
    q1Negative: 1, 
    q4Negative: 0.84,
    keyThemes: 'Specific slide closure mentioned'
  },
  { 
    name: 'Front Desk', 
    q1Negative: 0.5, 
    q4Negative: 1.47,
    keyThemes: 'Minimal negative mentions'
  },
  { 
    name: 'Housekeeping', 
    q1Negative: 0.5, 
    q4Negative: 0.42,
    keyThemes: 'Minimal negative mentions'
  },
];

const DepartmentPerformance = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium text-resort-800 mb-4">Department & Category Performance Analysis</h3>
        <div className="h-[400px]">
          <ChartContainer
            config={{
              q1: {
                label: "Q1 2025 Negative %",
                color: "#ef4444",
              },
              q4: {
                label: "Q4 2024 Negative %",
                color: "#f97316",
              },
            }}
          >
            <BarChart
              data={departmentData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number"
                tick={{ fontSize: 12 }} 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => `${value}%`} 
              />
              <YAxis 
                dataKey="name"
                type="category"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={100}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
              />
              <Bar 
                dataKey="q1Negative" 
                name="Q1 2025 Negative %" 
                fill="var(--color-q1)"
                radius={[0, 4, 4, 0]} 
                barSize={20}
              />
              <Bar 
                dataKey="q4Negative" 
                name="Q4 2024 Negative %" 
                fill="var(--color-q4)" 
                radius={[0, 4, 4, 0]}
                barSize={20}
              />
              <Legend />
            </BarChart>
          </ChartContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium text-resort-800 mb-4">Key Negative Themes by Department</h3>
        <div className="space-y-4">
          {departmentData.map((dept, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-resort-700">{dept.name}</h4>
                <span className="text-sm text-red-600 font-medium">{dept.q1Negative}% Negative</span>
              </div>
              <Progress 
                value={dept.q1Negative} 
                max={10} 
                className="h-2" 
              />
              <div className="text-sm text-resort-600">{dept.keyThemes}</div>
              
              {index !== departmentData.length - 1 && <hr className="my-3" />}
            </div>
          ))}
        </div>
      </Card>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-700 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-blue-800 text-sm">
            <span className="font-medium">Methodology Note:</span> Sentiment analysis and category performance for Q1 2025 are estimated based on qualitative review of the provided data snippets due to the limited number of posts and lack of automated NLP analysis tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPerformance;
