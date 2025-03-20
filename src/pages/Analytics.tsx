
import React from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import { motion } from 'framer-motion';
import PerformanceMetrics from '@/components/dashboard/PerformanceMetrics';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

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
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-resort-50 to-white">
      <Sidebar />
      
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 ml-0 md:ml-20 lg:ml-64 transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">Analytics</h1>
          <p className="text-resort-500">Track your social media performance and insights</p>
        </motion.div>
        
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
        </div>
      </main>
    </div>
  );
};

export default Analytics;
