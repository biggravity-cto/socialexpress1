
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, FileText, Info, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import SentimentDashboard from '@/components/brand-reputation/SentimentDashboard';
import DepartmentPerformance from '@/components/brand-reputation/DepartmentPerformance';
import KeyFindings from '@/components/brand-reputation/KeyFindings';
import TrendAnalysis from '@/components/brand-reputation/TrendAnalysis';
import ReviewsHighlights from '@/components/brand-reputation/ReviewsHighlights';
import RecommendationsSection from '@/components/brand-reputation/RecommendationsSection';

const BrandReputationReport = () => {
  const [viewingFullReport, setViewingFullReport] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-10"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-resort-800">Brand Reputation Report</h1>
            <span className="bg-ocean-100 text-ocean-800 text-xs px-2 py-1 rounded-full font-medium">
              Q1 2025
            </span>
          </div>
          <p className="text-resort-500">Movenpick Resort Cam Ranh | January 1 - March 31, 2025</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button size="sm" variant="default" className="bg-ocean-600 hover:bg-ocean-700 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Full Report
          </Button>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-amber-700 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-amber-800 text-sm">
            <span className="font-medium">Data Sample Note:</span> This analysis is based on 43 blog posts from Q1 2025 compared to 953 posts in Q4 2024. 
            Interpret trends with caution due to the significant difference in sample size.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-700">7.7</div>
            <div className="text-sm font-medium text-blue-800">BSA Score</div>
            <div className="text-xs text-blue-600 mt-1">7.9 in Q4 2024</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-700">75%</div>
            <div className="text-sm font-medium text-green-800">Positive Sentiment</div>
            <div className="text-xs text-green-600 mt-1">82.37% in Q4 2024</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-700">20%</div>
            <div className="text-sm font-medium text-red-800">Negative Sentiment</div>
            <div className="text-xs text-red-600 mt-1">11.44% in Q4 2024</div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Overview</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
          <TabsTrigger value="department">Department Performance</TabsTrigger>
          <TabsTrigger value="findings">Key Findings</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SentimentDashboard />
            <ReviewsHighlights />
          </div>
        </TabsContent>
        
        <TabsContent value="sentiment">
          <SentimentDashboard />
        </TabsContent>
        
        <TabsContent value="department">
          <DepartmentPerformance />
        </TabsContent>
        
        <TabsContent value="findings">
          <KeyFindings />
        </TabsContent>
        
        <TabsContent value="trends">
          <TrendAnalysis />
        </TabsContent>
        
        <TabsContent value="recommendations">
          <RecommendationsSection />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default BrandReputationReport;
