
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PerformanceMetrics from '@/components/dashboard/PerformanceMetrics';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample data
const platformData = [
  { name: 'Instagram', value: 65, color: '#E1306C' },
  { name: 'Facebook', value: 25, color: '#4267B2' },
  { name: 'Twitter', value: 10, color: '#1DA1F2' },
];

const contentTypeData = [
  { name: 'Photos', value: 45, color: '#8B5CF6' },
  { name: 'Videos', value: 30, color: '#10B981' },
  { name: 'Carousels', value: 15, color: '#F59E0B' },
  { name: 'Stories', value: 10, color: '#EC4899' },
];

const audienceData = [
  { name: 'Jan', male: 4000, female: 2400 },
  { name: 'Feb', male: 3000, female: 1398 },
  { name: 'Mar', male: 2000, female: 9800 },
  { name: 'Apr', male: 2780, female: 3908 },
  { name: 'May', male: 1890, female: 4800 },
  { name: 'Jun', male: 2390, female: 3800 },
  { name: 'Jul', male: 3490, female: 4300 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-sm rounded-lg">
        <p className="text-sm font-medium">{payload[0].name}: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  const [selectedCampaign, setSelectedCampaign] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">Analytics</h1>
        <p className="text-resort-500">Track your social media performance and insights</p>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-resort-700">Filter by Campaign</label>
          <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a campaign" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              <SelectItem value="summer">Summer Promotion</SelectItem>
              <SelectItem value="wellness">Korean Wellness Retreat</SelectItem>
              <SelectItem value="business">Business Conference</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-resort-700">Timeframe</label>
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-8">
        <PerformanceMetrics />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatedCard className="p-6">
            <h3 className="font-medium text-resort-800 mb-4">Distribution by Platform</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </AnimatedCard>
          
          <AnimatedCard className="p-6">
            <h3 className="font-medium text-resort-800 mb-4">Content Performance by Type</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contentTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {contentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </AnimatedCard>
        </div>
        
        <AnimatedCard className="p-0 overflow-hidden">
          <Tabs defaultValue="audience" className="w-full">
            <div className="px-6 pt-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100">
              <h3 className="font-medium text-resort-800 mb-4 sm:mb-0">Audience Demographics</h3>
              <TabsList>
                <TabsTrigger value="audience">Age & Gender</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="interests">Interests</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="audience" className="p-6 pt-4">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={audienceData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="male" 
                      stackId="1"
                      stroke="#0284c7" 
                      fill="#0ea5e9" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="female" 
                      stackId="1"
                      stroke="#d946ef" 
                      fill="#e879f9" 
                      fillOpacity={0.6}
                    />
                    <Legend 
                      payload={[
                        { value: 'Male', type: 'circle', color: '#0ea5e9' },
                        { value: 'Female', type: 'circle', color: '#e879f9' },
                      ]}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="location" className="p-6 pt-4">
              <div className="flex items-center justify-center h-72">
                <p className="text-center text-resort-500">Location data visualization will appear here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="interests" className="p-6 pt-4">
              <div className="flex items-center justify-center h-72">
                <p className="text-center text-resort-500">Interest data visualization will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </AnimatedCard>
        
        <AnimatedCard className="p-6">
          <h3 className="font-medium text-resort-800 mb-6">Campaign Performance Summary</h3>
          {selectedCampaign === "all" ? (
            <div className="space-y-4">
              {[
                { name: 'Summer Promotion', impressions: '243K', engagement: '4.8%', roi: '+12%', color: 'bg-purple-500' },
                { name: 'Korean Wellness Retreat', impressions: '182K', engagement: '5.2%', roi: '+28%', color: 'bg-blue-500' },
                { name: 'Business Conference', impressions: '118K', engagement: '3.7%', roi: '+8%', color: 'bg-green-500' }
              ].map((campaign, index) => (
                <div key={index} className="p-4 border border-gray-100 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h4 className="text-sm font-medium text-resort-800">{campaign.name}</h4>
                    <div className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
                      ROI: {campaign.roi}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-resort-500">Impressions</p>
                      <p className="text-sm font-medium">{campaign.impressions}</p>
                    </div>
                    <div>
                      <p className="text-xs text-resort-500">Engagement Rate</p>
                      <p className="text-sm font-medium">{campaign.engagement}</p>
                    </div>
                  </div>
                  <div className="mt-3 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${campaign.color}`} 
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40">
              <p className="text-center text-resort-500">Detailed metrics for {
                selectedCampaign === "summer" ? "Summer Promotion" : 
                selectedCampaign === "wellness" ? "Korean Wellness Retreat" : 
                "Business Conference"
              } will appear here</p>
            </div>
          )}
        </AnimatedCard>
      </div>
    </motion.div>
  );
};

export default Analytics;
