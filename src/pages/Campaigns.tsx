
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  PlusCircle, 
  Save, 
  FileText, 
  Target, 
  Users, 
  Calendar, 
  BrainCircuit, 
  BarChart, 
  LineChart,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  LayoutDashboard,
  Archive
} from 'lucide-react';

const Campaigns = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const steps = [
    { id: 1, title: 'Define Goals', icon: <Target className="h-5 w-5 text-blue-600" /> },
    { id: 2, title: 'AI Strategy', icon: <BrainCircuit className="h-5 w-5 text-purple-600" /> },
    { id: 3, title: 'Content Outline', icon: <FileText className="h-5 w-5 text-green-600" /> },
    { id: 4, title: 'Performance Forecast', icon: <LineChart className="h-5 w-5 text-amber-600" /> },
    { id: 5, title: 'Campaign Brief', icon: <MessageSquare className="h-5 w-5 text-pink-600" /> },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-resort-800 mb-1">Campaigns</h1>
          <p className="text-resort-500">Create and manage data-driven marketing campaigns</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="mr-1.5 h-4 w-4" /> Save Draft
          </Button>
          <Button className="bg-ocean-600 hover:bg-ocean-700 shadow-sm">
            <PlusCircle className="mr-1.5 h-4 w-4" /> New Campaign
          </Button>
        </div>
      </div>

      <Tabs defaultValue="new">
        <TabsList className="mb-4">
          <TabsTrigger value="new">Plan New Campaign</TabsTrigger>
          <TabsTrigger value="briefs">Campaign Briefs</TabsTrigger>
          <TabsTrigger value="active">Active Campaigns</TabsTrigger>
          <TabsTrigger value="repository">Campaign Repository</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Card className="p-4">
                <div className="space-y-1 mb-6">
                  <h3 className="text-lg font-medium text-resort-800">Campaign Steps</h3>
                  <p className="text-sm text-resort-500">Follow the process to create your campaign</p>
                </div>
                
                <div className="space-y-2">
                  {steps.map((step) => (
                    <div 
                      key={step.id}
                      className={`flex items-center p-3 rounded-md cursor-pointer ${
                        currentStep === step.id 
                          ? 'bg-ocean-50 border-l-4 border-ocean-600' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setCurrentStep(step.id)}
                    >
                      <div className="mr-3">{step.icon}</div>
                      <div>
                        <p className={`text-sm font-medium ${
                          currentStep === step.id ? 'text-ocean-600' : 'text-resort-800'
                        }`}>
                          {step.title}
                        </p>
                      </div>
                      {currentStep > step.id && (
                        <CheckCircle2 className="ml-auto h-4 w-4 text-green-600" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            
            <div className="lg:col-span-3">
              <Card className="p-6">
                {currentStep === 1 && (
                  <div>
                    <div className="space-y-1 mb-6">
                      <h2 className="text-xl font-medium text-resort-800">Define Campaign Goals & Scope</h2>
                      <p className="text-sm text-resort-500">Set the objectives and parameters for your campaign</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-resort-700 mb-1">Campaign Name</label>
                        <Input placeholder="Enter campaign name" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-resort-700 mb-1">Primary Objective</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {['Awareness', 'Leads', 'Bookings', 'Event Attendance'].map((objective) => (
                            <Button 
                              key={objective} 
                              variant="outline" 
                              className="justify-start"
                            >
                              <Target className="h-4 w-4 mr-2 text-ocean-600" />
                              {objective}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-resort-700 mb-1">Target Audience</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {['Luxury Travelers', 'Families', 'Business Travelers', 'Korean Market'].map((audience) => (
                            <Button 
                              key={audience} 
                              variant="outline" 
                              className="justify-start"
                            >
                              <Users className="h-4 w-4 mr-2 text-purple-600" />
                              {audience}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-resort-700 mb-1">Campaign Duration</label>
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <Input type="date" />
                          </div>
                          <span className="text-resort-500">to</span>
                          <div className="flex-1">
                            <Input type="date" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-resort-700 mb-1">Additional Notes</label>
                        <Textarea placeholder="Add any additional details or requirements for the campaign" rows={3} />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          className="bg-ocean-600 hover:bg-ocean-700"
                          onClick={() => setCurrentStep(2)}
                        >
                          Next Step <ArrowRight className="ml-1.5 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div>
                    <div className="space-y-1 mb-6">
                      <h2 className="text-xl font-medium text-resort-800">AI Strategy Recommendations</h2>
                      <p className="text-sm text-resort-500">Leverage AI to generate strategic recommendations based on your goals</p>
                    </div>
                    
                    <div className="mb-6">
                      <Button className="bg-purple-600 hover:bg-purple-700 mb-6">
                        <BrainCircuit className="mr-1.5 h-4 w-4" /> Generate AI Recommendations
                      </Button>
                      
                      <Card className="p-4 bg-purple-50 border-purple-200 mb-4">
                        <div className="flex items-start">
                          <Lightbulb className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                          <div>
                            <h3 className="text-sm font-medium text-purple-800">AI is analyzing your inputs</h3>
                            <p className="text-sm text-purple-700">Examining historical data, market trends, and best practices to generate recommendations...</p>
                          </div>
                        </div>
                      </Card>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium text-resort-700 mb-3">Audience Targeting Strategy</h3>
                          <div className="bg-white border border-gray-200 rounded-md p-4">
                            <p className="text-sm text-resort-600">Based on your objectives, we recommend focusing on the Korean luxury travel market segment with emphasis on wellness and exclusive experiences.</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-resort-700 mb-3">Campaign Themes & Angles</h3>
                          <div className="bg-white border border-gray-200 rounded-md p-4">
                            <p className="text-sm text-resort-600">Highlight exclusive wellness retreats and VIP experiences. Emphasize privacy, luxury amenities, and personalized service in Korean-focused messaging.</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-resort-700 mb-3">Recommended Channel Mix</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['Instagram', 'KakaoTalk', 'Email', 'Naver'].map((channel) => (
                              <div key={channel} className="bg-white border border-gray-200 rounded-md p-3 text-center">
                                <p className="text-sm font-medium text-resort-700">{channel}</p>
                                <p className="text-xs text-resort-500">High priority</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                      >
                        Back
                      </Button>
                      <Button 
                        className="bg-ocean-600 hover:bg-ocean-700"
                        onClick={() => setCurrentStep(3)}
                      >
                        Next Step <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && (
                  <div>
                    <div className="space-y-1 mb-6">
                      <h2 className="text-xl font-medium text-resort-800">AI Content Outline Generation</h2>
                      <p className="text-sm text-resort-500">Create a content plan based on AI strategic recommendations</p>
                    </div>
                    
                    {/* Content for step 3 would go here */}
                    <div className="flex justify-between">
                      <Button 
                        variant="outline"
                        onClick={() => setCurrentStep(2)}
                      >
                        Back
                      </Button>
                      <Button 
                        className="bg-ocean-600 hover:bg-ocean-700"
                        onClick={() => setCurrentStep(4)}
                      >
                        Next Step <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentStep === 4 && (
                  <div>
                    <div className="space-y-1 mb-6">
                      <h2 className="text-xl font-medium text-resort-800">AI Performance & Budget Forecasting</h2>
                      <p className="text-sm text-resort-500">Estimate potential campaign results and optimize budget allocation</p>
                    </div>
                    
                    {/* Content for step 4 would go here */}
                    <div className="flex justify-between">
                      <Button 
                        variant="outline"
                        onClick={() => setCurrentStep(3)}
                      >
                        Back
                      </Button>
                      <Button 
                        className="bg-ocean-600 hover:bg-ocean-700"
                        onClick={() => setCurrentStep(5)}
                      >
                        Next Step <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentStep === 5 && (
                  <div>
                    <div className="space-y-1 mb-6">
                      <h2 className="text-xl font-medium text-resort-800">Generate & Refine Campaign Brief</h2>
                      <p className="text-sm text-resort-500">Review and finalize your campaign brief before submission</p>
                    </div>
                    
                    {/* Content for step 5 would go here */}
                    <div className="flex justify-between">
                      <Button 
                        variant="outline"
                        onClick={() => setCurrentStep(4)}
                      >
                        Back
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <CheckCircle2 className="mr-1.5 h-4 w-4" /> Send to Approvals
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="briefs">
          <Card className="p-6">
            <div className="space-y-1 mb-6">
              <h2 className="text-xl font-medium text-resort-800">Campaign Briefs</h2>
              <p className="text-sm text-resort-500">Generate, refine and manage approval status of your campaign briefs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: 1, title: 'Summer Promotion', status: 'Pending Approval', date: '2023-06-01', target: 'Families' },
                { id: 2, title: 'Korean Wellness Retreat', status: 'Draft', date: '2023-07-15', target: 'Korean Market' },
                { id: 3, title: 'Business Conference Package', status: 'Approved', date: '2023-05-10', target: 'Business Travelers' }
              ].map((brief) => (
                <Card key={brief.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-medium text-resort-800">{brief.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        brief.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        brief.status === 'Draft' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {brief.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-resort-600">{brief.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-resort-600">{brief.target}</span>
                      </div>
                    </div>
                    
                    <div className="flex mt-4 pt-3 border-t border-gray-100">
                      <Button variant="ghost" size="sm" className="text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50 mr-2">
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50">
                        Edit
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="active">
          <Card className="p-6">
            <div className="space-y-1 mb-6">
              <h2 className="text-xl font-medium text-resort-800">Active Campaigns Overview</h2>
              <p className="text-sm text-resort-500">Track status and performance of your active campaigns</p>
            </div>
            
            <div className="space-y-6">
              {[
                { 
                  id: 1, 
                  title: 'Summer Family Getaway', 
                  status: 'Active', 
                  progress: 75, 
                  startDate: '2023-06-01', 
                  endDate: '2023-08-31',
                  metrics: { impressions: '125K', engagement: '4.8%', conversions: '321' }
                },
                { 
                  id: 2, 
                  title: 'Korean Wellness Retreat', 
                  status: 'Active', 
                  progress: 40, 
                  startDate: '2023-07-15', 
                  endDate: '2023-10-15',
                  metrics: { impressions: '82K', engagement: '5.2%', conversions: '168' }
                }
              ].map((campaign) => (
                <Card key={campaign.id} className="p-5 border-l-4 border-green-500">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-resort-800">{campaign.title}</h3>
                      <div className="flex items-center text-sm text-resort-500 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {campaign.startDate} to {campaign.endDate}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800 mr-3">
                        {campaign.status}
                      </span>
                      <span className="text-sm font-medium text-resort-800">{campaign.progress}% Complete</span>
                    </div>
                  </div>
                  
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-4">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-md text-center">
                      <p className="text-xs text-resort-500 mb-1">Impressions</p>
                      <p className="text-sm font-medium text-resort-800">{campaign.metrics.impressions}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md text-center">
                      <p className="text-xs text-resort-500 mb-1">Engagement</p>
                      <p className="text-sm font-medium text-resort-800">{campaign.metrics.engagement}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md text-center">
                      <p className="text-xs text-resort-500 mb-1">Conversions</p>
                      <p className="text-sm font-medium text-resort-800">{campaign.metrics.conversions}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Calendar className="h-3 w-3 mr-1" /> View in Calendar
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <BarChart className="h-3 w-3 mr-1" /> Analytics Report
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <LayoutDashboard className="h-3 w-3 mr-1" /> Campaign Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="repository">
          <Card className="p-6">
            <div className="space-y-1 mb-6">
              <h2 className="text-xl font-medium text-resort-800">Campaign Repository</h2>
              <p className="text-sm text-resort-500">Browse and manage your saved campaign plans</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: 1, title: 'Summer Promotion 2022', status: 'Completed', date: '2022-06-01', target: 'Families', roi: '+12%' },
                { id: 2, title: 'Korean Wellness Launch', status: 'Completed', date: '2022-11-15', target: 'Korean Market', roi: '+28%' },
                { id: 3, title: 'Business Conference', status: 'Completed', date: '2023-01-10', target: 'Business Travelers', roi: '+8%' }
              ].map((campaign) => (
                <Card key={campaign.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-medium text-resort-800">{campaign.title}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                        {campaign.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-resort-600">{campaign.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-resort-600">{campaign.target}</span>
                      </div>
                      <div className="flex items-center">
                        <BarChart className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-green-600 font-medium">ROI: {campaign.roi}</span>
                      </div>
                    </div>
                    
                    <div className="flex mt-4 pt-3 border-t border-gray-100">
                      <Button variant="ghost" size="sm" className="text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50 mr-2">
                        View Report
                      </Button>
                      <Button variant="ghost" size="sm" className="text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50">
                        <Archive className="h-4 w-4 mr-1" /> Clone
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Campaigns;
