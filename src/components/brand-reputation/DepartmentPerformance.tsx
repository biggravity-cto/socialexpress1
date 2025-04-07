
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Info, ArrowDown, ArrowUp, Minus, ChevronDown, ChevronRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

const departmentData = [
  { 
    name: 'Location', 
    q1Negative: 10, 
    q4Negative: 3.88,
    diffPercent: 158,
    trend: 'increase',
    keyThemes: 'Distance from Nha Trang city center',
    priority: 'high',
    impact: '10% of guests',
    recommendations: [
      'Enhance shuttle services to Nha Trang city',
      'Expand on-site activity programming',
      'Strengthen partnerships with local tour operators'
    ]
  },
  { 
    name: 'Food & Beverage', 
    q1Negative: 5, 
    q4Negative: 2.94,
    diffPercent: 70,
    trend: 'increase',
    keyThemes: 'Breakfast quality/variety, comparison to other hotels',
    priority: 'medium',
    impact: '5% of guests',
    recommendations: [
      'Review and enhance breakfast offerings',
      'Consider rotating or seasonal menu items',
      'Reinforce quality control for food preparation'
    ]
  },
  { 
    name: 'Room Conditions', 
    q1Negative: 3, 
    q4Negative: 1.89,
    diffPercent: 59,
    trend: 'increase',
    keyThemes: 'Water quality (filters needed), AC issues',
    priority: 'medium',
    impact: '3% of guests',
    recommendations: [
      'Address water quality concerns',
      'Implement regular AC maintenance',
      'Enhance room inspection protocols'
    ]
  },
  { 
    name: 'Service', 
    q1Negative: 1, 
    q4Negative: 0,
    diffPercent: 100,
    trend: 'new',
    keyThemes: 'Buggy service speed',
    priority: 'low',
    impact: '<1% of guests',
    recommendations: [
      'Review buggy service efficiency during peak times'
    ]
  },
  { 
    name: 'Pool Services', 
    q1Negative: 1, 
    q4Negative: 0.84,
    diffPercent: 19,
    trend: 'increase',
    keyThemes: 'Specific slide closure mentioned',
    priority: 'low',
    impact: '<1% of guests',
    recommendations: [
      'Monitor consistent operation of pool facilities'
    ]
  },
  { 
    name: 'Front Desk', 
    q1Negative: 0.5, 
    q4Negative: 1.47,
    diffPercent: -66,
    trend: 'decrease',
    keyThemes: 'Minimal negative mentions',
    priority: 'low',
    impact: 'Minimal',
    recommendations: [
      'Maintain current service standards'
    ]
  },
  { 
    name: 'Housekeeping', 
    q1Negative: 0.5, 
    q4Negative: 0.42,
    diffPercent: 19,
    trend: 'stable',
    keyThemes: 'Minimal negative mentions',
    priority: 'low',
    impact: 'Minimal',
    recommendations: [
      'Maintain current service standards'
    ]
  },
];

const getTrendBadge = (trend: string) => {
  switch (trend) {
    case 'increase':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
        <ArrowUp className="h-3 w-3" /> Increasing
      </Badge>;
    case 'decrease':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
        <ArrowDown className="h-3 w-3" /> Decreasing
      </Badge>;
    case 'stable':
      return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">
        <Minus className="h-3 w-3" /> Stable
      </Badge>;
    case 'new':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        New Issue
      </Badge>;
    default:
      return null;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High</Badge>;
    case 'medium':
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Medium</Badge>;
    case 'low':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low</Badge>;
    default:
      return null;
  }
};

const DepartmentPerformance = () => {
  const [expandedDept, setExpandedDept] = useState<string | null>(null);

  const toggleDept = (deptName: string) => {
    if (expandedDept === deptName) {
      setExpandedDept(null);
    } else {
      setExpandedDept(deptName);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Department & Category Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Q1 2025 Negative %</TableHead>
                  <TableHead className="text-right">Q4 2024 Negative %</TableHead>
                  <TableHead className="text-right">% Change</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Key Issues</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departmentData.map((dept) => (
                  <React.Fragment key={dept.name}>
                    <TableRow 
                      className="cursor-pointer hover:bg-muted/30"
                      onClick={() => toggleDept(dept.name)}
                    >
                      <TableCell className="font-medium flex items-center gap-1">
                        {expandedDept === dept.name ? 
                          <ChevronDown className="h-4 w-4" /> : 
                          <ChevronRight className="h-4 w-4" />}
                        {dept.name}
                      </TableCell>
                      <TableCell className="text-right font-medium">{dept.q1Negative}%</TableCell>
                      <TableCell className="text-right">{dept.q4Negative}%</TableCell>
                      <TableCell 
                        className={`text-right font-medium ${
                          dept.diffPercent > 0 ? 'text-red-600' : 
                          dept.diffPercent < 0 ? 'text-green-600' : 'text-gray-600'
                        }`}
                      >
                        {dept.diffPercent > 0 ? '+' : ''}{dept.diffPercent}%
                      </TableCell>
                      <TableCell>{getTrendBadge(dept.trend)}</TableCell>
                      <TableCell>{getPriorityBadge(dept.priority)}</TableCell>
                      <TableCell className="max-w-xs truncate">{dept.keyThemes}</TableCell>
                    </TableRow>
                    {expandedDept === dept.name && (
                      <TableRow className="bg-muted/10">
                        <TableCell colSpan={7} className="p-4">
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-sm font-medium mb-1">Impact</h4>
                              <p className="text-sm text-resort-600">{dept.impact}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-1">Recommendations</h4>
                              <ul className="list-disc pl-5 text-sm text-resort-600 space-y-1">
                                {dept.recommendations.map((rec, idx) => (
                                  <li key={idx}>{rec}</li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium mb-1">Trend Visualization</h4>
                              <div className="h-10">
                                <div className="flex items-center gap-2 w-full">
                                  <span className="text-xs text-gray-500 w-20">Q4 2024</span>
                                  <Progress value={dept.q4Negative} max={10} className="h-2 flex-grow" />
                                  <span className="text-xs text-gray-500 w-12">{dept.q4Negative}%</span>
                                </div>
                                <div className="flex items-center gap-2 w-full mt-2">
                                  <span className="text-xs text-gray-500 w-20">Q1 2025</span>
                                  <Progress value={dept.q1Negative} max={10} className="h-2 flex-grow bg-gray-100" />
                                  <span className="text-xs text-gray-500 w-12">{dept.q1Negative}%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Negative Sentiment by Department (Q1 vs Q4)</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-700 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-blue-800 text-sm">
            <span className="font-medium">Methodology Note:</span> Sentiment analysis and category performance for Q1 2025 are estimated based on qualitative review of the provided data snippets due to the limited number of posts (43 vs. 953 in Q4 2024) and lack of automated NLP analysis tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPerformance;
