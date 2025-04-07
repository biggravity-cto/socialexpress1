
import React from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const trendData = [
  {
    metric: "Overall Positive Sentiment",
    q42024: "82.37%",
    q12025: "~75%",
    trend: "decrease",
    notes: "Slight decrease, but sample size difference limits comparability."
  },
  {
    metric: "Negative: Location",
    q42024: "3.88%",
    q12025: "~10%",
    trend: "increase",
    notes: "Appears potentially higher, remains a top concern."
  },
  {
    metric: "Negative: Food & Beverage",
    q42024: "2.94%",
    q12025: "~5%",
    trend: "increase",
    notes: "Appears potentially higher, breakfast quality specifically noted."
  },
  {
    metric: "Negative: Room Conditions",
    q42024: "1.89%",
    q12025: "~3%",
    trend: "increase",
    notes: "Appears potentially higher, with water quality emerging as a specific theme."
  },
  {
    metric: "New Theme: Water Quality",
    q42024: "Not Highlighted",
    q12025: "Mentioned several times",
    trend: "new",
    notes: "Emerged as a specific negative point requiring attention."
  },
  {
    metric: "Key Strengths Consistency",
    q42024: "High",
    q12025: "High",
    trend: "stable",
    notes: "Family-friendliness, Pool Villas, Airport Proximity remain strong positive drivers."
  }
];

const scoreChartData = [
  { month: 'July', score: 7.8 },
  { month: 'August', score: 7.9 },
  { month: 'September', score: 8.0 },
  { month: 'October', score: 7.9 },
  { month: 'November', score: 8.0 },
  { month: 'December', score: 7.9 },
  { month: 'January', score: 7.8 },
  { month: 'February', score: 7.7 },
  { month: 'March', score: 7.7 },
];

const TrendAnalysis = () => {
  const renderTrendIcon = (trend) => {
    switch (trend) {
      case 'increase':
        return <ArrowUp className="h-4 w-4 text-red-500" />;
      case 'decrease':
        return <ArrowDown className="h-4 w-4 text-amber-500" />;
      case 'new':
        return <span className="text-blue-500 text-xs font-medium">NEW</span>;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium text-resort-800 mb-4">Brand Sentiment Analysis (BSA) Score Trend</h3>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              score: {
                label: "BSA Score",
                color: "#0369a1",
              },
            }}
          >
            <LineChart
              data={scoreChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis 
                domain={[7, 8.5]} 
                tick={{ fontSize: 12 }} 
                axisLine={false} 
                tickLine={false}
              />
              <ChartTooltip 
                content={<ChartTooltipContent labelFormatter={(label) => `Month: ${label}`} />}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="var(--color-score)" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
        <div className="text-center text-sm text-resort-500 mt-3">
          <div className="font-medium">Q4 2024 BSA Score: 7.9/10</div>
          <div className="font-medium">Q1 2025 BSA Score: 7.7/10</div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium text-resort-800 mb-4">Trend Analysis (Q1 2025 vs. Q4 2024)</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Metric</TableHead>
                <TableHead>Q4 2024 (953 Posts)</TableHead>
                <TableHead>Q1 2025 (43 Posts)</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trendData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.metric}</TableCell>
                  <TableCell>{item.q42024}</TableCell>
                  <TableCell>{item.q12025}</TableCell>
                  <TableCell>{renderTrendIcon(item.trend)}</TableCell>
                  <TableCell className="text-sm">{item.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default TrendAnalysis;
