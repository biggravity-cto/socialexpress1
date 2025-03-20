
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Line, LineChart } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Users, Eye, BarChart2, Heart } from 'lucide-react';
import AnimatedCard from '../ui/AnimatedCard';
import { cn } from '@/lib/utils';

// Sample data
const data = [
  { month: 'Jan', engagement: 400, impressions: 2400, followers: 40 },
  { month: 'Feb', engagement: 300, impressions: 1398, followers: 43 },
  { month: 'Mar', engagement: 200, impressions: 9800, followers: 48 },
  { month: 'Apr', engagement: 278, impressions: 3908, followers: 52 },
  { month: 'May', engagement: 189, impressions: 4800, followers: 55 },
  { month: 'Jun', engagement: 239, impressions: 3800, followers: 57 },
  { month: 'Jul', engagement: 349, impressions: 4300, followers: 62 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-sm rounded-lg">
        <p className="text-sm font-medium text-resort-800">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

interface StatCardProps {
  title: string;
  value: number | string;
  change: number;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color, delay = 0 }) => {
  return (
    <AnimatedCard className="relative overflow-hidden" delay={delay}>
      <div className="absolute right-0 top-0 opacity-5">
        <div className="text-9xl transform translate-x-5 -translate-y-5">{icon}</div>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-resort-500">{title}</h3>
          <p className="text-2xl font-semibold mt-1 text-resort-800">{value}</p>
        </div>
        <div className={cn(
          "flex items-center rounded-full px-2 py-1 text-xs font-medium",
          change > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        )}>
          {change > 0 ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1" />
          )}
          {Math.abs(change)}%
        </div>
      </div>
      <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full", color)} 
          style={{ width: `${Math.min(Math.abs(change) * 3, 100)}%` }}
        ></div>
      </div>
    </AnimatedCard>
  );
};

const PerformanceMetrics = () => {
  const [timeframe, setTimeframe] = useState('7d');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-medium text-resort-800">Performance Metrics</h2>
        <div className="flex items-center space-x-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Followers"
          value="12,845"
          change={8.1}
          icon={<Users />}
          color="bg-blue-500"
          delay={0}
        />
        <StatCard
          title="Impressions"
          value="243,093"
          change={-2.3}
          icon={<Eye />}
          color="bg-purple-500"
          delay={1}
        />
        <StatCard
          title="Engagement Rate"
          value="4.6%"
          change={1.7}
          icon={<BarChart2 />}
          color="bg-green-500"
          delay={2}
        />
        <StatCard
          title="Total Likes"
          value="8,492"
          change={5.2}
          icon={<Heart />}
          color="bg-red-500"
          delay={3}
        />
      </div>

      <AnimatedCard className="p-0 overflow-hidden">
        <Tabs defaultValue="overview" className="w-full">
          <div className="px-6 pt-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="followers">Followers</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-6 pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="impressions" 
                    stroke="#0ea5e9" 
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, stroke: '#0369a1', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, stroke: '#6d28d9', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="engagement" className="p-6 pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="engagement" 
                    fill="#8b5cf6" 
                    radius={[4, 4, 0, 0]}
                    name="Engagement"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="followers" className="p-6 pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="followers" 
                    stroke="#0ea5e9" 
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, stroke: '#0369a1', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </AnimatedCard>
    </div>
  );
};

export default PerformanceMetrics;
