
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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

// Updated department data with the Q1 2025 estimates
const departmentData = [
  { 
    name: 'Location', 
    q1Negative: 6, 
    q4Negative: 3.88,
    diffPercent: 55,
    trend: 'increase',
    keyThemes: 'Distance from Nha Trang city center',
    priority: 'high',
    impact: '~6% of guests',
    color: '#6ad4e0',
    recommendations: [
      'Continue enhancing and promoting shuttle services to Nha Trang city',
      'Develop more robust and varied on-site entertainment and activity schedules',
      'Explore partnerships with local tour operators for easy excursion booking'
    ]
  },
  { 
    name: 'Food & Beverage', 
    q1Negative: 4, 
    q4Negative: 2.94,
    diffPercent: 36,
    trend: 'increase',
    keyThemes: 'Breakfast quality/variety, comparison to other hotels',
    priority: 'medium',
    impact: '~4% of guests',
    color: '#91e6c8',
    recommendations: [
      'Conduct a thorough review of breakfast offerings',
      'Focus on quality, variety, and inclusion of popular Korean dishes',
      'Implement stricter quality control measures in food preparation'
    ]
  },
  { 
    name: 'Room Conditions', 
    q1Negative: 3, 
    q4Negative: 1.89,
    diffPercent: 59,
    trend: 'increase',
    keyThemes: 'Water quality (filters needed), AC/TV issues',
    priority: 'medium',
    impact: '~3% of guests',
    color: '#a3f7bf',
    recommendations: [
      'Urgently investigate room water quality',
      'Provide complimentary shower filters',
      'Ensure regular preventive maintenance for in-room amenities'
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
    color: '#c2f8cb',
    recommendations: [
      'Optimize buggy dispatching during peak times',
      'Review scheduling for high-demand periods'
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
    color: '#d5f8d7',
    recommendations: [
      'Ensure consistent operation and maintenance of recreational facilities'
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
    color: '#e2f7e2',
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
    color: '#f0f7f4',
    recommendations: [
      'Maintain current service standards'
    ]
  },
];

const getTrendBadge = (trend: string) => {
  switch (trend) {
    case 'increase':
      return <Badge variant="outline" className="bg-[#ffd6d6]/20 text-[#ff8c8c] border-[#ffd6d6]/50 flex items-center gap-1">
        <ArrowUp className="h-3 w-3" /> Increasing
      </Badge>;
    case 'decrease':
      return <Badge variant="outline" className="bg-[#a3f7bf]/20 text-[#228b22] border-[#a3f7bf]/50 flex items-center gap-1">
        <ArrowDown className="h-3 w-3" /> Decreasing
      </Badge>;
    case 'stable':
      return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">
        <Minus className="h-3 w-3" /> Stable
      </Badge>;
    case 'new':
      return <Badge variant="outline" className="bg-[#6ad4e0]/20 text-[#1d9cc8] border-[#6ad4e0]/50">
        New Issue
      </Badge>;
    default:
      return null;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge variant="outline" className="bg-[#ffd6d6]/20 text-[#ff8c8c] border-[#ffd6d6]/50">High</Badge>;
    case 'medium':
      return <Badge variant="outline" className="bg-[#fff3cd]/20 text-amber-700 border-[#fff3cd]/50">Medium</Badge>;
    case 'low':
      return <Badge variant="outline" className="bg-[#a3f7bf]/20 text-[#228b22] border-[#a3f7bf]/50">Low</Badge>;
    default:
      return null;
  }
};

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="font-medium">{label}</p>
        <div className="flex flex-col gap-1 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#6ad4e0]"></div>
            <p className="text-sm">Q1 2025: {payload[0].value}%</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#91e6c8]"></div>
            <p className="text-sm">Q4 2024: {payload[1].value}%</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
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

  // Reversed data for better visualization in the vertical chart
  const chartData = [...departmentData].reverse();

  return (
    <div className="space-y-6">
      <Card className="border-[#6ad4e0]/30">
        <CardHeader className="bg-gradient-to-r from-[#a3f7bf]/10 to-[#6ad4e0]/10">
          <CardTitle className="text-[#333]">Department & Category Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Interactive vertical chart */}
          <div className="h-[400px] mb-8">
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

          {/* Responsive table with department data */}
          <div className="overflow-x-auto bg-white rounded-lg border border-[#e9f7f9] shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-[#a3f7bf]/20 to-[#6ad4e0]/20">
                  <TableHead className="font-semibold text-[#333]">Department</TableHead>
                  <TableHead className="text-right font-semibold text-[#333]">Q1 2025</TableHead>
                  <TableHead className="text-right font-semibold text-[#333]">Q4 2024</TableHead>
                  <TableHead className="text-right font-semibold text-[#333]">% Change</TableHead>
                  <TableHead className="font-semibold text-[#333]">Trend</TableHead>
                  <TableHead className="font-semibold text-[#333]">Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departmentData.map((dept) => (
                  <React.Fragment key={dept.name}>
                    <TableRow 
                      className="cursor-pointer hover:bg-[#f7fcfd] transition-colors"
                      onClick={() => toggleDept(dept.name)}
                    >
                      <TableCell className="font-medium flex items-center gap-1">
                        {expandedDept === dept.name ? 
                          <ChevronDown className="h-4 w-4 text-[#6ad4e0]" /> : 
                          <ChevronRight className="h-4 w-4 text-[#6ad4e0]" />}
                        {dept.name}
                      </TableCell>
                      <TableCell className="text-right font-medium text-[#333]">{dept.q1Negative}%</TableCell>
                      <TableCell className="text-right text-[#555]">{dept.q4Negative}%</TableCell>
                      <TableCell 
                        className={`text-right font-medium ${
                          dept.diffPercent > 0 ? 'text-[#ff8c8c]' : 
                          dept.diffPercent < 0 ? 'text-[#228b22]' : 'text-gray-600'
                        }`}
                      >
                        {dept.diffPercent > 0 ? '+' : ''}{dept.diffPercent}%
                      </TableCell>
                      <TableCell>{getTrendBadge(dept.trend)}</TableCell>
                      <TableCell>{getPriorityBadge(dept.priority)}</TableCell>
                    </TableRow>
                    {expandedDept === dept.name && (
                      <TableRow className="bg-[#f7fcfd]">
                        <TableCell colSpan={6} className="p-4">
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-[#333] mb-1">Key Issues</h4>
                              <p className="text-sm text-[#555]">{dept.keyThemes}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-[#333] mb-1">Impact</h4>
                              <p className="text-sm text-[#555]">{dept.impact}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-[#333] mb-2">Recommendations</h4>
                              <ul className="list-disc pl-5 text-sm text-[#555] space-y-1">
                                {dept.recommendations.map((rec, idx) => (
                                  <li key={idx}>{rec}</li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-[#333] mb-2">Trend Visualization</h4>
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 w-full">
                                  <span className="text-xs text-[#555] w-20">Q4 2024</span>
                                  <div className="flex-grow h-8 bg-[#f0f0f0] rounded-full overflow-hidden">
                                    <div 
                                      className="h-full rounded-full bg-[#91e6c8]" 
                                      style={{ width: `${Math.min(dept.q4Negative * 10, 100)}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs font-medium text-[#555] w-12">{dept.q4Negative}%</span>
                                </div>
                                <div className="flex items-center gap-2 w-full">
                                  <span className="text-xs text-[#555] w-20">Q1 2025</span>
                                  <div className="flex-grow h-8 bg-[#f0f0f0] rounded-full overflow-hidden">
                                    <div 
                                      className="h-full rounded-full" 
                                      style={{ 
                                        width: `${Math.min(dept.q1Negative * 10, 100)}%`,
                                        backgroundColor: dept.color 
                                      }}
                                    ></div>
                                  </div>
                                  <span className="text-xs font-medium text-[#555] w-12">{dept.q1Negative}%</span>
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
      
      <div className="bg-[#f7fcfd] border border-[#6ad4e0]/30 rounded-md p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-[#6ad4e0] mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-[#333] text-sm">
            <span className="font-medium">Methodology Note:</span> This analysis examines guest sentiment data collected from 155 unique blog posts dated between January 1, 2025, and March 31, 2025, sourced from Naver.com. Quantitative estimates (percentages, BSA score) are approximations based on qualitative review.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPerformance;
