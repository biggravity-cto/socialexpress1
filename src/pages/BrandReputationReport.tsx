
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, FileText, Info, MessageSquare, BarChart2, Lightbulb, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SentimentDashboard from '@/components/brand-reputation/SentimentDashboard';
import DepartmentPerformance from '@/components/brand-reputation/DepartmentPerformance';
import KeyFindings from '@/components/brand-reputation/KeyFindings';
import TrendAnalysis from '@/components/brand-reputation/TrendAnalysis';
import ReviewsHighlights from '@/components/brand-reputation/ReviewsHighlights';
import RecommendationsSection from '@/components/brand-reputation/RecommendationsSection';
import StrategicRecommendations from '@/components/brand-reputation/StrategicRecommendations';
import MethodologySection from '@/components/brand-reputation/MethodologySection';

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
            <h1 className="text-2xl md:text-3xl font-bold text-[#333] mb-1">Brand Reputation Report</h1>
            <span className="bg-[#6ad4e0]/20 text-[#1d9cc8] text-xs px-2.5 py-1 rounded-full font-medium">
              Q1 2025
            </span>
          </div>
          <p className="text-[#555]">Movenpick Resort Cam Ranh | January 1 - March 31, 2025</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button 
            size="sm" 
            variant={viewingFullReport ? "secondary" : "default"}
            className={viewingFullReport 
              ? "bg-gray-200 hover:bg-gray-300 text-gray-800" 
              : "bg-[#6ad4e0] hover:bg-[#1d9cc8] text-white flex items-center gap-2"
            }
            onClick={() => setViewingFullReport(!viewingFullReport)}
          >
            <FileText className="h-4 w-4" />
            {viewingFullReport ? 'Compact View' : 'Full Report'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-gradient-to-br from-[#6ad4e0]/10 to-[#91e6c8]/10 border-[#6ad4e0]/20">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#1d9cc8]">7.7</div>
            <div className="text-sm font-medium text-[#333]">BSA Score</div>
            <div className="text-xs text-[#555] mt-1">7.9 in Q4 2024</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-[#a3f7bf]/10 to-[#91e6c8]/10 border-[#a3f7bf]/20">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#228b22]">75%</div>
            <div className="text-sm font-medium text-[#333]">Positive Sentiment</div>
            <div className="text-xs text-[#555] mt-1">82.37% in Q4 2024</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-[#ffd6d6]/10 to-[#ffe9e9]/10 border-[#ffd6d6]/20">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#ef4444]">20%</div>
            <div className="text-sm font-medium text-[#333]">Negative Sentiment</div>
            <div className="text-xs text-[#555] mt-1">11.44% in Q4 2024</div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard" className="flex items-center gap-1.5">
            <BarChart2 className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="findings" className="flex items-center gap-1.5">
            <Star className="h-4 w-4" /> Key Findings
          </TabsTrigger>
          <TabsTrigger value="department" className="flex items-center gap-1.5">
            <BarChart2 className="h-4 w-4" /> Department Performance
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-1.5">
            <BarChart2 className="h-4 w-4" /> Trend Analysis
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4" /> Key Reviews
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-1.5">
            <Lightbulb className="h-4 w-4" /> Recommendations
          </TabsTrigger>
          {viewingFullReport && (
            <TabsTrigger value="methodology" className="flex items-center gap-1.5">
              <Info className="h-4 w-4" /> Methodology
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="dashboard">
          <div className="space-y-6">
            <SentimentDashboard />
            {viewingFullReport ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ReviewsHighlights />
                <DepartmentPerformance />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ReviewsHighlights />
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="findings">
          <KeyFindings />
        </TabsContent>
        
        <TabsContent value="department">
          <DepartmentPerformance />
        </TabsContent>
        
        <TabsContent value="trends">
          <TrendAnalysis />
        </TabsContent>
        
        <TabsContent value="reviews">
          <ReviewsHighlights />
        </TabsContent>
        
        <TabsContent value="recommendations">
          <div className="space-y-6">
            {viewingFullReport ? <RecommendationsSection /> : null}
            <StrategicRecommendations />
          </div>
        </TabsContent>
        
        {viewingFullReport && (
          <TabsContent value="methodology">
            <MethodologySection />
          </TabsContent>
        )}
      </Tabs>
    </motion.div>
  );
};

export default BrandReputationReport;
